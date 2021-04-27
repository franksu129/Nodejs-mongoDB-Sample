// MongoDB 參考文件
// 官方 node js: https://mongodb.github.io/node-mongodb-native/api-bson-generated/
// 官方 API: http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne
// 操作範例: https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp

// RESTFUL API 參考文件
// https://noob.tw/restful-api/

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const express = require('express');

// 連線字串
const url = 'mongodb://localhost:27017';
// DB名稱
const dbName = 'myproject';
// 集合名稱
const collectionName = 'echo';

const router = express.Router();
const client = new MongoClient(url, { useNewUrlParser: true });

// 運行後直接執行
client.connect()
  .then((connectedClient) => {
    console.log('mongodb is connected');
  })
  .catch(error => {
    console.error(error);
  });

// 檢查連線是否存在
router.get('/check', function (req, res, next) {
  res.json({
    isConnected: client.isConnected(),
  });
});

// 寫入 MongoDb
router.post('/echo', async (req, res, next) => {

  const body = req.body;
  const worker = (async function (data) {

    console.log('GetData: ' + data);

    return client.db(dbName)
      .collection(collectionName)
      .insertOne(data);
  })(body);

  // 回應
  worker
    .then(() => {
      res.json(body);
    })
    // 發生 error 的話，next() 交給之後的 middleware 處理，express 有預設的處理方法
    .catch(next);

});

//取得 db Data
router.get('/echo', async (req, res) => {

  client
    .db(dbName)
    .collection(collectionName)
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

//更新 db Data
router.patch('/echo/:id', async (req, res) => {

  var updateObject = req.body;
  var id = req.params.id;

  client
    .db(dbName)
    .collection(collectionName)
    .updateOne(
      { _id: ObjectID(id) },
      { $set: updateObject },
      (err, result) => {
        if (err) throw err;
        console.log(result.result);
        res.send("OK");
      })
});

// 移除 db Data
router.delete('/echo/:id', async (req, res) => {

  var id = req.params.id;

  client
    .db(dbName)
    .collection(collectionName)
    .deleteOne(
      { _id: ObjectID(id) },
      (err, result) => {
        if (err) throw err;
        console.log(result.result);
        res.send("OK");
      })
});


module.exports = router;