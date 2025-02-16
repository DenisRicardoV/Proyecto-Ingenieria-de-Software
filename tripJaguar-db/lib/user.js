'use strict'

module.exports = function setupUser (db) {

  function create(user, callback){
    db.collection('users').doc(user.uid).set(user)
    .then(ref => {
      callback(null,true)
    })
    .catch(function (error) {
        callback(error , null);
    })

    
    
  }

  function findAll () {
    

  }

  function findByIdAuth (uid,callback) {
    console.log("UUID RECIBIDI", uid);
    return db.collection("users").where('uid', '==', uid)
      .get().then(function(doc) {       
        if (doc.empty) {
          callback(true,null);
        }
    
        doc.forEach(doc => {
          callback(null, doc.data());
        });
      })
      .catch(function(error) {
          callback(error,null);
      });

  }

  function findByEmail (email,callback) {
    return db.collection("users").where('email', '==', email)
      .get().then(function(doc) {       
        if (doc.empty) {
          callback(true,null);
        }
    
        doc.forEach(doc => {
          callback(null, doc.data());
        });
      })
      .catch(function(error) {
          callback(error,null);
      });

  }
  function findById (uid,callback) {

    db.collection("users").doc(uid)
      .get().then(function(doc) {
        if (doc.exists) {
            callback(null,doc.data());
        } 
      })
      .catch(function(error) {
          callback(error,null);
      });

  }

  //   db.collection('users').get()
  //   .then((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       console.log(doc.id, '=>', doc.data());
  //     });
  //   })
  //   .catch((err) => {
  //     console.log('Error getting documents', err);
  //   });

  return {
    create,
    findAll,
    findByIdAuth,
    findByEmail,
    findById
  }

  
}
