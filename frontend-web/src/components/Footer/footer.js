import Link from 'next/link'
import React from 'react'
import styles from './Footer.module.scss'
import iconfacebook from '../../assets/images/home/iconfacebook.png'
import icontwitter from '../../assets/images/home/icontwitter.png'
import iconinstagram from '../../assets/images/home/iconinstagram.png'
import iconyoutube from '../../assets/images/home/iconyoutube.png'
import Image from 'next/image'
export function Footer() {
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
                            <Link href="/">567 Nguyễn Thị Minh Khai</Link>
                        </li>
                        <li>
                            <Link href="/">+84123456789</Link>
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
                    <div className={styles.socialContacts}>
                        <Image
                            src={iconfacebook}
                            alt="facebook"
                            width={40}
                            height={40}
                            quality={100}
                        />
                        <Image
                            src={icontwitter}
                            alt="twitter"
                            width={40}
                            height={40}
                            quality={100}
                        />
                        <Image
                            src={iconinstagram}
                            alt="instagram"
                            width={40}
                            height={40}
                            quality={100}
                        />
                        <Image
                            src={iconyoutube}
                            alt="youtube"
                            width={40}
                            height={40}
                            quality={100}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}