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

    <template v-if="!hasToken">
      <v-btn to="login" text>
        Login
      </v-btn>
      <v-btn to="signup" text>
        Register
      </v-btn>
    </template>
    <template v-if="hasToken">
      <v-menu
        bottom
        left
        :offset-y="true"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            v-on="on"
            v-bind="attrs"
          >
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ profile.username }}</v-list-item-title>
                <v-list-item-subtitle>{{ profile.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item-group
              v-model="item"
              color="primary"
            >
              <v-list-item to="/me">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>

              <v-list-item @click="logOut()">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        item: 0,
      }
    },
    methods: {
      ...mapActions([
        'LOGOUT_AUTH',
      ]),
      logOut() {
        this.LOGOUT_AUTH();
      },
      viewProfile() {
        console.log(this.item)
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'profile'
      ])
    }
  };
</script>