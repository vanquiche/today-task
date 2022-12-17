<script setup lang="ts">
import { inject } from "vue";
import type { ThemeType } from "./themes";

const props = defineProps({
  state: Boolean,
  onChange: Function,
});
const theme = inject<ThemeType>("theme");
</script>

<template>
  <div
    class="switchContainer"
    :style="{
      backgroundColor: theme?.switchBgColor,
    }"
  >
    <span
      class="switch control"
      :class="[props.state ? 'left' : 'right']"
      tabindex="0"
    ></span>
    <input
      type="checkbox"
      id="theme"
      name="theme"
      class="switch hide"
      :class="[props.state ? 'left' : 'right']"
      :value="props.state"
      @change="props.onChange"
      tabindex="-1"
    />
  </div>
</template>

<style scoped>
.switchContainer {
  width: 50px;
  position: relative;
  height: 25px;
  border-radius: 15px;
}

.switch {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 105%;
  width: 55%;
  cursor: pointer;
}

.control {
  background-color: rgb(110, 112, 212);
  border-radius: 50%;
  transition: left 100ms ease-out;
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
</style>
