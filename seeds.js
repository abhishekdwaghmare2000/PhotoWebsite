var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
	{
		name: "Cloud's Rest", 
		image: "https://images.unsplash.com/photo-1596982389015-89488df9c445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
	},
	{
		name: "Desert messa", 
		image: "https://images.unsplash.com/photo-1596922262139-4c41b495f74d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
	},
	{
		name: "Canyon floor", 
		image: "https://images.unsplash.com/photo-1597058171694-cfc801f11aa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
	}
]

function seedDB(){
	//remove all campgrounds
	Campground.deleteMany({}, function(err){
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds");
	//add a few campgrounds
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err){
				console.log(err);
			}else{
				console.log("added a campground");
				//create a comment
				Comment.create(
					{
						text: "This place is great, but I wish there was internet",
						author: "humor"
					}, function(err, comment){
						if(err){
							console.log(err);
						}else{
								campground.comments.push(comment);
						        campground.save();
							console.log("created new comment");
						}
					});
			}
		});
	});
});
}

module.exports = seedDB;
