import { dark } from '@material-ui/core/styles/createPalette';
import React,{Component} from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import '../App.css'

const styles = {
    MI: {
        maxHeight: '50px',
        maxWidth: '50px'
    }
}

const Home = (props) => {
    return (
        <Container fluid className="pl-0 pr-0 bg-dark CBg">
            <Container>
                <Row>
                    <Col md="6" >
                        <img src={require('../assets/mxw.png').default} className="img-fluid pt-1 pb-1 " alt="Img"/>
                    </Col>
                    <Col md="6" className="text-center pt-5 pb-5" >
                        <h1 className="pt-4 pb-4 text-white">
                            Phone Tech
                        </h1>
                        <p className="text-white">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed vel massa porttitor dolor fermentum vestibulum nec vitae lacus.
                            Quisque consequat faucibus est, id posuere arcu sodales et.
                            Duis in commodo dolor, at ornare nulla. Fusce congue lorem ac lectus imperdiet, ac facilisis erat euismod.
                            Fusce risus orci, tempor a convallis at, ultrices eget ipsum. Nullam mattis molestie dui eu ultricies.
                            Quisque semper dui at eros semper dictum.
                        </p>
                        <Button variant="success"> <Icon.PlusCircle  /> اطلاعات بیشتر </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" classNane="text-center">
                        <h3 className="text-white">
                            تازه ترین ها
                        </h3>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
    
}

export default Home;