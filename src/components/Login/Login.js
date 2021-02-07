import React, {Component} from 'react';
import {PostData} from '../../services/PostData';
import {Redirect} from 'react-router-dom';
import './Login.css'
import { TextField } from '@material-ui/core';
import styled from "styled-components";
import patenLogo from '../../images/company_logo.png';
import {BeatLoader } from 'react-spinners'
import LoadingOverlay from 'react-loading-overlay'
import jwt_decode from 'jwt-decode'
import * as commonConstant from '../common/CommonConstant'


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

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            redirect: false,
            loginFailed: false,
            awaitingResponse:false,
            errorOccured:false,
            operation:'login',
            errorMessage:'none'
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
    }

    login() {
        
        if (this.state.username && this.state.password) {
            this.setState({ awaitingResponse: true });
            //console.log(this.state.awaitingResponse)
            PostData('login', this.state, commonConstant.controllerURL).then((result) => {
                this.setState({ awaitingResponse: false });
           //     console.log("result from login service call : " + JSON.stringify(result));

                if (result) {
                    if (result.message && result.message.indexOf('401') >= 0) {
                        this.setState({ loginFailed: true })
                    }
                    else if (result.data ) {
                        // console.log("result.data.token"+JSON.parse(result.data.substring(1, result.data.length-1 )).token);
                        sessionStorage.setItem('accessToken', JSON.stringify(result.data.token))
                        // sessionStorage.setItem('userData', JSON.stringify(jwt_decode(JSON.parse(result.data.substring(1, result.data.length-1 )).token)))
                        console.log(JSON.stringify(jwt_decode(result.data.token)))
                        sessionStorage.setItem('userData', JSON.stringify(jwt_decode(result.data.token)))
                        this.setState({ redirect: true });
                        this.props.history.push('/home');
                    }
                    console.log("result.data: ||"+ result.data +"||");
                    
                }
                else {
                    this.setState({ errorOccured: true })
                }
            }).catch(error => this.handleErrorResponse(error));

        }

    }

    handleErrorResponse(error)
    {
        this.setState({loginFailed: false})
        this.setState({errorOccured: true})
        console.log("login failed : "+error);
        console.log(JSON.stringify(error));
        
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
        //this.setState({username:userinput});
        //this.setState({password:userinput});
    }
    componentWillMount()
    {    
        //alert(document.body.style.background )
        //document.body.style.background = "#024B65";
    }

    render(){

        //console.log(this.state.redirect);
        //console.log(sessionStorage.getItem('userData'));
        if(this.state.redirect){
            return (<Redirect to={'/home'} />)
        }

        if(sessionStorage.getItem('userData')){
            return (<Redirect to={'/home'}/>)
          }

        return(
            <>
                <div className="login_form" style={{height:"100%"}} className = {this.state.awaitingResponse ? 'parentDisable' :'' }>
                <div id="formContent">
                <div className="first">
                <img src={patenLogo} class="oval" alt="Paten Biotech logo"/>    
                </div>            
                <LoginToAccount>Login</LoginToAccount>
                    <input type="text" id="username-field" className="one" label="Username" name="username" onChange={this.onChange} type="text" placeholder="login"  /> <br/>
                    <input type="text" id="password-field"  className="one1" label="Password" name="password" onChange={this.onChange} type="password"  placeholder="password"   /> <br/>
                    {/* <input type = "text" name= "username" onChange={this.onChange} />
                    <input type="password" name ="password" placeholder="password" onChange={this.onChange} /> */}
                    <input type="submit" className="fourth two" value="login" onClick={this.login} disabled={this.state.awaitingResponse}/>
                    {this.state.loginFailed &&  <div style = {{color: "red"}}>Login Failed! Invalid Username or password</div>}
                    {this.state.errorOccured &&  <div style = {{color: "red"}}>Something went wrong, Please contact support.</div>}
                    <LoadingOverlay className='overlay-box' active={this.state.awaitingResponse} spinner={<BeatLoader size='24px' color='blue' loading/>} />
                    
                        
                    <a className="three" href="#">Forgot Password?</a>
                </div>
                </div>
            </>
        );
    }
}

export default Login;