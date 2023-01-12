import Image from 'next/image'
import Logo from '../assets/Logo.png'
import { FacebookLogo, InstagramLogo, GithubLogo } from 'phosphor-react'
import css from '../styles/Footer.module.css'

export const Footer = () => {
    return (
        <div className={css.container}>
            <span>
                ALL RIGHT RESERVED
            </span>

            <div className={css.social}>
                <FacebookLogo size={40} color="#F54748" />
                <GithubLogo size={40} color="#F54748" />
                <InstagramLogo size={40} color="#F54748" />
            </div>

            <div className={css.logo}>
                <Image src={Logo} alt="logo image" width={50} height={50} />
                <span>Fudo</span>
            </div>
        </div>
    )
}