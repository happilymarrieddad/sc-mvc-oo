/*
|---------------------------------------------------
| Route Dependencies
|---------------------------------------------------
 */
var parseUrlencoded = require("body-parser").urlencoded({ extended:false }),
	HomeController = new require('../Models/Controllers/HomeController').create,
	router = require("express").Router()

/*
|---------------------------------------------------
| Route Middleware
|---------------------------------------------------
 */
router.use(function(req,res,next) {
  	next();
});

/*
|---------------------------------------------------
| Routes
|---------------------------------------------------
 */
router.route("/")
	/* Index */
	.get(function(req,res) {

		HomeController.index(req,function(err,response) {

			if (err) { res.json({ error:err })
			} else {

				res.render('home/index',response) 
			}

		})

	})

module.exports = router;