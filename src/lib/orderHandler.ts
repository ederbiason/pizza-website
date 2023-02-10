interface orderHandlerProps {
    name?: string;
    phone?: string;
    address?: string;
    total: number | string | false | null;
    PaymentMethod: number | null;
}

export const createOrder = async({name, phone, address, total, PaymentMethod}: orderHandlerProps) => {
    const res = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify({
            name,
            phone,
            address,
            total: parseFloat(total!.toString()),
            method: PaymentMethod,
            status: 1
        }),
    })

    const id = await res.json()
    return id
}