const router = require("express").Router();
const { User, Dev, Move } = require("../../models");

// Once both sides of the battle have determined their dev.
// This route will be hit with objects containing both.
router.post("/start", async (req, res) => {
    try {
        // Puts both fighters in the session data for retrieval in battle.js
        req.session.userDev = req.body.userDev;
        req.session.compDev = req.body.compDev;
        console.log(req.session)
        res.status(200).json(req.body);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;