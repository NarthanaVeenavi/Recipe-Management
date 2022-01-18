import React from 'react'
import image1 from '../../images/welcome.jpg'
import './welcome.css'


function welcome() {

    return (
        <div>

            <div>
                <span>
                    
                    <p id="para1">WELCOME TO </p><br></br>

                </span>
                
            </div>

            <div class="patterns">
                <svg width="100%" height="100%">
                    <defs>

                        <pattern id="polka-dots" x="0" y="0"                    
                            width="100" height="100"
                            patternUnits="userSpaceOnUse">
                            
                            <circle fill="#be9ddf" cx="25" cy="25" r="3"></circle>
                
                        </pattern>  
        
                    </defs>
                   
                    <text x="50%" y="60%" >
                        FOODIES QUEEN
                    </text>
                </svg>
            </div>
            <div>
                <span id = "para2">
                    We can do it...
                </span>
            </div>
 
            {/* image */}
            <div>
                <img src={image1} alt="welcome_image" id="image1"/>
            </div>  

            
        </div>
    )
}

export default welcome