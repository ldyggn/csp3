import Banner from '../components/Banner';

// Functional component to display a 404 error page
export default function Error() {

    // Data object containing title, content, destination, and label for the banner
    const data = {
        title: "404 - Not found",
        content: "The page you are looking for cannot be found",
        destination: "/",
        label: "Back home"
    }

    // Render the Banner component with the provided data
    return (
        <Banner data={data}/>
    );
}
