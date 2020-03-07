import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormFeedback,
  Button
} from "shards-react";

import { decryptPrivateKey, getAddressFromPrivateKey } from '@zilliqa-js/crypto';

import axios from "axios";
import config from "../../config";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passphrase: "",
      selectedFile: null,
      encryptedWallet: "",
      privateKey: "",
      address: "",
      loginBtnText: "Login With KeyStore File",
      zilPayLogin:false,
      zilPayLoginBtnText:"Login With Zilpay"
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangePassphrase = this.onChangePassphrase.bind(this);
    this.unlock = this.unlock.bind(this);
    this.zilPayConnect = this.zilPayConnect.bind(this);
  }

  componentWillMount() {
  }

  onChangePassphrase(event) {
    this.setState({ passphrase: event.target.value });
  }

  onChangeHandler(e){
    // this.setState({
    //   selectedFile: event.target.files[0]
    // })
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = event => {
      this.setState({ encryptedWallet: event.target.result});
    }   

  }

   unlock = async() => {
    try {
      this.setState({ loginBtnText: "Logging In..." });
      let keystore = JSON.parse(this.state.encryptedWallet);
      console.log("keystore",keystore);
      console.log("passphrase",this.state.passphrase);
      const pk = await decryptPrivateKey(this.state.passphrase, keystore);
      this.setState({ privateKey: pk });
      if(pk){
      const address =  getAddressFromPrivateKey(pk);
      this.setState({ address: address });
        this.login();
      }
      console.log("pk",pk)
    } catch (error) {
    }
  }

  zilPayConnect = async() => {
    try {
      if (window.zilPay.wallet.isEnable) {
        await window.zilPay.wallet.connect();
        if(window.zilPay.wallet.isConnect){
          this.setState({ zilPayLoginBtnText: "Logging In With Zilpay..." });
          this.setState({ zilPayLogin: true });
          let currentAddress = await window.zilPay.wallet.defaultAccount.base16;
          this.setState({ address: currentAddress });
          this.login();
        }

      } else {
      console.warn('ZilPay not installed');
    }
    } catch (error) {}
}

  login(){
          // backend call to server

          let data = {};
          
          data.address = this.state.address;    
          const self = this;
    
          axios
            .post(config.apiUrl + "/api/v1/login", data)
            .then(function(response) {
              const data = response.data;
    
              if (data.flag === 144) {
                this.setState({ loginBtnText: "Try Again..." });
                // self.setState({
                //   isInvalidPassphrase: true,
                //   emailErrorText: data.log
                // });
              } else {
                //Set base16 address to localStorage
                localStorage.setItem("address", self.state.address);
                if(self.state.zilPayLogin){
                  localStorage.setItem("zilpay_login", 'true');
                }else{
                  //Set value of private key if login with keystore file
                  localStorage.setItem("zilpay_login", 'false');
                  localStorage.setItem("private_key", self.state.privateKey);
                }            
                window.location = "/home";
              }
            })
            .catch(function(error) {
              console.log(error);
            });
  }

  render() {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row className="formInputs">
            <Col>
              <Form>
                <Row>
                <Col md="6">
                    <label htmlFor="fePassword">Switch To Testnet On Zilpay</label></Col>
                  <Col md="12" className="form-group signUpBtn">
                    <Button onClick={this.zilPayConnect}>{this.state.zilPayLoginBtnText}</Button>
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="form-group signUpBtn">
                    OR
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="form-group signUpBtn">
                    <input type="file" name="file" onChange={(event)=>this.onChangeHandler(event)}/>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <label htmlFor="fePassword">Passphrase</label>
                    <FormInput
                      id="fePassword"
                      type="password"
                      placeholder="Passphrase"
                      value={this.state.passphrase}
                      onChange={this.onChangePassphrase}
                    />
                    <FormFeedback invalid>
                      {this.state.passwordErrorText}
                    </FormFeedback>
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="form-group signUpBtn">
                    <Button onClick={this.unlock}>{this.state.loginBtnText}</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }

  // async roll() {
  //   let zilPay = window.zilPay;
  //   let utils = zilPay.utils;
  //   // const test = testZilPay(); 
  //   // if (!test) {
  //   //   return null;
  //   // } else if (test == 'lock') {
  //   //   return null;
  //   // }
  //   // const roll = $('#formControlRange')[0].value;
  //   const amount = 1;
  //   const gasPrice = utils.units.toQa(
  //     '1000', utils.units.Units.Li
  //   );
  //   contract = zilPay.contracts.at(contractAddress);
  //   const tx = await contract.call(
  //     'Roll', [{
  //       vname: "rol",
  //       type: "Uint128",
  //       value: 10
  //     }],
  //     {
  //       amount: 10,
  //       gasPrice: gasPrice,
  //       gasLimit: utils.Long.fromNumber(9000)
  //     }
  //   );
  
  
  // }




}