'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ParallaxSection.module.css';
import logo from '@/public/logo.jpeg';

export default function ParallaxSection() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.parallaxSection}>
      {/* Immagine di background */}
      <div className={styles.imageContainer}>
        <Image
          src="/sfondo2.png"  // Percorso relativo all'immagine
          alt="Background"
          layout="fill"           // Usa layout responsive
          objectFit="cover"             // Ritaglia per coprire tutta l'area
          objectPosition={`center ${offsetY * -0.1}px`}  // Effetto parallax
          className={styles.backgroundImage}
        />
      </div>

      {/* Contenuto sopra l'immagine */}
      <div className={styles.content}>
        <Image src={logo}></Image>
      </div>
    </div>
  );
}