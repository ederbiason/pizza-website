import css from '../styles/Menu.module.css'
import { PizzaType } from "../@types/pizzaType"
import { urlFor } from '../lib/client';
import Image from 'next/legacy/image';
import Link from 'next/link';

interface MenuProps {
    pizzasData: PizzaType
}

export const Menu = ({pizzasData}: MenuProps) => {
    const { pizzas } = pizzasData;

    return (
        <div className={css.container}>
            <div className={css.heading}>
                <span>OUR MENU</span>
                <span>Menu That Always</span>
                <span>Make you Fall In Love</span>
            </div>

            <div className={css.menu}>
                {pizzas.map((pizza, id) => {
                    console.log(pizza)
                    const src = urlFor(pizza.image).url()
                    return (
                        <div
                            key={id}
                            className={css.pizza}
                        >
                            <Link href={`./pizza/${pizza.slug.current}`}>
                                <div className={css.imageWrapper}>
                                    <Image
                                        loader={() => src}
                                        src={src}
                                        alt="image of a flavor of pizza"
                                        objectFit='cover'
                                        layout='fill'
                                    />
                                </div>
                            </Link>

                            <span>{pizza.name}</span>

                            <span>
                                <span style={{color: 'var(--themeRed)'}}>$</span> {pizza.price[1]}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}