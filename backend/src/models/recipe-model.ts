import mongoose from 'mongoose';



interface Rating{
    userId: string,
    rating: number, 
    createdAt:Date
}

interface Comment{
    userId: string,
    comment: string,
    createdAt:Date
}

export interface IRecipe extends mongoose.Document{
    title: string,
    ingredients: string[],
    instructions: string,
    image?: string,
    categories: string[],
    preparationTime: number,
    cookingTime: number,
    servings: number,
    ratings:Rating [],
    comments: Comment[]
    createdAt: Date,
    updatedAt:Date
}
const ratingSchema = new mongoose.Schema<Rating>({
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
    
});

const commentSchema = new mongoose.Schema<Comment>({
    userId: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
    
    
});
 
const recipeSchema = new mongoose.Schema<IRecipe>({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    image: { type:String },
    categories: { type: [String], required: true },
    preparationTime: { type: Number, required: true },
    cookingTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    ratings: {type:[ratingSchema],default:[]},
    comments:{type:[commentSchema], default:[]}
},
    {timestamps:true});


export const RecipeModel = mongoose.model<IRecipe>('Recipes', recipeSchema);