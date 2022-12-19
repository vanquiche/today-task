<script setup lang="ts">
import SwitchBtn from "./SwitchBtn.vue";
import { inject } from "vue";
import type { ThemeType } from "./themes";
const theme = inject<ThemeType>("theme");
const props = withDefaults(
  defineProps<{ onToggle: () => void; toggleState: boolean }>(),
  {}
);
</script>

<template>
  <header class="header" :style="{ backgroundColor: theme?.bgColor }">
    <div class="btnContainer">
      <h1 :style="{ color: theme?.accentColor }">today</h1>
      <p>about</p>
    </div>
    <SwitchBtn :on-change="props.onToggle" :state="toggleState" />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  height: 70px;
  margin: 0;
  z-index: 100;
}
.btnContainer {
  display: flex;
  gap: 30px;
  font-size: 1.1rem;
}

h1 {
  font-size: inherit;
  font-weight: 800;
}
</style>
