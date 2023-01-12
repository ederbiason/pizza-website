import css from '../styles/Hero.module.css'
import Image from 'next/legacy/image'
import Cherry from '../assets/Cherry.png'
import HeroImage from '../assets/HeroImage.png'
import Pizza1 from '../assets/p1.jpg'
import { Phone } from 'phosphor-react'

export const Hero = () => {
    return (
        <div className={css.container}>
            <div className={css.leftSide}>
                <div className={css.cherryDiv}>
                    <span>
                        More than Faster
                    </span>

                    <Image
                        priority={true}
                        src={Cherry}
                        alt="an image of an cherry"
                        width={40}
                        height={25}
                        sizes="(max-width: 768px) 100vw), (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className={css.heroText}>
                    <span>Be The Fastest</span>
                    <span>In Delivering</span>
                    <span>
                        Your <span style={{color: 'var(--themeRed)'}}>Pizza</span>
                    </span>
                </div>

                <span className={css.miniText}>
                    Our Misson is to filling your tummy with delicious food and with and free delivery
                </span>

                <button className={`btn ${css.btn}`}>
                    Get Started
                </button>
            </div>

            <div className={css.rightSide}>
                <div className={css.imageContainer}>
                    <Image src={HeroImage} alt="" layout='intrinsic' />
                </div>

                <div className={css.contactUs}>
                    <span>Contact us</span>

                    <div>
                        <Phone color="white" size={28} />
                    </div>
                </div>

                <div className={css.pizzaNotification}>
                    <div>
                        <Image 
                            src={Pizza1} 
                            alt="an image of a pizza" 
                            objectFit='cover' 
                            layout='intrinsic' 
                        /> 
                    </div>

                    <div className={css.details}>
                        <span>Italian Pizza</span>
                        <span>
                            <span style={{color: 'var(--themeRed)'}}>$</span> 7.49    
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}