--Create table:

CREATE TABLE tasks(
task_id SERIAL PRIMARY KEY,
task VARCHAR (30) NOT NULL,
completed BOOLEAN DEFAULT 'f'
);

--Select all tasks from db:

SELECT * FROM tasks;

--Insert user data into db rows:

INSERT INTO tasks  VALUES(task, completed);

--PUT (update) tasks in db rows:

UPDATE tasks SET completed = true WHERE task_id = 1;

--Delete tasks from db rows:

DELETE FROM tasks WHERE task_id = 1;
