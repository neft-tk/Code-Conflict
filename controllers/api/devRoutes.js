const router = require('express').Router();
const { User, Dev } = require('../../models');

//Show all devs in json form
router.get("/", (req, res) => {
    Dev.findAll()
    .then(devs => {
        res.json(devs)
    })
    .catch(err => {
        res.status(500).json({msg:"an error occured.", err});
    })
})

// Creates a dev based on the req.body (soon to be form input hopefully)
router.post("/", async (req, res)=> {
    try {
        const devData = await Dev.create(req.body);

        res.status(200).json(devData);

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;