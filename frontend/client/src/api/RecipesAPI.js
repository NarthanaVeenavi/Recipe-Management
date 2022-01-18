import {useState, useEffect} from 'react'
import axios from 'axios'

//API for recipe
function RecipesAPI() {
    const [recipes, setRecipes] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getRecipes = async () => {
            const res = await axios.get(`/api/recipes?limit=${page*9}&${category}&title[regex]=${search}`)
            setRecipes(res.data.recipes)
            setResult(res.data.result)
        }
        getRecipes()
    },[callback, category, search, page])
    
    return {
        recipes: [recipes, setRecipes],
        callback: [callback, setCallback],
        category: [category, setCategory],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default RecipesAPI
