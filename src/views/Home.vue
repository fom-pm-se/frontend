<template>
  <h1>{{ name }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Homepage',
  data() {
    return {
      name: 'Homepage',
    };
  },
  updated() {
    console.log('updated');
    if (localStorage.getItem('token')) {
      this.$router.push('/login');
    }
  }
});
</script>
