import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Col,
  Row,
} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numer: 0,
      isModalOpen: false,
    };
    this.onPlus = this.onPlus.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onPlus() {
    this.setState({
      numer: this.state.numer + 1,
    });
  }

  onMinus() {
    this.setState({
      numer: this.state.numer - 1,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert(
      'Username: ' +
        this.username.value +
        'Password: ' +
        this.password.value +
        'Remember me: ' +
        this.remember.checked
    );
    event.preventDefault();
  }

  handleSubmit(values) {
    alert('Current State: ' + JSON.stringify(values));
  }

  render() {
    return (
      <div className="container mt-3">
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)',
          }}
        >
          <div className="row">
            <p>{this.state.numer}</p>
          </div>
          <div className="row">
            <button onClick={this.onPlus} className="mr-2">
              Plus Me
            </button>
            <button onClick={() => this.onMinus()}>Minus Me</button>
          </div>
        </FadeTransform>
        <div className="row mt-3">
          <button onClick={this.toggleModal}>Sign in</button>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSumit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <FormGroup checked className="text-center">
                <Label checked>
                  <Input
                    type="checkbox"
                    name="Remember"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember Me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <div className="row row-content">
          <div className="col-12 col-md-9">
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="firstname" md={2}>
                  First Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".firstname"
                    name="firstname"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(10),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".firstname"
                    show="touched"
                    messages={{
                      required: 'Required ',
                      minLength: 'More than 3',
                      maxLength: 'Less than 10',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="telnum" md={2}>
                  Your phone
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".telnum"
                    name="telnum"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(10),
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".telnum"
                    show="touched"
                    messages={{
                      required: 'Required ',
                      minLength: 'More than 3',
                      maxLength: 'Less than 10',
                      isNumber: 'Must be number',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="email" md={2}>
                  Your Email
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".email"
                    name="email"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                      validEmail,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".email"
                    show="touched"
                    messages={{
                      required: 'Required ',
                      minLength: 'More than 3',
                      maxLength: 'Less than 30',
                      validEmail: 'Must be email',
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox
                        model=".agree"
                        name="agree"
                        className="form-check-iput"
                      />
                      Agree
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Control.select
                    model=".contactType"
                    name="contactType"
                    className="form-control"
                  >
                    <option>Email</option>
                    <option>Phone</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Control.textarea
                    model=".message"
                    name="message"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
