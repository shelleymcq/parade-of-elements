import React, {useState, useEffect} from "react";
import "./header.css"
import banner from './../../images/banner2.png'

export default function Header() {
    return (
    <div className="header">
        <h1>The Parade of Elements</h1>
        <div className="header-container">
            <img src={banner}></img>
        </div>
    </div>
    )
};