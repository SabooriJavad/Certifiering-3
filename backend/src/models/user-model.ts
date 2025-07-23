import mongoose from 'mongoose';


export  interface IUser extends mongoose.Document{
    username: string,
    email: string,
    password:string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true,
    },
    username: { type: String, required: true, unique: true },
    password:{type:String, required:true}
});
export const UserModel = mongoose.model<IUser>('User', userSchema);