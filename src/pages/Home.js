import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {

	return (
		<>
        <Row>
            <Col className="p-4 text-center">
                <h1>Welcome To our Movie Tracker</h1>
                <p>Create, Update, Delete and View Our Movies</p>
                <Link className="btn btn-primary" to={'/movies/getMovies'}>Check Our Movies</Link>
            </Col>
        </Row>
		</>
	)
}