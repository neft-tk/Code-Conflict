const router = require("express").Router();
const { Move } = require("../../models");

// Creates a move based on the req.body (soon to be form input hopefully)
router.post("/", async (req, res) => {
  try {
    const moveData = await Move.create({...req.body});

    res.status(200).json(moveData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all moves
router.get("/", (req, res) => {
  Move.findAll()
    .then((moves) => {
      res.json(moves);
    })
    .catch((err) => {
      res.status(500).json({ msg: "an error occured.", err });
    });
});

module.exports = router;
