import React, {useEffect, useState} from 'react';
import {navigate} from 'hookrouter'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import axios from "axios";

const Profile = () => {
    const [disabled, setDisabled] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const data = {username, email, firstName, lastName};

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/user",
                {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}
            );
            setUsername(res.data.username);
            setEmail(res.data.email);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);

        }

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    };

    const handleEdit = () => {
        setDisabled(!disabled);
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/user', data,
            {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}
        ).catch(navigate('/login'));

    };

    const handleDelete = e => {
        e.preventDefault();
        axios.delete('http://localhost:8000/api/user',
            {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}
        ).catch(navigate('/login'));
        localStorage.removeItem('token')
    };


    return (
        <Form className="text-light" onSubmit={handleSubmit}>
            <h4>Profiel</h4>
            <FormGroup>
                <Label>Gebruikersnaam</Label>
                <Input
                    type="text"
                    name="username"
                    value={username}
                    disabled={true}
                />
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={disabled}
                />
            </FormGroup>
            <FormGroup>
                <Label>Voornaam</Label>
                <Input
                    type="text"
                    name="firstname"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    disabled={disabled}
                />
            </FormGroup>
            <FormGroup>
                <Label>Achternaam</Label>
                <Input
                    type="text"
                    name="lastname"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    disabled={disabled}
                />
            </FormGroup>

            <div className="buttonbox">
                <Button className="border-primary bg-primary" type="submit">Verzenden</Button>
                <Button className="border-info bg-info" onClick={handleEdit}>Wijzig</Button>
                <Button className="border-warning bg-warning" onClick={handleLogout}>Log uit</Button>
                <Button className="border-danger bg-danger" onClick={handleDelete}>Delete</Button>
            </div>
        </Form>
    )
};

export default Profile;