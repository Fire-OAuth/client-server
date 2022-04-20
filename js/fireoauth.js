const FIRE_API_KEY = "61641f77a1d374e077107502"
const FIRE_ENDPOINT = "https://fireoauth.herokuapp.com/api/apis/generate"
const CHANNEL_NAME = "fireOAuthChannel"
const broadCastingChannel = new BroadcastChannel(CHANNEL_NAME)
const FIRE_SERVER_SOCKET_ENDPOINT = "https://fireoauth.herokuapp.com"
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
    let firePwaUrlHostname = "https://firepwa.netlify.app"
	let originURL = encodeURIComponent(window.location.origin)

    let url = `${firePwaUrlHostname}/authorize.html?sessionId=${sessionId}&chatRoomId=${chatRoomId}&url=${originURL}`
    let a = document.getElementById("authorizeOverLink")
    a.href = url
}

async function fire() {
	NProgress.set(0.4)
    let { sessionId, chatRoomId } = await getSessionID()
	NProgress.done()
	let data = {
		sessionId,
		url: encodeURIComponent(window.location.origin)
	}
	data = JSON.stringify(data)
    generateQR(data)
    changeHREF({sessionId, chatRoomId})
	socket.emit("join room", sessionId)
}

fire()

socket.on("trusted token", (token) => {

	let data = {}
	data.success = true
	data.token = token

	broadCastingChannel.postMessage(data)

	window.close()
})