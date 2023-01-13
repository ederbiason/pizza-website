import { Hero } from "../components/Hero";
import { Layout } from "../components/Layout";
import { Services } from "../components/Services";
import css from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Layout>
        <div className={css.container}>
          <main>
            <Hero />
            <Services />
          </main>
        </div>
      </Layout>
    </>
  )
}
