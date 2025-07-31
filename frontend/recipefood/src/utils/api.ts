import axios from 'axios';
import { IAuthToken, IRecipe,Rating,Comment } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json'
    }
    
});

export async function loginUser(username: string, password: string) {
    const res = await api.post<IAuthToken>('/auth/login', { username, password });
    return res.data;
}

export async function registerUser(data:{username: string, email: string, password: string}) {
    const res = await api.post('/auth/register',data );
    return res.data;
}

export async function createRecipe(
    title: string,
    ingredients: string[],
    instructions: string,
    
    categories: string[],
    preparationTime: number,
    cookingTime: number,
    servings: number,
    ratings: Rating [],
    comments: Comment[],
    createdAt: Date,
    updatedAt: Date,
    image?: string
) {
const recipeData={
    title,
    ingredients,
        instructions,
        image,
        categories,
        preparationTime,
        cookingTime,
        servings,
        ratings,
        comments,
        createdAt:createdAt.toISOString(),
        updatedAt:updatedAt.toISOString(),

};  
    const res = await api.post<IRecipe>('/recipes', recipeData);
    return res.data;
}