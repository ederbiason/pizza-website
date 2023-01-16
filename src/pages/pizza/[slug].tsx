import { GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { Pizza, Slug } from "../../@types/pizzaType"
import { Layout } from "../../components/Layout"
import { client } from "../../lib/client"

const PizzaPage = (pizza: Pizza) => {
    return (
        <Layout>
            
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const paths = await client.fetch(
        `*[_type == "pizza" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: Slug) => ({params: {slug}})),
        fallback: 'blocking',
    }
}

interface IParams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug = "" } = context.params as IParams
    const pizza = await client.fetch(
        `*[_type == "pizza" && slug.current == ${slug}][0]`
    )
    return {
        props: {
            pizza
        }
    }
}

export default PizzaPage