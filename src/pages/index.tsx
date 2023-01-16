import { GetStaticProps } from "next";
import { PizzaType } from "../@types/pizzaType";
import { Hero } from "../components/Hero";
import { Layout } from "../components/Layout";
import { Menu } from "../components/Menu";
import { Services } from "../components/Services";
import { client } from "../lib/client";
import css from '../styles/Home.module.css'

export default function Home(pizzas: PizzaType) {

  return (
    <>
      <Layout>
        <div className={css.container}>
          <main>
            <Hero />
            <Services />
            <Menu pizzasData={pizzas} />
          </main>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetStaticProps = async () => {
  const query = '*[_type == "pizza"]'
  const pizzas = await client.fetch(query)
  
  return {
    props: {
      pizzas
    }
  }
}