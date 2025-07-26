<template>
  <div id="app">
    <h1>Vue 2 Demo App</h1>
    
    <!-- Counter Component -->
    <counter-component></counter-component>
    
    <!-- Todo List Component -->
    <todo-list></todo-list>
  </div>
</template>

<script>
import CounterComponent from './components/CounterComponent.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    CounterComponent,
    TodoList
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
}
</style>
