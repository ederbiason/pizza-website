import Image from 'next/image'
import Logo from '../assets/Logo.png'
import { InstagramLogo, GithubLogo, LinkedinLogo } from 'phosphor-react'
import css from '../styles/Footer.module.css'

export const Footer = () => {
    return (
        <div className={css.container}>
            <span>
                ALL RIGHT RESERVED
            </span>

            <div className={css.social}>
                <a href="https://www.linkedin.com/in/eder-biason-b0a7b920b/" target="_blank" rel="noreferrer">
                    <LinkedinLogo size={40} color="#F54748" />
                </a>
                <a href="https://github.com/ederbiason" target="_blank" rel="noreferrer">
                    <GithubLogo size={40} color="#F54748" />
                </a>
                <a href="https://www.instagram.com/ederbiason_/?hl=pt-br" target="_blank" rel="noreferrer">
                    <InstagramLogo size={40} color="#F54748" />
                </a>
            </div>

            <div className={css.logo}>
                <Image src={Logo} alt="logo image" width={50} height={50} />
                <span>Fudo</span>
            </div>
        </div>
    )
}