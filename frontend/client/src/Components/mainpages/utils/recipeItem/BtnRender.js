import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({recipe, deleteRecipe}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_dlt" to="#!" 
                    onClick={() =>deleteRecipe(recipe._id, recipe.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_recipe/${recipe._id}`}>
                        Edit
                    </Link>&nbsp;
                    <Link id="btn_view1" to={`/detail/${recipe._id}`}>
                        View
                    </Link>
                </>
                : <>
                </>
            }
                
        </div>
    )
}

export default BtnRender
