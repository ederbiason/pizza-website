import css from '../../styles/PizzaPage.module.css'
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/legacy/image"
import { ParsedUrlQuery } from "querystring"
import { Slug } from "../../@types/pizzaType"
import { Layout } from "../../components/Layout"
import { client, urlFor } from "../../lib/client"
import toast, { Toaster } from 'react-hot-toast'

import LeftArrow from '../../assets/arrowLeft.png';
import RightArrow from '../../assets/arrowRight.png';
import { useState } from 'react'
import { useStore } from '../../store/store'

interface PizzaProps {
    pizza: {
        image: {
            _type: string
            asset: {
                _ref: string
                _type: string
            }
        }
        name: string
        details: string
        price: number[]
    }
}

function PizzaPage(pizza: PizzaProps) {
    console.log(pizza)

    const src = urlFor(pizza.pizza.image).url()

    const [size, setSize] = useState<number>(1)
    const [quantity, setQuantity] = useState<number>(1)

    function handleQuantity(type: string) {
        type === "inc" 
        ? setQuantity((prev) => prev + 1) 
        : quantity === 1 
        ? null 
        : setQuantity((prev) => prev - 1)
    }

    if (typeof pizza === 'undefined') return ( <h1>Loading</h1> )

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const addPizza = useStore((state: any) => state.addPizza)
    const addToCart = () => {
        addPizza({
            ...pizza.pizza, 
            price: pizza.pizza.price,
            quantity: quantity,
            size: size
        })
        toast.success("Added to Cart")
    }

    return (
        <Layout>
            <div className={css.container}>
                <div className={css.imageWrapper}>
                    <Image 
                        src={src}
                        alt="image of a pizza"
                        loader={() => src}
                        objectFit='cover'
                        layout='fill'
                        unoptimized
                    />
                </div>

                <div className={css.right}>
                    <span>{pizza.pizza.name}</span>
                    <span>{pizza.pizza.details}</span>

                    <span>
                        <span style={{color: 'var(--themeRed)'}}>$</span> {pizza.pizza.price[size]}
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

                    <div 
                        className={`btn ${css.btn}`}
                        onClick={addToCart}
                    >
                        Add to Cart
                    </div>
                </div>
                <Toaster />
            </div>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await client.fetch(
        `*[_type == "pizza" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: Slug) => {  return { params: { slug } }  }),
        fallback: true,
    }
}

interface IParams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as IParams
    const pizza = await client.fetch(
        `*[_type == "pizza" && slug.current == '${slug}'][0]`,
    )

    return {
        props: {
            pizza
        }
    }
}

export default PizzaPage