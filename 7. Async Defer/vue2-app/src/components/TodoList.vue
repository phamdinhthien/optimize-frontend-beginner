<template>
  <div class="todo-list">
    <h2>Todo List Demo</h2>
    
    <!-- Add new todo -->
    <div class="add-todo">
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="Enter a new todo"
      >
      <button @click="addTodo">Add</button>
    </div>

    <!-- Todo list -->
    <ul v-if="todos.length">
      <li v-for="(todo, index) in todos" :key="index">
        <input 
          type="checkbox" 
          v-model="todo.completed"
        >
        <span :class="{ completed: todo.completed }">
          {{ todo.text }}
        </span>
        <button @click="removeTodo(index)" class="delete">×</button>
      </li>
    </ul>
    <p v-else>No todos yet. Add some!</p>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          text: this.newTodo.trim(),
          completed: false
        })
        this.newTodo = ''
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.todo-list {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #666;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

button.delete {
  background-color: #dc3545;
  padding: 4px 8px;
}

button.delete:hover {
  background-color: #c82333;
}
</style>
