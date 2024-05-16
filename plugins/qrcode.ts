import { VueQrcodeReader } from "vue-qrcode-reader";

export default defineNuxtPlugin({
  name: "qrcode",
  parallel: true,
  async setup(nuxtApp) {
    nuxtApp.vueApp.use(VueQrcodeReader);
  },
});
