import React from 'react';
import { Navbar, Nav, NavItem, NavbarBrand, NavLink } from 'reactstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './navbar.scss'
import { doLogout } from '../utils/doLogout';

const NavBar: React.FC = () => {
    return (
        <div className='container navbarContainer'>
            <Navbar  expand="md">
                <NavbarBrand href="/home">Personal Finance Tracker</NavbarBrand>
                <Nav className="me-auto" navbar> {/* Left-aligned section */}
                    {/* <NavItem>
                        <NavLink href="/transactions">Transactions</NavLink>
                    </NavItem> */}
                    <NavItem>
                        <NavLink href="/expenses">Expenses</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/income">Income</NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink href="/accounts">Accounts</NavLink>
                    </NavItem> */}
                </Nav>
                <Nav navbar> {/* Right-aligned section */}
                    <NavItem>
                        <NavLink href="/" onClick={() => {
                            doLogout()
                        }}>
                            <i className="bi bi-person-circle"></i> {
                                localStorage.getItem('userName') ? 'Sign Out' : 'Sign In'
                            }
                            
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
};

export default NavBar;
