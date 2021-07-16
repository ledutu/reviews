import Link from 'next/link'
import React from 'react'
import styles from './Header.module.scss'
export default function Header(){
    return (
        <div className={styles.container}>
            <div className={styles.information}>
                <div className={styles.infoContent}>
                    <Link href="/">Logo</Link>
                </div>
            </div>
            <div className={styles.nav}>
                <div className={styles.navContent}>
                   <Link href="/">Công nghệ</Link>
                   <Link href="/">Công nghệ</Link>
                   <Link href="/">Công nghệ</Link>
                   <Link href="/">Công nghệ</Link>
                   <Link href="/">Công nghệ</Link>
                   <Link href="/">Công nghệ</Link>
                   <Link href="/">Công nghệ</Link>
                </div>
            </div>
        </div>
    )
}