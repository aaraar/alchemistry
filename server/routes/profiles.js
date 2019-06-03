import moment from "moment";
import slug from "slug";
import mongo from "mongodb";
import bcrypt from "bcrypt";
import multer from "multer";
const MongoClient = mongo.MongoClient;
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
var db = "null";

class User {
	constructor(userObj) {
		for (let attributeName in userObj) {
			this[attributeName] = userObj[attributeName];
		}
	}
	merge(object) {
		for (let attributeName in object) {
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
	const username = req.body.username;
	var password = req.body.password;
	console.log(password);
	const min = 8;
	const max = 160;

	if (!username || !password || !req.body.name) {
		return res.status(400).send("Username, password or your name are missing");
	}

	if (password.length < min || password.length > max) {
		return res
			.status(400)
			.send(`Password must be between ${min} and ${max} characters`);
	}

	db.collection("users").findOne({ username }, done);

	function done(err, data) {
		if (err) {
			next(err);
		} else if (data === null) {
			// 10 is the quantity of saltrounds
			bcrypt.hash(password, 10, (err, hash) => {
				if (err) next(err);
				else {
					newUser.id = id;
					newUser.avatar = req.file ? req.file.filename : null;
					newUser.password = hash;
					db.collection("users").insertOne(newUser, (err, data) => {
						if (err) throw err;
						else {
							console.log("1 new user added");
							req.session.user = data.username;
							req.session.save(err => {
								if (err) {
									console.log(err);
									next(err);
								}
							});
							res.redirect(`/user/${data.insertedId}`);
						}
					});
				}
			});
		} else {
			res.status(409).send("Username already in use");
		}
	}
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
			profiles.user = req.session.user;
			console.log(profiles.user);
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
			if (profile === null) {
				res.status(404).send("Sorry can't find that!");
			}
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
			profile.user = req.session.user;
			console.log(req.session.user);
			res.render("profile", profile);
		}
	}
}

export function onRemove(req, res, next) {
	const id = req.params.id;

	db.collection("users").deleteOne(id, done);
	function done(err) {
		if (err) {
			res.json({ status: "failed" });
		} else {
			res.json({ status: "ok" });
		}
	}
}
export function onLogin(req, res) {
	const password = req.body.password;
	db.collection("users").findOne(
		{
			username: req.body.username
		},
		done
	);
	function done(err, user) {
		if (err) {
			console.log(err);
			next(err);
		}
		console.log(user);
		if (user) {
			bcrypt.compare(password, user.password, (err, response) => {
				if (err) console.log(err);
				else if (response) {
					req.session.userDidNotMatch = false;
					req.session.passDidNotMatch = false;
					req.session.user = req.body.username;
					req.session.save(err => {
						if (err) {
							console.log(err);
							next(err);
						}
					});
					res.redirect(`/user/${user._id}`);
				} else {
					req.session.passDidNotMatch = true;
					req.session.save(err => {
						if (err) {
							console.log(err);
							next(err);
						}
					});
					res.redirect("/");
				}
			});
		}
	}
}
export function onLogout(req, res) {
	req.session.destroy(err => {
		if (err) {
			return console.log(err);
		}
		const backURL = req.header("Referer") || "/";
		res.redirect(backURL);
	});
}
