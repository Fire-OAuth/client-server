const FIRE_API_KEY = "6159bbddf524e3b8264d43ef"
const FIRE_ENDPOINT = "http://localhost:3003/api/apis/generate"
const CHANNEL_NAME = "fireOAuthChannel"
const broadCastingChannel = new BroadcastChannel(CHANNEL_NAME)
const FIRE_SERVER_SOCKET_ENDPOINT = "http://localhost:3003"
let socket = io(FIRE_SERVER_SOCKET_ENDPOINT)

let qr

async function getSessionID() {
	let response
	try {
		response = await fetch(`${FIRE_ENDPOINT}/${FIRE_API_KEY}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		})
	} catch (error) {
		console.log(error)
        return alert("Something Went Wrong")
	}

    let data = await response.json()
    let { sessionId,  chatRoomId } = data
    return { sessionId, chatRoomId }
}

function generateQR(value) {
	(qr = new QRious({
		element: document.getElementById("qr-code"),
		size: 200,
        level: 'M',
		value: value,
	}))
}

function changeHREF ({sessionId, chatRoomId}) {
    let firePwaUrlHostname = "http://localhost:5500"
    let url = `${firePwaUrlHostname}/authorize.html?sessionId=${sessionId}&chatRoomId=${chatRoomId}`
    let a = document.getElementById("authorizeOverLink")
    a.href = url
}

async function fire() {
    let { sessionId, chatRoomId } = await getSessionID()
    generateQR(sessionId)
    changeHREF({sessionId, chatRoomId})
}

fire()