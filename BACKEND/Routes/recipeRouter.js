const router = require('express').Router()
const recipeCtrl = require('../controllers/recipeCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

//routes for recipes
router.route('/recipes')
    .get(recipeCtrl.getRecipes)
    .post(auth, authAdmin, recipeCtrl.createRecipe)


router.route('/recipes/:id')
    .delete(auth, authAdmin, recipeCtrl.deleteRecipe)
    .put(auth, authAdmin, recipeCtrl.updateRecipe)



module.exports = router