var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Genre = require('./models/genre')
Book = require('./models/book')

//app.use(bodyParser.json);
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var options = {
  useMongoClient: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
};

//Connect to mongoose
mongoose.connect('mongodb://localhost:27017/bookstore',options);
var db = mongoose.connection;

app.get('/',function(req,res){
	res.sendFile( __dirname+"/"+"index.html");
})

app.get('/api/genres',function(req,res){
	Genre.getGenres(function(err,genres){
		if (err) throw err;
		res.json(genres);
	})
})

app.post('/api/genres',function(req,res){
	var genre = req.body;
	Genre.addGenre(genre,function(err,genres){
		if (err) throw err;
		res.json(genres);
	})
})

app.get('/api/books',function(req,res){
	Book.getBooks(function(err,books){
		if (err) throw err;
		res.json(books);
	})
})

app.get('/api/books/:_id',function(req,res){
	Book.getBookById(req.params._id,function(err,book){
		if (err) throw err;
		res.json(book);
	})
})

app.listen(3000);
console.log("Running on port 3000");