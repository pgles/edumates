import React, { Component } from 'react';
import { Card,CardBody,CardHeader,CardTitle,Col,Row,Label,Button, Form, FormGroup,Input } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };
export class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            gender:'',
            city:'',
            decscription:'',
            isDropdownOpen:false,
            errors: {
                name: '',
                email: '',
                password: '',
                gender:''
              }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleDropdown=this.toggleDropdown.bind(this);
    }
    handleChange(event) {
        event.preventDefault();
        this.setState({...this.state, [event.target.name]:event.target.value});
            let errors = this.state.errors;
            if (this.state.gender === '') {
                errors.gender = 'Please select gender!';
            }
            switch (event.target.name) {
                case 'name': 
                  errors.name = 
                    event.target.value.length < 5
                      ? 'Name must be at least 5 characters long!'
                      : '';
                  break;
                case 'email': 
                errors.email = 
                    validEmailRegex.test(event.target.value)
                      ? ''
                      : 'Email is not valid!';
                  break;
                case 'password': 
                errors.password = 
                    event.target.value.length < 8
                      ? 'Password must be at least 8 characters long!'
                      : '';
                  break;
                  case 'gender': 
                    errors.gender = 
                        event.target.value === ''
                        ? 'Please select gender'
                        : '';
                    break;
                default:
                  break;
              }
              this.setState({errors, [event.target.name]: event.target.value});
    }
    handleSubmit(event) {
        // alert(JSON.stringify(this.state));
        event.preventDefault();
        if(validateForm(this.state.errors)) {
            alert(JSON.stringify(this.state));
          }else{
           alert('Invalid Form');
          }
    }
    toggleDropdown() {
        this.setState({isDropdownOpen:!this.state.isDropdownOpen})
    }
    render() {
        return (
            <div>
                <div className='container'>
                <div className='d-flex justify-content-center'>
                <Card className='col-md-8'>
                    <CardHeader>EduMates</CardHeader>
                    <CardBody>
                        <CardTitle className='d-flex justify-content-center'><h2>SignIn Form</h2></CardTitle>
                        <Form  onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label for="name" sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="name" id="name" placeholder="Enter your name" onChange={this.handleChange}/>
                                {this.state.errors.name.length > 0 && 
                                <span className='error text-danger'>{this.state.errors.name}</span>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="email" placeholder="Enter your email id" onChange={this.handleChange}/>
                                {this.state.errors.email.length > 0 && 
                                <span className='error text-danger'>{this.state.errors.email}</span>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange}/>
                                {this.state.errors.password.length > 0 && 
                                <span className='error text-danger'>{this.state.errors.password}</span>}
                            </Col>
                        </FormGroup>  
                        <FormGroup row>
                            <Label for="gender" sm={2}>Gender</Label>
                            <Col sm={10}>
                                <div className='form-check form-check-inline'>
                                    <Label className='radio-inline col-sm-auto'>
                                        <Input type="radio" name="gender" value='male' onChange={this.handleChange}/>{' '}Male
                                    </Label> 
                                    <Label className='radio-inline col-sm-auto'>
                                        <Input type="radio" name="gender" value='female' onChange={this.handleChange}/>{' '}Female
                                    </Label>       
                                </div>
                                {this.state.errors.gender.length > 0 && 
                                <span className='error text-danger'>{this.state.errors.gender}</span>}
                            </Col>
                        </FormGroup>  
                        <FormGroup row>
                            <Label for="city" sm={2}>Select City</Label>
                            <Col sm={10}>
                                <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
                                    <DropdownToggle caret>
                                        Select Home City
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href='#'>Pune</DropdownItem>
                                        <DropdownItem href='#'>Bombay</DropdownItem>
                                        <DropdownItem href='#'>Hyderabad</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleText" sm={2}>Description</Label>
                                <Col sm={10}>
                                    <Input type="textarea" name="description" id="description" onChange={this.handleChange} rows='10'/>
                                </Col>
                            </FormGroup>
                            <Col sm={10} sm={{offset:2}}> 
                                <Button color='primary'>Submit</Button>
                            </Col>
                        </Form>
                    </CardBody>
                </Card> 
                </div>
                </div>
            </div>
        )
    }
}

