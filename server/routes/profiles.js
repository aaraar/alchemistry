import moment from "moment";
import slug from "slug";

const profileObj = {
  profiles: [
    {
      id: "edward-elric",
      name: "Edward Elric",
      background: "Haarlem",
      dndClass: "Male",
      bday: "1996-05-24",
      faction: "5e",
      interest: "female",
      traits: "Hot headed, philantropic, short-tempered, friendly",
      ideals: "Resurect his mother and find his brothers body back",
      bonds: "Does everything for family and friends",
      flaws: "Bad at predicting danger"
    },
    {
      id: "je-broer",
      name: "Je Broer",
      background: "Haarlem",
      dndClass: "Male",
      bday: "1996-08-30",
      faction: "5e",
      interest: "female",
      traits: "Hot headed, philantropic, short-tempered, friendly",
      ideals: "Resurect his mother and find his brothers body back",
      bonds: "Does everything for family and friends",
      flaws: "Bad at predicting danger"
    }
  ]
};

export function onCreateProfile(req, res) {
  res.render("profileCreation");
}

export function onCreateProfilePost(req, res) {
  const id = slug(req.body.name).toLowerCase();
  profileObj.profiles.push({
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

export function onProfileAll(req, res) {
  profileObj.profiles.forEach(profile => {
    profile.level = moment().diff(profile.bday, "years");
    profile.race = "Human";
  });
  res.render("profiles", profileObj);
}

export function onProfile(req, res) {
  const id = req.params.id;
  const profile = profileObj.profiles.find(value => value.id === id);
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
    365 - moment(profile.bday.slice(5)).diff(moment().format("MM-DD"), "days");
  res.render("profile", profile);
}
