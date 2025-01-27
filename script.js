document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener to allow adding tasks with the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Prevent adding empty tasks
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the new task element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => {
            removeTask(li, taskText);
        });

        // Append the remove button to the task element
        li.appendChild(removeButton);
        
        // Add the task to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";

        // Save task to localStorage
        saveTaskToLocalStorage(taskText);
    }

    // Function to remove a task
    function removeTask(taskElement, taskText) {
        taskList.removeChild(taskElement);

        // Remove the task from localStorage
        removeTaskFromLocalStorage(taskText);
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => {
                removeTask(li, taskText);
            });

            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    // Function to save a task to localStorage
    function saveTaskToLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove a task from localStorage
    function removeTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
