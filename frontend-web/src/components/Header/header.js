import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/home/logo.png";
import { Affix, Button, Input } from "antd";
import {
  ClockCircleOutlined,
  HomeFilled,
  HomeOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons';

var today = new Date(); // Sun Dec 22 2019 13:18:01 GMT+0530 (India Standard Time)
var date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
export function Header() {

  const [top, setTop] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <div className={styles.infoContent}>
          <Link href="/">
            <a>
              <Image
                src={logo}
                alt="logo"
                width={130}
                height={30}
                quality={100}
              />
            </a>
          </Link>

          <div className={styles.right}>
            <Button type="default" icon={<ClockCircleOutlined />} className="ml-10 test-scss" >
              Mới nhất
            </Button>

            <div className={styles.search}>
              <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
            </div>

            <Button type="default" icon={<UserOutlined />} className="ml-10" >
              Đăng nhập
            </Button>
          </div>
        </div>

      </div>

      <Affix offsetTop={top}>
        <div className={styles.nav}>
          <div className={styles.navContent}>
            <Link href="/">
              <a>
                <HomeFilled />
              </a>
            </Link>
            <Link href="/">
              <a>Công nghệ</a>
            </Link>
            <Link href="/">
              <a>Thời trang</a>
            </Link>
            <Link href="/">
              <a>Du lịch</a>
            </Link>
            <Link href="/">
              <a>Đồ ăn</a>
            </Link>
            <Link href="/">
              <a>Đồ gia dụng</a>
            </Link>
            <Link href="/">
              <a>Nhà hàng</a>
            </Link>
            <Link href="/">
              <a>Nhà hàng</a>
            </Link>
            <Link href="/">
              <a>
                Tất cả
                <MenuOutlined className="ml-10" />
              </a>
            </Link>
          </div>
        </div>
      </Affix>

      <style jsx>{`
        a {
          color: var(--next-color-white);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
