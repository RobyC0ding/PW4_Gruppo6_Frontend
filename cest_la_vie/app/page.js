import styles from "./page.module.css";
import Header from '@/components/header';
import Footer from '@/components/footer';
import ParallaxSection from "@/components/parallaxSection";
import AboutUs from '@/components/aboutUs';
import HomeProdutcs from '@/components/homeProducts';
import CallToAction from '@/components/callToAction.js';

export default function Home() {
  return (
    <body className={styles.body}>
      <Header />
      <ParallaxSection />
      <AboutUs />
      <HomeProdutcs />
      <CallToAction />
      <Footer />
    </body>
  );
}
