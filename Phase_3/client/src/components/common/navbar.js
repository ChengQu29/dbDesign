import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export let NavBarComponent = () => {
    return(
        <div>
            <Navbar bg="primary" variant="dark">

            <Container>
                <Navbar.Brand href="/">Happy Homes</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/households">Households</Nav.Link>
                <Nav.Link href="/reports">Reports</Nav.Link>
                </Nav>
            </Container>
            </Navbar>
        </div>
    )
}