<script setup lang="ts">
import { inject } from "vue";
import { darkTheme, type ThemeType } from "./themes";

const props = withDefaults(
  defineProps<{ state: Boolean; onChange: () => void }>(),
  {}
);
const theme = inject<ThemeType>("theme", darkTheme);
</script>

<template>
  <div
    id="switch-wrapper"
    class="switchContainer"
    @keyup.enter="props.onChange"
    @keyup.space="props.onChange"
    tabindex="0"
  >
    <div
      id="switch-bg"
      class="switchBg"
      :style="{
        backgroundColor: theme.switchBgColor,
      }"
    >
      <span
        id="switch-indicator"
        class="switch control"
        :class="[props.state ? 'left' : 'right']"
        tabindex="-1"
      ></span>
      <input
        type="checkbox"
        id="theme-select"
        class="switch hide"
        :class="[props.state ? 'left' : 'right']"
        :value="props.state"
        @change="props.onChange"
        tabindex="-1"
        role="switch"
        @aria-checked="props.state"
        :aria-label="props.state ? 'dark theme' : 'light theme'"
        data-testid="themeToggle"
      />
      <font-awesome-icon
        v-if="!props.state"
        icon="fa-solid fa-moon"
        class="themeIcon moon"
        :color="theme.bgColor"
        size="xs"
        aria-hidden="true"
      />
      <font-awesome-icon
        v-else
        icon="fa-solid fa-sun"
        class="themeIcon sun"
        :color="theme.bgColor"
        size="xs"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<style scoped>
.switchContainer {
  padding: 5px;
  border-radius: 5px;
}
input {
  z-index: 10;
}
.switchBg {
  width: 50px;
  position: relative;
  height: 25px;
  border-radius: 15px;
}

.switch {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  width: 50%;
  cursor: pointer;
}

.control {
  background-color: rgb(110, 112, 212);
  border-radius: 50%;
  transition: left 100ms ease-out;
  z-index: 20;
  pointer-events: none;
}

.hide {
  opacity: 0;
}

.left {
  left: 0;
}

.right {
  left: 55%;
}

.themeIcon {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
}

.moon {
  left: 5px;
}

.sun {
  right: 5px;
}
</style>
