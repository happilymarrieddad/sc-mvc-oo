"use strict"
class SocketServer {
	constructor() {

	}

	connect(socket_id,worker_id) {
		console.log('Client',socket_id,'has connectd to worker',worker_id)
	}

	disconnect(socket_id,worker_id) {
		console.log('Client',socket_id,'has disconnected from worker',worker_id)
	}
}