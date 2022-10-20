const bcrypt = require('bcrypt')
const crypto = require('crypto')
const axios = require('axios')
const connection = require('../connection')

module.exports = {
    async create(req, res){
        const id_user = crypto.randomBytes(4).toString('hex')
        const { name_user, email_user , password_user } = req.body
        const password = await bcrypt.hash(password_user, 10)
        const response = await connection('user').insert({
            id_user,
            name_user,
            email_user,
            password_user : password,
        })

        return res.json(response)
    },
    async index(req, res){
       const { email_user , password_user } = req.body
       const data = await connection('user')
       .where({
            'email_user': email_user,
        }).select(
            'password_user',
            'id_user'
        )
        .first()
        if(data){
            bcrypt.compare(password_user, data.password_user , (err, result) => {
                if(result === false){
                    return res.status(401).send('Ocorreu algum erro, Tente novamente!!')
                }
               else{
                    return (
                        
                         res.json(data.id_user)
                    )
               }
            })
        } else {
            return res.status(401).send('Ocorreu algum erro, Tente novamente!!')
        }
           
    },
    async all( req , res ){
        const response = await connection('user').select('*')

        return res.json(response)
    },
    async teste (req , res){
        const data = await axios.get('https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=204939218422834',{
        headers:{
            'Access-Control-Allow-Credentials':true,
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          
        }}
        )
        return res.json(data.response)
    }
}