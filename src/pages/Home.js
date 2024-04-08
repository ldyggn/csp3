import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';
import BannerImage from '../images/Banner.svg';
import Footer from '../components/Footer';

export default function Home() {
    const data = {
        title: "Glow Girl",
        content: "You but better!",
        destination: "/products",
        label: "Shop Now"
    };

    const imageUrl =  BannerImage;

    return (
        <>
            <Banner data={data} image={imageUrl} />
            <FeaturedProducts/>
            <Highlights />
        </>
    );
}
