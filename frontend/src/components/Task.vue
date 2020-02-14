<template>
    <li>
        <input type="checkbox" v-model="task.done" @input="checkTask">
        <span v-if="task.done"> {{ description }} </span>
        <input v-else v-model="description" />
    </li>
</template>

<script>
export default {
  name: 'Task',
  props: {
    projectId: String,
    task: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    description: {
      get() {
        return this.task.description;
      },
      set(value) {
        const task = { description: value, taskId: this.task.id, projectId: this.projectId };
        this.$store.commit('updateTask', task);
      },
    },
  },

  methods: {
    checkTask() {
      // Method runs before input value changes
      const task = { projectId: this.projectId, taskId: this.task.id, done: !this.task.done };
      this.$store.commit('updateTask', task);
    },
  },
};
</script>

<style scoped>
li {
    text-align: left;
    list-style: none;
}

input {
  border: none;
  background: transparent;
  margin: 4px;
  font-size: inherit;
  font-family:inherit;
}

span {
  font-size: inherit;
  font-family:inherit;
  margin: 4px;
  text-decoration: line-through;
}
</style>
