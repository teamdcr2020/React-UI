import React, { Component } from 'react';
import patenLogo from '../../images/company_logo.png';
import * as commonConstant from '../common/CommonConstant'
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            name: '',
            headquarterName: '',
            employeeId: ''
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        sessionStorage.setItem('userData', '');
        sessionStorage.clear();
        this.setState({ redirect: true });
        this.props.history.push('/')
    }

    componentDidMount() {
        let userprofileData = JSON.parse(sessionStorage.getItem('userData'))
        let headquarterId = JSON.parse(sessionStorage.getItem(commonConstant.USER_DEFAULT_HEADQUARTER_ID))
        let allHeadQuarters = JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_HEADQUARTER))
        let name = '';
        if (userprofileData && userprofileData.userProfile && userprofileData.userProfile.name) 
            this.setState({name: userprofileData.userProfile.name})

        if (userprofileData && userprofileData.userProfile && userprofileData.userProfile.employeeId) 
            this.setState({employeeId: userprofileData.userProfile.employeeId})

        if (allHeadQuarters) 
            {
                allHeadQuarters.map((headQuarter)=>{
                    console.log("headQuaRETE:   "+JSON.stringify(headQuarter)+" -- "+headquarterId)
                    if(headQuarter.id === headquarterId)
                    {
                        this.setState({headquarterName: headQuarter.name})
                        let defHead = {id:headquarterId, name: headQuarter.name};
                        sessionStorage.setItem(commonConstant.USER_DEFAULT_HEADQUARTER, JSON.stringify(defHead) );
                    }

                })
            }
        
        
      
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
                    <h5>Hello, {this.state.name}</h5>
                    <h6>Employee Id :{this.state.employeeId} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HQ: {this.state.headquarterName}</h6>
                    <br />
                </div>
            </div>
        )
    }
}

export default Header;