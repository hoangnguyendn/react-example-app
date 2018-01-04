import React, {Component} from 'react';
import classCSS from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from "../../components/UI/Button/Button";
import {auth} from '../../firebase';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email',
                },
                validation: {
                    required: true
                },
                valid: false,
                focus: false,
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true
                },
                valid: false,
                focus: false,
                value: ''
            },
        },
        submit: {
            disabled: true
        }

    };

    checkValidation = (values, rules) => {
        let isValid = false;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = values.trim() !== '';
        }
        return isValid;
    };

    handleInput = (type) => event => {
        const loginForm = {...this.state.controls};
        loginForm[type].value = event.target.value;
        loginForm[type].valid = this.checkValidation(event.target.value, loginForm[type].validation);
        loginForm[type].focus = true;
        //console.log(loginForm[type]);
        let formIsValid = true;
        for (let element in loginForm) {
            formIsValid = loginForm[element].valid && formIsValid;
        }

        this.setState({
            controls: loginForm,
            submit: {
                disabled: !formIsValid
            }
        });
    };

    handleLogin = () => {
        auth.signInWithEmailAndPassword(this.state.controls.email.value, this.state.controls.password.value)
            .then(res => {
                console.log(res);
                let user = auth.currentUser;
                if (user) {
                    console.log('[Current User]', user)
                } else {
                    console.log('User not login')
                }
                let token = user.getIdToken()
                    .then(token => {
                        console.log(token)
                        window.localStorage.setItem('token', token);
                    })
                    .catch(error => {
                        console.log('[No token found]', error)
                    })

            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log('[Error Code]', errorCode);
                var errorMessage = error.message;
                console.log('[Error Message]', errorMessage);


            });

    };

    handleSendEmail = () => {
        let user = auth.currentUser;

        user.sendEmailVerification().then(function() {
            console.log('[Send Email Success]');
        }).catch(function(error) {
            console.log('[Send Email Fail]');
        });
    };

    handleLogout = () => {
        auth.signOut().then(function () {
            window.localStorage.removeItem('token')
        }).catch(function (error) {
            // An error happened.
        });
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        return (
            <div className={classCSS.auth}>
                <p><b>LOGIN</b></p>
                <form>
                    {formElementArray.map(form => {
                        return <Input key={form.id}
                                      inputtype={form.config.elementType}
                                      elementConfig={form.config.elementConfig}
                                      placeholder={form.config.elementConfig.placeholder}
                                      options={form.config.elementConfig.options}
                                      change={this.handleInput(form.id)}
                                      shouldValidate={form.config.validation}
                                      invalid={!form.config.valid}
                                      touched={form.config.focus}/>
                    })}
                </form>
                <Button disabled={this.state.submit.disabled} action={'Success'} clicked={this.handleLogin}>
                    Login
                </Button>
                <Button action={'Success'} clicked={this.handleSendEmail}>
                    Send Email
                </Button>
                <Button action={'Success'} clicked={this.handleLogout}>
                    Logout
                </Button>
                <Button action={'Success'}>
                    Sign Up
                </Button>
            </div>
        );
    }

}


export default Auth;