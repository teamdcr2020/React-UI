import React, { Component } from 'react';
import moment, { calendarFormat, RFC_2822 } from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Multiselect } from 'multiselect-react-dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectSearch from 'react-select-search';
import { Typeahead } from 'react-bootstrap-typeahead';
import plus from '../../images/plus.png'
import minus from '../../images/minus.png'

import Template from './DoctorVisitFormTemplate';
import Header from '../common/Header'
import Footer from '../common/Footer'
class DoctorVisitForm {
  constructor() {

    this.state = {
      businessAreaId: '',
      doctorId: '',
      visitedWith: new Array(),
      lastVisitedDate: '',
      productDetails: new Array(),
      physicianSample: new Array(),
      lbl: '',
      gift: new Array(),
      remarks: '',
      formCount: 1

    }
  }

}
class DoctorVisits extends Component {


  constructor() {
    super();
    this.state = {
      selectedDate: moment(),
      doctorVisitFormList: [new DoctorVisitForm()],
      noOfForms: 0,
      date: new Date()

    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.changeSampleName = this.changeSampleName.bind(this)
    this.singleSelections = this.singleSelections.bind(this)
    this.redirectToHome = this.redirectToHome.bind(this)
    this.addForms = this.addForms.bind(this)
  }

  componentDidMount() {

  }

  onSelect = (e) => {
    this.setState({ selectedDate: e })
  }

  changeSampleName(e) {
    alert("changeSampleName: " + e)
  }

  singleSelections(e) {
    alert("singleSelections: " + e)

  }

  redirectToHome() {
    this.props.history.push('/home')
  }

  handleDateChange(e) {
    this.setState({ date: e })
  }

  addForms() {
    {
      var list = [...this.state.doctorVisitFormList];
      console.log("list size:" + list.length)
      list.push(new DoctorVisitForm());
      console.log('form size before: ' + this.state.doctorVisitFormList.length)
      this.setState({ doctorVisitFormList: list });
      console.log('form size after: ' + this.state.doctorVisitFormList.length)
    }

  }


  render() {

    let formList = null;
    formList = (
      <div>

        {this.state.doctorVisitFormList.map((form, index) => {
          //   {this.setState({noOfForms: this.state.noOfForms+1})}
          return <Template id={index} size={this.state.doctorVisitFormList.length} />


        })}


      </div>


    );

    return (

      <div >

        <Header {...this.props} />

        <h2 style={{ textAlign: 'center' }}>Add Doctor Visits</h2>
        <br />
        <div class="form-group">

          <div class="col-sm-6  col-md-6 col-lg-6" style={{ display: 'inline-block' }}>
            <label class="col-sm-3  col-md-3 col-lg-3 control-label" style={{ width: "50%", paddingLeft: "0%" }}>Select Date</label>
            <DatePicker class="col-sm-3  col-md-3 col-lg-3" id='DCRDate' selected={this.state.date} style={{ width: "50%" }} onChange={this.handleDateChange} />
          </div>
        </div>

        <br />


        {formList}



        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default btn-primary custom-btn " onClick={this.addForms}>Add More </button>
          </div>
        </div>
        <br />
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default btn-primary custom-btn">Submit</button>
          </div>
        </div>
        <br />
        <br />



        <Footer />


      </div>

    )

  }
}

export default DoctorVisits;