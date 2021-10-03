const FIREAPI = "6159bbddf524e3b8264d43ef"
const FIREENDPOINT = "http://localhost:3003/api/apis/generate"
const channel = new BroadcastChannel("my_bus")

let qr

async function getSessionID() {
	let response
	try {
		response = await fetch(`${FIREENDPOINT}/${FIREAPI}`, {
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
    console.log(data)
    return { sessionId, chatRoomId }
}

function generateQR(value) {
	(qr = new QRious({
		element: document.getElementById("qr-code"),
		size: 200,
		value: value,
	}))
}

function changeHREF ({sessionId, chatRoomId}) {
    let url = `https://firepwa.netlify.app/authorize.html?sessionId=${sessionId}&chatRoomId=${chatRoomId}`
    let a = document.getElementById("authorizeOverLink")
    a.href = url
}
