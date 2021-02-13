import React, { Component } from 'react';
import patenLogo from '../../images/company_logo.png';

class Footer extends Component {



    render() {
        return (
            <div >
                <div className="btn-group footer-button footer-button1" style={{ width: "100%" }}>
                    <button type="button" className="btn btn-primary button_Home_footer btn-group-sm custom-btn " onClick={this.redirectToHome}><i className ="fa fa-home" aria-hidden="true"><br></br>Home</i></button>
                    <button type="button" className="btn btn-primary button_Home_footer custom-btn  "><i className ="fa fa-user-md" aria-hidden="true"><br />Doctor's visit</i></button>
                    <button type="button" className="btn btn-primary button_Home_footer custom-btn " ><i className ="fa fa-cart-plus" aria-hidden="true"><br />Chemist's visit</i></button>
                </div>
            </div>
        )
    }
}

export default Footer;