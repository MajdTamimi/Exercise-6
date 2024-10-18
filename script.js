let tasks = [];

function addTask(description) {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id, description, completed: false };
    tasks.push(newTask);
    saveTasks();
    alert(`Task ${description} added.`);
}

function displayTasks() {
    if (tasks.length === 0) {
        alert("No tasks available.");
    } else {
        let taskList = tasks.map(task =>
            `${task.id}. ${task.description}    [${task.completed ? 'Completed' : 'Not Completed'}]`
        ).join("\n");
        alert(taskList);
    }
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === parseInt(id));
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        alert(`Task "${task.description}" marked as ${task.completed ? 'Completed' : 'Not Completed'}.`);
    } else {
        alert("Task not found.");
    }
}

function removeTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex > -1) {
        const removedTask = tasks.splice(taskIndex, 1)[0];
        saveTasks();
        alert(`Task "${removedTask.description}" removed.`);
    } else {
        alert("Task not found.");
    }
}

function updateTask(id, newDescription) {
    const task = tasks.find(task => task.id === parseInt(id));
    if (task) {
        task.description = newDescription;
        saveTasks();
        alert(`Task "${task.id}" updated to "${newDescription}".`);
    } else {
        alert("Task not found.");
    }
}

function filterTasks(keyword) {
    const filteredTasks = tasks.filter(task => task.description.toLowerCase().includes(keyword.toLowerCase()));
    if (filteredTasks.length === 0) {
        alert("No tasks found.");
    } else {
        let filteredList = filteredTasks.map(task =>
            `${task.id}. ${task.description} [${task.completed ? 'Completed' : 'Not Completed'}]`
        ).join("\n");
        alert(filteredList);
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function displayOperations() {
    const menu =
        `Welcome to the Task Manager! Choose an operation by entering the corresponding number:
        
        1. Add a Task
        2. View All Tasks
        3. Toggle Task Completion
        4. Remove a Task
        5. Update Task Description
        6. Search Tasks by Name
        7. Exit
    `;
    return prompt(menu);
}

function performOperation(choice) {
    switch (choice) {
        case '1':
            const description = prompt("Enter task description:");
            if (description) addTask(description);
            break;
        case '2':
            displayTasks();
            break;
        case '3':
            const taskIdToToggle = prompt("Enter task ID to toggle:");
            if (taskIdToToggle) toggleTask(taskIdToToggle);
            break;
        case '4':
            const taskIdToRemove = prompt("Enter task ID to remove:");
            if (taskIdToRemove) removeTask(taskIdToRemove);
            break;
        case '5':
            const taskIdToUpdate = prompt("Enter task ID to update:");
            if (taskIdToUpdate) {
                const newDescription = prompt("Enter new task description:");
                if (newDescription) updateTask(taskIdToUpdate, newDescription);
            }
            break;
        case '6':
            const keyword = prompt("Enter keyword to search tasks:");
            if (keyword) filterTasks(keyword);
            break;
        case '7':
            alert("Exiting Task Manager. Goodbye!");
            return false;
        default:
            alert("Invalid choice. Please choose a valid operation.");
    }
    return true;
}

function taskManager() {
    loadTasks();
    handleUserChoice();
}

function handleUserChoice() {
    const choice = displayOperations();
    if (choice) {
        const running = performOperation(choice);
        if (running) {
            handleUserChoice();
        } else {
            alert("Exiting Task Manager. Goodbye!");
        }
    }
}

taskManager();