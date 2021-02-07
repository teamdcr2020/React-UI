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
import { PostData } from '../../services/PostData';
import PhysicianSample from './PhysicianSample'

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
      userLocation: '',
      selectedLocation: { id: 0, name: 'Location' },
      doctorList: [],
      userList: [],
      productList: [],
      giftsList: [],
      locationLoading: false,
      doctorLoading: false,
      PhysicianSamples: []
    }
    this.handleHeadquarterSelection = this.handleHeadquarterSelection.bind(this)
    this.getLocationList = this.getLocationList.bind(this)
    this.handleLocationSelection = this.handleLocationSelection.bind(this)
    this.populateLocationItem = this.populateLocationItem.bind(this);
    this.addPhysicianSamples = this.addPhysicianSamples.bind(this)


  }

  componentDidMount() {
    let item = JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_HEADQUARTER))
    let headquarterIdInSession = sessionStorage.getItem('headquarterId');
    let userHeadquarterTemp = '';


    this.setState({ headquarterList: item },
      () => {
        item.map(
          headquarter => {
            console.log('matching: ' + headquarter.id + ": " + headquarterIdInSession + " -- " + (headquarter.id == sessionStorage.getItem("headquarterId")))
            if (headquarter.id == headquarterIdInSession) {
              console.log("this happened 1")
              userHeadquarterTemp = { id: headquarter.id, name: headquarter.name };
              sessionStorage.setItem('defaultUserHeadquarter', userHeadquarterTemp);
              this.setState({ userHeadquarter: userHeadquarterTemp })
              this.setState({ selectedHeadquarter: userHeadquarterTemp })
            }
          })
      }
    );
    this.setState({ productList: JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_PRODUCT)) })

    this.setState({ giftsList: JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_GIFT)) })
    this.setState({ userList: JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_USER)) })

    //console.log(JSON.stringify(this.state.doctorList));
    this.getLocationList(JSON.parse(sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID)));
    this.addPhysicianSamples()

  }


  getLocationList(totalList) {

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

    var selectedHeadQuarterTemp = [];
    console.log("headquarter selected: " + e)

    for (var i = 0; i < this.state.headquarterList.length; i++) {
      // alert(this.state.headquarterList[i].id==e)
      if (this.state.headquarterList[i].id == e) {
        selectedHeadQuarterTemp = this.state.headquarterList[i];
        break;
      }
    }
    if (this.state.selectedHeadquarter.id != selectedHeadQuarterTemp.id) {
      console.log("headQuarter changed")
      this.setState({ selectedHeadquarter: selectedHeadQuarterTemp, locationLoading: true, doctorLoading: true });

      let accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
      let operation = commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID;
      let payload = { id: selectedHeadQuarterTemp.id, operation, authorization: 'bearer ' + accessToken }

      PostData(operation, payload, commonConstant.controllerURL).then(
        (result) => {
          if (result.data) {
            this.setState({ selectedLocation: { id: 0, name: "Location" }, doctorList: [] })
            console.log('data for new Headquarter id: ' + selectedHeadQuarterTemp.id + '--' + result.data.data)
            let locationMapTemp = (result.data.data);
            console.log('LocaitonMapTem:' + locationMapTemp)
            this.getLocationList(locationMapTemp)
            this.populateLocationItem();


          }
          else {

          }

        }).catch(error => console.log(JSON.stringify(error)));

    }



  }

  handleLocationSelection(e) {

    var selectedLocationName = {};

    for (var i = 0; i < this.state.locationList.length; i++) {
      // alert(this.state.headquarterList[i].id==e)
      if (this.state.locationList[i].id == e) {
        selectedLocationName = this.state.locationList[i];

        break;
      }
    }
    //  alert(JSON.stringify(selectedHeadQuarterName));
    this.setState({ selectedLocation: selectedLocationName }, () => { console.log(JSON.stringify(this.state.selectedLocation)) })
    let list = [];
    JSON.parse(sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID)).map(
      (entity) => {

        //console.log('entity scanned: '+entity.entityName+" - "+entity.businessareaId+" - "+selectedLocationName.id +' condition: '+ selectedLocationName.id === entity.businessareaId)
        //console.log('selection id: ' + selectedLocationName.id + "  doctor's business area: " + entity.businessareaId);
        if (entity.entityType === 'Doctor' && selectedLocationName.id === entity.businessareaId) {
          list.push({ name: entity.entityName, id: entity.entityId });
          //console.log('pushed:'+ JSON.stringify({ name: entity.entityName, id: entity.entityId, entityBizArea:  entity.businessareaId, locationid: selectedLocationName.id}))
        }

      })


    this.setState({
      doctorList: list
    },

      () => { console.log('doctorList: ' + JSON.stringify(this.state.doctorList)) });
    console.log(JSON.stringify('Final List: ' + JSON.stringify(list)))
  }

  populateLocationItem(list) {
    let locationItems = null;
    if (list) {
      locationItems = (
        <DropdownButton
          alignRight
          title={this.state.selectedLocation.name}
          id="dropdown-menu-align-right"
          class="col-sm-10 control-label w-100 btn-primary custom-btn "

          onSelect={this.handleLocationSelection}
        >

          {list.map((location, index) => { return <Dropdown.Item eventKey={location.id}>{location.name}</Dropdown.Item> })}

        </DropdownButton>

      )
    }
    else {
      console.log("locaiton population not avialable")
      locationItems = (
        <DropdownButton
          alignRight
          title='No Locations Available'
          id="dropdown-menu-align-right"
          class="col-sm-10 control-label w-100 btn-primary custom-btn "
        // onSelect={this.handleLocationSelection}
        >

        </DropdownButton>

      )
      console.log("locaiton population not avialable")
    }

    return locationItems;
  }

  addPhysicianSamples() {

    let samples = this.state.PhysicianSamples;
    console.log(samples.length + ": " + JSON.stringify(samples))
    samples.push(new PhysicianSample());
    this.setState({ physicianSamples: samples })
  }


  render() {

    let headquarterItems = null;

    let doctorItems = null;
    let userItems = null;
    let productItems = null;
    let giftsList = null;
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

    let samples = null;
    samples = (
      <div>
        {this.state.PhysicianSamples.map((form, index) => {
          //   {this.setState({noOfForms: this.state.noOfForms+1})}
          return <PhysicianSample id={index} size={this.state.PhysicianSamples.length} />
        })}
      </div>
    );


    giftsList = (this.state.giftsList.map((gift) => { return { name: gift.name, id: gift.id } }))
    //console.log(typeof (giftsList) + ' gift list: ' + JSON.stringify(giftsList))


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
            {this.populateLocationItem(this.state.locationList)}
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
              options={this.state.doctorList}
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
                options={this.state.userList} // Options to display in the dropdown
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
                options={this.state.productList} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
        </div>



        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-12 control-label">
            <label class="label" >LBL</label>
            <input class="col-sm-offset-2 col-sm-5" padding={30} type="radio" name="radio" value="radio1" className="k-radio" onChange={this.handleChange} /> <label>Yes</label> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input class="col-sm-offset-2 col-sm-5" padding={30} type="radio" name="radio" value="radio3" className="k-radio" onChange={this.handleChange} />  <label>No</label>
          </div>
        </div>

        <div>
          <label class="col-sm-2 control-label">Physician Sample</label>
          {samples}
          <p onClick={this.addPhysicianSamples}>Add more</p>
        </div>
        <br />

        <div class="form-group">
          <label htmlfor="GiftDetails1" class="col-sm-2 control-label">Gift Details</label>
          <div class="col-sm-offset-2 col-sm-10">
            <div class="dropdown">
              <Multiselect
                options={giftsList} // Options to display in the dropdown
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