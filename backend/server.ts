
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import {ENV} from './src/utils/env-vars'
import { routes } from './src/routes/_router';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(routes());

(async () => {
    await mongoose.connect(ENV.MONGODB_URI);
    const port = ENV.PORT;
    console.log('mongodb conected');

    app.listen(port, () => {
        
        console.log(`Server running on th http://localhost:${port}`)
    })
})();