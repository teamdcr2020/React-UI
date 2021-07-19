import React, { Component, useState } from 'react';
import moment, { calendarFormat, RFC_2822 } from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BeatLoader } from 'react-spinners'
import LoadingOverlay from 'react-loading-overlay'
import Template from './DoctorVisitFormTemplate';
import Header from '../common/Header'
import Footer from '../common/Footer'
import * as commonConstant from '../common/CommonConstant'
import el from "date-fns/locale/en-IN";
import { nanoid } from 'nanoid';
import { PostData } from '../../services/PostData';

registerLocale("el", el)


class DoctorVisitForm {
  constructor() { }
  id = '';
  businessArea = '';
  doctor = {};
  visitedWith = [];
  lastVisitedDate = {};
  productDetails = [];
  physicianSample = [];
  lbl = '';
  gift = [];
  remarks = '';
  formCount = 1;
  headquarter = []



}

class DoctorVisits extends Component {


  constructor() {
    super();
    this.state = {
      selectedDate: moment(),
      doctorVisitFormList: [React.createRef()],
      doctorVisitFormData: [],
      noOfForms: 0,
      date: new Date(),
      awaitingResponse: true,
      datePickerColor: 'react-datepicker__input-container',
      submitError: false,
      formValidity: false

    }

    this.handleDateChange = this.handleDateChange.bind(this)
    this.changeSampleName = this.changeSampleName.bind(this)
    this.singleSelections = this.singleSelections.bind(this)
    this.redirectToHome = this.redirectToHome.bind(this)
    this.addForms = this.addForms.bind(this)
    this.waitForData = this.waitForData.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.aggregateFormDataForSubmission = this.aggregateFormDataForSubmission.bind(this)
    this.getTemplateData = this.getTemplateData.bind(this)
  }

