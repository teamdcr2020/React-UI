import React, { Component, useState } from 'react';
import moment, { calendarFormat } from 'moment';
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
import patenLogo from '../../images/company_logo.png';
import * as commonConstant from '../common/CommonConstant'

export class Template extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: moment(),
      doctorVisitFormList: new Array(),
      date: new Date(),
      headquarterList: [],
      userHeadquarter: '',
      selectedHeadquarter: { id: 0, name: 'Headquarter' },
      locationList: [],
      userLocation:'',
      selectedLocation:{id:0, name:'Location'}
    }
    this.handleHeadquarterSelection = this.handleHeadquarterSelection.bind(this)
    this.getLocationMapFromSession = this.getLocationMapFromSession.bind(this)
    this.handleLocationSelection = this.handleLocationSelection.bind(this)

  }

  componentDidMount() {
    var item = JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_HEADQUARTER))
    var headquarterInSession = sessionStorage.getItem('headquarterId');
    this.setState({ userHeadquarter: headquarterInSession })
    this.setState({ headquarterList: item });
    // console.log(JSON.stringify(this.state.selectedHeadquarter));
    this.getLocationMapFromSession();

  }


  getLocationMapFromSession() {
    var totalList = JSON.parse(sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID));
    //alert(typeof(totalList))
    let businessAreaList = [];
    let uniqueList = []

    for (var i = 0; i < totalList.length; i++) {
      var found = false;
      for (var j = 0; j < businessAreaList.length; j++) {
        if (businessAreaList[j].id === totalList[i].businessareaId) {
          found = true;
          break;
        }
      }
      if (!found) {
        businessAreaList.push({ id: totalList[i].businessareaId, name: totalList[i].businessareaName })
      }
    }

    this.setState({ locationList: businessAreaList });

  }

  handleHeadquarterSelection(e) {

    var selectedHeadQuarterName = [];

    for(var i=0; i<this.state.headquarterList.length; i++)
    {
     // alert(this.state.headquarterList[i].id==e)
      if(this.state.headquarterList[i].id==e)
      {
        selectedHeadQuarterName = this.state.headquarterList[i];
        break;
      }
    }
  //  alert(JSON.stringify(selectedHeadQuarterName));
    this.setState({ selectedHeadquarter: selectedHeadQuarterName },()=> alert(JSON.stringify(this.state.selectedHeadquarter))) 
  }

  handleLocationSelection(e) {

    var selectedLocationName = {};
    
    for(var i=0; i < this.state.locationList.length; i++)
    {
     // alert(this.state.headquarterList[i].id==e)
      if(this.state.locationList[i].id==e)
      {
        selectedLocationName = this.state.locationList[i];
        break;
      }
    }
  //  alert(JSON.stringify(selectedHeadQuarterName));
    this.setState({ selectedLocation: selectedLocationName },()=> alert(JSON.stringify(this.state.selectedLocation))) 
  }

  render() {

    let headquarterItems = null;
    let locationItems = null;
    headquarterItems = (
      <DropdownButton
        alignRight
        title={this.state.selectedHeadquarter.name}
        id="headquarterDropdown"
        class="col-sm-10 control-label w-100 .custom-color "
        style={{ backgroundColor: '#024B65' }}
        onSelect={this.handleHeadquarterSelection}
      >
        {this.state.headquarterList.map((headquarter, index) => { return <Dropdown.Item eventKey={headquarter.id}>{headquarter.name}</Dropdown.Item> })}

      </DropdownButton>
    )
    locationItems = (
      <DropdownButton
        alignRight
        title={this.state.selectedLocation.name}
        id="dropdown-menu-align-right"
        class="col-sm-10 control-label w-100 btn-primary custom-btn "

        onSelect={this.handleLocationSelection}
      >

        {this.state.locationList.map((location, index) => { return <Dropdown.Item eventKey={location.id}>{location.name}</Dropdown.Item> })}

      </DropdownButton>

    )

    return (


      <form class="form-horizontal  " style={{ marginLeft: "5%", marginRight: "5%" }} id={this.props.id} idsize={this.props.size} srole="form">

        <br />

        <div class="form-group">
          <label class="col-sm-2 control-label">Headquarter</label>
          <div class="col-sm-10">
            {headquarterItems}
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label">Location</label>
          <div class="col-sm-10">
              {locationItems}
          </div>
        </div>

        <div class="form-group">
          <label htmlfor="Doctor1" class="col-sm-2 control-label">Doctor</label>
          <div class="col-sm-10" style={{ width: "webkit-fill-available" }}>
            <Typeahead
              style={{ width: "100%", display: 'inline-block' }}
              id="basic-typeahead-single"
              labelKey="name"
              //onChange={this.changeSampleName}
              options={[{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }, { name: 'Sam1', id: 3 }, { name: 'Sam2', id: 4 }, { name: 'Sam3', id: 5 }, { name: 'Sam4', id: 6 }, { name: 'Sam5', id: 7 }]}
              placeholder="Choose Doctor"
            //selected={[{ name: 'Srigar', id: 1 }]}
            />
          </div>
        </div>
        <div class="form-group">
          <label htmlfor="LVD" class="col-sm-2 control-label">Last Visited Date</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="LVD1" placeholder="Last Visited Date" readOnly />
          </div>
        </div>




        <div class="form-group">
          <label htmlfor="visitedWith1" class="col-sm-2 control-label">Visited with</label>
          <div class="col-sm-offset-2 col-sm-10">
            <div class="dropdown">
              <Multiselect
                options={[{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }, { name: 'Sam1', id: 3 }, { name: 'Sam2', id: 4 }, { name: 'Sam3', id: 5 }, { name: 'Sam4', id: 6 }, { name: 'Sam5', id: 7 }]} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label htmlfor="ProductDetails1" class="col-sm-2 control-label">Product Details</label>
          <div class="col-sm-offset-2 col-sm-10">
            <div class="dropdown">
              <Multiselect
                options={[{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }, { name: 'Sam1', id: 3 }, { name: 'Sam2', id: 4 }, { name: 'Sam3', id: 5 }, { name: 'Sam4', id: 6 }, { name: 'Sam5', id: 7 }, { name: 'Sam14', id: 16 }, { name: 'Sam15', id: 17 }]} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label">Physician Sample</label>
          <div class="col-sm-offset-2 col-sm-5" >
            <Typeahead
              style={{ width: "45%", display: 'inline-block' }}
              id="basic-typeahead-single"
              labelKey="name"
              //onChange={this.changeSampleName}
              options={[{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }, { name: 'Sam1', id: 3 }, { name: 'Sam2', id: 4 }, { name: 'Sam3', id: 5 }, { name: 'Sam4', id: 6 }, { name: 'Sam5', id: 7 }]}
              placeholder="Choose Product"
            //selected={[{ name: 'Srigar', id: 1 }]}
            />
            <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <img src={plus} style={{ height: "10%", width: "10%" }} rounded /> <span >&nbsp;</span>
            <input type="text" style={{ width: "15%", textAlign: "center" }} name="quantity" placeholder="0" /> <span >&nbsp;</span>
            <img src={minus} rounded style={{ height: "10%", width: "10%" }} />


          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-12 control-label">
            <label class="label" >LBL</label>
            <input class="col-sm-offset-2 col-sm-5" padding={30} type="radio" name="radio" value="radio1" className="k-radio" onChange={this.handleChange} /> <label>Yes</label> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input class="col-sm-offset-2 col-sm-5" padding={30} type="radio" name="radio" value="radio3" className="k-radio" onChange={this.handleChange} />  <label>No</label>
          </div>
        </div>

        <div class="form-group">
          <label htmlfor="GiftDetails1" class="col-sm-2 control-label">Gift Details</label>
          <div class="col-sm-offset-2 col-sm-10">
            <div class="dropdown">
              <Multiselect
                options={[{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }, { name: 'Sam1', id: 3 }, { name: 'Sam2', id: 4 }, { name: 'Sam3', id: 5 }, { name: 'Sam4', id: 6 }, { name: 'Sam5', id: 7 }]} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label htmlfor="remarks1" class="col-sm-2 control-label">Remarks</label>
          <div class="col-sm-offset-2 col-sm-10">
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" />
          </div>
        </div>
        <br />

        <hr className='hrFormat' />

        <br />




      </form>

    );
  }
}

export default Template;