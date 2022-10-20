import React, { useState } from 'react'
import { useLocation , useHistory } from 'react-router-dom'
import api from '../../api/api'

import './style.css'


export default function PageGetCode(){

    const [ code , setAccessToken ] = useState('')
    const grant_type = 'authorization_code'
    const client_id = '204939218422834'
    const client_secret = 'svZIZxEfbYzXygsb75hfRHcZcn5wfLr3'
    const redirect_uri  = 'https://localhost:3000'

    const  location  = useLocation() as any
    const history = useHistory()
    
    const data = { code , grant_type , client_id , client_secret , redirect_uri }
    


    async function getRefreshToken(){
       await api.post('generateToken', data)
        .then(async (res)  => {
            if(res.data === 'Request failed with status code 400'){
                alert('Tente novamente com outro código por favor!! ')
            } else {
                 let access_token = res.data.access_token
                 await api.put('updateToken', {access_token},{
                    headers:{
                        Authorization: location.state.id_shops
                    }
                 })
                 history.push('home')
                 alert(`O Access Token da loja ${location.state.name_shop} foi atualizado com sucesso!!`)
            }
        })
       }

      

    

    return(
        <div className='container'>
            <div className='boxInfoShop'>
                <strong>{location.state.name_shop}</strong>
                <p><strong>Marketplace:</strong>Mercado Livre</p>
                <input className='inputToken' onChange={e => setAccessToken(e.target.value)} placeholder='Cole Access Token Aqui...' />
                <button className='buttonAcessToken' onClick={() => getRefreshToken()}>Gerar Access Token</button>
            </div>
            
        </div>
    )
}