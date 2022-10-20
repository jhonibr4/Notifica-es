import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../api/api'

import './style.css'


export default function AddShops(){

    const history = useHistory();
    
    const id_user = sessionStorage.getItem('id_user')
    const [ marketplace , setMarketplace ] = useState('')
    const [ name_shop , setNameShop ] = useState('')
   

    async function registerShops(){
        const id = String(id_user)
        const data = { marketplace , name_shop }
        await api.post('createShops', data, {
            headers:{
                Authorization:id
            }
        }).then(() => {
            alert('Parabéns!! Seu cadastro está pronto.')
            history.push('home')
        })
    }

    return(
        <div id='container'>
            <div className='boxInfosShops'>
                <strong className='textTitle'>Cadastro de Loja</strong>

                <strong className='titleInput'>Marketplace da Loja</strong>
                <select className='selectShops' onChange={e => setMarketplace(e.target.value)}>
                    <option value={0}>Mercado Livre</option>
                    <option value={1}>Shopee</option>
                </select>
                <strong className='titleInput'>Nome da Loja</strong>
                <input 
                    className='inputShops'
                    onChange={e => setNameShop(e.target.value)}
                />
               
                <button 
                    className='buttonRegister'
                    onClick={() => registerShops()}
                >
                    Registrar Loja
                </button>
                
            </div>
        </div>
    )
}