// Run after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // --- Select DOM elements ---
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    // --- Add a task (with optional saving to Local Storage) ---
    // If called with no argument, it uses the input field value.
    function addTask(taskText, save = true) {
        // Determine source of text
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskText).trim();
        }

        // Validate non-empty
        if (taskText === "") {
            alert('Please enter a task');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task (from DOM and Local Storage)
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

        // Assemble and add to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if requested
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input
        taskInput.value = '';
    }

    // --- Load tasks from Local Storage on page load ---
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach((text) => addTask(text, false)); // don't save again while rendering
    }

    // --- Event listeners ---
    // Add via button click
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add via Enter key in the input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize: load saved tasks
    loadTasks();
});
