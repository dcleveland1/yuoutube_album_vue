<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="increment">Count is: {{ count }}</button>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';

// reactive state
const count = ref(0);

// functions that mutate state and trigger updates
function increment() {
  count.value += 1;
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`);
});

</script>
