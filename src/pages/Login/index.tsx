import React, { useState } from 'react';
import api from '../../api/api'
import { useHistory } from 'react-router-dom'

import './App.css';

export default function Login() {

  const [ email_user , setEmailUser ] = useState('')
  const [ password_user , setPasswordUser ] = useState('')

  const history = useHistory()

  async function loginAccount(){
    const login = { email_user , password_user }
    const response = await api.post('/getUser', login)
    .then((res) => {
      history.push('home')
      sessionStorage.setItem('id_user', res.data)

    }).catch((err) => {
     alert(err.response.data)
    })
  }

  return (
    <div id="App">
      <div className='boxLogin'>
        <strong className='textTitle'>Login</strong>
        <strong className='titleInput'>Email</strong>
        <input 
          className='inputLogin'
          value={email_user}
          type='email'
          onChange={(e) => setEmailUser(e.target.value)}
          
        />
        <strong className='titleInput'>Senha</strong>
        <input
          className='inputLogin'
          value={password_user}
          type='password'
          onChange={(e) => setPasswordUser(e.target.value)}
        />

        <button className='buttonForgetPassword'>Esqueceu a senha ?</button>
        <button className='buttonsLogin' id='enter' onClick={() => loginAccount()}>Entrar</button>
        <button className='buttonsLogin'>Cadastrar-se</button>
      </div>
    </div>
  );
}
