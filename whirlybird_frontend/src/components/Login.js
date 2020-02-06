import React, {useState} from 'react';
import {A, navigate} from 'hookrouter'
import {Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const data = {'username': username, 'password': password};

    const postData = () => axios.post('http://localhost:8000/obtain-auth/', data)
        .then(response => {
            localStorage.setItem('token', response.data.token)
        }).then(navigate('/'));


    return (
        <Form onSubmit={e => {
            e.preventDefault();
            postData()
        }}>
            <FormGroup>
                <Label className="text-light">Gebruikersnaam</Label>
                <Input type="text"
                       name="username"
                       value={username}
                       onChange={e => setUsername(e.target.value)}/>
            </FormGroup>

            <FormGroup>
                <Label className="text-light">Wachtwoord</Label>
                <Input type="password"
                       name="password"
                       value={password}
                       onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
            <input className="btn btn-primary" type="submit"/>
            <div className="registerlink">
                <A href="/register">Registreer Hier!</A>
            </div>
        </Form>
    )
};

export default Login;