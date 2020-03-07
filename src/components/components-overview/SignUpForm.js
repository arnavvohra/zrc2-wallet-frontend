import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormFeedback,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";

import validator from "validator";
import axios from "axios";
import config from "../../config";
export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.registerUser = this.registerUser.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  componentDidMount() {
    console.log("true");
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value, isInvalidPassword: false });
  }

  submitSignup(event) {
    var code = event.keyCode || event.which;

    if (code === 13) {
      this.registerUser();
    }
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value, isInvalidEmail: false });
  }

  registerUser() {
    if (this.state.email == "" || !validator.isEmail(this.state.email)) {
      this.setState({
        isInvalidEmail: true,
        emailErrorText: "Enter a valid email"
      });
    } else if (this.state.password == "") {
      this.setState({
        isInvalidPassword: true,
        passwordErrorText: "Enter a valid password"
      });
    } else {
      // backend call to server

      let data = {};
      data.email = this.state.email;
      data.password = this.state.password;

      const self = this;

      axios
        .post(config.apiUrl + "/api/v1/users", data)
        .then(function(response) {
          const data = response.data;

          if (data.flag === 144) {
            self.setState({
              isInvalidEmail: true,
              emailErrorText: data.log
            });
          } else {
            // store token into localstorage

            localStorage.setItem("access_token", data.access_token);
            window.location = "/home";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  render() {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row className="formInputs">
            <Col>
              <Form>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Email</label>
                    <FormInput
                      id="feEmailAddress"
                      type="email"
                      placeholder="Email"
                      required
                      value={this.state.email}
                      invalid={this.state.isInvalidEmail}
                      onChange={this.onEmailChange}
                    />

                    <FormFeedback invalid>
                      {this.state.emailErrorText}
                    </FormFeedback>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <label htmlFor="fePassword">Password</label>
                    <FormInput
                      id="fePassword"
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      invalid={this.state.isInvalidPassword}
                      onChange={this.onChangePassword}
                      onKeyPress={this.submitSignup}
                    />

                    <FormFeedback invalid>
                      {this.state.passwordErrorText}
                    </FormFeedback>
                  </Col>
                </Row>

                <br/>Already have an Account?
                <a href="/" className="formLowerText">
                &nbsp;Login Now
                </a>

                <Row>
                  <Col md="12" className="form-group signUpBtn">
                    <Button onClick={this.registerUser}>SignUp</Button>
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
