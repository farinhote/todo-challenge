<template>
  <li class="task">
    <input class="check" type="checkbox" v-model="task.done" @input="checkTask">
    <div class="description done" v-if="task.done"> {{ description }} </div>
    <input class="description todo" v-else v-model="description" />
    <button class="delete-button">X</button>
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
  list-style: none;
  display: flex;
}

.check {
  transform: scale(1.5);
  margin-right: 1rem;
}

.description {
  flex: 1;
  font-size: inherit;
  font-family: inherit;
  outline: 0;
}
.description.done {
  text-decoration: line-through;
}
.description.todo {
  border: none;
  background: transparent;
}

.delete-button {
  height: 1.5rem;
  width: 1.5rem;
  margin-left: 1rem;
  border: none;
  background-color: white;
  font-size: 1rem;
  color: lightcoral;
  outline: 0;
  cursor: pointer;
}
</style>
