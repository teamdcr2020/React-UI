
import React ,{Component} from 'react';
import './doc_contact.css';


class Doc_contact extends Component {
  render(){
    return(

  

<form>
  <div className="container">
  <h2>Register Form</h2>
  <div className="input-container">
    <i className="fa fa-user icon"></i>
    <input className="input-field" type="text" placeholder="Doctor's Name" name="docname"/>
  </div>

  <div className="input-container">
    <i className="fa fa-envelope icon"></i>
    <input className="input-field" type="text" placeholder="Registration Id" name="regd_id"/>
  </div>

  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="text" placeholder="Speciality" name="speciality"/>
  </div>
 
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="email" placeholder="Email" name="email"/>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="number" placeholder="Phone Number" name="ph_no"/>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="number" placeholder="Alternamte Phone Number" name="al_pn_no"/>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    
    <div class="dropdown">
  <button class="dropbtn">Business Area</button>
  <div class="dropdown-content">
    <a href="#">1</a>
    <a href="#">2</a>
    <a href="#">3</a>
  </div>
</div>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="text" placeholder="Address Line 1" name="address1"/>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="text" placeholder="Address Line 2" name="address2"/>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="text" placeholder="Landmark" name="landmark"/>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="text" placeholder="City" name="city"/>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="text" placeholder="State" name="state"/>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="number" placeholder="Pincode" name="pincode "/>
  </div>
  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="direction" placeholder="Direction" name="direction "/>
  </div>  
  


  <button type="submit" className="btn">Register</button>
  </div>
</form>
  );
}

}

export default Doc_contact;