  componentDidMount() {
    this.waitForData()
    sessionStorage.removeItem('filledDoctors');

    var n = sessionStorage.length;
    while (n--) {
      var key = sessionStorage.key(n);
      if (key.startsWith("selectedPhysicanSample")) {
        sessionStorage.removeItem(key);
      }
    }

    
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
        console.log('timeout executing 1 --')
        this.props.history.push('/doctorVisitForm');
      }, 5000);



    }
    else {
      console.log('timeout executing 2')
      this.setState({ awaitingResponse: true })
      setTimeout(() => {
        this.setState({ awaitingResponse: false })
      }, 5000);

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
    this.setState({ date: e }, () => {

      if (moment().isBefore(this.state.date)) {
        this.setState({ datePickerColor: 'error_react-datepicker__input-container' })
      }
      else {
        this.setState({ datePickerColor: 'react-datepicker__input-container' })
      }

    })


  }

  addForms(e) {
    {

      let valid = true;
      for (let j = 0; j < this.state.doctorVisitFormList.length; j++) {
        let formValidity = this.state.doctorVisitFormList[j].current.validateForm();
        valid = valid & formValidity
        this.state.doctorVisitFormList[j].current.hideTemplate(j);
      }
      if (moment().isBefore(this.state.date)) {
        valid = false;
        this.setState({ datePickerColor: 'error_react-datepicker__input-container' })
      }
      this.getTemplateData(e);


      if (valid) {
        this.setState({submitError: false})
        this.setState({formValidity: true})
        //document.getElementById('logs').innerHTML  = 'Add forms triggered';
      //  let logsfield = '<br/> Add forms triggered' + document.getElementById('logs').innerHTML;

        var list = [...this.state.doctorVisitFormList];
        //logsfield = logsfield + "1. ";
        //document.getElementById('logs').innerHTML = logsfield
        //console.log("list size:" + list.length)
        // for (let i = 0; i < list.length; i++) {
        //   this.showHide({ index: i }, true)
        // }

        list.push(React.createRef());
    //    logsfield = logsfield + "2. ";
       // document.getElementById('logs').innerHTML = logsfield
        //console.log('form size before: ' + this.state.doctorVisitFormList.length)\
        e.preventDefault();
        this.setState({ doctorVisitFormList: [...list] });
        //console.log('form size after: ' + this.state.doctorVisitFormList.length)
       // document.getElementById('logs').innerHTML = logsfield + "3. "
      }

      return valid;
    }
  }


  removeItem(item) {
    console.log('removeTemplate called for index: ' + JSON.stringify(item))
    if (this.state.doctorVisitFormList[item]) {
      //this.state.doctorVisitFormList[item].current.hideTemplate();
      let items = [...this.state.doctorVisitFormList]
      items.splice(item, 1);
      // document.getElementById("form"+index.index).style.display= "none";
      //let filledDoctors = JSON.parse(sessionStorage.getItem('filledDoctors'));

      this.setState({ doctorVisitFormList: items })
    }

  }

  aggregateFormDataForSubmission(e) {
    let valid = true;
    let submissionObject = {}
    let operation = 'adddcr';
    let userprofileData = JSON.parse(sessionStorage.getItem('userData'))
    let userId = null;
    let url = "https://khttyrarnl.execute-api.us-east-1.amazonaws.com/dev/dcrinfo";
    let payload = {};
    if (userprofileData) {

      if (userprofileData && userprofileData.userProfile && userprofileData.userProfile.id) {
        sessionStorage.setItem(commonConstant.USER_DEFAULT_HEADQUARTER_ID, JSON.stringify(userprofileData.userProfile.headquarterId))
        userId = userprofileData.userProfile.id;
      }

    }
    let entryDate = moment(this.state.date).format('DD-MM-YYYY hh:mm:ss');
    submissionObject.operation = operation;
    submissionObject.userId = userId;
    submissionObject.entryDate = this.state.date;
    submissionObject.dcrrow = [];
    submissionObject.updatedBy = userId;

    console.log(JSON.stringify(submissionObject));
    console.log(userprofileData + '    ' + userId);
    let allFormsValid = true;
    for (let j = 0; j < this.state.doctorVisitFormList.length; j++) {
      if (this.state.doctorVisitFormList[j].current && this.state.doctorVisitFormList[j].current != null) {
        let formValidity = this.state.doctorVisitFormList[j].current.validateForm();
        allFormsValid = allFormsValid & formValidity
        if (formValidity) {
          let form = (this.state.doctorVisitFormList[j].current.returnFilledForm())
          console.log("form: " + JSON.stringify(form))
          submissionObject.dcrrow.push(form);
          console.log("Filled doctor data: " + JSON.stringify(submissionObject));
        }
      }
    }
    if (submissionObject.dcrrow && submissionObject.dcrrow.length > 0 && allFormsValid) {
      this.setState({submitError: false})
      payload = submissionObject;
      payload = { ...payload, operation, authorization: 'bearer ' + JSON.parse(sessionStorage.getItem('accessToken')) }
      console.log("final payload: " + JSON.stringify(payload))
      PostData(operation, payload, url).then((result) => {
        console.log("DCR submission response: " + JSON.stringify(result))
        if(result && result.data && result.data.success)
        {
          alert("successfully submitted "+this.state.doctorVisitFormList.length+" Doctor Visits")
          this.props.history.push('/home');
        }

      });
    }
    else
    {
      this.setState({submitError: true})
    }
  }

  getTemplateData(e) {
    let existingData = null;
    for (let j = 0; j < this.state.doctorVisitFormList.length; j++) {
      if (this.state.doctorVisitFormList[j].current && this.state.doctorVisitFormList[j].current != null) {
        if (this.state.doctorVisitFormList[j] && this.state.doctorVisitFormList[j].current) {
          console.log("Filled doctor data: " + JSON.stringify(this.state.doctorVisitFormList[j].current.returnFilledForm()));
          let newForm = this.state.doctorVisitFormList[j].current.returnFilledForm();
          existingData = [...this.state.doctorVisitFormData];
          if (existingData.length == 0) {
            existingData.push(newForm)
            console.log("size is 1")
          }
          else {
            console.log("size is more than one")
            existingData.map((form, index) => {
              console.log('Template ID: ' + form.templateId)
              let exists = false;
              if (form.entityId !== newForm.entityId && form.entityType !== newForm.entityType && form.headquarterId !== newForm.headquarterId && form.businessareaId !== newForm.businessareaId) {
                exists = true

              }
              if (!exists)
                existingData.push(newForm);
            })
          }
          this.setState({ doctorVisitFormData: existingData })

          console.log("filled form data (may not be validated) size: " + existingData.length + "  data --  " + JSON.stringify(existingData));

        }
      }
    }
  }

  render() {

    if (!sessionStorage.getItem('userData')) {
      return (<Redirect to={'/'} />)
    }
    let formList = null;
    let counter = 1;
    formList = (
      <div>

        {this.state.doctorVisitFormList.map((form, index) => {
          console.log("this is executed " + index)
          //   {this.setState({noOfForms: this.state.noOfForms+1})}
          //console.log('index while population of doctor visit template' + index);
          return (



            <Template formData={this.state.doctorVisitFormData[index]} id={'template' + index} serial={index} removeFromParent={this.removeItem} key={index} size={this.state.doctorVisitFormList != null && this.state.doctorVisitFormList.length} /*showHideName={this.showHideName}*/ ref={this.state.doctorVisitFormList[index]} />


          )
        })}

      </div>

    );

    return (

      <div >
        {this.state.awaitingResponse
          ?
          <LoadingOverlay className='overlay-box' active='true' text='Loading....' spinner={<BeatLoader size='24px' color='blue' loading />} />
          :

          <div>
            <Header {...this.props} />

            <h2 style={{ textAlign: 'center' }}>Add Doctor Visits</h2>
            <br />
            <div className="form-group">

              <div className="col-sm-6  col-md-6 col-lg-6" style={{ display: 'inline-block' }}>
                <label className="col-sm-3  col-md-4 col-lg-4 control-label" style={{ width: "40%", paddingLeft: "0%" }}>Select Date</label>
                <DatePicker className={"col-sm-3  col-md-8 col-lg-8  " + this.state.datePickerColor} id='DCRDate' selected={this.state.date} style={{ width: "60%" }} locale='el' dateFormat="dd/MM/yyyy" onChange={this.handleDateChange} />
              </div>
            </div>

            <br />


            {formList}

            

            <div className="form-group">
              <br /><br />
              <div className="col-sm-offset-2 col-sm-10">
                {this.state.submitError &&<label id='logs'  style={{ color: 'red', width: "100%" , textAlign: 'center'}} > Please correct the errors </label> }
                {/* <button type="submit" className="btn btn-default btn-primary custom-btn" style={{ width: "49%" }} onClick={() => this.removeTemplate()}> Remove </button>  */}
                <button type="button" style={{ width: "49%" }} className="btn btn-default btn-primary custom-btn " onClick={(e) => this.addForms(e)}>Add More </button>
                <button type="submit" style={{ width: "49%" }} className="btn btn-default btn-primary custom-btn" onClick={(e) => this.aggregateFormDataForSubmission(e)}>Submit</button>
              </div>
            </div>
            <br />
            {/* <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default btn-primary custom-btn">Submit</button>
              </div>
            </div> */}
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