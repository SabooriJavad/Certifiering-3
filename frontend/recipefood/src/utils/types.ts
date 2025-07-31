
export const API_TOKEN_KEY = 'RECIPE_API_TOKEN'


export interface IAuthToken{
    token: string,
    user:IUser
}

export interface IUser{
    _id: string,
    username: string,
    email: string,
    password:string
}

export interface Rating{
    userId: string,
    rating: number, 
    createdAt:Date
}

export interface Comment{
    userId: string,
    comment: string,
    createdAt:Date
}

export interface IRecipe{
    _id:string,
    title: string,
    ingredients: string[],
    instructions: string,
    image?: string,
    categories: string[],
    preparationTime: number,
    cookingTime: number,
    servings: number,
    ratings: Rating [],
    comments: Comment[]
    createdAt: Date,
    updatedAt:Date
}