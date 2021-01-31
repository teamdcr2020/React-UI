import React, { Component } from 'react';
import patenLogo from '../../images/company_logo.png';

import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        sessionStorage.setItem('userData', '');
        sessionStorage.clear();
        this.setState({ redirect: true });
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <meta name="viewport" content="width=device-width, initial-scale = 1.0,maximum-scale=1.0, user-scalable=no" />
                <div>
                    <nav style={{ backgroundColor: "#024B65" }} className="navbar navbar-expand-md navbar-dark nav-color">
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand main_logo "><img className="oval" src={patenLogo} alt="Paten Biotech logo" /></a>

                        <div className="collapse navbar-collapse" id="menu">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-link "  >Home</Link>

                                </li>

                                <li className="nav-item">
                                    <Link to="/doctorVisitForm" className="nav-link" > Doctors visit</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link ">Chemist Visit</a>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="nav-link logout" onClick={this.logout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Header;