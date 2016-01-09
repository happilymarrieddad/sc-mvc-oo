/*
|---------------------------------------------------
| Route Dependencies
|---------------------------------------------------
*/
var parseUrlencoded = require("body-parser").urlencoded({ extended:false }),
  AboutRoute = new require("../Models/Controllers/AboutRoute").create,
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

    AboutRoute.index(req,function(err,response) {

      if (err) { res.json({ error:err })
      } else {

        res.render("about/index",response)
      }

   })

  })

module.exports = router
