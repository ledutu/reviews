import React from 'react'
import Footer from '../Footer/footer'
import Header from '../Header/header'
import styles from './Layout.module.scss'
export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}