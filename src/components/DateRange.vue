<script setup lang="ts">
import type { DateTime } from "luxon";
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    currentDate: DateTime;
    selectedDate: DateTime;
    decrementDate: Function;
    incrementDate: Function;
  }>(),
  {}
);

const displayDate = computed(() => props.selectedDate.toFormat("LLL dd yyyy"));
</script>

<template>
  <div class="wrapper">
    <button
      @click="props.decrementDate"
      :disabled="
        props.selectedDate.weekNumber !== props.currentDate.weekNumber
          ? true
          : false
      "
    >
      <font-awesome-icon icon="fa-solid fa-circle-arrow-left" size="xl" />
    </button>
    <p>{{ displayDate }}</p>
    <button
      @click="props.incrementDate"
      :disabled="
        props.selectedDate.weekday === props.currentDate.weekday ? true : false
      "
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
