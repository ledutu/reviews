import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";
import { Input, Button } from "antd";
import {
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.quickLink}>
          <span>Truy cập nhanh</span>
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
          <span>Thể loại phổ biến</span>
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
          <span>Liên lạc</span>
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
          <span>Thông tin chi tiết</span>
          <ul>
            <li>
              <div className={styles.inputEmail}>
                <Input placeholder="Email của bạn" />
                <Button type="primary" className="ml-5">
                  Submit
                </Button>
              </div>
            </li>
          </ul>
          <span>Theo dõi chúng tôi</span>
          <div className={styles.socialContacts}>
            <FacebookOutlined />
            <TwitterOutlined />
            <InstagramOutlined />
            <YoutubeOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}
