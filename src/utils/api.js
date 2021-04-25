const jsonHost = "http://localhost:3000";
import firebase from "firebase/app";
require("firebase/firestore");
// const fetch = require("node-fetch");
const dbtype = "dstore"; //"jserver"

// var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");

// firebase.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://tryy1-acc62.firebaseio.com",
// });

const firebaseA = firebase.initializeApp({
  apiKey: 'AIzaSyCg5tE3LdzzrXru-LO0Rx88512Yhya2CPY',
  authDomain: "tryy1-acc62.firebaseapp.com",
  projectId: "tryy1-acc62"
});

const db = firebaseA.firestore();

export function postData(table, data, id, _id) {
  return new Promise((resolve) => {
    if (dbtype == "jserver") {
      fetch(`${jsonHost}/${table}` + (id ? `/${id}` : ""), {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        let result = response.json();
        console.log(result);
        resolve(result);
      });
    }
    if (dbtype == "dstore") {
      const docRef = db.collection(table);
      if (_id) {
        docRef
          .doc(_id)
          .update(data)
          .then((val) => {
            resolve(val);
          });
      } else {
        docRef
          .doc()
          .set(data)
          .then((val) => {
            resolve(val);
          });
      }
    }
  });
}

function santType(val){
  if(val==parseInt(val)){
    return parseInt(val)
  }else{
    return val
  }
}

export function getData(query) {
  return new Promise((resolve) => {
    if (dbtype == "jserver") {
      fetch(`${jsonHost}/${query}`).then((response) => {
        let result = response.json();
        console.log(result);
        resolve(result);
      });
    }
    if (dbtype == "dstore") {
      const qry = query.split("?");

      var db_call = db.collection(qry[0]);
      if (qry.length > 1) {
        const manyq = qry[1].split("&");
        if(manyq.length>1){
          const wh = {}
          manyq.forEach(w=>{
            const psplit = w.split("=");
            if(wh[psplit[0]]){
              wh[psplit[0]].push(santType(psplit[1]))
            }else{
              wh[psplit[0]] = [santType(psplit[1])]
            }
          })
          db_call = db_call.where(Object.keys(wh)[0], "in", wh[Object.keys(wh)[0]]);
        }else{
          const psplit = qry[1].split("=");
          db_call = db_call.where(psplit[0], "==", santType(psplit[1]));
        }
      }

      db_call.get().then((querySnapshot) => {
        var results = [];
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          const d1 = doc.data();
          d1._id = doc.id;
          results.push(d1);
        });
        resolve(results);
      });
    }
  });
}

function updateVal() {
  getData("orders").then((data) => {
    console.log(data);

    // data.forEach((doc,i) => {
    //   noo = []
    //   doc.items.forEach(i=>{
    //     noo.push({0:i[0],1:i[1],2:i[2]})
    //   })
    //   doc.items = noo
    //   data[i] = doc
    //   // postData('orders',doc,doc.id)
    // })

    // console.log(JSON.stringify(data))
  });
}
