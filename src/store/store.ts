import { create } from 'zustand'

export interface PizzaCardProps {
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
    size: number
    quantity: number
  }

type State = {
    cart: {
        pizzas: PizzaCardProps[]
    },
    addPizza: (pizza: PizzaCardProps) => void
}

export const useStore = create<State>((set) => ({
    // cart
    cart: {
        pizzas: []
    },

    // add Pizza in cart
    addPizza: (data) => {
        set((state) => ({
            cart: {
                pizzas: [...state.cart.pizzas, data]
            }
        }))
    }
}))