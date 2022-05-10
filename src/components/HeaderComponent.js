import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };

    // we did this to use this.taggleNav directly in the onClick event
    // without using the arroy function syntax
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleLogin(event) {
    this.toggleModal();
    // we used this.username.value directly from the dom with using reference
    alert(
      "Username: " +
        this.username.value +
        " Password: " +
        this.password.value +
        " Remember: " +
        this.remember.checked
    );
    event.preventDefault();
  }
  render() {
    return (
      // this is react fragment short form (React.Fragment)
      // we use it instead of div that adds extra DOM element
      // this wouldn't be added into DOM but it works as main div here
      <>
        {/* we can directly use style properties because of reactstrap */}
        {/* eg: dark for navbar and color */}
        {/* expand is used to when we collapsed the navbar >md  */}
        <Navbar dark expand="md">
          {/* className used to apply css classes and bootstrap */}
          <div className="container">
            {/* NavBar Toggler on small screens */}
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="" href="/">
              <img
                src="/assets/images/logo.png"
                height="30"
                width="41"
                alt="Alesko's Restaurant"
              />
            </NavbarBrand>
            {/* Put nav in collapse */}
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  {/* NavLink set the url where to go */}
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/about-us">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Food Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contact-us">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ms-auto">
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <div className="jumbotron py-5">
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Alesko's Restaurant</h1>
                <p>
                  we take inspiration from the world best cuisines, and we
                  create best recipes in order to satisfy you. Bring your family
                  and we will give you hapiness.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  // we used innerRef to extract the values directly from dom
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Header;
