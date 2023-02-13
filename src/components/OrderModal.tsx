import css from '../styles/OrderModal.module.css'
import { Modal, useMantineTheme } from "@mantine/core"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { createOrder } from '../lib/orderHandler';
import { toast, Toaster } from 'react-hot-toast';
import { useStore } from '../store/store';
import { useRouter } from 'next/router';

interface OrderModalProps {
    opened: boolean;
    PaymentMethod: number | null;
    setOpened: Dispatch<SetStateAction<number | null>>
}

export function OrderModal({ opened, setOpened, PaymentMethod }: OrderModalProps) {
  const router = useRouter()

  const theme = useMantineTheme()

  const [formData, setFormData] = useState({})

  const total = typeof window !== 'undefined' && localStorage.getItem('total')

  const resetCart = useStore((state) => state.resetCart)

  function handleInput(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target 

    setFormData({...formData, [name]: value})
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const id = await createOrder({...formData, total, PaymentMethod})
    toast.success("Order Placed")
    resetCart()

    {
        typeof window !== 'undefined' && localStorage.setItem('order', id)
    }

    router.push(`/order/${id}`)
  }

  return (
    <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(null)}
    >
        <form className={css.formContainer}>
            <input 
                type="text" 
                name="name" 
                required 
                placeholder="Name" 
                className={css.input} 
                onChange={handleInput}
            />

            <input 
                type="text" 
                name="phone" 
                required 
                placeholder="Phone Number" 
                className={css.input} 
                onChange={handleInput}
            />
            
            <textarea 
                name="address" 
                rows={3} 
                className={css.textarea} 
                placeholder="Address" 
                onChange={handleInput}
            /> 

            <span>
                You will pay <span style={{color: 'var(--themeRed)'}}>$ {total}</span> on delivery
            </span>

            <button 
                type="submit" 
                className="btn"
                onClick={handleSubmit}
            >
                Place Order
            </button>
        </form>

        <Toaster />
    </Modal>
  )
}
