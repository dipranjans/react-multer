const express = require("express");
const app = express();
//const request = require("request");
const cors = require("cors");
//const bodyParser = require("body-parser");
const multer = require("multer");
var AWS = require("aws-sdk");

app.use(cors());

// let storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "test");
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// let upload = multer({ storage: storage }).array("file");

// app.post("/upload", function(req, res) {
//   upload(req, res, function(err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });

var storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, "");
  }
});
var multipleUpload = multer({ storage: storage }).array("file");

const BUCKET_NAME = "BUCKET_NAME";
const IAM_USER_KEY = "USER_KEY";
const IAM_USER_SECRET = "USER_SECRET_KEY";

app.post("/upload", multipleUpload, function(req, res) {
  const file = req.files;

  console.log(file);
  // let s3bucket = new AWS.S3({
  //   accessKeyId: IAM_USER_KEY,
  //   secretAccessKey: IAM_USER_SECRET,
  //   Bucket: "BUCKET_NAME"
  // });

  let Bucket_Path = "BUCKET_PATH";

  // s3bucket.createBucket(function() {
  //   //Where you want to store your file
  //   var ResponseData = [];

  //   file.map(item => {
  //     var params = {
  //       Bucket: BucketPath,
  //       Key: item.originalname,
  //       Body: item.buffer,
  //       ACL: "public-read"
  //     };
  //     s3bucket.upload(params, function(err, data) {
  //       if (err) {
  //         res.json({ error: true, Message: err });
  //       } else {
  //         ResponseData.push(data);
  //         if (ResponseData.length == file.length) {
  //           res.json({
  //             error: false,
  //             Message: "File Uploaded SuceesFully",
  //             Data: ResponseData
  //           });
  //         }
  //       }
  //     });
  //   });
  // });
});



// start server
const port = 8080;
app.listen(port, () => console.log("Server listening on port " + port));

