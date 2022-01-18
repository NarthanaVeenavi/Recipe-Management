import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

//single view of a recipe
function DetailRecipe() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [recipes] = state.recipesAPI.recipes
    const [detailRecipe, setDetailRecipe] = useState([])

    useEffect(() =>{
        if(params.id){

            recipes.forEach(recipe => {
                if(recipe._id === params.id) setDetailRecipe(recipe)
            })
        }
    },[params.id, recipes])

    if(detailRecipe.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailRecipe.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailRecipe.title}</h2>
                    </div>
                    <br />
                    <h5>Ingredients</h5>
                    <p>{detailRecipe.ingredients}</p>

                    <h5>Description</h5>
                    <p>{detailRecipe.description}</p>

                </div>
            </div>
        </>
    )
}

export default DetailRecipe
