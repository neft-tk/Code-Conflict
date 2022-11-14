const router = require("express").Router();
const { User, Dev, Move } = require("../../models");

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

// Get one dev
router.get("/:id", (req, res) => {
  Dev.findByPk(req.params.id, {
    include: [Move]
  })
  .then((dev) => {
    res.json(dev);
  })
  .catch((err) => {
    res.status(500).json({ msg: "an error occured.", err });
  });
})

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

// Update route, once exp gets calculated after a battle, if the Dev levels up then the new stats should get saved in the database.
router.put('/:id', (req, res) => {
  Dev.update(
    {
      level: req.body.level,
      current_exp: req.body.current_exp,
      attack: req.body.attack,
      speed: req.body.speed,
      hp: req.body.hp,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedDev) => {
      res.json(updatedDev);
    })
    .catch((err) => res.json(err));
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
