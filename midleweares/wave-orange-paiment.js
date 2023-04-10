const axios = require('axios');

configOM = (amount ) => JSON.stringify({
  "amount": {
    "unit": "XOF",
    "value": amount
  },
  "callbackCancelUrl": "https://my-cancel-url.com",
  "callbackSuccessUrl": "https://my-success-url.com",
  "code": 159515,
  "metadata": {},
  "name": "Verumed",
  "validity": 15
});









configWave = (amount ) =>  JSON.stringify({
  "amount": amount,
  "currency": "XOF",
  "error_url": "https://example.com/error",
  "success_url": "https://example.com/success"
})

let WaveConfig = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.wave.com/v1/checkout/sessions',
  headers: { 
    'Authorization': 'Bearer wave_sn_prod_U6G70A-tfpBnH8ZQ9WRkJScYe9lrEA_UQWvPqA6Qi-kA-pITtiQ9bWaiBeMzFUK5A59bSNC93h821gBFg-jmvDw4azSNz7pE8g', 
    'Content-Type': 'application/json'
  },
  data : configWave("2000")
};

module.exports = async (req,res,next) =>  {

  let configOrangoMoney = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.sandbox.orange-sonatel.com/api/eWallet/v4/qrcode',
    headers: { 
      'Authorization': 'Bearer '+req.tokenOM, 
      'Content-Type': 'application/json'
    },
    data : configOM
  };
  
  
    if(req.body.method =="OM")  {
      axios.request(configOrangoMoney)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        req.url =  response.data['deepLink'];
        next();
      })
      .catch((error) => {
        console.log(error);
      });
    }else  {

      axios.request(WaveConfig)
      .then((response) => {
            req.url =  response.data['wave_launch_url'];
            console.log(JSON.stringify(response.data));
            next();
      })
      .catch((error) => {
        res.json({
          message: 'unauthorized authentication required',
          statusCode: 401,
          data: error,
          status: 'NOT OK'
      });
      });
    }
    
}