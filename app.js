const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'nodemysql14'
});


//connect
db.connect((err)=>{
    if(err){
        throw err;
    }
 console.log('mysql connected')
});

const app = express();

//create db
app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE nodemysql14';
    db.query(sql,(err,result)=>{
        if(err) {
            throw err;
        }else
        {
        res.send('Create Database.....');
        console.log(result);
        }
    });
});


//create table
app.get('/createpoststable',(req,res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql,(err,result)=>{
        if(err) {
            throw err;
        }else
        {console.log(result);
        res.send('POST TABLE CREATED.....');
        }
    });
});
//insert post 1
app.get('/addpost1',(req,res)=>{
      let post = {title:'Post One',body :'THIS IS POST NUMBER ONE'};
      let sql = 'INSERT INTO posts SET ?';
      db.query(sql,post,(err,result)=>{
        if(err) {
            throw err;
        }else
        {console.log(result);
        res.send('POST1 TABLE CREATED.....');
        }

      });
});

//insert post 2
app.get('/addpost2',(req,res)=>{
    let post = {title:'Post Two',body :'THIS IS POST NUMBER TWO'};
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql,post,(err,result)=>{
      if(err) {
          throw err;
      }else
      {console.log(result);
      res.send('POST2 TABLE CREATED.....');
      }

    });
});

//select posts
app.get('/getposts',(req,res)=>{
    let sql = 'SELECT * FROM posts';
    db.query(sql,(err,results)=>{
      if(err) {
          throw err;
      }else
      {console.log(results);
      res.send('POSTS FETCHED.....');
      }

    });
});



//select single post
app.get('/getpost/:id',(req,res)=>{
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql,(err,results)=>{
      if(err) {
          throw err;
      }else
      {console.log(results);
      res.send('POST FETCHED.....');
      }

    });
});

//update post
app.get('/updatepost/:id',(req,res)=>{
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sql,(err,results)=>{
      if(err) {
          throw err;
      }else
      {console.log(results);
      res.send('POST UPDATED.....');
      }

    });
});

//delete 
app.get('/deletepost/:id',(req,res)=>{
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql,(err,results)=>{
      if(err) {
          throw err;
      }else
      {console.log(results);
      res.send('POST DELETED.....');
      }
    });
});

app.listen('4000',()=>{
    console.log(`server started on port 4000`)
});


