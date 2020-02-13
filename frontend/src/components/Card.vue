<template>
    <div class="card-container">
      <div class="card-body">
        <div class="card-title">
          <h1>
            {{ project.title }}
          </h1>
        </div>
        <div class="card-summary">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
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
  background: #fff;
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

.card-title h1 {
  color: #333;
  font-weight: 100;
  line-height: 2.5rem;
}

.card-summary p {
  color: #4d4d4d;
}
</style>
