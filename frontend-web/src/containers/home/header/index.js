import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "./../../../assets/glasses_logo_slash.png";
export default function Header() {
  return (
    <div id="header">
      <div className="header_wrapper">
        <div id="logo">
          <a href="/" style={{ height: 50 }}>
            <Image src={logo} width="100" height="50" alt="logo" />
          </a>
        </div>
        <nav id="menu">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Reviews</Link>
            </li>
            <li>
              <Link href="/">Categories</Link>
            </li>
            <li>
              <Link href="/">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
