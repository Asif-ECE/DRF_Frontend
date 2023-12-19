import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './signup.module.css'
import axios from 'axios'
import Link from 'next/link'

export default function SignupForm() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
    });

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.repeatPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            // Make API request to Django backend
            const response = await axios.post('http://localhost:8000/api/signup/', formData);
            console.log('User registered successfully:', response.data);

            router.push('/')

            // Clear form after successful registration
            setFormData({
                email: '',
                username: '',
                password: '',
                repeatPassword: '',
            });
        } catch (error) {
            console.error('Error during registration:', error);
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
                    Username:
                    <input className={styles.input} type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label>
                <br />
                <label className={styles.label}>
                    Password:
                    <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <br />
                <label className={styles.label}>
                    Repeat Password:
                    <input className={styles.input} type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required />
                </label>
                <br />
                <button className={styles.button} type="submit">Sign Up</button>
                <Link href='/'>
                    <button className={styles.button}>Back to Home</button>
                </Link>
            </form>
        </main>
    )
}