import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Navbar,Nav} from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const NavC = (props) => {
    return (
        <Navbar bg="dark" expand="lg" dir="rtl" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white text-center" 
                            style={{ textDecoration: 'none' }} to="/">
                                صفحه اصلی
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white text-center" 
                            style={{ textDecoration: 'none' }} to="/products">
                                محصولات
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white text-center" 
                            style={{ textDecoration: 'none' }} to="/employees">
                                کارکنان
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavC;