import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Component for previewing products
export default function PreviewProducts(props){

    // Destructuring props
    const { breakPoint, data } = props;

    return(
        // Column to display preview card
        <Col xs={12} md={ breakPoint }>
            {/* Card for displaying product preview */}
            <Card className="cardHighlight">
                {/* Product image */}
                <Card.Img variant="top" src={imageMap[data.imageName]} alt={data.name} />
                <Card.Body>
                    {/* Product name with link to product details */}
                    <Card.Title className="text-center">
                        <Link to={`/products/${data._id}`}>{data.name}</Link>
                    </Card.Title>
                    {/* Product description */}
                    <Card.Text>{data.description}</Card.Text>
                </Card.Body>
                {/* Card footer */}
                <Card.Footer>
                    {/* Product price */}
                    <h5 className="text-center">₱{data.price}</h5>
                    {/* Link to product details */}
                    <Link className="btn btn-primary d-block" to={`/products/${data._id}`}>Details</Link>
                </Card.Footer>
            </Card>
        </Col>
    );
}
