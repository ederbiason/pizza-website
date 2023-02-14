import Image from 'next/image'
import css from '../styles/Header.module.css'
import Logo from '../assets/Logo.png'
import { Receipt, ShoppingBag } from 'phosphor-react'
import { useStore } from '../store/store'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const Header = () => {
    const [order, setOrder] = useState<string | null>("")

    useEffect(() => {
        setOrder(localStorage.getItem("order"))
    }, [])

    const state = useStore((state) => state)

    const items = useStore((state: any) => state.cart.pizzas.length)

    return (
        <div className={css.header}>
            <div className={css.logo}>
                <Image src={Logo} alt="logo image" width={50} height={50} />
                <span>Fudo</span>
            </div>

            <ul className={css.menu}>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>Menu</li>
                <li>Contact</li>
            </ul>

            <div className={css.rightSide}>
                <Link href='/cart'>
                    <div className={css.cart}>
                        <ShoppingBag size={32} color="#2E2E2E" />
                        <div className={css.badge}>
                            {items}
                        </div>
                    </div>
                </Link>

                {
                    order && (
                        <Link href={`/order/${order}`}>
                            <div className={css.cart}>
                                <Receipt size={35} color="#2E2E2E" />

                                {
                                    order != "" && (
                                        <div className={css.badge}>
                                            1
                                        </div>
                                    )
                                }
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}