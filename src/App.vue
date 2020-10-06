<style>
  @import './assets/styles.css';
</style>
<template>
  <v-app>
    <v-main>
      <component :is="layout">
        <router-view/>
      </component>
    </v-main>
  </v-app>
</template>

<script>
const defaultLayout = 'default';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    layout() {
      return `${this.$route.meta.layout || defaultLayout}-layout`;
    },
  },
};
</script>
