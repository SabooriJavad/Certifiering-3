import { expressjwt, Request } from 'express-jwt';
import { ENV } from './env-vars';


export const jwtMiddleware = () => expressjwt({
    secret: ENV.JWT_SECRET,
    algorithms: ['HS256']
    
});


export const getUserId = (req: Request) => {
    const { userId } = req.auth as { userId: string };
    return userId;
}