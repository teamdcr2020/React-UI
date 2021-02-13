import React, { Component } from 'react';
import moment, { calendarFormat, RFC_2822 } from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import DatePicker, {registerLocale }from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BeatLoader } from 'react-spinners'
import LoadingOverlay from 'react-loading-overlay'
import Template from './DoctorVisitFormTemplate';
import Header from '../common/Header'
import Footer from '../common/Footer'
import * as commonConstant from '../common/CommonConstant'
import el from "date-fns/locale/en-IN";
import Collapse from 'react-bootstrap/Collapse';
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
      headquarterList: [],
      collapseVisit: false

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
    this.setState({ date: e })
  }

  addForms() {
    {
      var list = [...this.state.doctorVisitFormList];
      //console.log("list size:" + list.length)
      for(let i=0; i<list.length; i++)
      {
        this.showHide({index: i}, true)
      }
      list.push(new DoctorVisitForm());

      //console.log('form size before: ' + this.state.doctorVisitFormList.length)
      this.setState({ doctorVisitFormList: list });
      //console.log('form size after: ' + this.state.doctorVisitFormList.length)
    }

  }
  showHide(index, hideFlag) {
    
    let templateId = 'template'+index.index;
    console.log('showhiede for: '+templateId+' -- '+JSON.stringify(index))
    if(document.getElementById(templateId) != null)
    {
    if(document.getElementById(templateId).style.display == "none" && !hideFlag)
    document.getElementById(templateId).style.display  = "block"
    else
    document.getElementById(templateId).style.display = "none";
    }
  }

  showHideName(id, name)
  {
    if(name != 'undefined' && name.length > 0)
    {
    let findIndex = parseInt(id.substring(8))
    //console.log('index is :'+id.substring(8)+JSON.stringify(name))
    let inner = document.getElementById('showHide'+findIndex).innerHTML;
    document.getElementById('showHide'+findIndex).innerHTML = (findIndex+1 )+'. Doctor Visit : '+ name[0].name;
    }
  }

  removeTemplate(index)
  {
    console.log('removeTemplate called for index: '+JSON.stringify(index))
    let visitList = this.state.doctorVisitFormList;
    for(let i=0; i<visitList.length; i++)
    {
      if(i===index.index)
      {
        visitList.splice(i,1)
      }
      
    }

    this.setState({doctorVisitFormList:visitList})

  }
  render() {
    
    if (!sessionStorage.getItem('userData')) {
      return (<Redirect to={'/'} />)
  }
    let formList = null;
    formList = (
      <div>

        {this.state.doctorVisitFormList.map((form, index) => {
          //   {this.setState({noOfForms: this.state.noOfForms+1})}
          //console.log('index while population of doctor visit template'+index);
          return <div> <br/> 
          <button type="submit"  className ="btn btn-default btn-primary custom-btn" style ={{ width: "9%" }} onClick={()=> this.removeTemplate({index})}> X </button> 
           <a    id={'showHide'+index} onClick={()=> this.showHide({index})} className="btn btn-default btn-primary custom-btn" style ={{ width: "90%" }}  >  {index +1}. Doctor Visit </a>
          <Template id={'template'+index} size={this.state.doctorVisitFormList != null && this.state.doctorVisitFormList.length} showHideName = {this.showHideName} />
          
          </div>
         


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
            <div className ="form-group">

              <div  className ="col-sm-6  col-md-6 col-lg-6" style={{ display: 'inline-block' }}>
                <label  className ="col-sm-3  col-md-4 col-lg-4 control-label" style={{ width: "40%", paddingLeft: "0%" }}>Select Date</label>
                <DatePicker  className ="col-sm-3  col-md-8 col-lg-8" id='DCRDate' selected={this.state.date} style={{ width: "60%" }} locale='el' dateFormat="dd/MM/yyyy" onChange={this.handleDateChange} />
              </div>
            </div>

            <br />


            {formList}



            <div  className ="form-group">
            <br/><br/>
              <div  className ="col-sm-offset-2 col-sm-10">
              <button type="submit"  className ="btn btn-default btn-primary custom-btn" style ={{ width: "49%" }} onClick={()=> this.removeTemplate()}> Remove </button>  <button type="submit" style ={{ width: "49%" }} className ="btn btn-default btn-primary custom-btn " onClick={this.addForms}>Add More </button>
              </div>
            </div>
            <br />
            <div  className ="form-group">
              <div  className ="col-sm-offset-2 col-sm-10">
                <button type="submit"  className ="btn btn-default btn-primary custom-btn">Submit</button>
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