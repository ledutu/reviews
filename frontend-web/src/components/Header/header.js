import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/home/logo.png'
import home from '../../assets/home/home.svg'
import clock from '../../assets/home/clock.svg'
import search from '../../assets/home/search.svg'
import login from '../../assets/home/login.svg'
import iconlistall from '../../assets/home/iconlistall.png'
var today = new Date(); // Sun Dec 22 2019 13:18:01 GMT+0530 (India Standard Time)
var date =  today.getDate()+ '-' + (today.getMonth() + 1) + '-'+ today.getFullYear() ;
export default function Header(){
    return (
        <div className={styles.container}>
            <div className={styles.information}>
                <div className={styles.infoContent}>
                    <Link href="/">
                        <Image 
                            src={logo} 
                            alt="logo"  
                            width={232}
                            height={64.65}
                            quality={100}
                        />
                    </Link>
                    <div>
                        |
                    </div>
                    <div className={styles.date}>
                        {date}
                    </div>    
                    <div className={styles.news}>
                        <Image 
                            src={clock} 
                            alt="clock"  
                            quality={100}
                        />
                        <div className={styles.text}>
                            <Link href="/">Mới nhất</Link>
                        </div>
                    </div>
                    <div className={styles.search}>
                        <input  type="text" placeholder="Tìm kiếm"/>
                        <Image 
                                src={search}
                                alt="search"  
                                quality={100}
                        />
                    </div>
                    <div className={styles.login}>
                        <Image 
                                    src={login}
                                    alt="login"  
                                    quality={100}
                        />
                        <div>
                            <Link href="/" >
                                <a>Đăng nhập</a>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className={styles.nav}>
                <div className={styles.navContent}>
                   <Link href="/"><Image src={home} alt="home" quality={100} /></Link>
                   <Link href="/"><a>Công nghệ</a></Link>
                   <Link href="/"><a>Thời trang</a></Link>
                   <Link href="/"><a>Du lịch</a></Link>
                   <Link href="/"><a>Đồ ăn</a></Link>
                   <Link href="/"><a>Đồ gia dụng</a></Link>
                   <Link href="/"><a>Nhà hàng</a></Link>
                   <div className={styles.listAll}>
                        <Link href="/"><a>Tất cả</a></Link>
                        <Link href="/"> 
                                <Image 
                                    src={iconlistall}
                                    alt="login"  
                                    width={35}
                                    height={26.6}
                                    quality={100}
                                />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}