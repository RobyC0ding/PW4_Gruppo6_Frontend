import styles from "./page.module.css";
import Header from '@/components/header.js';
import Footer from '@/components/footer.js';
import ParallaxSection from "@/components/parallaxSection.js";
import AboutUs from '@/components/aboutUs.js';
import HomeProducts from "@/components/homeProducts";

export default function Home() {
  return (
    <body className={styles.body}>
      <Header />
      <ParallaxSection />
      <AboutUs />
      <HomeProducts />
      <Footer />
    </body>
  );
}
