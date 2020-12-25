import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import patenLogo from '../../images/company_logo.png';
import doctor_visit_logo from '../../images/logog.png'
import './Home.css';


class Home extends Component {

    constructor(props){
        super(props);
        this.state= {
            redirect: false
        }
        this.logout = this.logout.bind(this);
    }



    logout(){
        sessionStorage.setItem('userData', '');
        sessionStorage.clear();
        this.setState({redirect: true});
        this.props.history.push('/')
    }

    render() {


    //     if(this.state.redirect){
    //       return (<Redirect to={'/login'} />)
    //    }
        //console.log(sessionStorage.getItem('userData'));
        if(!sessionStorage.getItem('userData')){
         return (<Redirect to={'/'} />)
    }

        return (
            <div>
            <meta name="viewport" content="width=device-width, initial-scale = 1.0,maximum-scale=1.0, user-scalable=no" /> 









<div>
            <nav className="navbar navbar-expand-md bg-primary navbar-dark nav-color">
            <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand main_logo "><img class ="company_logo"src={patenLogo}  alt="Paten Biotech logo"/></a>

                
      
    

                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                           <a className="nav-link ">Home</a>
                            
                        </li>
                        
                        <li className="nav-item">
                        <a className="nav-link "> Doctors visit</a>
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


        
        

        <div className="container">
              
              <div className="row card_ratio">
                  <div className="col-md-6">
                      <div className="card">
                          <img className="card-img-top img-fluid" src={doctor_visit_logo} alt="doctor's visit logo" />

                          <p className="doc_visit">Doctor's Visit</p>
                          <button className="add_doc_visit"> + Add Doctor's Visit</button>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="card">
                          <img className="card-img-top img-fluid" src={doctor_visit_logo} alt="doctor's visit logo" />

                          <p className="doc_visit">Chemist's Visit</p>
                          <button className="add_doc_visit"> + Add Chemist's Visit</button>
                      </div>
                  </div>
              </div>
              <footer>
                  <p class="footer">@copyright</p>
              </footer>
              </div>




              <div className="btn-group footer-button footer-button1">
  <button type="button" className="btn btn-primary button_Home_footer btn-group-sm"><i class="fa fa-home" aria-hidden="true"><br></br>Home</i></button>
  <button type="button" className="btn btn-primary button_Home_footer "><i class="fa fa-user-md" aria-hidden="true"><br/>Doctor's visit</i></button>
  <button type="button" className="btn btn-primary button_Home_footer"><i class="fa fa-cart-plus" aria-hidden="true"><br/>Chemist's visit</i></button>
</div>


















               

               
            </div>
        )
    }
}

export default Home;
