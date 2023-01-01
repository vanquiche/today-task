<script setup lang="ts">
import SwitchBtn from "./SwitchBtn.vue";
import { inject } from "vue";
import type { ThemeType } from "./themes";
const theme = inject<ThemeType>("theme");
const props = withDefaults(
  defineProps<{
    onToggle: () => void;
    toggleState: boolean;
    onClick: () => void;
  }>(),
  {}
);
</script>

<template>
  <header
    id="navbar"
    class="header"
    :style="{ backgroundColor: theme?.bgColor }"
  >
    <nav class="btnContainer">
      <h1 id="logo" class="navItem logo" :style="{ color: theme?.accentColor }">
        today
      </h1>
      <button id="info" class="navItem" @click="props.onClick">about</button>
    </nav>
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

.navItem {
  font-size: inherit;
}
.logo {
  font-weight: 800;
}
</style>
