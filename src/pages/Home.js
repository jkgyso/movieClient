import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/hero.jpg'; // Replace with your image path
import '../App.css';

export default function Home() {
    const contentStyle = {
        backgroundImage: `linear-gradient(rgba(38, 37, 79, 0.8), rgba(38, 37, 79, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh', // Ensures full viewport height coverage
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to the left
        filter: 'contrast(100%)', // Adjust contrast for the background image
    };

    const buttonStyle = {
        backgroundColor: '#FFA81F',
        borderColor: '#FFA81F',
        color: 'black',
    };

    return (
        <Container fluid className="p-0 mt-3">
            <Row className="text-white" style={contentStyle}>
                <Col xs={12} md={8} lg={6} className="py-5 px-5 text-left">
                    <h1>Movies Unmasked: Reviews You Can Trust</h1>
                    <p>We strip away the hype and deliver straightforward, reliable critiques of the latest blockbusters, hidden gems, and everything in between.</p>
                    <Link className="btn" style={buttonStyle} to={'/movies/getMovies'}><strong>Get the Inside Scoop on Films</strong></Link>
                </Col>
            </Row>
        </Container>
    );
}
