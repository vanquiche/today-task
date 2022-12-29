<script setup lang="ts">
import { inject } from "vue";
import type { ModalProviderType } from "@/types";

const modal = inject<ModalProviderType>("modal", {
  state: false,
  open: () => {},
  close: () => {},
});

function clickModal(e: Event) {
  e.stopPropagation();
}
</script>

<template>
  <div class="overlay" @click="modal.close" v-if="modal.state">
    <div
      class="modal"
      @click="clickModal"
      role="modal"
      aria-modal="true"
      aria-labelledby="modal_label"
      aria-describedby="modal_description"
    >
      <h1 id="modal_label">What is today?</h1>
      <p id="modal_description">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt delectus
        aspernatur maxime ducimus quod eos totam, ab officiis perspiciatis
        corporis! Illum nihil excepturi tempore, iusto consequatur voluptas
        atque ad! Blanditiis?
      </p>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* background-color: white; */
  backdrop-filter: blur(4px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  bottom: 100%;
}
.modal {
  width: 80%;
  height: 80%;
  max-width: 800px;
  max-height: 700px;
  background-color: white;
  border-radius: 15px;
}
</style>
