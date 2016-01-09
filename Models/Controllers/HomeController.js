"use strict"
class HomeController extends require('./Controller') {
	constructor() {
		super()
	}

	index(req,callback) {
		// The body is the html body from express
		var title = 'Main Page'
		var results {
			title:title
		}

		function finish() {
			callback(null,results)
		}

		async.series([
			function(cb) {
				User.findById(1,function(err,user) {
					results.user = user;
					if (err) {

					} else {
						cb()
					}
				})
			},
			function(cb) {
				Session.create(results.user)
			}
		],finish)
	}

}

module.exports = HomeController

module.exports.create = new HomeController()