import css from '../../styles/Orders.module.css'
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Layout } from "../../components/Layout";
import { client } from "../../lib/client";

import Cooking from '../../assets/cooking.png'
import Onway from '../../assets/onway.png'
import Spinner from '../../assets/spinner.svg'

import { Money, Package } from 'phosphor-react';
import Image from 'next/legacy/image';

interface IParams extends ParsedUrlQuery {
    id: string
}

type OrdersProps = {
    order: {
        _createdAt: string
        _id: string
        _rev: string
        _type: string
        _updatedAt: string
        address: string
        method: number
        name: string
        phone: string
        status: number
        total: number
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as IParams

    const query = `*[_type == 'order' && _id == '${id}']`
    const order: OrdersProps[] = await client.fetch(query)

    return {
        props: {
            order: order[0]
        }
    }
}

export default function Orders({order}: OrdersProps) {
    console.log(order)

    return (
        <Layout>
            <div className={css.container}>
                <span className={css.heading}>
                    Order in Process
                </span>

                <div className={css.details}>
                    <div>
                        <span>Order ID</span>
                        <span>{order._id}</span>
                    </div>

                    <div>
                        <span>Customer Name</span>
                        <span>{order.name}</span>
                    </div>

                    <div>
                        <span>Phone</span>
                        <span>{order.phone}</span>
                    </div>

                    <div>
                        <span>Method</span>
                        <span>
                            {
                                order.method === 0 ? 'Cash on Delivery' : 'Online Payment (Paid)'
                            }
                        </span>
                    </div>

                    <div>
                        <span>Total</span>
                        <span>$ {order.total}</span>
                    </div>
                </div>

                <div className={css.statusContainer}>
                    <div className={css.status}>
                        <Money size={50} style={{color: 'var(--themeRed)'}} />
                        <span>Payment</span>

                        {
                            order.method === 0 
                            ? <span className={css.pending}>On Delivery</span>
                            : <span className={css.completed}>Completed</span>
                        }
                    </div>

                    <div className={css.status}>
                        <Image 
                            src={Cooking}
                            alt="image of a pizza being cooked"
                            width={50}
                            height={50}
                        />

                        <span>Cooking</span>

                        {
                            order.status === 1 && (
                                <div className={css.spinner}>
                                    <Image src={Spinner} alt="spinner around the image" />
                                </div>
                            )
                        }

                        {
                            order.status > 1 && (
                                <span className={css.completed}>
                                    Completed
                                </span>
                            )
                        }
                    </div>

                    <div className={css.status}>
                        <Image 
                            src={Onway}
                            alt="image of a motorcycle with the backside carrying the pizzas"
                            width={50}
                            height={50}
                        />

                        <span>OnWay</span>

                        {
                            order.status === 2 && (
                                <div className={css.spinner}>
                                    <Image src={Spinner} alt="spinner around the image" />
                                </div>
                            )
                        }

                        {
                            order.status > 2 && (
                                <span className={css.completed}>
                                    Completed
                                </span>
                            )
                        }
                    </div>

                    <div className={css.status}>
                        <Package size={50} style={{color: 'var(--themeRed)'}} />

                        <span>Delivered</span>

                        {
                            order.status === 3 && (
                                <div className={css.spinner}>
                                    <Image src={Spinner} alt="spinner around the image" />
                                </div>
                            )
                        }

                        {
                            order.status > 3 && (
                                <span className={css.completed}>
                                    Completed
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}