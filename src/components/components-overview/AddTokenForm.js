import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormFeedback,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import axios from "axios";
import config from "../../config";
const  {fromBech32Address}  = require('@zilliqa-js/crypto');
const {validation} = require('@zilliqa-js/util')

export default class DappForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isTokenAdded: false,
      contractAddress:""
    };
    this.toggle = this.toggle.bind(this);
    this.addToken = this.addToken.bind(this);
    this.showTokens = this.showTokens.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  showTokens() {
    window.location = "/home";
  }

  onAddressChange(event) {
    this.setState({ contractAddress: event.target.value, isInvalidName: false });
  }

  addToken() {
    let contractAddress = this.state.contractAddress;
    console.log("contractAddress",contractAddress);
    if (contractAddress === "" || contractAddress === undefined || !validation.isBech32(contractAddress)) {
      this.setState({
        isInvalidName: "true",
        nameErrorText: "Enter a valid address"
      });
    } else {
      contractAddress = fromBech32Address(contractAddress);
      console.log("contractAddress",contractAddress);
      let userAddress = localStorage.getItem("address");
      // backend call to server

      let data = {};
      data.userAddress = userAddress;
      data.contractAddress = contractAddress;

      console.log(data);
      const self = this;

      axios
        .post(config.apiUrl + "/api/v1/token/add-token", data)
        .then(function(response) {
          const data = response.data;

          if (data.flag === 144) {
              self.setState({
                isInvalidName: "true",
                nameErrorText: data.log
              });

          } else {
            self.setState({
              isTokenAdded: true
            });

            self.toggle();

            // setTimeout(() => {}, 500);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  render() {
    const { open } = this.state;
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Modal open={open} toggle={this.toggle}>
            <Button className="closeModal" onClick={this.showTokens}>
              Close
            </Button>
            <ModalHeader>Add Token</ModalHeader>
            <ModalBody>
              <p className="dappRegistration">
              <strong>Congratulations! Token Added Successfully.</strong>
            </p>
            </ModalBody>
          </Modal>
            <Row className="formInputs">
              <Col>
                <Form>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="feEmailAddress">Contract Address</label>
                      <FormInput
                        id="feEmailAddress"
                        type="text"
                        placeholder="Format: zil1glvua6569k3rm34jm94pdalmlzz9spn965uudj"
                        required
                        value={this.state.contractAddress}
                        invalid={this.state.isInvalidName}
                        onChange={this.onAddressChange}
                      />
                      <FormFeedback invalid>
                        {this.state.nameErrorText}
                      </FormFeedback>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="form-group signUpBtn">
                      {this.state.isTokenAdded && (
                        <div className="alert alert-success">
                          <strong>Added Successfully</strong>
                        </div>
                      )}
                      <Button onClick={this.addToken}>Add</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
