const express = require('express');
const router = express.Router();
const {User,Dev} = require('../models');

router.get("/",(req,res)=>{

        res.render("home",{
            logged_in:req.session.logged_in
        })
})

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})
router.get("/dev/:id",(req,res)=>{
    Dev.findByPk(req.params.id,{
        include:[User]
    }).then(dev=>{
        const devHbsData = dev.get({plain:true});
        console.log(dev);
        console.log("==============")
        console.log(devHbsData)
        devHbsData.logged_in=req.session.logged_in
        res.render("dev-details",devHbsData)
    })
})

router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Dev]
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("profile",hbsData)
    })
})

module.exports = router;