import styles from "@/app/page.module.css";
import ParallaxSection from "@/components/parallaxSection";
import AboutUs from "@/components/aboutUs";
import HomeProdutcs from "@/components/homeProducts";
import CallToAction from "@/components/callToAction";
import Footer from "@/components/footer";
import HeaderLoginUtente from "@/components/headerLoginUtente";

export default function Home() {
    return (
        <body className={styles.body}>
        <HeaderLoginUtente />
        <ParallaxSection />
        <AboutUs />
        <HomeProdutcs />
        <CallToAction />
        <Footer />
        </body>
    );
}
