<script setup lang="ts">
import { inject } from "vue";
import type { ModalProviderType } from "@/types";
import { darkTheme, type ThemeType } from "./themes";

const modal = inject<ModalProviderType>("modal", {
  state: false,
  open: () => {},
  close: () => {},
});
const theme = inject<ThemeType>("theme", darkTheme);

function clickModal(e: Event) {
  e.stopPropagation();
}
</script>

<template>
  <Transition>
    <div
      id="overlay"
      class="overlay"
      @click="modal.close"
      v-if="modal.state"
      data-testid="overlay"
    >
      <div
        id="modal"
        class="modal"
        @click="clickModal"
        :style="{ backgroundColor: theme.inputBgColor, color: theme.color }"
        role="modal"
        aria-modal="true"
        aria-labelledby="modal_label"
        aria-describedby="modal_description"
        data-testid="modal"
      >
        <button
          @click="() => modal.close()"
          class="closeBtn"
          aria-label="close modal"
          data-testid="closeModal"
        >
          <font-awesome-icon class="btn" icon="fa-solid fa-xmark" size="xl" />
        </button>
        <h1 id="modal_label" class="title">What is Today?</h1>
        <p id="modal_description" class="para">
          Today is a simple task list app that is designed to help you quickly
          focus on today's tasks without the hindrance of overwhelming options.
          If you're looking for task list that is no fuss, no BS, just what you
          want to get done, then Today is for you!
        </p>
        <h2 class="title">Features</h2>
        <ul class="list">
          <li>
            <b>Be present!</b> Focus only on what you want to get done Today!
          </li>
          <li>
            <b>Tasking has never been easier!</b> Create, edit, delete, and
            complete tasks with speed and ease.
          </li>
          <li>
            <b>Sort tasks is easy as 1-2-3</b>. Simply drag and drop your task
            to where you want it.
          </li>
          <li>
            <b>Couldn't complete a task from a previous day?</b> Move an old
            task to Today by cycling through previous days within the current
            week.
          </li>
          <li>
            <b>Not a fan of dark themes?</b> With the theme toggle, you can
            switch between light and dark to your heart's content!
          </li>
        </ul>
        <div class="linkContainer">
          <a href="https://twitter.com/stevevangdev" title="twitter">
            <font-awesome-icon icon="fa-brands fa-twitter" size="xl" />
          </a>
          <a href="https://github.com/vanquiche" title="github">
            <font-awesome-icon icon="fa-brands fa-github" size="xl" />
          </a>
          <a href="https://stevevangdev.com" title="steve vang website">
            <font-awesome-icon icon="fa-solid fa-window-maximize" size="xl" />
          </a>
        </div>
        <small
          >&copy; Copyright {{ new Date().getFullYear() }} Steve Vang</small
        >
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  bottom: 100%;
}
.modal {
  width: 90%;
  height: fit-content;
  max-width: 800px;
  max-height: 90%;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  overflow-y: scroll;
  position: relative;
}

.list {
  padding-left: 20px;
  margin-bottom: 20px;
}
.para {
  /* text-align: center; */
}
.title {
  font-size: 1.5rem;
}

.closeBtn {
  position: fixed;
  top: 6%;
  right: 6%;
}

.linkContainer {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
}

b {
  font-weight: 600;
}

.v-enter-active,
.v-leave-active {
  transition: all 300ms ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
