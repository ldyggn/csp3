import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export default function Banner({ data, image }) {
    // Destructuring props
    const { title, content, destination, label } = data;

    return (
        // Full-width container
        <Container fluid>
            {/* Row for banner */}
            <Row>
                <Col className="p-0">
                    {/* Banner container */}
                    <div className="banner-container">
                        {/* Banner image */}
                        <img src={image} alt="Banner" className="banner-image" />
                        {/* Banner content */}
                        <div className="banner-content">
                            {/* Banner title */}
                            <h1>{title}</h1>
                            {/* Banner content */}
                            <p>{content}</p>
                            {/* Button linking to destination */}
                            <Link to={destination} className="banner-button">{label}</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
