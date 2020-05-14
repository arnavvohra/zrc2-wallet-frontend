import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import axios from "axios";
import AddTokenForm from "./AddTokenForm.js";
import SendTokenForm from "./SendTokenForm.js";
import config from "../../config";
const {Zilliqa} = require('@zilliqa-js/zilliqa');

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');

const {BN, Long, bytes, units} = require('@zilliqa-js/util');
const {
    toBech32Address, fromBech32Address
} = require('@zilliqa-js/crypto');

export default class Dapps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
      title: "Your Testnet ZRC-2 Tokens",
      tokensList:[],
      address: "",
      selectedAddress: "",
      selectedBalance: 0,
      zilBalance:0,
      zilPayLogin:'false'
    };
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.fetchTokenData = this.fetchTokenData.bind(this);
    this.fetchBalance = this.fetchBalance.bind(this);
  }

  componentWillMount() {
    let address = localStorage.getItem("address");
    this.setState({ address: address });
    let zilPayLogin = localStorage.getItem("zilpay_login");
    if(zilPayLogin=='true'){
      this.setState({ zilPayLogin: 'true' });
    }
    this.fetchZilBalance();

    const self = this;
    axios
      .get(config.apiUrl + `/api/v1/token/token-list?userAddress=${address}`)
      .then(function(response) {
        const data = response.data;
        if (data.flag === 143) {
          if(data.tokensList){
            self.setState({ tokensList: data.tokensList });
          }
          self.fetchTokenData();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchZilBalance = async() => {
      //Zilliqa Balance
      try {
        let address = localStorage.getItem("address");
        address = address.substring(2);
        let balanceState = await zilliqa.blockchain.getBalance(address);
        if(balanceState){
          let balance = balanceState.result.balance;
          balance = units.fromQa(new BN(balance), units.Units.Zil);
          this.setState({ zilBalance: balance });
        }
      } catch (error) {
      }
  }

   fetchTokenData = async () => {
    let tokensList = this.state.tokensList;
    for(let i=0; i< this.state.tokensList.length;i++){
      //Token Symbol
      let address = tokensList[i].contractAddress;
      address = address.substring(2);
      let tokenBalance = await this.fetchBalance(address);
      if(tokenBalance){
        tokensList[i].balance = tokenBalance;
      }else{
        tokensList[i].balance = 0;
      }    
    }
    this.setState({ tokensList: tokensList });

  }
  
  fetchBalance = async (address) => {
    try {
      let smartContractState = await zilliqa.blockchain.getSmartContractState(address);
      if(smartContractState){
        let balances_map = smartContractState.result.balances_map;
        let userAddress = this.state.address;
        userAddress = userAddress.toLowerCase();
        let userBalance = balances_map[userAddress];
        return userBalance;
      }
    } catch (error) {
    }
}

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  toggle2(index) {
    console.log("index",index);
    if(typeof index=='number'){
      let selectedAddress = this.state.tokensList[index].contractAddress;
      let selectedBalance= this.state.tokensList[index].balance;
      this.setState({selectedAddress: selectedAddress, selectedBalance: selectedBalance});
    }
    this.setState({
      open2: !this.state.open2
    });
  }

  render() {
    const { open } = this.state;
    const { open2 } = this.state;
    return (
      <div>
        <Modal open={open} toggle={this.toggle}>
          <Button className="closeModal" onClick={this.toggle}>
            Close
          </Button>
          <ModalHeader>Add Token</ModalHeader>
          <ModalBody>
            <AddTokenForm />
          </ModalBody>
        </Modal>

        <Modal open={open2} toggle={this.toggle2}>
          <Button className="closeModal2" onClick={this.toggle2}>
            Close
          </Button>
          <ModalHeader>Send Token</ModalHeader>
          <ModalBody>
            <SendTokenForm 
              contractAddress={this.state.selectedAddress}
              userBalance={this.state.selectedBalance}
              sendTransaction = {this.sendTransaction}/>
          </ModalBody>
        </Modal>

        <Card small className="blog-comments dappsList">
          <CardHeader className="border-bottom">
            <h6 className="m-0">{this.state.title}</h6>
            <Button
              onClick={this.toggle}
              theme="success"
              className="registerDappsBtn"
            >
              <span className="text-mutes">{"  + "}</span>
              Add Token
            </Button>
          </CardHeader>

          <CardBody className="p-0">
          <div className="blog-comments__item d-flex p-3">
          <span className="text-mutes">
           Zilliqa Balance : {this.state.zilBalance}
           <br/>
           Your Receiving Address: {toBech32Address(this.state.address)}
           <br/>
           ByStr20 : {this.state.address}
          </span>
          </div>
            {this.state.tokensList.length > 0 ? (
              this.state.tokensList.map((token, idx) => (
                <div key={idx} className="blog-comments__item d-flex p-3">
                  {/* Content */}
                  <div className="blog-comments__content">

                    {/* Content :: Body */}

                    <p className="m-0 my-1 mb-2">
                      {" "}
                      <span>
                        Balance :
                        {"   " + token.balance?token.balance:0}
                      </span><br />
                      <span className="text-mutes">
                        Token Contract Address :
                        {" " + toBech32Address(token.contractAddress)}
                        <br/>
                        {"Contract Address ByStr20 : " + token.contractAddress}
                      </span><br />
                    </p>
                      <Button
                        outline
                        onClick={() => this.toggle2(idx)}
                        theme="primary"
                        className="text-mutes"
                      >
                      Send
                      </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="blog-comments__item d-flex p-3 noDappsCol">
                {/* Content */}
                <div className="blog-comments__content noDappsContent">
                  {/* Content :: Title */}
                  <div className="blog-comments__meta text-mutes">
                    <a className="text-secondary noDappsTitle">
                      {"No Token Added"}
                    </a>
                  </div>

                  {/* Content :: Body */}
                  <p className="m-0 my-1 mb-2 text-muted titleText">
                    {"Click + Add Token button above to add new ZRC-2 token"}
                  </p>
                </div>
              </div>
            )}
          </CardBody>

          {this.state.tokensList.length > 0 && (
            <CardFooter className="border-top">
              <Row>
                <Col className="text-center view-report">
                </Col>
              </Row>
            </CardFooter>
          )}
        </Card>
      </div>
    );
  }

  sendTransaction = async(contractAddress,recipientAddress, sendingAmount) => {
    let zilliqa;
    if(this.state.zilPayLogin =='true'){
      zilliqa = window.zilPay;
    }
    else{
      zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
      let privkey = localStorage.getItem("private_key");
      zilliqa.wallet.addByPrivateKey(privkey);
  }

  const CHAIN_ID = 333;
  const MSG_VERSION = 1;
  const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);


  const myGasPrice = units.toQa('1000', units.Units.Li); // Gas Price that will be used by all transactions
  // let contractAddress = this.state.contractAddress;
  contractAddress = contractAddress.substring(2);
  // let recipientAddress = this.state.recipientAddress;
  recipientAddress = fromBech32Address(recipientAddress);//converting to ByStr20 format
  const ftAddr = toBech32Address(contractAddress);
  try {
      const contract = zilliqa.contracts.at(ftAddr);
      const callTx = await contract.call(
          'Transfer',
          [
              {
                  vname: 'to',
                  type: 'ByStr20',
                  value: recipientAddress,
              },
              {
                  vname: 'amount',
                  type: 'Uint128',
                  value: sendingAmount,
              }
          ],
          {
              // amount, gasPrice and gasLimit must be explicitly provided
              version: VERSION,
              amount: new BN(0),
              gasPrice: myGasPrice,
              gasLimit: Long.fromNumber(10000),
          }
      );
      console.log(JSON.stringify(callTx.receipt, null, 4));

  } catch (err) {
      console.log(err);
  }
  }
}
