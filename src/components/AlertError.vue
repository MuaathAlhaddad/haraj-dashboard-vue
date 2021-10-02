<template>
  <div>
    <b-alert variant="danger" show dismissible fade>{{ message }}</b-alert>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>
