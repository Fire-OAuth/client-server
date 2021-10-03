const FIREAPI = "6159bbddf524e3b8264d43ef"
const FIREENDPOINT = "http://localhost:3003/api/apis/generate"
const channel = new BroadcastChannel("my_bus")
channel.addEventListener("message", (event) => {
	console.log(event.data)
})
