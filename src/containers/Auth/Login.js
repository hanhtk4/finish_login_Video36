import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        // Bien state kiem soat cac component, re-render lai, su kien onClick, Onchange
        // 1. Khai bao state user,pass
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    // 3. tao funtion handleOnChangeInput
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        // console.log(event.target.value)
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        // console.log(event.target.value)
    }
    // 6. Viet ham handleLogin
    handleLogin = async () => {
        // alert("click vao login")
        // 7.lay thong tin user pass khi click login
        // console.log("Username:", this.state.username, "Password:", this.state.password)
        // console.log("all state", this.state)
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode == 0) {
                // to do somthing
                this.props.userLoginSuccess(data.user)
                console.log("login thanh cong");
                // alert("hello world");
            }
        } catch (error) {
            if (error.response)
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            console.log('hoidanIT', error.response)



        }



    }
    // 7. handleShowHidePassword - chuyen doi show,hiden password
    handleShowHidePassword = () => { this.setState({ isShowPassword: !this.state.isShowPassword }) }
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username: </label>
                            <input type="text" className="form-control" placeholder='Enter your username'
                                // 2. truy van gia tri state
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password: </label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    // 4. truy van gia tri state
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i>
                                </span>

                            </div>

                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            {/* 5.khai bao su kien click--> goi function handleLogin */}
                            <button className="btn-login" onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className='forgot-password'> Forgot your password ?</span>
                        </div>

                        <div className="col-12 text-center mt-3">
                            <span> Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        // Viet redux cho action user login success
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
