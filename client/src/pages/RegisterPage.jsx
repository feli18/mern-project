import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function registerUser (ev) {
        ev.preventDefault()
        try {
            await axios.post('/register', {
                firstName, lastName, email, password
            });
            alert('Registration successful. Now you can log in.')
        } catch (e) {
            alert('Registration failed! Please try again later.')
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <div className="flex gap-2">
                        <input type="text" placeholder="First Name" className="text-center" value={firstName} onChange={ev => setFirstName(ev.target.value)} />
                        <input type="text" placeholder="Last Name" className="text-center" value={lastName} onChange={ev => setLastName(ev.target.value)} />
                    </div>
                    <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className='underline text-black' to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
