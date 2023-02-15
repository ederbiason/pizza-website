import { Layout } from "phosphor-react";
import { OrderModal } from "../components/OrderModal";

export default function Success() {
    return (
        <Layout>
            <OrderModal
                opened={true}
                PaymentMethod={1}
            />
        </Layout>
    )
}