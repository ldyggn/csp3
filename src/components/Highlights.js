import { Row, Col, Card } from 'react-bootstrap';

// Component for highlighting features or benefits
export default function Highlights(){
    return (
        // Row containing highlight cards
        <Row className="mt-3 mb-3">
            {/* First highlight column */}
            <Col xs={12} md={4}>
                {/* Card for highlighting a feature */}
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        {/* Title of the highlight */}
                        <Card.Title>
                            <h2>Get All Your Makeup Needs</h2>
                        </Card.Title>
                        {/* Description of the highlight */}
                        <Card.Text>
                            Whether you're aiming for a natural glow or a glamorous makeover, we have everything you need to express your unique style and enhance your beauty.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            {/* Second highlight column */}
            <Col xs={12} md={4}>
                {/* Card for highlighting a feature */}
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        {/* Title of the highlight */}
                        <Card.Title>
                            <h2>Same Day Delivery</h2>
                        </Card.Title>
                        {/* Description of the highlight */}
                        <Card.Text>
                            Say goodbye to waiting and hello to instant gratification as we bring your purchases straight to your doorstep within hours of placing your order. 
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            {/* Third highlight column */}
            <Col xs={12} md={4}>
                {/* Card for highlighting a feature */}
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        {/* Title of the highlight */}
                        <Card.Title>
                            <h2>Be Part of Our Community</h2>
                        </Card.Title>
                        {/* Description of the highlight */}
                        <Card.Text>
                            Become a valued member of our community and unlock exclusive beauty benefits! Big discount, free shipping, and more!
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
