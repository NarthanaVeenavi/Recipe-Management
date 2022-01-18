const mongoose = require('mongoose')

//recipe schema
const recipeSchema = new mongoose.Schema({
    recipe_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    ingredients:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Recipe", recipeSchema)