document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    
    // Load todos from localStorage
    loadTodos();
  
    // Add todo item
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  
    function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText !== '') {
        // Create new todo item
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', toggleComplete);
        
        // Create span for text
        const todoTextSpan = document.createElement('span');
        todoTextSpan.textContent = todoText;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', deleteTodo);
        
        // Append elements
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);
        
        // Clear input
        todoInput.value = '';
        
        // Save to localStorage
        saveTodos();
      }
    }
  
    function toggleComplete(e) {
      const todoItem = e.target.parentElement;
      todoItem.classList.toggle('completed');
      saveTodos();
    }
  
    function deleteTodo(e) {
      const todoItem = e.target.parentElement;
      todoList.removeChild(todoItem);
      saveTodos();
    }
  
    function saveTodos() {
      const todos = [];
      document.querySelectorAll('.todo-item').forEach(item => {
        todos.push({
          text: item.querySelector('span').textContent,
          completed: item.classList.contains('completed')
        });
      });
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function loadTodos() {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', toggleComplete);
        
        const todoTextSpan = document.createElement('span');
        todoTextSpan.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', deleteTodo);
        
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);
      });
    }
  });