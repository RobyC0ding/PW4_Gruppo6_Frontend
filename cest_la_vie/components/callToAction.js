'use client';
import styles from '@/components/callToAction.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CallToAction() {
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            document.querySelector(`.${styles.background}`).style.backgroundPositionY = `${scrollPosition * 0.01}px`;
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleButtonClick = () => {
        router.push('/register'); // Naviga alla pagina "Registrati"
    };

    return (
        <div className={styles.background}>
            <div className={styles.maxContainer}>
                <div className={styles.container}>
                    <div className={styles.prodotti}>
                        <div className={styles.ch3}>
                            <h3 className={styles.h3}>
                                <span>Assapora la perfezione artigianale!</span>
                            </h3>
                        </div>
                        <div className={styles.cp}>
                            <p className={styles.p}>
                                <span>Iscriviti per ordinare uno dei nostri deliziosi prodotti o per avere maggiori informazioni!</span>
                            </p>
                        </div>
                        <button className={styles.button} onClick={handleButtonClick}>Iscriviti!</button>
                    </div>
                </div>
                <div className={styles.vuoto}>
                    <div className={styles.space}></div>
                </div>
            </div>
        </div>
    );
}
