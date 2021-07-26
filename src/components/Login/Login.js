import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';
import './Login.css'
import { TextField } from '@material-ui/core';
import styled from "styled-components";
import patenLogo from '../../images/company_logo.png';
import { BeatLoader } from 'react-spinners'
import LoadingOverlay from 'react-loading-overlay'
import jwt_decode from 'jwt-decode'
import * as commonConstant from '../common/CommonConstant'
import moment from 'moment';


const LoginToAccount = styled.h1`
  width: 100%;
  font-family: Roboto;
  font-size: 22px;
  font-weight: bolder;
  color: #ffffff;
  display: flex;
  justify-content: center;
  padding-bottom: 25px;
`;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false,
            loginFailed: false,
            awaitingResponse: false,
            errorOccured: false,
            operation: 'login',
            errorMessage: 'none'
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
        this.updateSessionData = this.updateSessionData.bind(this);
    }

    async saveDatatoSession(baseURL, payload, operation) {

        //alert("payload before: "+JSON.stringify(payload))
        payload = { ...payload, operation, authorization: 'bearer ' + JSON.parse(sessionStorage.getItem('accessToken')) }
         console.log("payload for operation: "+operation+'  --  '+JSON.stringify(payload))
        PostData(operation, payload, baseURL).then((result) => {

             console.log("result from login service call : "+operation+"  :  "+JSON.stringify(result.data.data));

            if (result.data) {

                sessionStorage.setItem(operation, JSON.stringify(result.data.data))

                return result;
            }
            else {
                console.log("invalid data format")
            }
        }).catch(error => console.log(JSON.stringify(error)));

    }

    doRedirect()
    {
        this.setState({ awaitingResponse: false });
        this.setState({ redirect: true });
        this.props.history.push('/home')
    }

    updateSessionData() {
        const promises = [];
        let userprofileData = JSON.parse(sessionStorage.getItem('userData'))
        let headquarterId = '';
        if (userprofileData && userprofileData.userProfile && userprofileData.userProfile.headquarterId) {
            sessionStorage.setItem(commonConstant.USER_DEFAULT_HEADQUARTER_ID, JSON.stringify(userprofileData.userProfile.headquarterId))
            headquarterId = userprofileData.userProfile.headquarterId
        }
        promises.push(this.saveDatatoSession(commonConstant.controllerURL, this.state, commonConstant.GET_ALL_HEADQUARTER));
        promises.push(this.saveDatatoSession(commonConstant.controllerURL, this.state, commonConstant.GET_ALL_GIFT));
        promises.push(this.saveDatatoSession(commonConstant.controllerURL, this.state, commonConstant.GET_ALL_PRODUCT));
        promises.push(this.saveDatatoSession(commonConstant.controllerURL, this.state, commonConstant.GET_ALL_USER));
        promises.push(this.saveDatatoSession(commonConstant.controllerURL, { id: headquarterId }, commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID));
        promises.push(this.saveDatatoSession(commonConstant.controllerURL, { 'userId': userprofileData.userProfile.id, 'entryDate': moment() }, commonConstant.GET_DCR_BY_USER_AND_DATE));

        return Promise.all(promises).then(() => {
            let totalList = sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID);
            let headquarterList = sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID);
            setTimeout(() => {
               
                if(headquarterList == null || totalList == null)
                {
                    setTimeout(()=>{
                        if(headquarterList == null || totalList == null)
                        {
                            setTimeout(()=>{
                                console.log('Login waited third timeout')
                                this.doRedirect();
                            }, 5000)
                        }
                        else
                        {
                            console.log('Login waited second timeout')
                            this.doRedirect();
                        }
                       
                    }, 4000)
                }
                else
                {
                    console.log('Login waited first timeout')
                    this.doRedirect();
                }
                
            },

                4000);
        });

    }
    login() {

        if (this.state.username && this.state.password) {
            this.setState({ awaitingResponse: true });
            //console.log(this.state.awaitingResponse)
            PostData('login', this.state, commonConstant.controllerURL).then((result) => {

                //     console.log("result from login service call : " + JSON.stringify(result));

                if (result) {
                    if (result.message && result.message.indexOf('401') >= 0) {
                        this.setState({ awaitingResponse: false });
                        this.setState({ loginFailed: true })
                    }
                    else if (result.data) {
                        // console.log("result.data.token"+JSON.parse(result.data.substring(1, result.data.length-1 )).token);
                        sessionStorage.setItem('accessToken', JSON.stringify(result.data.token))
                        // sessionStorage.setItem('userData', JSON.stringify(jwt_decode(JSON.parse(result.data.substring(1, result.data.length-1 )).token)))
                        console.log(JSON.stringify(jwt_decode(result.data.token)))
                        sessionStorage.setItem('userData', JSON.stringify(jwt_decode(result.data.token)))
                        this.updateSessionData()
                        // End: Setting values in session

                    }
                    console.log("result.data: ||" + result.data + "||");

                }
                else {
                    this.setState({ errorOccured: true })
                }
            }).catch(error => this.handleErrorResponse(error));

        }

    }

    handleErrorResponse(error) {
        this.setState({ loginFailed: false })
        this.setState({ errorOccured: true })
        console.log("login failed : " + error);
        console.log(JSON.stringify(error));

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        //this.setState({username:userinput});
        //this.setState({password:userinput});
    }
    componentDidMount() {
        sessionStorage.setItem('userData', '');
        sessionStorage.clear();
    }

    render() {

        //console.log(this.state.redirect);
        //console.log(sessionStorage.getItem('userData'));
        if (this.state.redirect) {
            return (<Redirect to={'/home'} />)
        }

        if (sessionStorage.getItem('userData')) {
            //  return (<Redirect to={'/home'}/>)
        }

        return (
            <>
                <div className="login_form" style={{ height: "100%" }} className={this.state.awaitingResponse ? 'parentDisable' : ''}>
                    <div id="formContent">
                        <div className="first">
                            <img src={patenLogo} className='oval' alt="Paten Biotech logo" />
                        </div>
                        <br />
                        <LoginToAccount>Paten Biotech Pvt Ltd.</LoginToAccount>
                        <input type="text" id="username-field" className="one" label="Username" name="username" onChange={this.onChange} type="text" placeholder="User Id" /> <br />
                        <input type="text" id="password-field" className="one1" label="Password" name="password" onChange={this.onChange} type="password" placeholder="password" /> <br />
                        <input type="submit" className="fourth two" value="login" onClick={this.login} disabled={this.state.awaitingResponse} />
                        {this.state.loginFailed && <div style={{ color: "red" }}>Login Failed! Invalid Username or password</div>}
                        {this.state.errorOccured && <div style={{ color: "red" }}>Something went wrong, Please contact support.</div>}
                        <LoadingOverlay className='overlay-box' active={this.state.awaitingResponse} spinner={<BeatLoader size='24px' color='blue' loading />} />


                        <a className="three" href="#">Forgot Password?</a>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;