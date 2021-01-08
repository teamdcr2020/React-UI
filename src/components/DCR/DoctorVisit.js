import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import React, {Component} from 'react';
import Calendar from 'react-calendar-pane';
import moment, { calendarFormat } from 'moment';
import date from 'react-calendar-pane';
import { Dropdown } from 'react-bootstrap';


class DoctorVisit extends Component {

    constructor(){
        super();
        this.state={
          selectedDate:moment(),
          location: "default business area location",
          doctorName: " drop down of all doctors in that location",
          visitedWith: "drop down of the employees",
          lastVisitedDate: "make a backend call",
          productDetails : "array of the products",
          physicianSample:"Array of the productSample",
          lbl: true,
          gift: "array of the gifts",
          remarks: "comments added for that doctor visit"
        }
      }
      onSelect=(e)=>{
        this.setState({selectedDate:e})
      }

    render(){
      return(
          <form name='doctor visit form'>
        <div>
            <div className="App">
            <h3>Add Doctor visit</h3>
            <p> The date you've selected is: {this.state.selectedDate.format('YYYY-MM-DD')} </p>
             <Calendar date={moment()} onSelect={this.onSelect} />
            <label>Location:
              <select name='location' id='businessAreaLocation'>
                <option key="">select</option>{/* 
                {countries.map(country => (
            <option key={country}>{country}</option>
          ))} */}
              </select>
            </label> <br/>

            <lable  >
            Doctor: 
            <select name='doctorName1' id='doctorName1'>
                <option key="">select</option>{/* 
                {countries.map(country => (
            <option key={country}>{country}</option>
          ))} */}
              </select>
            </lable><br/>


            <lable  >
              Visited With: 
            <ReactMultiSelectCheckboxes name='visitedWith1' id='visitedWith1'
              options={[{label: "All", value: "*"}, {label: "one", value: "1"}]}
              //value={selectedOptions}
             // onChange={onChange}
              //setState={setSelectedOptions}
            />
            </lable><br/>



            <lable  >
            Last Visited Date: 
            <input name='lvd1' id= 'lvd1' readonly/>
            </lable><br/>



            <lable  >
            Products: 
            <ReactMultiSelectCheckboxes name='productDetails1' id='productDetails1'
              options={[{label: "All", value: "*"}, {label: "one", value: "1"}]} />
            </lable><br/>

            <lable name='physicianSample1' id='physicianSample1' >

            <input name='product1' id= 'product1' placeholder='input product' /> 
            <input name='productQ1' id= 'productQ1' placeholder='input quantity' /> 
            </lable><br/>

            
            <lable  >
            LBL: 
            <input type = 'radio' name='LBL1value' id= 'LBL1value'  value='Yes' required/>
            <input type = 'radio' name='LBL1value' id= 'LBL2value'  value='No' required/>
            </lable><br/>

            
            <lable >
            Gift: 
            <ReactMultiSelectCheckboxes  name='gift1' id='gift1'
              options={[{label: "All", value: "*"}, {label: "one", value: "1"}]}
              //value={selectedOptions}
             // onChange={onChange}
              //setState={setSelectedOptions}
            />
            </lable><br/>


            
            <lable  >
            Remarks: 
            <input name='remarks1' id='remarks1' />
            </lable><br/>
        </div>

      </div>
      </form>
      )
      
    }
}

export default DoctorVisit;