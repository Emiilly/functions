const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

exports.retrieveTeachers = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    var Tea = [];
    const ref = admin.database().ref('Teachers').orderByKey();
    ref.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var value = childSnapshot.val();
        Tea.push({
          ID: value.TeacherID,
          TeachName: value.TeachName,
          TeacherID: value.TeacherID,
          Total: value.Total,
          CourseID: value.Course_ID,
          AvgProf: value.Avg_Professionalism,
          AvgPrep: value.Avg_Preparation,
          AvgLec: value.Avg_Lectures,
          AvgHelp: value.Avg_Helpfulness,
          AvgAtmos: value.Avg_Atmosphere
        });
      });
      res.status(200).write(JSON.stringify(Tea));
      res.end();
    });
  });
});

exports.retrieveLocation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    var Loc = [];
    const ref = admin.database().ref('Locations').orderByKey();
    ref.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var value = childSnapshot.val();
        Loc.push({
          ID: value.Place_ID,
          Place: value.Place
        });
      });
      res.status(200).write(JSON.stringify(Loc));
      res.end();
    });
  });
});

exports.retrieveCourse = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    var Cours = [];
    const ref = admin.database().ref('Courses').orderByKey();
    ref.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var value = childSnapshot.val();
        Cours.push({
          ID: value.Course_ID,
          Course: value.Course_Name
        });
      });
      res.status(200).write(JSON.stringify(Cours));
      res.end();
    });
  });
});

exports.retrieveReviews = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    var Rev = [];
    var currentTime = new Date();
    const ref = admin.database().ref('Reviews').orderByKey();
    ref.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var value = childSnapshot.val();
        var reviewTime = new Date(value.Date);
        if((((((currentTime - reviewTime)/ 1000)/60)/60)/24)/365 >= 2){
          childSnapshot.ref.remove();
        }
        else{
          Rev.push({
            ReviewID: value.Review_ID,
            UserID: value.userID,
            TeacherID: value.TeacherID,
            Comment: value.comment,
            Date: value.Date,
            Prof: value.Professionalism,
            Prep: value.Preparation,
            Lec: value.Lectures,
            Help: value.Helpfulness,
            Atmos: value.Atmosphere,
            weight: value.Weight
          });
        }
      });
      res.status(200).write(JSON.stringify(Rev));
      res.end();
    });
  });
});

exports.userData = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
  var user = [];
    const ref = admin.database().ref('UserProfile').orderByKey();
    ref.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var value = childSnapshot.val();
        user.push({
          PlaceID: value.Place_ID,
          CourseID: value.CourseID,
          Name : value.Name,
          Role : value.Role
        });
      });
      res.status(200).write(JSON.stringify(user));
      res.end();
    });
  });
}); 

exports.reportData = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
  var reports = [];
    const ref = admin.database().ref('Reports').orderByKey();
    ref.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var value = childSnapshot.val();
        reports.push({
          Reason: value.Reason,
          ReviewDate: value.ReviewDate,
          Status : value.Status,
          userID : value.userID,
          ReviewID: value.Review_ID
        });
      });
      res.status(200).write(JSON.stringify(reports));
      res.end();
    });
  });
}); 

exports.requestData = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
  var requests = [];
    const ref = admin.database().ref('Requests').orderByKey();
    ref.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var value = childSnapshot.val();
        requests.push({
          CourseID : value.CourseID,
          RequestID : value.Request_ID,
          Status : value.Status,
          Teachname : value.TeachName
        });
      });
      res.status(200).write(JSON.stringify(requests));
      res.end();
    });
  });
}); 