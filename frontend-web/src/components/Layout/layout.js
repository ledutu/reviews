import React, { useEffect, useState } from 'react'
import Router from 'next/router';
import styles from './Layout.module.scss'
import { Spin, Space, Progress } from 'antd';
import { Layout as LayoutCustom, Menu, Breadcrumb } from 'antd';
import { Header } from '../Header';
import { Footer } from '../Footer';

const { Content } = LayoutCustom;

export function Layout({ children }) {
    return (
        <LayoutCustom className={styles.container}>
            <Header />
            <Content style={{ padding: '0 50px' }}>
                {children}
            </Content>
            <Footer />
        </LayoutCustom>
    )
}