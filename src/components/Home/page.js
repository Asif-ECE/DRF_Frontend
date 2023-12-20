"use client"

import styles from './page.module.css'
import Link from 'next/link'
import { useContext } from 'react'
import { LoginContext } from '@/contexts/loginContext'


export default function Home() {
  const { loginState, isTokenValid, handleTokenRefresh, handleLogout } = useContext(LoginContext);
  console.log("User login status: ", loginState)

  return (
    <main className={styles.main}>
      <div className={styles.header}>Welcome to NextDRF</div>
      <div className={styles.buttonContainer}>
        {
          !loginState &&
          <>
            <Link href='/login'>
              <button className={styles.button}>Login</button>
            </Link>
            <Link href='/signup'>
              <button className={styles.button}>Sign Up</button>
            </Link>
            <button className={styles.button} onClick={isTokenValid}>Verify</button>
            <button className={styles.button} onClick={handleTokenRefresh}>Refresh</button>
          </>
        }
        {
          loginState && <>
            <button className={styles.button}>Categories</button>
            <button className={styles.button}>Products</button>
            <button className={styles.button} onClick={handleLogout}>Logout</button>
          </>
        }
      </div>
    </main>
  )
}
