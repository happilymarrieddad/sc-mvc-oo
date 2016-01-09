"use strict"
class UserController extends require("./Controller") {
  constructor() {
    super()
  }

  index(req,callback) {
    var title = ""
    callback(null,{ title:title })
  }

}

module.exports = UserController

module.exports.create = new UserController()