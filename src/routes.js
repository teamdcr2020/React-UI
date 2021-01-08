import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


// import Welcome from '././components/Welcome/Welcome';
import Home from '././components/Home/Home';
import Login from '././components/Login/Login';
import DoctorVisit from '././components/DCR/DoctorVisit';

// import Signup from '././components/Signup/Signup';
// import NotFound from '././components/NotFound/NotFound';


const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/home" component={Home}/>
            <Route path="/doctorVisitForm" component = {DoctorVisit}/>

            {/* <Route path="/Signup" component={Signup}/> */}
            {/* <Route path="*" component={NotFound}/> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;