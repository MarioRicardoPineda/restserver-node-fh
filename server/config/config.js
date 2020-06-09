let MONGO_URI

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
  MONGO_URI = process.env.MONGO_URI_LOCAL
}else{
  MONGO_URI = process.env.MONGO_URI_PROD
}

module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: MONGO_URI
}