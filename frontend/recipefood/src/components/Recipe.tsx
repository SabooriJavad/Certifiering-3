import { IRecipe } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";



export default function Recipe() {
    const [recipe, setRecipe] = useState<IRecipe[]>([]);

    const fetchRecipe = async () => {
        const res = await axios.get('/api/recipes');
        setRecipe(res.data);
    };

    useEffect(() => {
        fetchRecipe();
    }, []);


    return (
        <div>
        <h1>Recipe List</h1>
        
              <ul>
                {recipe.map((recipe) => (
                    <li key={recipe._id}>
                        <h2>{recipe.title}</h2>
                        <p>{ recipe.ingredients.join(',')}</p>
                        
                     </li>
                 ))}
            </ul>
            </div>
       )

    };