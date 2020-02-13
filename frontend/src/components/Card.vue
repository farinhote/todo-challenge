<template>
  <div class="card-container">
    <div class="card-body">
      <div class="card-title">
        <h1>{{ project.title }}</h1>
      </div>
      <div class="card-summary">
          <task v-for="task in project.toDo" :key="task.id"  :task="task"/>
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

.card-summary{
  padding-top: 1px;
  color: #4d4d4d;
  margin: 0 auto;
  width: 90%;
}
</style>
