"use client"

import styles from './page.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { tokenVerify } from '@/utilities/api'
import { LoginProvider } from '@/contexts/loginContext'
import { useLoginContext } from '@/contexts/loginContext'



export default function Home() {

  const { isLoggedIn, setIsLoggedIn } = useLoginContext()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAccessToken = localStorage.getItem('drfAccessToken')
      const storedRefreshToken = localStorage.getItem('drfRefreshToken')
    }
  }, []);


  return (
    <LoginProvider>
      <main className={styles.main}>
        <div className={styles.header}>Welcome to NextDRF</div>
        <div className={styles.buttonContainer}>
          {
            !isLoggedIn && <>
              <Link href='/login'>
                <button className={styles.button}>Login</button>
              </Link>
              <Link href='/signup'>
                <button className={styles.button}>Sign Up</button>
              </Link>
              <button className={styles.button} onClick={tokenVerify}>Verify</button> </>
          }
          {
            isLoggedIn && <>
              <button className={styles.button}>Categories</button>
              <button className={styles.button}>Products</button>
            </>
          }
        </div>
      </main>
    </LoginProvider>
  )
}
