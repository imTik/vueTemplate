import Vue from 'vue';

// ui框架引入
import {
  Button,
  Toast,
  Loading,
  Field,
  Popup,
  Picker,
  Dialog,
  RadioGroup,
  Radio,
  Uploader,
  DropdownMenu,
  DropdownItem
} from 'vant';
import 'vant/lib/index.css';
Vue.use(Button)
  .use(Toast)
  .use(Loading)
  .use(Field)
  .use(Popup)
  .use(Picker)
  .use(Dialog)
  .use(RadioGroup)
  .use(Radio)
  .use(Uploader)
  .use(DropdownMenu)
  .use(DropdownItem);
