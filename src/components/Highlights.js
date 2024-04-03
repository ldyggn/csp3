import { Row, Col, Card } from 'react-bootstrap';



export default function Highlights(){
    return (
    <Row className="mt-3 mb-3">
        <Col xs={12} md={4}>
             <Card className="cardHighlight p-3">
                <Card.Body>
                <Card.Title>
                    <h2>Get All Your Makeup Needs</h2>
                </Card.Title>
                <Card.Text>
                Whether you're aiming for a natural glow or a glamorous makeover, we have everything you need to express your unique style and enhance your beauty.
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
        <Col xs={12} md={4}>
            <Card className="cardHighlight p-3">
                 <Card.Body>
                <Card.Title>
                    <h2>Same Day Delivery</h2>
                </Card.Title>
                <Card.Text>
                Say goodbye to waiting and hello to instant gratification as we bring your purchases straight to your doorstep within hours of placing your order. 
                </Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col xs={12} md={4}>
            <Card className="cardHighlight p-3">
                <Card.Body>
                <Card.Title>
                    <h2>Be Part of Our Community</h2>
                </Card.Title>
                <Card.Text>
                Become a valued member of our community and unlock exclusive beauty benefits! Big discount, free shipping, and more!
                </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row>
        )
}