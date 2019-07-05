import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faTwitter,
  faLinkedinIn,
  faGitlab,
  faDev,
  faAndroid,
  faStackOverflow,
  faPython,
  faReact,
  faVuejs,
  faJs,
  faDocker,
  faMediumM
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(
  faGithub,
  faTwitter,
  faLinkedinIn,
  faGitlab,
  faDev,
  faStackOverflow,
  faAndroid,
  faPython,
  faReact,
  faVuejs,
  faJs,
  faCopyright,
  faDocker,
  faMediumM
);

export default function(Vue) {
  Vue.component("font-awesome", FontAwesomeIcon);
}
