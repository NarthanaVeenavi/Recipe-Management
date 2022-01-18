import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import RecipeItem from '../utils/recipeItem/RecipeItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'

function Recipes() {
    const state = useContext(GlobalState)
    const [recipes, setRecipes] = state.recipesAPI.recipes
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.recipesAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)


    const handleCheck = (id) =>{
        recipes.forEach(recipe => {
            if(recipe._id === id) recipe.checked = !recipe.checked
        })
        setRecipes([...recipes])
    }

    const deleteRecipe = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteRecipe = axios.delete(`/api/recipes/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteRecipe
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        recipes.forEach(recipe => {
            recipe.checked = !isCheck
        })
        setRecipes([...recipes])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        recipes.forEach(recipe => {
            if(recipe.checked) deleteRecipe(recipe._id, recipe.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="recipes">
            {
                recipes.map(recipe => {
                    return <RecipeItem key={recipe._id} recipe={recipe}
                    isAdmin={isAdmin} deleteRecipe={deleteRecipe} handleCheck={handleCheck} />
                })
            } 
        </div>

        {recipes.length === 0 && <Loading />}
        </>
    )
}

export default Recipes
