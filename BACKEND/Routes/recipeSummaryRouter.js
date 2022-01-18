
const router = require("express").Router();
const recipeSummary = require("../Models/recipeModel");

//View all recipe summaries
router.get('/', async(req,res)=>{
    try{
        const allDetails = await recipeSummary.find();
        res.status(200).send({data : allDetails});
    }catch(err){
        res.status(500).send({data : err});
    }
})

module.exports = router;
