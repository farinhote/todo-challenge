<template>
    <li>
        <span v-on:click="expand">
            {{ task.title }}
        </span>
        <p v-show="open">
            {{ task.description }}
        </p>
    </li>
</template>

<script>
export default {
  name: 'Task',
  methods: {
    expand() {
      this.open = !this.open;
    },
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
      default() {
        return {};
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
