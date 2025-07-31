'use client'

import Link from 'next/link';
import styles from './Header.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';

export default function Header() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);
    const onClickLogout = () => {
       
            localStorage.removeItem('token');
            localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        router.push('/login');
      
    }

    return (
        <header className={styles.header}>
            <nav>
            
            
                {!isLoggedIn && (
                    <>
                        
                          <Link href={'/'}>Hom</Link>
                          <Link href={'/login'}>Login</Link>
            
                       
                    </>
              )}
                {isLoggedIn && (
                    <>
                    
                        <Link href={'/recipe'}>Recipe</Link>
                        <Link href={''}>about</Link>
                        <button type='submit' onClick={onClickLogout}>Logout</button>
                    </>
               )}
           
                </nav>
        </header>
    )
}