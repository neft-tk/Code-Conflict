const router = require("express").Router();
const { User, Dev } = require("../../models");

//Show all devs in json form
router.get("/", (req, res) => {
  Dev.findAll()
    .then((devs) => {
      res.json(devs);
    })
    .catch((err) => {
      res.status(500).json({ msg: "an error occured.", err });
    });
});

// Creates a dev based on the req.body (soon to be form input hopefully)
router.post("/", async (req, res) => {
  try {
    const devData = await Dev.create({
      ...req.body,
      UserId: req.session.user_id,
    });

    res.status(200).json(devData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete route for dev
router.delete("/:id", async (req, res) => {
  if (!req.session.logged_in) {
    return res.status(401).json({ msg: "login first bruh!" });
  }
  try {
    const devData = await Dev.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!devData) {
      res.status(404).json({ message: "No dev found with this id!" });
      return;
    }

    res.status(200).json(devData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
