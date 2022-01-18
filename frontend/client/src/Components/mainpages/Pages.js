import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Recipes from './recipes/Recipes'
import DetailRecipe from './detailRecipe/DetailRecipe'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateRecipe from './createRecipe/CreateRecipe'
import Summary from './recipeSummary/Summary'
import {GlobalState} from '../../GlobalState'
import Home from '../mainpages/home/home1'
import welcome from '../welcomepage/welcome'

function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Switch>

            <Route path="/" exact component={Home} />

            <Route path="/welcome" exact component={welcome} />

            <Route path="/recipe" exact component={Recipes} />
            <Route path="/detail/:id" exact component={DetailRecipe} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_recipe" exact component={isAdmin ? CreateRecipe : NotFound} />
            <Route path="/edit_recipe/:id" exact component={isAdmin ? CreateRecipe : NotFound} />

            <Route path="/summary" exact component={isAdmin ? Summary : NotFound} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
