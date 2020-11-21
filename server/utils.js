const mongoClient = require("mongodb").MongoClient
const URL = "mongodb://localhost:27017"

// 连接选定的数据库
function getDB(database) {
  return new Promise((res,rej) => {
    mongoClient.connect(URL, { useUnifiedTopology: true },(error,client) => {
      if(error) return rej(error)
      res(client.db(database))
    })
  })
}

// 选择集合
function getCollection (db,collection) {
  return db.collection(collection)
}

// 从选定的数据库集合里选取数据
function getData(collection,config = {}) {
  return new Promise((res,rej) => {
    collection.find(config).toArray((error,result) => {
      if(error) return rej(error)
      res(result)
    })
  })
}

// 往选定的数据库集合插入数据
function insertData(collection,data) {
  return new Promise((res,rej) => {
    if(!Object.keys(data).length) {
      return rej('no available data')
    }
     res(collection.insertOne(data))
  })
}

function doNothing () {
  return
}


// 导出
module.exports = {
  getDB,
  getCollection,
  getData,
  insertData,
  doNothing
}