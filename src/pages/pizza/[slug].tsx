import css from '../../styles/PizzaPage.module.css'
import { GetStaticProps } from "next"
import Image from "next/legacy/image"
import { ParsedUrlQuery } from "querystring"
import { Pizza, Slug } from "../../@types/pizzaType"
import { Layout } from "../../components/Layout"
import { client, urlFor } from "../../lib/client"

import LeftArrow from '../../assets/arrowLeft.png';
import RightArrow from '../../assets/arrowRight.png';
import { useState } from 'react'

const PizzaPage = (pizza: Pizza) => {
    // console.log(pizza)

    const [size, setSize] = useState<number>(1)
    const [quantity, setQuantity] = useState<number>(1)

    function handleQuantity(type: string) {
        type === "inc" 
        ? setQuantity((prev) => prev + 1) 
        : quantity === 1 
        ? null 
        : setQuantity((prev) => prev - 1)
    }

    return (
        <Layout>
            <div className={css.container}>
                <div className={css.imageWrapper}>

                </div>

                <div className={css.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>

                    {/* should have a [size] after price */}
                    <span>
                        <span style={{color: 'var(--themeRed)'}}>$</span> {pizza.price}
                    </span>

                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.sizeVariants}>
                            <div 
                                onClick={() => setSize(0)}
                                className={size === 0 ? css.selected : ""}
                            >
                                Small
                            </div>

                            <div 
                                onClick={() => setSize(1)}
                                className={size === 1 ? css.selected : ""}
                            >
                                Medium
                            </div>

                            <div 
                                onClick={() => setSize(2)}
                                className={size === 2 ? css.selected : ""}
                            >
                                Large
                            </div>
                        </div>
                    </div>

                    <div className={css.quantity}>
                        <span>Quantity</span>

                        <div className={css.counter}>
                            <Image 
                                src={LeftArrow}
                                width={20}
                                height={20}
                                alt="Left arrow icon"
                                objectFit='contain'
                                onClick={() => handleQuantity("dec")}
                            />

                            <span>{quantity}</span>

                            <Image 
                                src={RightArrow}
                                width={20}
                                height={20}
                                alt="Left arrow icon"
                                objectFit='contain'
                                onClick={() => handleQuantity("inc")}
                            />
                        </div>
                    </div>

                    <div className={`btn ${css.btn}`}>
                        Add to Cart
                    </div>
                </div>
            </div>


        </Layout>
    )
}

export const getStaticPaths = async () => {
    const paths = await client.fetch(
        `*[_type=="pizza" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: Slug) => ({ params: { slug } })),
        fallback: 'blocking',
    }
}

interface IParams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug = "" } = context.params as IParams
    const pizza = await client.fetch(
        `*[_type=="pizza" && slug.current == '${slug}'][0]`
    )
    return {
        props: {
            pizza
        }
    }
}

export default PizzaPage