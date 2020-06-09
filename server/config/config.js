// let MONGO_URI

// if(process.env.NODE_ENV !== 'production'){

//   MONGO_URI = process.env.MONGO_URI_LOCAL
//   console.log("MONGO_URI", MONGO_URI)

// }
// // else{
// //   MONGO_URI = process.env.MONGO_URI_PROD
// //   console.log("prod ", MONGO_URI)
// // }

// module.exports = {
//   PORT: process.env.PORT || 4000,
//   MONGO_URI : process.env.MONGO_URI_LOCAL 
// }

//port
process.env.PORT = process.env.PORT || 3000

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// bases de datos
let MONGO_URL

if (process.env.NODE_ENV === 'dev') {
  MONGO_URL = "mongodb://localhost:27017/coffee-store"
}else{
  MONGO_URL = "mongodb+srv://Ricardo:atlasadmin@cluster0-fq1iz.mongodb.net/coffee-store?retryWrites=true&w=majority"
}
console.log(MONGO_URL)
process.env.MONGO_URI = MONGO_URL