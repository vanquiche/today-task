<script setup lang="ts">
import { DateTime } from "luxon";
import { ref, computed } from "vue";
const dt = DateTime;
const today = dt.now();
const selectedDate = ref(dt.now());

const displayDate = computed(() => selectedDate.value.toFormat("LLL dd yyyy"));

function decrementDate() {
  selectedDate.value = selectedDate.value.minus({ days: 1 });
}
function incrementDate() {
  selectedDate.value = selectedDate.value.plus({ days: 1 });
}
</script>

<template>
  <div class="wrapper">
    <button
      @click="decrementDate"
      :disabled="selectedDate.weekNumber !== today.weekNumber ? true : false"
    >
      <font-awesome-icon icon="fa-solid fa-circle-arrow-left" size="xl" />
    </button>
    <p>{{ displayDate }}</p>
    <button
      @click="incrementDate"
      :disabled="selectedDate.weekday === today.weekday ? true : false"
    >
      <font-awesome-icon icon="fa-solid fa-circle-arrow-right" size="xl" />
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
button {
  color: inherit;
  cursor: pointer;
}

button:disabled {
  opacity: 0.4;
  cursor: default;
}
p {
  font-size: 1.2rem;
}
</style>
