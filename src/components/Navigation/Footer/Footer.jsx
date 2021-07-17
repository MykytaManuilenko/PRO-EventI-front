import React from 'react'
import './Footer.scss'
const Footer = () => {
    return(
        <div className="Footer">
            <div className="LogoContainer">
                <h2 className="logo">Eventl</h2>
            </div>
            <div className="Text">
                <p>Let’s stay in touch to not to miss new events!</p>
            </div>
            <div className="ContactIcons">
                <img src="./Facebook.svg" alt="" />
                <img src="./Instagram.svg" alt="" />
                <img src="./Gmail.svg" alt="" />
            </div>


        </div>
    )

}

export default Footer;