import css from '../styles/Cart.module.css'
import { PizzaCardProps, useStore } from '../store/store'
import { Layout } from "../components/Layout";
import Image from 'next/legacy/image';
import { urlFor } from '../lib/client';

export default function Cart() {
  const CartData = useStore((state: any) => state.cart)

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>

            <tbody className={css.tbody}>
              {CartData.pizzas.length > 0 &&
                CartData.pizzas.map((pizza: PizzaCardProps, i: number) => {
                  console.log(CartData)
                  const src = urlFor(pizza.image).url()

                  return (
                    <tr key={i}>
                      <td>
                        <Image
                          src={src}
                          alt="image of a pizza"
                          loader={() => src}
                          className={css.imageTd}
                          objectFit="cover"
                          width={85}
                          height={85}
                        />
                      </td>

                      <td>
                        {pizza.name}
                      </td>

                      <td>
                        {
                          pizza.size === 0
                            ? "Small"
                            : pizza.size === 1
                              ? "Medium"
                              : "Large"
                        }
                      </td>

                      <td>
                        {pizza.price}
                      </td>

                      <td>
                        {pizza.quantity}
                      </td>

                      <td>
                        {Number(pizza.price) * pizza.quantity}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <div className={css.cart}>

        </div>
      </div>
    </Layout>
  )
}
