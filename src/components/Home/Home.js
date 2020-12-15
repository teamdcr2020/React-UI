import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

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
                <h2>Home Page</h2>

                <button type='button' onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default Home;
