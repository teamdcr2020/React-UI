import React, { Component, event } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import plus from '../../images/plus.png'
import minus from '../../images/minus.png'
import * as commonConstant from '../common/CommonConstant'


export class PhysicianSample extends Component {
    productName
    count

    constructor() {
        super();
        this.state = {
            productList: []
            
        }
        this.changeSampleCount = this.changeSampleCount.bind(this);

    }

    componentDidMount() {
        this.setState({ productList: JSON.parse(sessionStorage.getItem(commonConstant.GET_ALL_PRODUCT)) })
    }
    changeSampleCount(operation, index) {
        
        let textFieldId = 'sampleCounter'+index;
        console.log("event fired "+textFieldId)

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
        console.log(textFieldId+': - ' + operation)
        document.getElementById(textFieldId).value = val;
    }

    editSampleCount(e) {

        let val = parseInt(e.target.value)
        console.log(val)
        if (isNaN(val)) {
            document.getElementById('sampleCounter').value = 0;
            console.log(e.target.value + '--' + val + document.getElementById('sampleCounter').value)
        }
    }


    render() {

        return (
            <div  className ="form-group">

                <div  className ="col-sm-offset-2 col-sm-5" >
                    <div id='physicianSampleDiv' >
                        <Typeahead
                            style={{ width: "45%", display: 'inline-block' }}
                            id="basic-typeahead-single"
                            labelKey="name"
                            //onChange={this.changeSampleName}
                            options={this.state.productList}
                            placeholder="Choose Product"
                        //selected={[{ name: 'Srigar', id: 1 }]}
                        />
                        <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <img src={plus} style={{ height: "10%", width: "10%" }} rounded  id={'plus'+this.props.id} onClick={() => this.changeSampleCount(true, this.props.id)} /> <span >&nbsp;</span>
                        <input type="text" style={{ width: "15%", textAlign: "center" }} id={'sampleCounter'+this.props.id} name="quantity" placeholder="0" onChange={this.editSampleCount} /> <span >&nbsp;</span>
                        <img src={minus} rounded style={{ height: "10%", width: "10%" }} id={'minus'+this.props.id} onClick={() => this.changeSampleCount(false, this.props.id)} />

                    </div>
                </div>
            </div>
        );
    }

}
export default PhysicianSample;