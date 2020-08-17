var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req,res){
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
				res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	})
});


//CREATE-add new campground
router.post("/",middleware.isLoggedIn, function(req,res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name, price:price, image:image, description: desc, author: author};
	//create a new campground
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});


//New-show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});


//SHOW-show more info about one campground
router.get("/:id", function(req,res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});



//Edit Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
			Campground.findById(req.params.id, function(err, foundCampground){
				 res.render("campgrounds/edit", {campground: foundCampground});
	});
});

//update campground
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
})

//Destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});




module.exports = router;