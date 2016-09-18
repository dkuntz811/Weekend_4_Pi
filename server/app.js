var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');

var connectionString = 'postgres://localhost:5432/tasks';
var port = process.env.PORT || 8000;

//static public folder
app.use(express.static('public'));

//spin up server
app.listen(port, function (req, res){
	console.log('server up on ', port);
});
//base url
app.get('/', function (req,res){
	console.log('base url hit');
	res.sendFile('index.html');
});

app.get('/getTasks', function(req, res){
	console.log('getTasks route hit');
	pg.connect(connectionString, function(err, client, done){
		if (err){
			console.log(err);
		}
		else{
			console.log('connected to DB!');
			//array to hold our results
			var resultArray = [];
			//query call to db table
			var queryResults = client.query('SELECT * FROM tasks ');
			queryResults.on('row', function(row){
				resultArray.push(row);
				console.log(resultArray);
			});//end queryResult on row
			queryResults.on('end', function(){
				//connection done
				done();
				return res.json(resultArray);

			});//end query result on end
		}
	});//end pg.connect
});//end app.get

	app.post('/addTask', urlencodedParser, function(req, res){
		console.log('addTask route hit');
		pg.connect(connectionString, function (err, client, done){
			if(err){
				console.log('delete error is', err);
			} else {
				console.log('connected to db for new task');
				client.query('INSERT INTO tasks (task)' + 'VALUES($1) ',
			    [req.body.task],
					done());
			}//client query
		});//end connect
	});//end post

	app.post('/completeTask/:id', urlencodedParser, function (req, res){
		console.log('in comlete task post');
		var id = req.params.id;
    // ALTER TABLE "public"."tasks" ALTER COLUMN "completed" SET DEFAULT 'true';
  	console.log('id is', id);
		pg.connect(connectionString, function(err, client, done){
			if(err){
				console.log(err);
			} else{

				client.query('UPDATE tasks SET completed = true WHERE task_id = ($1) ',
											[id],
										done());
			}

		});//end connectionString
	});//end app.post

	app.delete('/deleteTask/:id', urlencodedParser, function (req, res){
		console.log(req.params.id);
		console.log('in app.delete function');
		var id = req.params.id;

		pg.connect(connectionString, function(err, client, done){
			if (err){
				console.log(err);
			} else{
				console.log('connected to db for delete task');
				client.query('DELETE FROM tasks WHERE task_id = ($1) ',
			           [id],
								 done());

			}
		});//end connectionString

	});//end app.delete
