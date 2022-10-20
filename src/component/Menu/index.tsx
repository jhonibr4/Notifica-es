import React from 'react'
import { useHistory } from 'react-router-dom'
import { text } from 'stream/consumers'

import './style.css'

export default function Menu(){

    const history = useHistory()

    let  url = 'https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=204939218422834'

    const CopyURL = () => {
        const textSelected = document.createElement('textarea')
        textSelected.innerText = url
        document.body.appendChild(textSelected)
        textSelected.select()
        document.execCommand('Copy')
        textSelected.remove()
    }

    return(
        <div className='boxMenu'>
            <button 
                onClick={() => history.push('addShops')}
                className='buttonMenu'
            >
                Adicionar Loja
            </button>
            
           
                <button className='buttonMenu' onClick={() => CopyURL()}>Gerar Código</button>
           
        </div>
    )
}