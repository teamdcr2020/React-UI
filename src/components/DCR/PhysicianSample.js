import React, { Component, event } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import plus from '../../images/plus.png'
import minus from '../../images/minus.png'
import * as commonConstant from '../common/CommonConstant'


export class PhysicianSample extends Component {


    constructor() {
        super();
        this.state = {
            productList: [],
            sampleError: false,
            count: 0,
            product: {}

        }
        this.changeSampleCount = this.changeSampleCount.bind(this);
        this.changeSampleName = this.changeSampleName.bind(this);
        this.validateSample = this.validateSample.bind(this);
        this.editSampleCount = this.editSampleCount.bind(this);

    }

    componentDidMount() {
        this.setState({ productList: JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_PRODUCT)) })
    }
    changeSampleCount(operation, index) {

        let textFieldId = this.props.parent+'sampleCounter' + index;
        console.log("event fired " + textFieldId)

        let val = parseInt(document.getElementById(textFieldId).value)

        if (isNaN(val)) {
            console.log('value was NaN')
            val = 0;
            document.getElementById(textFieldId).value = val;
            console.log(document.getElementById(textFieldId).value)
        }
        if (operation)

            val = val + 1;

        else if (val > 0)
            val = val - 1;
        console.log(textFieldId + ': - ' + operation)
        document.getElementById(textFieldId).value = val;
        this.setState({ count: val });
    }

    editSampleCount(e) {


        if (e && e.target) {
            let val = parseInt(e.target.value)
            let sampleCountId = this.props.parent+'sampleCounter'+this.props.id
            console.log(val)
            if (isNaN(val)) {
                document.getElementById(sampleCountId).value = 0;
                console.log(e.target.value + '--' + val + document.getElementById(sampleCountId).value)
                this.setState({ count: val });
            }
            else {
                this.setState({ count: val });
            }
        }
    }

    changeSampleName(e) {
        console.log(e[0] + "   " + this.props.parent);
        this.setState({ product: e[0] })
        let selectedSamples = JSON.parse(sessionStorage.getItem(commonConstant.SELECTED_SAMPLES))
        let validSample = true;
        let templateFound = false;
        let sameProductFound = false;
        let sameFieldUpdate = false;
        if (e[0]) {
            if (!selectedSamples || selectedSamples == null) {
                let item = {}
                item.template = this.props.parent;
                item.list = []
                console.log("product: " + e[0] + "  count: " + this.state.count)
                item.list.push({ "product": e[0], "count": this.state.count, "index": this.props.id });
                selectedSamples = []
                selectedSamples.push(item);
                sessionStorage.setItem(commonConstant.SELECTED_SAMPLES, JSON.stringify(selectedSamples))
                this.setState({ product: e[0] })
                this.setState({ sampleError: false })
                //console.log("first item selected "+ selectedSamples)
            }
            else {
                selectedSamples.map((sample, index) => {
                    if (sample.template == this.props.parent) {
                        templateFound = true;
                    }
                })
                if (templateFound) {
                    selectedSamples.map((sample, index) => {
                        if (sample.template == this.props.parent) {
                            sample.list.map((item, index3) => {

                                console.log("contents of itme " + JSON.stringify(item))
                                if (item.product && item.product.id == e[0].id && item.index != this.props.id && !sameProductFound) {
                                    sameProductFound = true;
                                }
                                if (item.index == this.props.id && !sameFieldUpdate) {
                                    sameFieldUpdate = true;
                                }

                            })
                           
                            if (sameFieldUpdate) {
                                selectedSamples.map((sample, index) => {
                                    if (sample.template == this.props.parent) {
                                        sample.list.map((item, index3) => {
                                            if (item.index == this.props.id) {
                                                item.product = e[0];
                                                this.setState({ product: e[0] })
                                                sessionStorage.setItem(commonConstant.SELECTED_SAMPLES, JSON.stringify(selectedSamples));
                                                this.setState({ sampleError: false })
                                            }
                                        })
                                    }
                                })

                            }
                            else if (sameProductFound) {
                                this.setState({ sampleError: true })
                            }
                            else if (!sameFieldUpdate) {
                                let insertionObj = { "product": e[0], "count": this.state.count, "index": this.props.id };
                                console.log(insertionObj)
                                sample.list.push(insertionObj)
                                sessionStorage.setItem(commonConstant.SELECTED_SAMPLES, JSON.stringify(selectedSamples))
                                this.setState({ product: e[0] })
                                this.setState({ sampleError: false })
                            }
                        }
                    })

                }
                else {
                    let item = {}
                    item.template = this.props.parent;
                    item.list = []
                    console.log("new www product: " + this.state.product + "  count: " + this.state.count)
                    item.list.push({ "product": this.state.product, "count": this.state.count })
                    selectedSamples.push(item);
                    sessionStorage.setItem(commonConstant.SELECTED_SAMPLES, JSON.stringify(selectedSamples))
                }
            }
        }
    }

    validateSample(e) {
        let flag = false
        if (this.state.product && this.state.count > 0 && !this.state.sampleError)
            flag =  true;
        else if(Object.keys(this.state.product).length == 0  && this.state.count == 0)
            flag = true
        return flag;
    }

    returnSample()
    {
        return {"productId": this.state.product.id, "quantity":this.state.count};
    }

    render() {

        return (
            <div className="form-group">

                <div className="col-sm-offset-2 col-sm-5" >
                    <div id='physicianSampleDiv' >
                        <Typeahead
                            style={{ width: "45%", display: 'inline-block' , color: this.state.sampleError && 'red'}}
                            id={'sample' + this.props.id}
                            labelKey="name"
                            onChange={(e) => { this.changeSampleName(e) }}
                            options={this.state.productList}
                            placeholder="Choose Product"
                        //selected={[{ name: 'Srigar', id: 1 }]}
                        />
                        <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <img src={minus} rounded style={{ height: "10%", width: "10%" }} id={'minus' + this.props.id} onClick={() => this.changeSampleCount(false, this.props.id)} />
                        <input type="text" style={{ width: "15%", textAlign: "center" }} id={this.props.parent+'sampleCounter' + this.props.id} name="quantity" placeholder="0" onChange={(e)=>this.editSampleCount(e)}  /> <span >&nbsp;</span>
                        <img src={plus} style={{ height: "10%", width: "10%" }} rounded id={'plus' + this.props.id} onClick={() => this.changeSampleCount(true, this.props.id)} /> <span >&nbsp;</span>
                        {this.state.sampleError && <label style={{color: 'red'}}>The product is already selected</label>}
                    </div>
                </div>
            </div>
        );
    }

}
export default PhysicianSample;