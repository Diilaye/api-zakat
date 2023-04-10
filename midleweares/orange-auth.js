const axios = require('axios');
const qs = require('qs');


let data = qs.stringify({
    'client_id': '361e99d3-1a6b-45c5-a8a4-f8120822169b',
    'client_secret': 'ce4075b5-a1f8-41ff-84da-e821f4711128',
    'grant_type': 'client_credentials' 
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.sandbox.orange-sonatel.com/oauth/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

  module.exports = async (req,res,next) => {
    axios.request(config)
    .then((responseData) => {
        req.tokenOM =  responseData.data['access_token']
        console.log(JSON.stringify(responseData.data));
        next();
    })
    .catch((error) => {
    console.log(error);
    res.json({
        message: 'unauthorized authentication required',
        statusCode: 401,
        data: error,
        status: 'NOT OK'
    });
    });
  }