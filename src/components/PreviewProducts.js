import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PreviewProducts(props){

    const { breakPoint, data } = props;

    return(
        <Col xs={12} md={ breakPoint }>
            <Card className="cardHighlight">
                <Card.Img variant="top" src={imageMap[data.imageName]} alt={data.name} />
                <Card.Body>
                    <Card.Title className="text-center">
                        <Link to={`/products/${data._id}`}>{data.name}</Link>
                    </Card.Title>
                    <Card.Text>{data.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <h5 className="text-center">₱{data.price}</h5>
                    <Link className="btn btn-primary d-block" to={`/products/${data._id}`}>Details</Link>
                </Card.Footer>
            </Card>
        </Col>
    );
}
