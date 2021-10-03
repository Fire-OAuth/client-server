const channel = new BroadcastChannel("my_bus")
channel.addEventListener("message", (event) => {
	console.log(event.data)
})
