import { Router, Request, Response } from 'express';
import { RecipeModel } from '../models/recipe-model';
import { getUserId, jwtMiddleware } from '../utils/auth';

export const recipeRouter = Router();



recipeRouter.post('/', jwtMiddleware(), async (req: Request, res: Response) => {
    try {
        const userId = getUserId(req);
        const { title, ingredients, instructions, image, categories, preparationTime, cookingTime, servings } = req.body;

        const newRecipe = new RecipeModel({
            title,
            ingredients,
            instructions,
            image,
            categories,
            preparationTime,
            cookingTime,
            servings,
            ratings: [],
            comments: []
        });
        await newRecipe.save();
        return res.status(201).send({ message: 'Recipe created successfully', recipe: newRecipe });
    } catch (err) {
        return res.status(500).send({ message: 'Error creating recipe', error: err });
    }
    
})
recipeRouter.get('/', jwtMiddleware(),async (req: Request, res: Response) => {
   try{ const recipe = await RecipeModel.find().sort({ postedAt: -1 });
       res.json(recipe);
       
   } catch (err) {
       return res.status(500).send({ message: 'Error fetching recipes', error: err });
       
   }

});

recipeRouter.get('/search',jwtMiddleware(), async (req: Request, res: Response) => {
    const { query } = req.query;
    try {
        const recipes = await RecipeModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { ingredients: { $regex:query, $options: 'i' } }
            ]
        });
        res.status(200).json(recipes);
    } catch (err) {
        return res.status(500).send({ message: 'Error searching rexpices', error: err });
    }
});

recipeRouter.get('/:id',jwtMiddleware(), async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const recipe = await RecipeModel.findById(id);
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found' });
        } else {
            return res.status(200).send(recipe);
        }
    } catch (err) {
        return res.status(500).send({ message: 'Error fetching recipes', error: err });

    }
});


recipeRouter.post('/:id/rating',jwtMiddleware(), async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, rating } = req.body;


    if (rating < 1 || rating > 10) {
        return res.status(400).send({ message: 'Rating must be between 1 and 10' })
    }

    try {

        const recipe = await RecipeModel.findById(id);
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found' });
        }
        
        else {
            recipe.ratings.push({ userId, rating,createdAt:new Date() });
            await recipe.save();
            return res.status(200).send({ message: 'Rating added successfully' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Error rating recipe', error: err });
    }
});

recipeRouter.post('/:id/comment',jwtMiddleware(), async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, comment } = req.body;

    
    try {
        const recipe = await RecipeModel.findById(id);
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found' });

        }
        else {
            recipe.comments.push({ userId, comment,createdAt: new Date() });
            await recipe.save();
            return res.status(200).send({ message: 'Comment added successfully' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Error adding comment', error: err });
    }
});
