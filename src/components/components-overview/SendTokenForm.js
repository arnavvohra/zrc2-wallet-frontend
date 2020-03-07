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

export default class DappForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      contractAddress: this.props.contractAddress,
      userBalance: this.props.userBalance,
      recipientAddress: "",
      sendingAmount:0,
      sendBtnText:"Send",
      isTransactionSuccess: false,
      successMsg:"The transaction is broadcasted!"
    };
    this.toggle = this.toggle.bind(this);
    this.showTokens = this.showTokens.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
  }

  componentWillMount(){
    let zilPayLogin = localStorage.getItem("zilpay_login");
    if(zilPayLogin=='true'){
      this.setState({successMsg: "Confirm the transaction on Zilpay and then click Close!"});
    }

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
    this.setState({ recipientAddress: event.target.value, isInvalidName: false });
  }

  onAmountChange(event) {
    this.setState({ sendingAmount: event.target.value });
    if(!isNaN(this.state.sendingAmount) && this.state.sendingAmount>0 && this.state.sendingAmount>=this.state.userBalance){
      this.setState({ isInvalidAmount: false });
    }
  }

   send = async() => {
    this.toggle();
    this.props.sendTransaction(this.state.contractAddress, this.state.recipientAddress, this.state.sendingAmount);
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
            <ModalHeader>Send Transaction</ModalHeader>
            <ModalBody>
              <p className="dappRegistration">
              <strong>{this.state.successMsg}</strong>
            </p>
            </ModalBody>
          </Modal>
            <Row className="formInputs">
              <Col>
                <Form>
                  <Row form>
                  <Col md="12" className="form-group">
                      <label htmlFor="feEmailAddress">Recipient Address</label>
                      <FormInput
                        id="feReciepientAddress"
                        type="text"
                        placeholder="Format: zil1glvua6569k3rm34jm94pdalmlzz9spn965uudj"
                        required
                        value={this.state.recipientAddress}
                        invalid={this.state.isInvalidName}
                        onChange={this.onAddressChange}
                      />
                      <FormFeedback invalid>
                        {this.state.nameErrorText}
                      </FormFeedback>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmailAddress">Amount</label>
                      <FormInput
                        id="feSendingAmount"
                        type="text"
                        placeholder="Amount"
                        required
                        value={this.state.sendingAmount}
                        invalid={this.state.isInvalidAmount}
                        onChange={this.onAmountChange}
                      />
                      <FormFeedback invalid>
                        {this.state.nameErrorText}
                      </FormFeedback>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="form-group signUpBtn">
                      {this.state.isTransactionSuccess && (
                        <div className="alert alert-success">
                          <strong>Sent Successfully</strong>
                        </div>
                      )}
                      <Button onClick={this.send}>{this.state.sendBtnText}</Button>
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
