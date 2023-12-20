import styles from './login.module.css'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Login({ loginContexts }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {
        loginState,
        handleLogin,
        isLogging,
        error,
        errorMessage,
        clearError
    } = loginContexts

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make API request to Django backend
            const hasLoggedIn = await handleLogin(formData)
            console.log("Is login successful: ", hasLoggedIn)
            if (!hasLoggedIn) {
                setFormData({
                    email: '',
                    password: '',
                });
                clearError()
            } else {
                console.log("Login successful")
                router.push('/')
            }
        } catch (err) {
            console.log('Error during registration:', err);
            setFormData({
                email: '',
                password: '',
            });
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