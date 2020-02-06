import React from 'react';
import {A, navigate} from "hookrouter";
import {Navbar, NavItem} from 'reactstrap';

import "../styles.css"
import Logo from '../resources/Logo_green.svg'
import ProfileAvatar from '../resources/profile_avatar.png'
import axios from "axios";

const Header = () => {

    const loginRegister = () => {
        axios.get(
            "http://127.0.0.1:8000/api/user",
            {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}
        ).then(respsonse => {
            if(respsonse.status === 200){
            navigate('/profile')
                }
        })
            .catch(error => {
                    if (error.response.status === 401) {
                        navigate('/login')
                    }
                }
            )

    };

    return (
        <Navbar color="dark" dark expand="md" sticky="top">
            <A href='/' className="navbar-brand">
                <img className="small-image" src={Logo} alt="WhirlyBird logo"/>
            </A>
            <nav className="ml-auto my-auto">
                <NavItem>
                    <img className="small-image" src={ProfileAvatar} alt="profile" onClick={loginRegister}/>
                </NavItem>
            </nav>
        </Navbar>

    );
};

export default Header;