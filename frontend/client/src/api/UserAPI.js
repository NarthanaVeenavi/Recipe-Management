import {useState, useEffect} from 'react'
import axios from 'axios'

//API for user
function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    

    // const addCart = async (recipe) => {
    //     if(!isLogged) return alert("Please login to continue buying")

    //     const check = cart.every(item =>{
    //         return item._id !== recipe._id
    //     })

    //     if(check){
    //         setCart([...cart, {...recipe, quantity: 1}])

    //         await axios.patch('/user/addcart', {cart: [...cart, {...recipe, quantity: 1}]}, {
    //             headers: {Authorization: token}
    //         })

    //     }else{
    //         alert("This recipe has been added to cart.")
    //     }
    // }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        // cart: [cart, setCart],
        // addCart: addCart,
        // history: [history, setHistory]
    }
}

export default UserAPI
 