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
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

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
  faMoon,
  faTwitter,
  faGithub,
  faWindowMaximize
);

// app.use(createPinia());
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(createPinia())
  .mount("#app");
