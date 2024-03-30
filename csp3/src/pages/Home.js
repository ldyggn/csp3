import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
	
	const data = {
		title: "Makeup Fever",
		content: "Your one stop makeup shop",
		destination: "/products",
		label: "Your looks but better"
	}

	return (
		<>
			<Banner data={data}/>
			<FeaturedProducts/>
			<Highlights/>
		</>
	)
}