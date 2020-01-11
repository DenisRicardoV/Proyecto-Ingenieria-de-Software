'use strict'

module.exports = function setupTour (db) {

  function create(tour, callback){
    db.collection('tours').add(tour)
    .then(docRef => {
      callback(null,docRef.id)
    })
    .catch(function (error) {
        callback(error , null);
    })    
    
  }

  function addImage(uid,urlImg){
    var docRef = db.collection('tours').doc(uid);

    db.runTransaction(transaction => {
        return transaction.get(docRef).then(snapshot => {

          const largerArray = snapshot.get('imagenes');
          largerArray.push(urlImg);
          
          transaction.update(docRef, 'imagenes', largerArray);

        });
    });

  }

 

  function findAll () {

  }

  function findById () {

  }


  return {
    create,
    findAll,
    findById,
    addImage
  }

  
}
