import moment from "moment";
import slug from "slug";
import profiles from "../../db/profiles.json";
import mongo from "mongodb";
let db = null;
const url = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT;

mongo.MongoClient.connect(url, function(err, client) {
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
  profiles.push({
    id: id,
    name: req.body.name,
    background: req.body.background,
    dndClass: req.body.dndClass,
    bday: req.body.bday,
    faction: req.body.faction,
    interest: req.body.interest,
    traits: req.body.traits,
    ideals: req.body.ideals,
    bonds: req.body.bonds,
    flaws: req.body.flaws
  });
  res.redirect(`/user/${id}`);
}

export function onProfileAll(req, res, next) {
  db.collection("users")
    .find()
    .toArray(done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      let profiles = { data: data };
      profiles.data.forEach(profile => {
        profile.level = moment().diff(profile.bday, "years");
        profile.race = "Human";
        console.log(profile);
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

      res.render("profile", profile);
    }
  }
}
