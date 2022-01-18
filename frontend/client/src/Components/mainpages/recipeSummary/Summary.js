import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './summary.css';

function Summary() {
    const [allRecipeSummery, setallRecipeSummery] = useState([]);

        //This useEffect function used to get all data
        useEffect(() => {
            async function getDetails() {
                try {
                    const result = await (await axios.get("http://localhost:5000/recipeSummary")).data.data
                    console.log(result)
                    setallRecipeSummery(result);
                } catch (err) {
                    console.log(err.message)
                }
            }
           
            getDetails();
        },[])

    return (
        
        //table
        <div className="content" style={{marginTop:"1cm"}}>
        <div id="viewtable">
            <h2  style={{'textAlign':'center'}}>
                RECIPE DETAILS

            </h2>
            <table id = "table1"  style={{marginTop:"3%"}}>
                <thead>
                    <tr>
                        <th style={{'textAlign':'center'}}>Recipe Id</th>
                        <th style={{'textAlign':'center'}}>Recipe Name</th>
                        <th style={{'textAlign':'center'}}>Ingredients</th>
                        <th style={{'textAlign':'center'}}>Description</th>

                    </tr>
                </thead>
                <tbody>
                    {allRecipeSummery.map((recipe)=>{
                        return <tr>
                        <td>{recipe.recipe_id}</td>
                        <td>{recipe.title}</td>
                        <td>{recipe.ingredients}</td>
                        <td>{recipe.description}</td>

                        </tr>
                    })}
                    
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Summary