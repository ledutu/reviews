import React from "react";
import Link from "next/link";
import logo from "./../../../assets/glasses_logo_slash.png";
export default function Header() {
  return (
    <div id="header">
      <div className="header_wrapper">
        <div id="logo">
          <a href="/">
            <span>logo_image</span>
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
