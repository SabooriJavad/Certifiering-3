import { loginUser } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from '@/Recipe.module.css';

export default function LoginUser() {
    
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data:any) => {
        const { username, password } = data;
        try {
            const res = await loginUser(username, password);
            localStorage.setItem('token', res.token);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/';
       
        } catch (err) {
            alert('Login failed');
                router.push('/');
             
        }
    }
    return (

        <div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <p>
                    <label>
                        <input {...register('username')} placeholder="Username"/>
                    </label>
                </p>
                <p>
                    <label>
                        <input {...register('password')} type="password" placeholder="Password"/>
                    </label>
                </p>
                <p>
                    <button type="submit">Login</button>
                </p>
               <button type='submit'> <Link href={'/register'}>Register</Link></button>
            </form>
        </div>
    )
    
};