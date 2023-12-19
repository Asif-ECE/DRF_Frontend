import styles from './login.module.css'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { userLogin } from '@/utilities/api';
import { useLoginContext } from '@/contexts/loginContext';


export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { isLoggedIn, setIsLoggedIn } = useLoginContext()

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make API request to Django backend
            const response = await userLogin(formData);
            console.log('User login successfully:', response);

            localStorage.setItem('drfAccessToken', response.access)
            localStorage.setItem('drfRefreshToken', response.refresh)

            router.push('/')

            // Clear form after successful registration
            setFormData({
                email: '',
                password: '',
            });
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.response.status) {
                setFormData({
                    email: '',
                    password: '',
                });
            }
        }
    };

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Email:
                    <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <br />
                <label className={styles.label}>
                    Password:
                    <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <br />
                <button className={styles.button} type="submit">Login</button>
                <Link href='/'>
                    <button className={styles.button}>Back to Home</button>
                </Link>
            </form>
        </main>
    )
}