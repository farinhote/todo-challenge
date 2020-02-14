<template>
  <div class="card-container">
    <div class="card-body">
      <div :class="{ done: !todoTasks.length }" class="card-title">
        <h1>{{ project.title }}</h1>
      </div>
      <h2 v-if="todoTasks.length">{{ $t("card.todo") }}</h2>
      <div class="card-todo">
        <task v-for="task in todoTasks" :key="task.id" :task="task" :projectId="project.id" />
      </div>
      <h2 v-if="doneTasks.length">{{ $t("card.done") }}</h2>
      <div class="card-done">
        <task v-for="task in doneTasks" :key="task.id" :task="task" :projectId="project.id" />
      </div>
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
      return Object.keys(this.project.tasks).map((id) => ({ id, ...this.project.tasks[id] }));
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
.card-container {
  overflow: auto;
  background: #fff;
  height: 45vh;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 4px 2px -2px;
  font-weight: 100;
  width: 100%;
  margin: 0.8rem auto;
}

.card-body {
  margin: 0 auto;
  width: 90%;
  position: relative;
}

.card-title {
  position: sticky;
  padding: 0.1rem;
  border-bottom: 2px solid rgba(128, 128, 128, 0.5);
  top: 0px;
  background: #fff;
  color: #333;
  text-align: left;
  line-height: 2.5rem;
}

.done {
  text-decoration: line-through;
}
</style>
