<template>
    <li>
        <input v-model="description" />
    </li>
</template>

<script>
export default {
  name: 'Task',
  props: {
    projectId: Number,
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
        this.$store.commit('updateTask', { value, taskId: this.task.id, projectId: this.projectId });
      },
    },
  },
};
</script>

<style scoped>
li {
    text-align: left;
    list-style: none;
}

span {
    cursor: pointer;
}

p {

    border: solid gray;
    border-width: 1px 0;
}
</style>
