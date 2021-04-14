import Component from "./components/index.vue";

function install (app, options = {}) {
  if (install.installed) return;
  install.installed = true;

  app.component("vue3-pro-table", Component);
}
Component.install = install;


// export default
export default Component;
