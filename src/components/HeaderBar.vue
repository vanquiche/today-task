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
    <nav class="nav">
      <div>
        <h1
          id="logo"
          class="navItem logo"
          :style="{ color: theme?.accentColor }"
        >
          Today
        </h1>
        <button
          id="info"
          class="navItem"
          @click="props.onClick"
          data-testid="aboutBtn"
        >
          about
        </button>
      </div>
      <SwitchBtn :on-change="props.onToggle" :state="toggleState" />
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  width: 100%;
  height: 70px;
  margin: 0;
  z-index: 100;
}
.nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 1600px;
  font-size: 1.2rem;
}

.nav div {
  display: flex;
  align-items: center;
  gap: 30px;
}

.navItem {
  font-size: inherit;
}
.logo {
  font-weight: 800;
}
</style>
