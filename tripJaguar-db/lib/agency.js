'use strict'

module.exports = function setupAgency (db) {

  function create(agency, callback){
    db.collection('agencies').add(agency)
    .then(ref => {
      callback(null,true)
    })
    .catch(function (error) {
        callback(error , null);
    })

  }

  function findByIdAuthor(uidAuthor, callback){
      db.collection("agencies").where("authorId", "==", uidAuthor).get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              callback(null,doc.id);
          });
      })
      .catch(function(error) {
          callback(error,null);
      });
  }



  function findAll () {

  }

  function findById () {

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
    findById,
    findByIdAuthor
  }

  
}
