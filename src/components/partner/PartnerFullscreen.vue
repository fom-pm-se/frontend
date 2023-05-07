<template>

</template>

<script setup lang="ts">
  import {PropType} from "vue";

  const props = defineProps(
    {
      partnerId: {
        type: Number as PropType<number>,
        required: true
      }
    }
  );
</script>
