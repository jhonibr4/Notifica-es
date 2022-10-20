const connection = require('../connection')
const crypto = require('crypto')
const axios = require('axios')

module.exports = {
    async create(req , res){
        const id_shops = crypto.randomBytes(4).toString('HEX')
        const { marketplace , name_shop, access_token } = req.body
        const id_user = req.headers.authorization

        const response = await connection('shops').insert({
            id_shops,
            marketplace,
            name_shop,
            id_user,
            access_token
        })

        return res.json(response)
    },
    async index(req , res){
        const id_user = req.headers.authorization

        const response = await connection('shops')
        .select('*')
        .where({'id_user': id_user})
      

        return res.json(response)
    },
    async generate(req , res){

        const { grant_type , client_id , client_secret , code , redirect_uri } = req.body

        const response = await axios.post(`https://api.mercadolibre.com/oauth/token`,{ grant_type , client_id , client_secret , code , redirect_uri } , {
            headers:{
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then(resolve => {
            return res.json(resolve.data)
        })
        .catch(err => {
            return res.json(err.message)
        })

    },
    async update(req , res){
        const id_shops = req.headers.authorization

        const response = await connection('shops')
        .where('id_shops', id_shops)
        .update(req.body)

        return res.json(response)
    },
    async notification(req , res){
        const  access_token = req.headers.authorization
        let text = 'UNANSWERED'

        const response = await axios.get(`https://api.mercadolibre.com/my/received_questions/search?api_version=4&status=UNANSWERED`, {
            headers:{
                authorization:access_token
            }
        })
        
        return res.json(response.data.questions)
    
        
    }

}

// curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/missed_feeds?app_id=$APP_ID 