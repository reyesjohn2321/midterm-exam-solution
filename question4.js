// Array to store tasks  
let tasks = [];  
let currentId = 0; // To track task IDs  

// DOM Elements  
const taskForm = document.getElementById('task-form');  
const taskNameInput = document.getElementById('task-name-input');  
const taskDescriptionInput = document.getElementById('task-description-input');  
const taskList = document.getElementById('task-list');  

// Function to render tasks  
function renderTasks() {  
    taskList.innerHTML = ''; // Clear the list  
    tasks.forEach((task) => {  
        const li = document.createElement('li');  
        li.className = 'task-item';  
        li.innerHTML = `  
            <span>${task.name}: ${task.description}</span>  
            <button onclick="editTask(${task.id})">Edit</button>  
            <button onclick="deleteTask(${task.id})">Delete</button>  
        `;  
        taskList.appendChild(li);  
    });  
}  

// Function to add a new task  
function addTask(event) {  
    event.preventDefault(); // Prevent form submission  
    const taskName = taskNameInput.value.trim();  
    const taskDescription = taskDescriptionInput.value.trim();  

    if (taskName) {  
        tasks.push({ id: currentId++, name: taskName, description: taskDescription });  
        taskNameInput.value = ''; // Clear the input  
        taskDescriptionInput.value = ''; // Clear the input  
        renderTasks();  
    } else {  
        alert('Task name is required!'); // Alert for empty task name  
    }  
}  

// Function to edit a task  
function editTask(id) {  
    const task = tasks.find((task) => task.id === id);  
    if (task) {  
        const updatedName = prompt('Edit task name:', task.name);  
        const updatedDescription = prompt('Edit task description:', task.description);  
        if (updatedName !== null) {  
            task.name = updatedName.trim() || task.name; // Keep original if empty  
            task.description = updatedDescription !== null ? updatedDescription.trim() : task.description; // Update only if new value provided  
            renderTasks();  
        }  
    }  
}  

// Function to delete a task  
function deleteTask(id) {  
    if (confirm('Are you sure you want to delete this task?')) {  
        tasks = tasks.filter((task) => task.id !== id);  
        renderTasks();  
    }  
}  

// Event listener for form submit  
taskForm.addEventListener('submit', addTask);  

// Initial render  
renderTasks();  