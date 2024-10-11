import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
import CkEditorComponent from '~/plugins/ckeditor/CkEditor.vue';

export default defineNuxtPlugin((app) => {
    app.vueApp.use(CkeditorPlugin);
    app.vueApp.component('ckEditor', CkEditorComponent);
});