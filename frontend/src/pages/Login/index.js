import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }){
  const [email, setEmail] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    console.log(email);
    const response = await api.post('/sessions', {email});

    const { _id } = response.data;
    
    console.log(_id);

    localStorage.setItem('user', _id);

    history.push('/dashboard');

  }

    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua startup
            </p>
            <form onSubmit={handleSubmit}>
            <label htmlFor="mail">E-MAIL *</label>
            <input 
                id="mail"
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    );
}