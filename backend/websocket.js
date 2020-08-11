/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-07-13 16:05:38 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-08-07 11:35:45
 */
const userDb = require('./db/user')
const { checkToken } = require("./token") // auth token 认证模块
const WebSocket = require('ws');

async function WSauth(token) {
	let verifyRes = await checkToken(token);
	let dbRes = await (await userDb.findOne({ username: verifyRes.username, password: verifyRes.password }).select({ _id: 1, nickname: 1, userPortrait: 1, username: 1, sex: 1 }));
	if (dbRes) {
		// 验证权限成功后 返回数据
		return dbRes
	}
	else {
		throw new Error()
	}
}
var ws = new WebSocket.Server({ port: 5757 });

// 监听接入进来的客户端事件
async function websocket_add_listener(client) {
	await friendOnlineState(1);

	// close事件
	client.on("close", async (err) => {
		await friendOnlineState(0);
	});

	// error事件
	client.on("error", async err => {
		await friendOnlineState(0);
	});
	// end 
	async function friendOnlineState(state) {
		await userDb.findByIdAndUpdate(client.user._id, { online: state });
		let friendArr = await userDb.find({ "friends.friendId": client.user._id }).select({ _id: 1 });

		ws.clients.forEach(async item => {
			let isFriend = friendArr.some(element => JSON.stringify(element._id) == JSON.stringify(item.user._id));
			if (isFriend) {
				item.send(JSON.stringify({
					type: "friendOnlineState",
					state: state,
					friendId: client.user._id
				}))
			}
		})
	}
}

// connection 事件, 有客户端接入进来;
ws.on("connection", (ws, req) => {
	let token = req.headers['sec-websocket-protocol']
	if (!token) return false
	return WSauth(token)
		.then(authRes => {
			if (authRes) {
				ws.user = authRes; // 将验证到的数据添加到客户链接中
				websocket_add_listener(ws);
			} else {
				ws.send("链接失败，身份验证失败");
				ws.close();
			}
		})
		.catch(err => {
			console.log(err)
			ws.send("链接失败，身份验证失败");
			ws.close();
		})
});

/**
 * 发送数据
 * @param {String} type 消息类型 "all" 全部用户 "online" 在线用户 "id,id,id" 用户 id 组（用户id逗号分隔）
 * @param {Object} message 发送的消息
 */
ws.sendNews = async function (type = "all", message) {
	message = {
		type: message.type ? message.type : '',
		secondType: message.secondType ? message.secondType : '',
		message: message.message ? message.message : '',
		data: message.data ? message.data : {},
		sendTime: new Date(),
		readTime: "",
		readStatus: false
	}
	if (type === "all") {
		ws.clients.forEach(client => {
			client.send(JSON.stringify(message));
		});
		let dbRes = await userDb.updateMany({}, { $push: { news: message } });
		return dbRes.modifiedCount
	} else if (type === "online") {
		let num = 0
		ws.clients.forEach(async client => {
			client.send(JSON.stringify(message));
			await userDb.updateOne({ _id: client.user._id }, { $push: { news: message } })
			num++
		});
		return num
	} else {
		if (type != "") {
			let idArr = type.split(",");
			ws.clients.forEach(clent => {
				idArr.forEach(itemId => {
					if (itemId == clent.user._id) {
						clent.send(JSON.stringify(message));
					}
				})
			})
			idArr.forEach(async id => {
				await userDb.findByIdAndUpdate(id, { $push: { news: message } }, { new: true })
			})
			return idArr.length
		} else {
			throw new Error('用户id组无效')
		}
	}

}

module.exports = ws