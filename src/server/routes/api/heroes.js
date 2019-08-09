const express = require('express');
const router = express.Router();
const mysql =  require('mysql')

const config = require('../../config/config')
var connection = mysql.createConnection(config); 

// Gets All heroes
router.get('/', (req, res) => {

  
    //connection.connect();    

    connection.query(`select * From heroes`, function (err, rows, fields) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      res.send(rows);
      
      //connection.end()
      
    });
})

// Get Single heroe
router.get('/:id', (req, res) => {
  
  MongoClient.connect(url, function (err, client) {
    if (err) throw err
  
    var db = client.db(database);
    var o_id = new mongodb.ObjectID(req.params.id);
    console.log(o_id);
    db.collection('heroes').find({ '_id': o_id}).toArray(function (err, result) {
      if (err) throw err 
      res.send(result[0]);
      client.close(); 
    })
  })

});

// Create heroe
router.post('/', (req, res) => {
  const newheroe = {
    name: req.body.name
  };

  if (!newheroe.name) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  MongoClient.connect(url, function (err, client) {
    if (err) throw err
  
    var db = client.db('heroes')
  
    db.collection('heroes').find().toArray(function (err, result) {
      if (err) 
        throw err

        const collection = db.collection('heroes');

        collection.insertMany([{name : req.body.name}], function(err, result) {
          
          //callback(result);
        });

        client.close();
    })
  })
});

// Update heroe
router.put('/:id', (req, res) => {  
  const updheroe = req.body;

  const pool = new sql.ConnectionPool(config, err => {
    // ... error checks
    pool.on('error', err => {
        console.log('ConnectionPool', err);
    })
 
    var updateheroetvp = new sql.Table('heroType');
    updateheroetvp.columns.add('id', sql.Int, {nullable: true, primary: true});
    updateheroetvp.columns.add('name', sql.NVarChar(150), {nullable: false, primary: false});    
    updateheroetvp.rows.add(req.params.id,
                            updheroe.name
                            );
  
    pool.request() //
    .input('herotype', updateheroetvp)
    .execute('dbo.heroes_up', (err, result) => {
      if(err){
        res.status(500).json({ error: err })       
      } else {
        res.status(200).json({ 
          msg: 'heroe updated', updheroe 
         })       
      }    
    })
  })
});

// Delete heroe
router.delete('/:id', (req, res) => {
  const pool = new sql.ConnectionPool(config, err => {
    // ... error checks
    pool.on('error', err => {
        console.log('ConnectionPool', err);
    })
 
    pool.request() //
    .input('id', req.params.id)
    .execute('dbo.heroes_dp', (err, result) => {
        if(err){
          res.status(500).json({ error: err })       
        } else {
          res.status(200).json({ 
            msg: 'heroe deleted'
           })       
        }
        
    })
  })
  
});

module.exports = router;