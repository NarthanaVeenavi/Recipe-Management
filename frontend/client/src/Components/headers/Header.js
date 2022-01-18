import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_recipe">Create Recipe</Link></li>
                <li><Link to="/category">Categories</Link></li>
                
                <li><Link to="/summary">Recipe Summary</Link></li>
                <button style={{ background: "#28c1e4"}} id="logout"><li><Link to="/" onClick={() => window.location.reload(false)} >REFRESH</Link></li></button>&nbsp;&nbsp;
               
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <button id="logout"><li><Link to="/" onClick={logoutUser} >Logout</Link></li></button>
            </>
        )
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                <a href={isLogged ? "/recipe" : "/"}>{isAdmin ? <h6><span>FOODIES QUEEN</span></h6> : <h6><span>FOODIES QUEEN</span></h6> }</a>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/recipe">{isAdmin ? 'Recipes' : ''}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login | Register</Link></li>
                }

               

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>

        </header>
    )
}

export default Header
