import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Multiselect } from 'multiselect-react-dropdown';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as commonConstant from '../common/CommonConstant'
import { PostData } from '../../services/PostData';
import PhysicianSample from './PhysicianSample'

export class Template extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: {},
      doctorVisitFormList: new Array(),
      date: new Date(),
      headquarterList: [],
      userHeadquarter: '',
      locationList: [],
      userLocation: '',
      doctorList: [],
      userList: [],
      productList: [],
      giftsList: [],
      locationLoading: false,
      doctorLoading: false,
      PhysicianSamples: [],
      userNameWithDesignationList: [],
      selectedHeadquarter: { id: 0, name: 'Headquarter' },
      selectedLocation: { id: 0, name: 'Location' },
      selectedDoctor: {},
      selectedPhysicanSample: [],
      selectedProducts: [],
      selectedVisitedWith: [],
      lbl: '',
      selectedGifts: [],
      remarks: '',
      id: '',
      errorBorderStyle: '2px solid red',
      defaultBorderStyle: '1px solid #cccccc',
      doctorStyle: '1px solid #cccccc',
      headquarterStyle: '1px solid #cccccc',
      businessAreaStyle: '1px solid #cccccc',
      visitedWithStyle: 'searchBox',
      productStyle: 'searchBox',
      lblStyle: '1px solid #cccccc',
      giftStyle: 'searchBox',
      remarksStyle: '1px solid #cccccc',
      doctorExists: false

    }
    this.handleHeadquarterSelection = this.handleHeadquarterSelection.bind(this)
    this.getLocationList = this.getLocationList.bind(this)
    this.handleLocationSelection = this.handleLocationSelection.bind(this)
    this.populateLocationItem = this.populateLocationItem.bind(this);
    this.addPhysicianSamples = this.addPhysicianSamples.bind(this)
    this.populateData = this.populateData.bind(this);
    this.removePhysicianSample = this.removePhysicianSample.bind(this)
    this.returnFilledForm = this.returnFilledForm.bind(this)
    this.validateForm = this.validateForm.bind(this)

  }


  returnFilledForm() {
    let doctor = '';
    let accompanyAssociates = []
    let selectedProductList = []
    let selectedGiftList = []
    if (this.state.selectedDoctor[0]) {
      doctor = this.state.selectedDoctor[0].id;
    }
    console.log(this.state.visitedWith)
    for (let i = 0; this.state.visitedWith && i < this.state.visitedWith.length; i++) {
      accompanyAssociates.push({ "managerId": this.state.visitedWith[i].id })
    }
    for (let i = 0; this.state.selectedProducts && i < this.state.selectedProducts.length; i++) {
      selectedProductList.push({ "productId": this.state.selectedProducts[i].id })
    }
    for (let i = 0; this.state.selectedGifts && i < this.state.selectedGifts.length; i++) {
      selectedGiftList.push({ "gift": this.state.selectedGifts[i].id })
    }
    let form =
    {
      "headquarterId": this.state.selectedHeadquarter.id,
      "businessareaId": this.state.selectedLocation.id,
      "entityType": "DOCTOR",
      "entityId": doctor,
      "physicianSample": this.state.selectedPhysicanSample,
      "product": selectedProductList,
      "lbl": this.state.lbl,
      "accompanyAssociate": accompanyAssociates,
      "gift": selectedGiftList,
      "remarks": this.state.remarks
    }

    return form;
  }

  componentDidMount() {
    let item = JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_HEADQUARTER))
    this.setState({ id: this.props.id.substring(8) })
    if (item == null) {
      setTimeout(() => {
        //console.log('timeout executing for data population')
        this.populateData(item);

      }, 6000);
    }
    else
      this.populateData(item)

  }

  populateData(item) {
    item = JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_HEADQUARTER))
    let headquarterIdInSession = sessionStorage.getItem(commonConstant.USER_DEFAULT_HEADQUARTER_ID);
    let userHeadquarterTemp = '';


    this.setState({ headquarterList: item },
      () => {
        item != null && item.map(
          headquarter => {
            //console.log('matching: ' + headquarter.id + ": " + headquarterIdInSession + " -- " + (headquarter.id == sessionStorage.getItem("headquarterId")))
            if (headquarter.id == headquarterIdInSession) {
              //console.log("this happened 1")
              userHeadquarterTemp = { id: headquarter.id, name: headquarter.name };
              sessionStorage.setItem('defaultUserHeadquarter', JSON.stringify(userHeadquarterTemp));
              this.setState({ userHeadquarter: userHeadquarterTemp })
              this.setState({ selectedHeadquarter: userHeadquarterTemp })
            }
          })
      }
    );
    this.setState({ productList: JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_PRODUCT)) })

    this.setState({ giftsList: JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_GIFT)) })
    this.setState({ userList: JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_USER)) }, () => this.state.userList.map(user => { user.name = user.name + ' (' + user.designation + ')' }))
    let preSelectedLocation = JSON.parse(sessionStorage.getItem('lastSelectedLocation'));
    if (preSelectedLocation != null) {
      this.setState({ selectedLocation: preSelectedLocation }, () => this.handleLocationSelection(preSelectedLocation.id))
    }

    //console.log(JSON.stringify(this.state.userList));
    this.getLocationList(JSON.parse(sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID)));
    this.addPhysicianSamples()
  }

  getLocationList(totalList) {

    //alert(typeof(totalList))
    let businessAreaList = [];
    let uniqueList = []

    for (var i = 0; totalList != null && totalList != null && i < totalList.length; i++) {
      var found = false;
      for (var j = 0; businessAreaList != null && j < businessAreaList.length; j++) {
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

    for (var i = 0; this.state.headquarterList != null && i < this.state.headquarterList.length; i++) {
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
            //console.log('data for new Headquarter id: ' + selectedHeadQuarterTemp.id + '--' + result.data.data)
            let locationMapTemp = (result.data.data);
            //console.log('LocaitonMapTem:' + locationMapTemp)
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

    // console.log('Location list : '+JSON.stringify(this.state.locationList))
    // console.log('Selected location  : '+JSON.stringify(e))
    for (var i = 0; this.state.locationList != null && i < this.state.locationList.length; i++) {
      // alert(this.state.headquarterList[i].id==e)
      if (this.state.locationList[i].id == e) {
        selectedLocationName = this.state.locationList[i];

        break;
      }
    }
    //  alert(JSON.stringify(selectedHeadQuarterName));
    this.setState({ selectedLocation: selectedLocationName }, () => { sessionStorage.setItem('lastSelectedLocation', JSON.stringify(this.state.selectedLocation)); console.log(JSON.stringify(this.state.selectedLocation)) })
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

      () => { //console.log('doctorList: ' + JSON.stringify(this.state.doctorList)) 
      });
    //console.log(JSON.stringify('Final List: ' + JSON.stringify(list)))
  }

  populateLocationItem(list) {
    let locationItems = null;
    if (list) {
      locationItems = (
        <DropdownButton
          alignRight
          title={this.state.selectedLocation.name}
          id={"locationDropdown" + this.state.id}
          class="col-sm-10 control-label w-100 btn-primary custom-btn "
          style={{ border: this.state.businessAreaStyle }}
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
          id={"locationDropdown" + this.state.id}
          class="col-sm-10 control-label w-100 btn-primary custom-btn "
          // onSelect={this.handleLocationSelection}
          style={{ border: this.state.businessAreaStyle }}
        >

        </DropdownButton>

      )
      console.log("locaiton population not avialable")
    }

    return locationItems;
  }

  addPhysicianSamples() {

    let samples = this.state.PhysicianSamples;
    //  console.log(samples.length + ": " + JSON.stringify(samples))
    samples.push(new PhysicianSample());
    this.setState({ physicianSamples: samples })
  }

  removePhysicianSample() {
    let samples = this.state.PhysicianSamples;
    //  console.log(samples.length + ": " + JSON.stringify(samples))
    samples.pop();
    this.setState({ physicianSamples: samples })
  }

  validateDoctor(e) {
    console.log('selected doctor' + JSON.stringify(e))
    let filledDoctors = JSON.parse(sessionStorage.getItem('filledDoctors'));

    if (!(e && e[0])) {
      this.setState({ doctorStyle: this.state.errorBorderStyle })
      this.setState({ doctorExists: false })
    }
    else if (filledDoctors == null) {
      let value = { "templateId": this.state.id, 'doctor': e }
      sessionStorage.setItem('filledDoctors', JSON.stringify([value]));
    }
    else {
      let found = false;
      let validDoctor = true;
      filledDoctors.map((doctor) => {
        if (doctor) {
          if (doctor.templateId == this.state.id) {
            found = true;
          }
          if (doctor.doctor[0].id == e[0].id && validDoctor) {
            this.state.selectedDoctor = '';
            validDoctor = false;
            this.setState({ doctorStyle: this.state.errorBorderStyle })
            this.setState({ doctorExists: true })
          }
        }
      })
      if (!found && validDoctor) {
        this.setState({ doctorStyle: this.state.defaultBorderStyle })
        this.setState({ doctorExists: false })
        let value = { "templateId": this.state.id, 'doctor': e }
        filledDoctors.push(value);
        sessionStorage.setItem('filledDoctors', JSON.stringify(filledDoctors));
      }
      else if (found && validDoctor) {
        filledDoctors.map((doctor) => {
          if (doctor) {
            if (doctor.templateId == this.state.id) {
              doctor.doctor = e
            }
          }
        })
        this.setState({ doctorExists: false })
        this.setState({ doctorStyle: this.state.defaultBorderStyle })
        sessionStorage.setItem('filledDoctors', JSON.stringify(filledDoctors));
      }

    }
  }
  validateForm() {
    let valid = true;
    let visit = this.returnFilledForm();
    let errorBorderStyle = '2px solid red'
    let defaultBorderStyle = '1px solid #cccccc';
    let headquarterStyle = document.getElementById("headquarterDropdown" + this.state.id).style.border
    console.log(JSON.stringify(visit) + '----' + this.state.id)
    if (visit.headquarterId == null || visit.headquarterId.length == 0) {
      valid = false;
      this.setState({ headquarterStyle: this.state.errorBorderStyle })
    }
    else this.setState({ headquarterStyle: this.state.defaultBorderStyle })

    if (visit.businessareaId == null || visit.businessareaId.length == 0 || visit.businessareaId == 0) {
      valid = false;
      this.setState({ businessAreaStyle: this.state.errorBorderStyle })
    }
    else
      this.setState({ businessAreaStyle: this.state.defaultBorderStyle })

    if ((visit.entityId == null || visit.entityId.length == 0)) {
      valid = false;
      this.setState({ doctorStyle: this.state.errorBorderStyle })
    }
    else
      this.setState({ doctorStyle: this.state.defaultBorderStyle })

    if ((visit.product == null || visit.product.length == 0)) {
      valid = false;
      this.setState({ productStyle: 'errorSearchBox' })
    }
    else
      this.setState({ productStyle: 'searchBox' })

    return valid;
  }

  render() {

    let headquarterItems = null;

    let giftsList = null;
    headquarterItems = (
      <DropdownButton
        alignRight
        title={this.state.selectedHeadquarter.name}
        id={"headquarterDropdown" + this.state.id}
        class="col-sm-10 control-label w-100 .custom-color "
        style={{ border: this.state.headquarterStyle, backgroundColor: '#024B65' }}
        onSelect={this.handleHeadquarterSelection}
      >
        {this.state.headquarterList != null && this.state.headquarterList.map((headquarter, index) => { return <Dropdown.Item eventKey={headquarter.id}>{headquarter.name}</Dropdown.Item> })}

      </DropdownButton>
    )

    let samples = null;
    samples = (
      <div>
        {this.state.PhysicianSamples.map((form, index) => {
          //   {this.setState({noOfForms: this.state.noOfForms+1})}
          return <PhysicianSample id={index} key={index} size={this.state.PhysicianSamples != null && this.state.PhysicianSamples.length} />
        })}
      </div>
    );


    giftsList = (this.state.giftsList != null && this.state.giftsList.map((gift) => { return { name: gift.name, id: gift.id } }))
    //console.log(typeof (giftsList) + ' gift list: ' + JSON.stringify(giftsList))


    return (


      <form className="form-horizontal  " style={{ marginLeft: "5%", marginRight: "5%" }} id={this.props.id} idsize={this.props.size} srole="form">

        <br />

        <div className="form-group">
          <label className="col-sm-2 control-label">Headquarter</label>
          <div className="col-sm-10">
            {headquarterItems}
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">Location</label>
          <div className="col-sm-10">
            {this.populateLocationItem(this.state.locationList)}
          </div>
        </div>



        <div className="form-group">
          <label htmlfor="Doctor1" className="col-sm-2 control-label">Doctor</label>
          <div className="col-sm-10" style={{ width: "webkit-fill-available" }}>
            <Typeahead
              style={{ width: "100%", display: 'inline-block', border: this.state.doctorStyle }}
              id={"doctor" + this.state.id}
              labelKey="name"
              onChange={(s) => { this.props.showHideName(this.props.id, s); this.state.selectedDoctor = s; this.validateDoctor(s) }}
              //selected = {this.state.selectedDoctor}
              options={this.state.doctorList != null && this.state.doctorList}
              placeholder="Choose Doctor"
            //selected={[{ name: 'Srigar', id: 1 }]}
            />
            {this.state.doctorExists != '' && <p style={{ color: 'red' }}>This doctor already selected in DCR</p>}
          </div>
        </div>
        <div className="form-group">
          <label htmlfor="LVD" className="col-sm-2 control-label">Last Visited Date</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="LVD1" placeholder="Last Visited Date" readOnly />
          </div>
        </div>

        <div className="form-group">
          <label htmlfor="visitedWith" className="col-sm-2 control-label">Visited with</label>
          <div className="col-sm-offset-2 col-sm-10">
            <div className={"dropdown " + this.state.visitedWithStyle}>
              <Multiselect
                id={'visitedWith' + this.state.id}
                style={{ border: this.state.visitedWithStyle }}
                options={this.state.userList != null && this.state.userList} // Options to display in the dropdown
                selectedValues={this.state.visitedWith} // Preselected value to persist in dropdown
                onSelect={(e) => this.setState({ visitedWith: e })} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlfor="ProductDetails1" className="col-sm-2 control-label">Product Details</label>
          <div className="col-sm-offset-2 col-sm-10">
            <div className={"dropdown " + this.state.productStyle}>
              <Multiselect
                id={'product' + this.state.id}
                style={{ border: '2px solid red' }}
                options={this.state.productList != null && this.state.productList} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={(e) => this.setState({ selectedProducts: e })}// Function will trigger on select event 
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
        </div>



        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-12 control-label">
            <label className="label" id={'lbl' + this.state.id} style={{ border: this.state.lblStyle }} >LBL</label>
            <input className="col-sm-offset-2 col-sm-5" padding={30} type="radio" name="radio" value="Yes" className="k-radio" onChange={(e) => { this.setState({ lbl: e.target.value }) }} /> <label>Yes</label> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input className="col-sm-offset-2 col-sm-5" padding={30} type="radio" name="radio" value="No" className="k-radio" onChange={(e) => { this.setState({ lbl: e.target.value }) }} />  <label>No</label>
          </div>
        </div>

        <div>
          <label className="col-sm-2 control-label">Physician Sample</label>
          {samples}
          <label className='normalLabel' onClick={this.addPhysicianSamples}>Add more</label> <label className='normalLabel' onClick={this.removePhysicianSample}>Remove</label>
        </div>
        <br />

        <div className="form-group">
          <label htmlfor="GiftDetails1" className="col-sm-2 control-label">Gift Details</label>
          <div className="col-sm-offset-2 col-sm-10">
            <div className={"dropdown " + this.state.giftStyle}>
              <Multiselect
                id={'gifts' + this.state.id}
                style={{ border: this.state.giftStyle }}
                options={giftsList != null && giftsList} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={(e) => this.setState({ selectedGifts: e })} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
        </div>

        <div cla className ss="form-group">
          <label htmlfor="remarks1" className="col-sm-2 control-label">Remarks</label>
          <div className="col-sm-offset-2 col-sm-10">
            <textarea className="form-control" id={"remarks" + this.state.id} style={{ border: this.state.remarksStyle }} rows="2" onChange={(e) => this.setState({ remarks: e.target.value })} />
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