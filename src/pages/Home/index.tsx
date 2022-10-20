
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FiTrash } from 'react-icons/fi'
import addNotification from 'react-push-notification';


import Menu from '../../component/Menu'

import api from '../../api/api'



import './style.css'

export default function Home(){

    interface Shops{
        id_shops:string
        access_token:string
        id_user:string
        marketplace:number
        name_shop:string
        
    }

    
    const id_user = sessionStorage.getItem('id_user')
    const [ shops , setShops ] = useState<Shops[]>([])
    let [ ativado , setAtivado ] = useState(false)
    const [ colorSwitch , setColorSwitch ] = useState('switchColorOff')
    const [ indicatorSwitch , setIndicatorSwitch ] = useState('switchOff')
    
    const history = useHistory()

    
    useEffect(() => {
        LoadShops()
    },[])
    
   

    async function getCode(){
        await api.get('/teste')
        .then(res => console.log(res))
    }
    const LoadShops = async () =>  {
        const id = String(id_user)
        await api.get('getShops', {
            headers:{
               Authorization:id
           }
       }).then((res) => {
           setShops(res.data)
       })
   }
   




    async function addShops(){
        
        history.push('addShops')
    }
    function pageGetCode(shop: object){
        history.push('pagegetcode', shop)
    }
    

    async function getMessages(){
    
          shops.map(async (shop , i) => {
            if(shop.access_token !== null){
        await api.get('getNotification', {
            headers:{
                Authorization:`Bearer ${shop.access_token}`
            }
        }).then(async (res) => {
            let x = 0
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].status === 'UNANSWERED'){
                    x += 1
                }
            }
            if(x > 0){
                addNotification({
                    title:'Nova Pergunta',
                    subtitle:`Há ${x} Perguntas na loja ${shop.name_shop}, responda o mais rápido possivel.`,
                    message: `Há ${x} Perguntas na loja ${shop.name_shop}, responda o mais rápido possivel.`,
                    theme: 'darkblue',
                    native: true,
                    duration: 60000,
                    silent: true
                })
                
            }
            })
            }
        })    
    setTimeout(() => {
        getMessages()
    },300000)
}
    
    function ChangeSwitch(){
        if(!ativado){
            setAtivado(true)
            setColorSwitch('switchColorOn')
            setIndicatorSwitch('switchOn')
            getMessages()
        }else {
            setAtivado(false)
            setColorSwitch('switchColorOff')
            setIndicatorSwitch('switchOff')
        }
        
}
   async function cleanAccessToken(){
        shops.map(async (clean) => {
            let access_token = null
            await api.put('updateToken', {access_token}, {
                headers:{
                    Authorization:clean.id_shops
                }
            })
        })
        LoadShops()
        alert('Exclusão de Access Token bem sucedida!! Adicione novamente para continuar recebendo notificações.')
   }

    return(
        <div id='container'>
            <Menu/>
            <div className='boxShops'>

                <div onClick={() => ChangeSwitch()} className='divSwitch' id={colorSwitch}>
                    <div className='indicatorSwitch' id={indicatorSwitch}>

                    </div>
                </div>
                {shops.length === 0 ? 
                <div className='divShopsNotFound'>
                  
                    <button
                     className='boxAddShops'
                     onClick={() => addShops()}
                    >
                        <AiOutlinePlusCircle size={100}/>Adicionar Loja
                    </button>
                </div>
                :
                <div className='divShops'>
                    <button
                     className='boxAddShops'
                    >
                        <AiOutlinePlusCircle color="#FFF" size={100}/><p className='textButtonBig'>Adicionar Loja</p>
                    </button>
                    {shops.map((shop , i) => (
                        <div className='divGetCode' key={i}>
                            <p className='titleGetCode' >{shop.name_shop}</p>
                            <img className='imageMarketplace' src={require('../../assets/ML.png')} />
                            <button className='buttonGetCode' onClick={() => pageGetCode(shop)}>Gerar Código</button>
                        </div>
                    ))}
                    <button
                     className='boxAddShops'
                     onClick={() => cleanAccessToken()}
                    >
                        <FiTrash color="#FFF" size={100}/><p className='textButtonBig'>Limpar Access Token de Todas Lojas</p>
                    </button>
                </div>
                }
            </div>
        </div>
    )
}