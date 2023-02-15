import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(
    `${process.env.STRIPE_SECRET_KEY}`,
    {
        apiVersion: '2022-11-15'
    }
)

interface ItemProps {
    name: string
    price: number
    quantity: number
    image: {
        _type: string
        asset: {
            _ref: string
            _type: string
        }
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method == 'POST') {
        try {
            const params: Stripe.Checkout.SessionCreateParams = {
                submit_type: 'pay',
                mode: "payment",
                payment_method_types: ['card'],
                line_items: req.body.map((item: ItemProps) => {
                    const img = item.image.asset._ref
                    const newImage = img.replace(
                        "image-",
                        "https://cdn.sanity.io/images/3obrfqir/production/"
                    ).replace("-jpg", ".jpg")

                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price*100
                        },
                        adjustable_quantity: {
                            enabled: false,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cart`
            }

            const session = await stripe.checkout.sessions.create(params)
            console.log(session)
            res.status(200).json(session)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    } else {
        res.setHeader("Allow", "POST")
        res.status(405).end("method not allowed")
    }
}