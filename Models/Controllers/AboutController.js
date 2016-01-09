"use strict"
class AboutController extends require("./Controller") {
  constructor() {
    super()
  }

  index(req,callback) {
    var title = ""
    callback(null,{ title:title })
  }

}

module.exports = AboutController

module.exports.create = new AboutController()