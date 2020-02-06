import React, {useState} from 'react';
import {navigate} from 'hookrouter';
import {Form, FormGroup, Label, Input} from 'reactstrap'
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const data = {
        'username': username,
        'email': email,
        'password': password1,
        'first_name': firstName,
        'last_name': lastName
    };

    const postData = () => axios.post('http://localhost:8000/api/register',
        data);

    const handleSubmit = e => {
        e.preventDefault();
        if (password1 === password2) {
            postData();
            navigate('/login');
        } else {
            alert("Wachtwoorden komen niet overeen");
        }
    };


    return (
        <Form className="text-light" onSubmit={handleSubmit}>
            <h4>Registreer</h4>
            <FormGroup>
                <Label>Gebruikersnaam</Label>
                <Input
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label>Wachtwoord</Label>
                <Input
                    type="password"
                    name="password"
                    value={password1}
                    onChange={e => setPassword1(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label>Herhaal Wachtwoord</Label>
                <Input
                    type="password"
                    name="password"
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label>Voornaam</Label>
                <Input
                    type="text"
                    name="firstname"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label>Achternaam</Label>
                <Input
                    type="text"
                    name="lastname"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            </FormGroup>
            <input className="btn btn-primary" type="submit"/>
        </Form>
    );

};

export default Register;