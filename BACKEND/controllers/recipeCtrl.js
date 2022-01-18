const Recipes = require('../Models/recipeModel')

// Filter and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const recipeCtrl = {

    //retreive recipes
    getRecipes: async(req, res) =>{
        try {
            const features = new APIfeatures(Recipes.find(), req.query)
            .filtering().sorting().paginating()

            const recipes = await features.query

            res.json({
                status: 'success',
                result: recipes.length,
                recipes: recipes
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    //create recipe
    createRecipe: async(req, res) =>{
        try {
            const {recipe_id, title, ingredients, description, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const recipe = await Recipes.findOne({recipe_id})
            if(recipe)
                return res.status(400).json({msg: "This recipe already exists."})

            const newRecipe = new Recipes({
                recipe_id, title: title.toLowerCase(), ingredients, description, images, category
            })

            await newRecipe.save()
            res.json({msg: "Created a recipe"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //delete recipe
    deleteRecipe: async(req, res) =>{
        try {
            await Recipes.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Recipe"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //update recipe
    updateRecipe: async(req, res) =>{
        try {
            const {title, ingredients, description, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Recipes.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), ingredients, description, images, category
            })
            res.json({msg: "Updated a Recipe"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = recipeCtrl