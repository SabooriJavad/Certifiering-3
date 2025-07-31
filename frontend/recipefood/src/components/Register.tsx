import { registerUser } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from '@/Recipe.module.css';

export default function RegisterUser() {
    const { register, handleSubmit,reset } = useForm();
    const router = useRouter();
    
    type RegisterFormData = {
        username: string,
        email: string,
        password: string
    };

    const onSubmit = async (data: any) => {
        try {
            await registerUser({
                username: data.username,
                email: data.email,
                password: data.password
            });
            alert('Registration successful');
            reset();
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <p>
                    <label>
                        <input type='text' {...register('username')} placeholder='Username'/>
                    </label>
                </p>
                <p>
                    <label>
                        <input type='text' {...register('email')} placeholder='Email' />
                    </label>
                </p>

                <p>
                    <label>
                        <input type='password' {...register('password')} placeholder='Password'/>
                    </label>
                </p>
                <p>
                    <button type='submit'>Register</button>
                    </p>
                 <button type='submit'> <Link href={'/login'}>login</Link></button>
            </form>
        </div>
    )
}