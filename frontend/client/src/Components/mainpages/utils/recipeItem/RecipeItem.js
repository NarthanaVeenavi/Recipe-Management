import React from 'react'
import BtnRender from './BtnRender'

function RecipeItem({recipe, isAdmin, deleteRecipe, handleCheck}) {

    return (
        <div className="recipe_card">
            {
                isAdmin && <input type="checkbox" checked={recipe.checked}
                onChange={() => handleCheck(recipe._id)} />
            }
            <img src={recipe.images.url} alt="" />

            <div className="recipe_box">
                <h2 title={recipe.title}>{recipe.title}</h2>
                <p style={{fontSize: "14px"}}>{recipe.ingredients}</p>
            </div>

            <BtnRender recipe={recipe} deleteRecipe={deleteRecipe} />
        </div>
    )
}

export default RecipeItem
