<style>
</style>

<template>
  <div class="full-height d-flex justify-center align-center">
    <div>
      <router-link to="/">
        <v-img
        :src="require('../../assets/logo.png')"
        max-width="40" max-height="40"
        to="/"
        class="mx-auto"
        >
        </v-img>
      </router-link>
      <v-card
        width="600"
        class="my-2"
      >
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            width="100%"
          >
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>

            <v-text-field
              v-model="repassword"
              :rules="repasswordRules"
              label="Password Confirmation"
              required
            ></v-text-field>

          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end align-end">
          <router-link to="/login">Already registered?</router-link>
          <v-btn
            :disabled="!valid"
            color="success"
            class="ml-2"
            :loading="button_loading"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import {
  mapState, mapActions
} from 'vuex';

export default {

  data() {
    return {
        valid: true,

        username: '',
        usernameRules: [
          v => !!v || 'Username is required',
        ],

        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
        ],

        repassword: '',
        repasswordRules: [
          v => !!v || 'Password is required',
        ],
    };
  },
  computed: mapState({
    error: state => state.auth.error,
    button_loading: state => state.auth.button_loading
  }),
  mounted() {
  },
  methods: {
    ...mapActions([
      'REGISTER',
    ]),
    submit() {
      this.REGISTER({
        'username': this.username,
        'email': this.email,
        'password': this.password,
        'repassword': this.repassword,
      })
    }
  }
};
</script>