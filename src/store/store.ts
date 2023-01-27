import { create } from 'zustand'

export const useStore = create(
    (set) => ({
        // cart
        cart: {
            pizzas: []
        },

        // add Pizza in cart
        addPizza: (data: any) =>
        set((state: any) => ({
            cart: {
                pizzas: [...state.cart.pizza, data]
            }
        }))
    })
)