import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';
import BannerImage from '../images/Banner.svg';
import Footer from '../components/Footer';

// Functional component for the home page
export default function Home() {

    // Data object containing information for the banner
    const data = {
        title: "Glow Girl",
        content: "You but better!",
        destination: "/products",
        label: "Shop Now"
    };

    // Image URL for the banner
    const imageUrl =  BannerImage;

    // Render the home page components
    return (
        <>
            {/* Render the Banner component with the provided data and image */}
            <Banner data={data} image={imageUrl} />
            {/* Render the FeaturedProducts component */}
            <FeaturedProducts/>
            {/* Render the Highlights component */}
            <Highlights />
        </>
    );
}
