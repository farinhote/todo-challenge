<template>
  <div class="card">
    <div class="header">
      <h1 :class="{ 'title-done': !todoTasks.length }" class="title">{{ project.title }}</h1>
      <button class="delete-button">X</button>
    </div>
    <div class="tasks">
      <h2 v-if="todoTasks.length">{{ $t("card.todo") }}</h2>
      <div class="card-todo">
        <task v-for="task in todoTasks" :key="task.id" :task="task" :projectId="project.id" />
      </div>
      <h2 v-if="doneTasks.length">{{ $t("card.done") }}</h2>
      <div class="card-done">
        <task v-for="task in doneTasks" :key="task.id" :task="task" :projectId="project.id" />
      </div>
    </div>
    <div class="footer">
      <button class="create-button" type="submit">{{ $t("card.newTask") }}</button>
      <input class="create-input" type="text"/>
    </div>
  </div>
</template>

<script>
import Task from './Task.vue';

export default {
  name: 'Card',
  components: {
    Task,
  },

  props: {
    project: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    tasks() {
      return Object.keys(this.project.tasks).map((id) => ({
        id,
        ...this.project.tasks[id],
      }));
    },

    doneTasks() {
      return this.tasks.filter((task) => task.done);
    },
    todoTasks() {
      return this.tasks.filter((task) => !task.done);
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 30rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid lightgrey;
  box-shadow: grey 0 4px 2px -2px;
}

.header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid lightgrey;
}
.title {
  flex: 1;
  margin: 0;
}
.title-done {
  text-decoration: line-through;
}
.delete-button {
  height: 2rem;
  width: 2rem;
  border-radius: 0.5rem;
  border: 1px solid lightcoral;
  background-color: lightcoral;
  font-size: 1rem;
  color: white;
  outline: 0;
  cursor: pointer;
}

.tasks {
  flex: 1;
  padding: 0 2rem;
  overflow: auto;
}
.tasks h2 {
  text-align: center;
}

.footer {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-top: 2px solid lightgrey;
}
.create-button {
  flex: 1;
  height: 30px;
  border-radius: 0.5rem 0 0 0.5rem;
  border: 1px solid lightseagreen;
  background-color: lightseagreen;
  font-size: 1.25rem;
  color: white;
  text-align: center;
  outline: 0;
  cursor: pointer;
}
.create-input {
  flex: 1;
  height: 25px;
  border-radius: 0 0.5rem 0.5rem 0;
  font-size: inherit;
  font-family:inherit;
  outline: 0;
}
</style>
