import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "./assets/main.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faEdit,
  faTrash,
  faSquareCheck as faSquareCheckSolid,
  faXmark,
  faSquareXmark,
  faSquarePen,
  faRotateLeft,
  faCircleArrowLeft,
  faCircleArrowRight,
  faAnglesRight,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";

library.add(
  faEdit,
  faSquareCheck,
  faSquareCheckSolid,
  faSquare,
  faTrash,
  faXmark,
  faSquareXmark,
  faSquarePen,
  faRotateLeft,
  faCircleArrowLeft,
  faCircleArrowRight,
  faAnglesRight,
  faSun,
  faMoon
);

// app.use(createPinia());
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(createPinia())
  .mount("#app");
