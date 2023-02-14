import css from '../styles/Cart.module.css'
import { PizzaCardProps, useStore } from '../store/store'
import { Layout } from "../components/Layout";
import Image from 'next/legacy/image';
import { urlFor } from '../lib/client';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { OrderModal } from '../components/OrderModal';
import { useRouter } from 'next/router';

export default function Cart() {
  const router = useRouter()

  const CartData = useStore((state) => state.cart)
  const removePizza = useStore((state) => state.removePizza)

  const [PaymentMethod, setPaymentMethod] = useState<number | null>(null)

  function handleRemove(index: number) {
    removePizza(index)
    toast.error('Item Removed')
  }

  const total = () => CartData.pizzas.reduce((a, b) => a + b.quantity * Number(b.price), 0)

  function handleOnDelivery() {
    setPaymentMethod(0)
    typeof window !== 'undefined' && localStorage.setItem('total', total().toString())
  }

  async function handleCheckout() {
    typeof window !== 'undefined' && localStorage.setItem('total', total().toString())
    setPaymentMethod(1)

    const response = await fetch('/api/stripe', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(CartData.pizzas)
    })

    if(response.status === 500) return 

    const data = await response.json()
    toast.loading("Redirecting...")
    router.push(data.url)
  }

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <tr>
                <th>Pizza</th>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody className={css.tbody}>
              {CartData.pizzas.length > 0 &&
                CartData.pizzas.map((pizza: PizzaCardProps, i: number) => {
                  const src = urlFor(pizza.image).url()

                  return (
                    <tr key={i} className={css.infos}>
                      <td className={css.imageTd}>
                        <Image
                          src={src}
                          alt="image of a pizza"
                          loader={() => src}
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
                        $ {pizza.price}
                      </td>

                      <td>
                        {pizza.quantity}
                      </td>

                      <td>
                        $ {Number(pizza.price) * pizza.quantity}
                      </td>

                      <td
                        className={`btn ${css.removeButton}`}
                        onClick={() => handleRemove(i)}
                      >
                        x
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <div className={css.cart}>
          <span>Cart</span>

          <div className={css.cartDetails}>
            <div>
              <span>Items</span>
              <span> {CartData.pizzas.length}</span>
            </div>
            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
          </div>

          <div className={css.buttons}>
            <button
              className='btn'
              onClick={handleOnDelivery}
            >
              Pay on Delivery
            </button>

            <button
              className='btn'
              onClick={handleCheckout}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      <Toaster />

      <OrderModal
        opened={PaymentMethod === 0}
        setOpened={setPaymentMethod}
        PaymentMethod={PaymentMethod}
      />
    </Layout>
  )
}
