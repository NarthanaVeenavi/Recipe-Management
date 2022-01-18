import React, {useContext} from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import homeimg1 from '../../../images/homeimg2.jpg'

export default function Index() {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged

    return (
        <>
        { !isLogged ?
        <>

            <section>
                <div>
                  
                </div>
            </section>

            <section id="hero">

                <div id="left">

                    <div id="main_title">
                        Welcome to FOODIES QUEEN
                    </div>

                    <div id="sub_title">
                    We can do it...
                    </div>

                    <Link to="/login">                       
                        <button id="login_btn">
                            LOGIN NOW
                        </button>
                    </Link>

                </div>

                <div id="right">
                    <img src={homeimg1} alt="" id="hotel_img" />
                </div>

            </section>

            <section id="footer">
               <div id="f_items">
                    <h1 id="footer_title">FOODIES QUEEN</h1>
                    <div id="buttons">

                        <Link to="/recipe">
                            <button id="l_btn">RECIPES</button>
                        </Link>

                        <Link to="/login">
                            <button id="r_btn">LOGIN | REGISTER</button>
                        </Link>

                    </div>

                    <div id="date">
                        {new Date().getFullYear()} &#xa9; FOODIES QUEEN 
                    </div>
                    
               </div>

            </section>
        </>:<>
       
        </>
    }
    </>
    )
}