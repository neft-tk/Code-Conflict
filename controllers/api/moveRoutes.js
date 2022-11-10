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

module.exports = router;
