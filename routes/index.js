var express = require('express');
var router = express.Router();

const admin = require('firebase-admin');

let serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dynamic-web-final.firebaseio.com"
});

let db = admin.firestore();

router.get('/', function(req, res){
    var posts = [];
    let docRef = db.collection('feed-posts');
    let allPosts = docRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {

          //add content
          posts.push({
            id: doc.id,
            post_info: doc.data()
          }) 
        });
        //display all the contents in the 'feed-posts' array
        res.send(posts)
      })
    .catch(err => {
        console.log('Error getting documents', err);
    });

})


router.get('/', (req, res) => {
  return(
  res.send(`Reading About from ${req.headers.host}`))
});


module.exports = router;