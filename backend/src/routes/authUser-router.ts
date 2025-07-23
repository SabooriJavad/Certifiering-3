import { Router, Request,Response } from 'express';
import { UserModel } from '../models/user-model';
import { ENV } from '../utils/env-vars';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).send('Invalid username');
        }
        
        const passwordCorrect = await bcrypt.compare(password, user.password as string);
        if (!passwordCorrect) {
            return res.status(400).send({ message: 'Invalid username' });
        
        }
        const payload = {
            username,
            userId:user._id
        }
        const token = jwt.sign(payload, ENV.JWT_SECRET,{expiresIn:'10m'});
        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge:10 *60 * 1000
        });
        return res.status(200).send({ message: 'Login successful',token });
    } catch (err) {
        return res.status(404).send('Somethin went wrong');
       }

});


authRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password, email } = req.body;


    try {

      
        const user = await UserModel.findOne({ username });
        
        if (user) {
            return res.status(400).send({ message: 'Username already exists' });
        }
        
          const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({message:'Email is already in use,please shoose another one'})
        }
        else {

            const hashedPassword = await bcrypt.hash(password, 14);

            await UserModel.create({ username, password: hashedPassword,email });

            return res.status(201).send('User created successfully');
        }
    } catch (err) {
        console.error('Error registering user', err);
        return res.status(500).send({message:'Something went wrong! Please try again later'});
    }
});