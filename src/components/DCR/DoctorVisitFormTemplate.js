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
      doctorVisitFormList: [],
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
      physicianSamples: [React.createRef()],
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
      doctorExists: false,
      displayStatus: 'block',
      deleted: false,
      physicianSampleError: false

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
    this.hideTemplate = this.hideTemplate.bind(this)
    this.getPhysicianSample = this.getPhysicianSample.bind(this)


  }

  returnFilledForm() {
    let doctor = '';
    let accompanyAssociates = []
    let selectedProductList = []
    let selectedGiftList = []
    if (this.state.selectedDoctor[0]) {
      doctor = this.state.selectedDoctor[0].id;
    }
    //console.log(this.state.visitedWith)
    for (let i = 0; this.state.visitedWith && i < this.state.visitedWith.length; i++) {
      accompanyAssociates.push({ "managerId": this.state.visitedWith[i].id })
    }
    for (let i = 0; this.state.selectedProducts && i < this.state.selectedProducts.length; i++) {
      selectedProductList.push({ "productId": this.state.selectedProducts[i].id })
    }
    for (let i = 0; this.state.selectedGifts && i < this.state.selectedGifts.length; i++) {
      selectedGiftList.push({ "gift": this.state.selectedGifts[i].id })
    }
    this.getPhysicianSample();
    let form =
    {
      "templateId":this.state.id,
      "headquarterId": this.state.selectedHeadquarter.id,
      "businessareaId": this.state.selectedLocation.id,
      "entityType": "DOCTOR",
      "entityId": doctor,
      "physicianSample": JSON.parse(sessionStorage.getItem("selectedPhysicanSample"+this.state.id)),
      "product": selectedProductList,
      "lbl": this.state.lbl,
      "accompanyAssociate": accompanyAssociates,
      "gift": selectedGiftList,
      "remarks": this.state.remarks
    }
    // console.log("selected state in doctorvisitFormTemplate")
    // console.log(JSON.stringify(this.state.selectedHeadquarter));
    // console.log(JSON.stringify(this.state.selectedLocation))
    // console.log(JSON.stringify(this.state.selectedDoctor[0]))
    // console.log(JSON.stringify(this.state.selectedProducts ))
    // console.log(JSON.stringify( this.state.selectedGifts ))
    // console.log(JSON.stringify(this.state.lbl ))
    // console.log(JSON.stringify(this.state.visitedWith))
    // console.log(JSON.stringify(this.state.remarks))
    
    return form;
  }

  getPhysicianSample()
  {
    let valid  = true;
    let sampleList = [];
    this.state.physicianSamples.map((items, index)=> {
      console.log(items.current.validateSample());
      let currentValid = items.current.validateSample()
      valid = valid & currentValid;
      if(currentValid)
      {
        sampleList.push(items.current.returnSample());
      }
    })

    if(!valid)
    {
      this.setState({physicianSampleError: true})  
    }
    else
    {
      this.setState({physicianSampleError: false})  
      sessionStorage.setItem("selectedPhysicanSample"+this.state.id, JSON.stringify(sampleList));
      this.setState({selectedPhysicanSample: sampleList}, ()=>{console.log("selectedPhysicianSample set : "+JSON.stringify(this.state.selectedPhysicanSample))})
    }
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

      sessionStorage.removeItem(commonConstant.SELECTED_SAMPLES)
    

  }

  populateData(item) {
    let formData= this.props.formData;
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
    this.setState({ userList: JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_USER)) }, () => { if(this.state.userList) this.state.userList.map(user => { user.name = user.name + ' (' + user.designation + ')' })})
    let preSelectedLocation = JSON.parse(sessionStorage.getItem('lastSelectedLocation'));
    if (preSelectedLocation != null) {
      this.setState({ selectedLocation: preSelectedLocation }, () => this.handleLocationSelection(preSelectedLocation.id))
    }

    //console.log(JSON.stringify(this.state.userList));
    this.getLocationList(JSON.parse(sessionStorage.getItem(commonConstant.GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID)));
    //this.addPhysicianSamples();

    console.log("received form data from parent "+JSON.stringify(formData)+"  index"+this.props.id);
    
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
    //console.log("headquarter selected: " + e)

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

    let valid  = true;
    this.state.physicianSamples.map((items, index)=> {
      console.log(items.current.validateSample());
       valid = valid & items.current.validateSample()
    })

    if(!valid)
    {
      this.setState({physicianSampleError: true})  
    }
    else
    {
    let samples = [...this.state.physicianSamples];
    
    samples.push(React.createRef());
    this.setState({ physicianSamples: samples }, ()=>console.log(this.state.physicianSamples.length + " new length"))
    this.setState({physicianSampleError: false})
    }
  }

  removePhysicianSample() {
    let samples = [...this.state.physicianSamples];
    //  console.log(samples.length + ": " + JSON.stringify(samples))
    samples.pop();
    this.setState({ physicianSamples: samples })
  }

  validateDoctor(e) {
    //console.log('selected doctor' + JSON.stringify(e))
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
          if (doctor.doctor[0].id == e[0].id && validDoctor && !found ) {
            this.state.selectedDoctor = '';
            validDoctor = false;
            this.setState({ doctorStyle: this.state.errorBorderStyle })
            this.setState({ doctorExists: true })
            console.log("doctor validation 1")
          }
        }
      })
      if (!found && validDoctor) {
        this.setState({ doctorStyle: this.state.defaultBorderStyle })
        this.setState({ doctorExists: false })
        let value = { "templateId": this.state.id, 'doctor': e }
        filledDoctors.push(value);
        sessionStorage.setItem('filledDoctors', JSON.stringify(filledDoctors));
        console.log("doctor validation 2")
      }
      else if (found && validDoctor) {
        filledDoctors.map((doctor) => {
          if (doctor) {
            if (doctor.templateId == this.state.id) {
              doctor.doctor = e
              console.log("doctor validation 3")
            }
          }
        })
        this.setState({ doctorExists: false })
        this.setState({ doctorStyle: this.state.defaultBorderStyle })
        sessionStorage.setItem('filledDoctors', JSON.stringify(filledDoctors));
        console.log("doctor validation 4")
      }

    }
  }
  validateForm() {
    let valid = true;
    let visit = this.returnFilledForm();
    let errorBorderStyle = '2px solid red'
    let defaultBorderStyle = '1px solid #cccccc';
   // let headquarterStyle = document.getElementById("headquarterDropdown" + this.state.id).style.border
   // console.log(JSON.stringify(visit) + '----' + this.state.id)
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

    if(visit.lbl == null || visit.lbl.length ==0){
      valid = false;
      this.setState({lblStyle : 'red'})
    }
    else
    this.setState({lblStyle : 'searchBox'})

    if(this.state.physicianSampleError)
    valid = false;
    

       if (!valid)
         document.getElementById('showHide' + this.props.serial).style.color = 'red'
       else
         document.getElementById('showHide' +  this.props.serial).style.color = 'white'
    return valid;
  }


  showHide(index, hideFlag) { 

    let templateId = 'container'+index
    console.log('showhiede for: ' + templateId + ' -- ' + JSON.stringify(index))
    if (document.getElementById(templateId) != null) {
      if (document.getElementById(templateId).style.display == "none" && !hideFlag)
        document.getElementById(templateId).style.display = "block"
      else
        document.getElementById(templateId).style.display = "none";
    }
  }

  showHideName(id, name) {
    if (name != 'undefined' && name.length > 0) {
      let findIndex = id
      let inner = document.getElementById('showHide' + findIndex).innerHTML;
      document.getElementById('showHide' + findIndex).innerHTML = (findIndex + 1) + '. Doctor Visit : ' + name[0].name;
    }
  }

  hideTemplate(index)
  {
    let templateId = 'container'+index
    //console.log('showhiede for: ' + templateId + ' -- ' + JSON.stringify(index))
    document.getElementById(templateId).style.display = "none";
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
        {this.state.physicianSamples.map((form, index) => {
          //   {this.setState({noOfForms: this.state.noOfForms+1})}
          return <PhysicianSample parent = {this.props.id} id={index} key={index} size={this.state.physicianSamples != null && this.state.physicianSamples.length} ref={this.state.physicianSamples[index]} />
        })}
      </div>
    );


    giftsList = (this.state.giftsList != null && this.state.giftsList.map((gift) => { return { name: gift.name, id: gift.id } }))
    //console.log(typeof (giftsList) + ' gift list: ' + JSON.stringify(giftsList))

    // let deleteItem = "template"+this.props.removeIndex;
    // console.log("properties to delete: "+this.props.removeIndex+"  this template: "+this.props.id+"   deleteItem "+deleteItem+ "   "+(this.props.id === deleteItem));
    
    // if(this.props.id === deleteItem)
    //    return(<div></div>)
    // else
    if(this.state.deleted)
    {
      this.setState({deleted:false}, ()=>{ 
        this.props.removeFromParent(this.props.serial)
       
      })

      console.log('removing:'+this.state.selectedDoctor)
      return null;
    }
    else
    return (

      <form className="form-horizontal  " style={{ marginLeft: "5%", marginRight: "5%" }} id={this.props.id} idsize={this.props.size} srole="form" >

     
        <br />

        <a id={'showHide'+this.props.serial} onClick={() => this.showHide(this.props.serial)} className="btn btn-default btn-primary custom-btn" style={{ width: "90%" }}> {(this.props.serial+1) +'. ' } Doctor Visit </a>
            <button type="submit" className="btn btn-default btn-primary custom-btn" style={{ width: "9%" }} onClick={() => this.setState({deleted:true})}> X </button>

            <div id = {'container'+this.props.serial}>
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
              onChange={(s) => { this.showHideName(this.props.serial, s); this.state.selectedDoctor = s; this.validateDoctor(s) }}
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
            <label className="label" id={'lbl' + this.state.id} style={{ color: this.state.lblStyle }} >LBL</label>
            <label><input className="col-sm-offset-2 col-sm-5" padding={30} type="radio" name="radio" value="true" className="k-radio" onChange={(e) => { this.setState({ lbl: e.target.value }) }} checked= {this.state.lbl == 'true'} /> Yes</label> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <label><input className="col-sm-offset-2 col-sm-5" padding={30} type="radio" name="radio" value="false" className="k-radio" onChange={(e) => { this.setState({ lbl: e.target.value }) }} checked= {this.state.lbl == 'false'}/> No</label>
          </div>
        </div>

        <div>
          <label className="col-sm-2 control-label">Physician Sample</label>
          {samples}
          {this.state.physicianSampleError && <label style={{color: 'red'}}> Please correct the sample errors </label>} <br/>
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

        </div>


      </form>

    );
  }
}

export default Template;