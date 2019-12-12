var express = require('express');
var router = express.Router();

//-----------------firebase-----------------//
//adding firebase
const admin = require('firebase-admin');
let serviceAccount = require('../serviceAccountKey.json');

//initialize firebase app
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

//accessing database
let db = admin.firestore();
//-----------------firebase-----------------//

router.get('/', (req, res) => res.send('post received'));

//receive the data sent from front-end

router.post('/', (req, res) =>{
	console.log(req.body);
    let nameVal = req.body.Name;
    let dateVal = req.body.Date;
    let textVal = req.body.Text;
    

    db.collection("feed-posts")
    .add({
        author: nameVal,
        date: dateVal,
        text: textVal,
        
    })
    .then(ref => res.send(ref))
    .catch(e => res.send(e))
})

module.exports = router;