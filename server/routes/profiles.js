import moment from "moment";
import slug from "slug";
import profiles from "../../db/profiles.json";
import mongo from "mongodb";
const MongoClient = mongo.MongoClient;

var db = "db";
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;

class User {
	constructor(userObj) {
		for (var attributeName in userObj) {
			this[attributeName] = userObj[attributeName];
		}
	}
	merge(object) {
		for (var attributeName in object) {
			this[attributeName] = object[attributeName];
		}
		return this;
	}
}

MongoClient.connect(url, function(err, client) {
	if (err) {
		throw err;
	}

	db = client.db(process.env.DB_NAME);
});

export function onCreateProfile(req, res) {
	res.render("profileCreation");
}

export function onCreateProfilePost(req, res) {
	const id = slug(req.body.name).toLowerCase();
	let newUser = new User(req.body);
	newUser.id = id;
	db.collection("users").insertOne(newUser, (err, res) => {
		if (err) throw err;
		console.log("1 new user added");
		res.redirect(`/user/${res.insertedId}`);
	});
}

export function onProfileAll(req, res, next) {
	db.collection("users")
		.find()
		.toArray(done);

	function done(err, data) {
		if (err) {
			next(err);
		} else {
			let profiles = { data };
			profiles.data.forEach(profile => {
				profile.level = moment().diff(profile.bday, "years");
				profile.race = "Human";
			});
			res.render("profiles", profiles);
		}
	}
}

export function onProfile(req, res, next) {
	const id = req.params.id;
	db.collection("users").findOne(
		{
			_id: new mongo.ObjectID(id)
		},
		done
	);

	function done(err, profile) {
		if (err) {
			next(err);
		} else {
			profile.level = moment().diff(profile.bday, "years");
			switch (profile.faction) {
				case "5e":
					profile.faction = "5th Edition";
					break;
				case "3.5e":
					profile.faction = "3.5 Edition";
					break;
				case "pathfinder":
					profile.faction = "Pathfinder";
					break;
				case "3e":
					profile.faction = "3rd Edition";
					break;
				case "4e":
					profile.faction = "4th Edition";
					break;
			}
			let interest = "";
			for (let i = 0; i < profile.interest.length; i++) {
				if (i === 0) interest += profile.interest.charAt(0).toUpperCase();
				else interest += profile.interest[i];
			}
			profile.interest = interest;
			profile.race = "Human";
			profile.experience =
				365 -
				moment(profile.bday.slice(5)).diff(moment().format("MM-DD"), "days");
			profile.experience =
				profile.experience >= 365
					? profile.experience - 365
					: profile.experience;

			res.render("profile", profile);
		}
	}
}
