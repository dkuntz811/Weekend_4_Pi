console.log( 'js');
$(document).ready(function(){
	console.log('jq');
	//load existing tasks to DOM on page load
	getTasks();
   //add task button click
	$('#addButton').on('click', function(){
		console.log('in Addbutton on click')
    //get user input for new task;
		var objectToSend = {
			task: $('#taskIn').val()
		};
		console.log(objectToSend);
		saveTask(objectToSend);
	});//end addButton click
    $('#viewTasks').on('click', '#delete', deleteTask);
});//end document ready

var getTasks = function (){
	console.log('in getTasks');
	//ajax call to server
	$.ajax({
		url: '/getTasks',
		type: 'GET',
		success: function (data){
			console.log('got some tasks')
			var outputDiv = $('#viewTasks');
			outputDiv.empty();
			outputDiv.append('<ul>');
			for (var i = 0; i <data.length; i++){
				outputDiv.append('<li id = "taskList">' + data[i].task + '</li>');
				outputDiv.append('<em><button id = "complete">Complete</button></em>')
				outputDiv.append('<em><button id = "delete">Delete</button></em>')
			}

		}//end success
	});//end ajax
}//end getTasks function

	var saveTask = function(newTask){
		console.log('in saveTask', saveTask);
		//ajax call to server to send tasks
		$.ajax({
			url: '/addTask',
			type: 'POST',
			data: newTask,
			success: function(data){
				console.log('sent some koalas');
			}//end success
		})//end ajax
			getTasks();
	};//end saveTask function

function deleteTask (){
	console.log('delete button hit');
	var id = $(this).parent().parent().data('id');
	// var taskID = $(this).parent().parent().data('taskID');
	console.log('this is', this);

	$.ajax({
		type: 'DELETE',
		url: '/deleteTask' + id,

		success: function(){
			console.log('delete successful');
			$(this).parent().parent().remove();
			$('#viewTasks').empty();
      getTasks();
		},
		error: function(){
			console.log('delete failed');
		}

	});//end Ajax delete
};//end deleteTask function
