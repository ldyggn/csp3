import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export default function Banner({ data, image }) {
    const { title, content, destination, label } = data;
    return (
        <Container fluid>
        <Row>
            <Col className="p-0">
                <div className="banner-container">
                    <img src={image} alt="Banner" className="banner-image" />
                    <div className="banner-content">
                        <h1>{title}</h1>
                        <p>{content}</p>
                        <Link to={destination} className="banner-button">{label}</Link>
                    </div>
                </div>
            </Col>
        </Row>
        </Container>
    );
}