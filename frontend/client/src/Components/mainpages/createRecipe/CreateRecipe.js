import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    recipe_id: '',
    title: '',
    ingredients: '',
    description: '',
    category: '',
    _id: ''
}

function CreateRecipe() {
    const state = useContext(GlobalState)
    const [recipe, setRecipe] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [recipes] = state.recipesAPI.recipes
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.recipesAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            recipes.forEach(recipe => {
                if(recipe._id === param.id) {
                    setRecipe(recipe)
                    setImages(recipe.images)
                }
            })
        }else{
            setOnEdit(false)
            setRecipe(initialState)
            setImages(false)
        }
    }, [param.id, recipes])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setRecipe({...recipe, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/recipes/${recipe._id}`, {...recipe, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/recipes', {...recipe, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/recipe")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_recipe">
            <div id="topic">
            <h1 style={{marginTop: "2cm"}}>Enter Recipe Details</h1>
            </div>
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit} id="createrecipeform">

                {/* recipe ID */}
                <div className="row">
                    <label htmlFor="recipe_id">Recipe ID</label>
                    <input type="text" name="recipe_id" id="recipe_id" required
                    value={recipe.recipe_id} onChange={handleChangeInput} disabled={onEdit} placeholder="Recipe ID"/>
                </div>

                {/* Food Name */}
                <div className="row">
                    <label htmlFor="title">Food Name</label>
                    <input type="text" name="title" id="title" required
                    value={recipe.title} onChange={handleChangeInput} placeholder="Food Name"/>
                </div>

                {/* Ingredients */}
                <div className="row">
                    <label htmlFor="description">Ingredients</label>
                    <textarea type="text" name="ingredients" id="description" required
                    value={recipe.ingredients} rows="5" onChange={handleChangeInput} style={{borderColor: "rgb(212, 212, 219)"}} />
                </div>

                {/* Description */}
                <div className="row">
                    <label htmlFor="content">Description</label>
                    <textarea type="text" name="description" id="content" required
                    value={recipe.description} rows="7" onChange={handleChangeInput}  style={{borderColor: "rgb(212, 212, 219)"}} />
                </div>

                {/* Category */}
                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={recipe.category} onChange={handleChangeInput} id="categorydwn">
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Button for reset */}
                <button type="reset" id="btnreset">RESET</button>

                {/* Button for Create an Edit */}
                <button type="submit" id="btncreate">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateRecipe
