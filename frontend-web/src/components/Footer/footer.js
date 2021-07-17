import Link from 'next/link'
import React from 'react'
import styles from './Footer.module.scss'
import iconfacebook from '../../assets/home/iconfacebook.svg'
import icontwitter from '../../assets/home/icontwitter.svg'
import iconinstagram from '../../assets/home/iconinstagram.svg'
import iconyoutube from '../../assets/home/iconyoutube.svg'
import Image from 'next/image'
export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.quickLink}>
                    <h3>Truy cập nhanh</h3>
                    <ul>
                        <li>
                            <Link href="/">Về chúng tôi</Link>
                        </li>
                        <li>
                            <Link href="/">Trợ giúp</Link>
                        </li>
                        <li>
                            <Link href="/">Tài khoản của tôi</Link>
                        </li>
                        <li>
                            <Link href="/">Tạo tài khoản mới</Link>
                        </li>
                        <li>
                            <Link href="/">Thông tin liên hệ</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.quickLink}>
                    <h3>Thể loại phổ biến</h3>
                    <ul>
                        <li>
                            <Link href="/">Đồ ăn</Link>
                        </li>
                        <li>
                            <Link href="/">Du lịch</Link>
                        </li>
                        <li>
                            <Link href="/">Thời trang</Link>
                        </li>
                        <li>
                            <Link href="/">Công nghệ</Link>
                        </li>
                        <li>
                            <Link href="/">Đồ gia dụng</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.quickLink}>
                    <h3>Liên lạc</h3>
                    <ul>
                        <li>
                            <Link href="/">567 Los Angeles - US</Link>
                        </li>
                        <li>
                            <Link href="/">+61 23 8093 3400</Link>
                        </li>
                        <li>
                            <Link href="/">info@gmail.com</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.keepTouch}>
                    <h3>Thông tin chi tiết</h3>
                    <ul>
                        <li>
                            <div className={styles.inputEmail}>
                                <input type="text" placeholder="Email của bạn" />
                                <input type="submit" placeholder="Submit" className={styles.submit} />
                            </div>
                        </li>

                    </ul>
                    <h3>Theo dõi chúng tôi</h3>
                    <Image
                        src={iconfacebook}
                        alt="facebook"
                        quality={100}
                    />
                    <Image
                        src={icontwitter}
                        alt="twitter"
                        quality={100}
                    />
                    <Image
                        src={iconinstagram}
                        alt="instagram"
                        quality={100}
                    />
                    <Image
                        src={iconyoutube}
                        alt="youtube"
                        quality={100}
                    />
                </div>
            </div>
        </div >
    )
}