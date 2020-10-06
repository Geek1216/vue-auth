<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <router-link to="/" class="white--text">Vue-auth-master</router-link>
    </div>

    <v-spacer></v-spacer>

    <v-btn to="login" text>
      Login
    </v-btn>
    <v-btn to="signup" text>
      Register
    </v-btn>
  </v-app-bar>
</template>