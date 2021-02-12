import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import patenLogo from '../../images/company_logo.png';
import doctor_visit_logo from '../../images/logog.png'
import chemist_visit_logo from '../../images/Chemist.png'
import './Home.css';
import { PostData } from '../../services/PostData';
import jwt_decode from 'jwt-decode'
import * as commonConstant from '../common/CommonConstant'
import Footer from '../common/Footer';
import Header from '../common/Header';
import { BeatLoader } from 'react-spinners'
import LoadingOverlay from 'react-loading-overlay'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            awaitingResponse: false

        }
        this.logout = this.logout.bind(this);
        this.navigateToDoctorVisitForm = this.navigateToDoctorVisitForm.bind(this);
        this.saveDatatoSession = this.saveDatatoSession.bind(this);
        this.doctorVisit = this.doctorVisit.bind(this);
    }


    componentDidMount() {

        // this.saveDatatoSession(commonConstant.controllerURL, commonConstant.GET_ALL_SHOP);

        // this.saveDatatoSession(commonConstant.controllerURL, commonConstant.GET_ALL_DOCTOR);

        // this.saveDatatoSession(commonConstant.controllerURL, commonConstant.GET_ALL_BUSINESSAREA);

        let userprofileData = JSON.parse(sessionStorage.getItem('userData'))
        let headquarterId = '';

        // if (userprofileData && userprofileData.userProfile && userprofileData.userProfile.headquarterId) {
        //     sessionStorage.setItem('headquarterId', JSON.stringify(userprofileData.userProfile.headquarterId))
        //     headquarterId = userprofileData.userProfile.headquarterId
        // }

       let item = JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_HEADQUARTER))
        let userHeadquarterTemp = JSON.parse(sessionStorage.getItem(commonConstant.USER_DEFAULT_HEADQUARTER_ID))
        item != null &&  item.map(
            headquarter => {
              console.log('matching: ' + headquarter.id + ": " + userHeadquarterTemp + " -- " + (headquarter.id == sessionStorage.getItem("headquarterId")))
              if (headquarter.id == userHeadquarterTemp) {
                console.log("this happened 1")
                userHeadquarterTemp = { id: headquarter.id, name: headquarter.name };
                sessionStorage.setItem('defaultUserHeadquarter', JSON.stringify(userHeadquarterTemp));
                this.setState({ userHeadquarter: userHeadquarterTemp })
                this.setState({ selectedHeadquarter: userHeadquarterTemp })
              }
            })


        //this.saveDatatoSession(commonConstant.controllerURL, commonConstant.GET_ALL_COMPANY);



    }

    async saveDatatoSession(baseURL, payload, operation) {

        //alert("payload before: "+JSON.stringify(payload))
        payload = { ...payload, operation, authorization: 'bearer ' + JSON.parse(sessionStorage.getItem('accessToken')) }
        // alert("payload after: "+JSON.stringify(payload))
        PostData(operation, payload, baseURL).then((result) => {

            // console.log("result from login service call : "+JSON.stringify(result.data.data));

            if (result.data) {


                //alert("this 3 called")
                sessionStorage.setItem(operation, JSON.stringify(result.data.data))
                //   alert("this 4 called")
                this.setState({ redirect: true });
                // alert("this 5 called")
            }
            else {
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


    navigateToDoctorVisitForm() {

        this.props.history.push('/doctorVisitForm');

        // let flag1 = sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID);
        // let flag2 = sessionStorage.getItem(commonConstant.GET_ALL_HEADQUARTER);
        // let flag3 = sessionStorage.getItem(commonConstant.GET_ALL_USER);
        // //let flag4 = sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID);
        // //let flag5 = sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID);
        // console.log(flag1 + ' - ' + flag2 + ' - ' + flag3)
        // if (flag1 && flag2 && flag3) {
        //     this.setState({ awaitingResponse: true })
        //     setTimeout(() => {
        //         console.log('timeout executing 1')
        //         this.setState({ awaitingResponse: false })
        //         this.props.history.push('/doctorVisitForm');
                
        //     }, 500);
            
            

        // }
        // else {

        //     this.setState({ awaitingResponse: true })
        //     console.log('timeout executing 2')
        //     setTimeout(() => {
        //         this.setState({ awaitingResponse: false })
        //     }, 3000);

        // }
        // console.log('waiting for data load : ' + this.i)


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
            <div className={this.state.awaitingResponse ? 'parentDisable' : ''}>
                { this.state.awaitingResponse
                    ?
                    <LoadingOverlay className='overlay-box' active='true' text='Loading....' spinner={<BeatLoader size='24px' color='blue' loading />} />
                    :  
                    <div>

                        <meta name="viewport" content="width=device-width, initial-scale = 1.0,maximum-scale=1.0, user-scalable=no" />

                        <Header {...this.props} />

                        <div className="container" style={{ height: '80%' }}>

                            <div className="row card_ratio">
                                <div className="col-md-6  col-sm-3">
                                    <div className="card">
                                        <img className="card-img-top photo" src={doctor_visit_logo} alt="doctor's visit logo" />

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
                                    <br />
                                    <br />
                                </div>

                            </div>
                            <footer>
                                <p class="footer">@copyright</p>
                            </footer>
                        </div>



                        <Footer />
                    </div>
                }
            </div>
        )
    }
}

export default Home;
