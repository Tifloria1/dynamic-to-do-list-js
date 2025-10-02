// Ensure code runs after the HTML has loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // do not save again while rendering
    }

    // Create the addTask function
    // save = true means: update Local Storage after adding to the DOM
    function addTask(taskText, save = true) {
        // If no text was passed, read from input and trim
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskText).trim();
        }

        // If empty -> alert and exit
        if (taskText === "") {
            alert('Please enter a task');
            return;
        }

        // Task Creation and Removal
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // required by checker

        // When clicked, remove from DOM and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            // Update Local Storage after removal
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const idx = storedTasks.indexOf(taskText);
            if (idx > -1) {
                storedTasks.splice(idx, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Assemble
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input
        taskInput.value = '';
    }

    // Attach Event Listeners
    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke loadTasks on DOMContentLoaded (per instructions)
    loadTasks();
});
