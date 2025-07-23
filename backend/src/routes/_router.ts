import { Router,Request,Response, NextFunction } from 'express';
import { authRouter } from './authUser-router';
import { recipeRouter } from './recipe-router';


export const routes = () => {
    const router = Router();
    router.use((req: Request, res: Response,next:NextFunction) => {
        console.log('Routes hit:', req.method, req.originalUrl);
        next();
    })
    router.use('/auth', authRouter);
    router.use('/recipes', recipeRouter);

    return router;
}