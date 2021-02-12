import React, { Component } from 'react';
import moment, { calendarFormat, RFC_2822 } from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Multiselect } from 'multiselect-react-dropdown';
import DatePicker, {registerLocale }from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectSearch from 'react-select-search';
import { Typeahead } from 'react-bootstrap-typeahead';
import plus from '../../images/plus.png'
import minus from '../../images/minus.png'
import { BeatLoader } from 'react-spinners'
import LoadingOverlay from 'react-loading-overlay'
import Template from './DoctorVisitFormTemplate';
import Header from '../common/Header'
import Footer from '../common/Footer'
import * as commonConstant from '../common/CommonConstant'
import el from "date-fns/locale/en-IN";
registerLocale("el", el)
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
      formCount: 1,
      userHeadquarter: {},
      headquarterList: []

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
      date: new Date(),
      awaitingResponse:true

    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.changeSampleName = this.changeSampleName.bind(this)
    this.singleSelections = this.singleSelections.bind(this)
    this.redirectToHome = this.redirectToHome.bind(this)
    this.addForms = this.addForms.bind(this)
    this.waitForData = this.waitForData.bind(this)
  }

  componentWillMount() {
    this.waitForData()
    // var item = JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_HEADQUARTER)) 
    // var headquarterInSession = sessionStorage.getItem('headquarterId');
    // console.log("item: "+JSON.stringify(headquarterInSession))
    // this.setState({userHeadquarter: headquarterInSession},()=>console.log('userHeadquarter'+JSON.stringify(this.state.userHeadquarter)))
    // this.setState({headquarterList: item},()=>console.log('headquarterlist'+JSON.stringify(this.state.headquarterList)));
  }

  waitForData() {
    let flag1 = sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID);
    let flag2 = sessionStorage.getItem(commonConstant.GET_ALL_HEADQUARTER);
    let flag3 = sessionStorage.getItem(commonConstant.GET_ALL_USER);
    //let flag4 = sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID);
    //let flag5 = sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID);
   // console.log(flag1 + ' - ' + flag2 + ' - ' + flag3)
    if (flag1 && flag2 && flag3) {
      this.setState({ awaitingResponse: false })
      setTimeout(() => {
        console.log('timeout executing 1')
        this.props.history.push('/doctorVisitForm');
      }, 5000);

      

    }
    else {
      console.log('timeout executing 2')
      this.setState({ awaitingResponse: true })
      setTimeout(() => {
        this.setState({ awaitingResponse: false })
      }, 3000);

    }
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
        { this.state.awaitingResponse
          ?
          <LoadingOverlay className='overlay-box' active='true' text='Loading....' spinner={<BeatLoader size='24px' color='blue' loading />} />
          :

          <div>
            <Header {...this.props} />

            <h2 style={{ textAlign: 'center' }}>Add Doctor Visits</h2>
            <br />
            <div class="form-group">

              <div class="col-sm-6  col-md-6 col-lg-6" style={{ display: 'inline-block' }}>
                <label class="col-sm-3  col-md-3 col-lg-3 control-label" style={{ width: "50%", paddingLeft: "0%" }}>Select Date</label>
                <DatePicker class="col-sm-3  col-md-3 col-lg-3" id='DCRDate' selected={this.state.date} style={{ width: "50%" }} locale='in' onChange={this.handleDateChange} />
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
        }
      </div>


    )

  }
}

export default DoctorVisits;