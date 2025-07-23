// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Function to create a new task item
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the task <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Remove task on button click
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update localStorage
        };

        // Add button to task and task to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";

        // Save task to localStorage
        saveTasks();
    }

    // Event listener for Add button
    addButton.addEventListener('click', addTask);

    // Event listener for Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const items = taskList.querySelectorAll('li');
        items.forEach(item => {
            const task = item.firstChild.textContent;
            tasks.push(task);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(taskText => {
                const li = document.createElement('li');
                li.textContent = taskText;

                const removeBtn = document.createElement('button');
                removeBtn.textContent = "Remove";
                removeBtn.className = 'remove-btn';
                removeBtn.onclick = function () {
                    taskList.removeChild(li);
                    saveTasks();
                };

                li.appendChild(removeBtn);
                taskList.appendChild(li);
            });
        }
    }
});
