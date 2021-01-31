import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import patenLogo from '../../images/company_logo.png';
import doctor_visit_logo from '../../images/logog.png'
import chemist_visit_logo from '../../images/Chemist.png'
import './Home.css';
import {PostData} from '../../services/PostData';
import jwt_decode from 'jwt-decode'
import * as commonConstant from '../common/CommonConstant'
import Footer from '../common/Footer';
import Header from '../common/Header';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.logout = this.logout.bind(this);
        this.navigateToDoctorVisitForm = this.navigateToDoctorVisitForm.bind(this);
        this.saveDatatoSession = this.saveDatatoSession.bind(this);
        this.doctorVisit = this.doctorVisit.bind(this);
    }


    componentDidMount() {

        this.saveDatatoSession(commonConstant.shopURL, commonConstant.GET_ALL_SHOP);

        this.saveDatatoSession(commonConstant.doctorURL, commonConstant.GET_ALL_DOCTOR);

        this.saveDatatoSession(commonConstant.businessAreaURL, commonConstant.GET_ALL_BUSINESSAREA);

        this.saveDatatoSession(commonConstant.giftURL,commonConstant.GET_ALL_GIFT);

        //this.saveDatatoSession(commonConstant.productURL, commonConstant.GET_ALL_PRODUCT);

        this.saveDatatoSession(commonConstant.companyURL, commonConstant.GET_ALL_COMPANY);

        //this.saveDatatoSession(commonConstant.userURL, commonConstant.GET_ALL_USER);
        
    }

    saveDatatoSession(baseURL, operation)
    {
        PostData(operation, this.state, baseURL).then((result) => {
            
            console.log("result from login service call : "+JSON.stringify(result.data));
            if(result.data){
                sessionStorage.setItem(operation, JSON.stringify(result.data.data))
                this.setState({redirect: true});
            }
            else
            {
               console.log("invalid data format")
            }
        }).catch(error => console.log(JSON.stringify(error)));

    }


    logout() {
        sessionStorage.setItem('userData', '');
        sessionStorage.clear();
        this.setState({ redirect: true });
        this.props.history.push('/')
    }

    doctorVisit() {
        
        this.props.history.push('/doctorVisit')
    }

    navigateToDoctorVisitForm()
    {
        this.props.history.push('/doctorVisitForm')
    }

    render() {


        //     if(this.state.redirect){
        //       return (<Redirect to={'/login'} />)
        //    }
        //console.log(sessionStorage.getItem('userData'));
        if (!sessionStorage.getItem('userData')) {
            return (<Redirect to={'/'} />)
        }

        return (
            <div>
                <meta name="viewport" content="width=device-width, initial-scale = 1.0,maximum-scale=1.0, user-scalable=no" />

               <Header/>

                <div className="container" style={{height:'80%'}}>

                    <div className="row card_ratio">
                        <div className="col-md-6  col-sm-3">
                            <div className="card">
                                <img  className="card-img-top photo" src={doctor_visit_logo} alt="doctor's visit logo" />

                                <label className="doc_visit">Doctor's Visit</label>
                                <button className="add_doc_visit" onClick={this.navigateToDoctorVisitForm}> + Add Doctor's Visit</button>
                            </div>
                        </div>
                        
                        <div className="col-md-6 col-sm-3">
                        
                            <div className="card">
                                
                                <img className="card-img-top photo" src={chemist_visit_logo} alt="Chemist's visit logo" />
                                <label className="doc_visit">Chemist's Visit</label>
                                <button className="add_doc_visit"> + Add Chemist's Visit</button>

                            </div>
                            <br/>
                            <br/>
                        </div>
                    
                    </div>
                    <footer>
                        <p class="footer">@copyright</p>
                    </footer>
                </div>



            <Footer/>

            </div>
        )
    }
}

export default Home;
