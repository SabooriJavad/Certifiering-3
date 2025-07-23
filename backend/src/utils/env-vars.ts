import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
     PORT:process.env.PORT || 8000,
    MONGODB_URI: process.env.MONGODB_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string
    
}