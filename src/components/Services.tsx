import Image from 'next/legacy/image'
import css from '../styles/Services.module.css'
import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'
import s3 from '../assets/s3.png'

export const Services = () => {
    return (
        <>
            <div className={css.heading}>
                <span>WHAT WE SERVE</span>
                <span>Your Favourite Food</span>
                <span>Delivery Partner</span>
            </div>

            <div className={css.services}>
                <div className={css.feature}>
                    <div className={css.imageWrapper}>
                        <Image
                            src={s1}
                            alt="image of a cartoon person holding a cellphone"
                            objectFit='cover'
                            layout='intrinsic'
                            priority={true}
                            width={160}
                            height={160}
                            sizes="(max-width: 768px) 100vw), (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    <span>Easy to Order</span>
                    <span>You only need a few steps in food ordering</span>
                </div>

                <div className={css.feature}>
                    <div className={css.imageWrapper}>
                        <Image
                            src={s2}
                            alt="image of a cartoon person driving a motorcycle"
                            objectFit='cover'
                            layout='intrinsic'
                            priority={true}
                            width={160}
                            height={160}
                            sizes="(max-width: 768px) 100vw), (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    <span>Easy to Order</span>
                    <span>Delivery that is always on time even faster</span>
                </div>

                <div className={css.feature}>
                    <div className={css.imageWrapper}>
                        <Image
                            src={s3}
                            alt="image of a cartoon person riding skateboard"
                            objectFit='cover'
                            priority={true}
                            width={170}
                            height={200}
                            sizes="(max-width: 768px) 100vw), (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    <span>Easy to Order</span>
                    <span>Not only fast for us, quality is also number one</span>
                </div>
            </div>
        </>
    )
}
