"use strict"
class SessionMiddleware extends require('./Middleware') {
	constructor() {
		super()
	}
	
}

module.exports = SessionMiddleware

module.exports.create = new SessionMiddleware()