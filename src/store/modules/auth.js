import Vue from 'vue';
// import api from '../../packages/api'
import router from '../../router';
// import swal from 'sweetalert';
// import {
//   stat
// } from 'fs';

// const alertify = require('alertify.js');

const module = {
  state: {
    token: null,
    email: null,
    username: null,
    error: null,
    loading: true,
    button_loading: false,
  },

  actions: {
    REGISTER({
        commit
      }, data) {
      commit('BUTTON_LOAD');
      this.$axios.post('/auth/signup', data)
      .then(response => {
        commit('SET_TOKEN', response.data.token);
        Vue.auth.setToken(response.data.token);
        console.log(this)
        this.$axios.post('/auth/check')
        .then(response => {
          commit('BUTTON_CLEAR');
          commit('SET_PROFILE', response.data.local);
          router.push('/');
        })
        .catch( error => {
          commit('BUTTON_CLEAR');
          console.log(error.response.data)
        })
      }, (error) => {
        commit('BUTTON_CLEAR');
        if (error.response.status === 401) {
          console.log(error.response)
          commit('SET_ERROR', {
            'error': true
          });
        }
      });
    },

    /**
     *  Send request to oauth to check if the email and password is correct or return 401 error
     * 
     * @param {*} commit
     * @param {*} array Email And Password
     */
    LOGIN({
      commit
    }, {
      email,
      password
    }) {
    commit('BUTTON_LOAD');
    var data = {
      email: email,
      password: password,
    };
    this.$axios.post('/auth/signin', data)
    .then(response => {
      commit('SET_TOKEN', response.data.token);
      Vue.auth.setToken(response.data.token);
      this.$axios.post('/auth/check')
      .then(response => {
        commit('BUTTON_CLEAR');
        commit('SET_PROFILE', response.data.local);
        router.push({
          name: 'home'
        });
      })
      .catch( error => {
        commit('BUTTON_CLEAR');
        console.log(error.response.data)
      })
    }, (error) => {
      commit('BUTTON_CLEAR');
      console.log(error.response)
      if (error.response.status === 401) {
        commit('SET_ERROR', {
          'error': 'Email and password incorrect.'
        });
      } else if(error.response.status === 400) {
        commit('SET_ERROR', {
          'error': 'Some validation error.'
        });
      }
    });
  },

  /**
   *
   * Logout
   *
   * @param {*} param0
   */
  LOGOUT_AUTH({commit}) {
    // commit('SPINER_LOAD');
    this.$axios.get('/auth/logout').then(response => {
      if (response.status === 200) {
        commit('SET_LOGOUT_ATUH');
        router.push({
          name: 'login'
        })
        // commit('SPINER_CLEAN');
      }
    }, error => {
      if(error.response.status === 401) {
        localStorage.removeItem('token');
        // location.reload();
      }
    });
  }


      /**
       * Check hash
       *
       * @param {any} {commit}
       * @param {hash} {code}
       */

      // CHECK_FORGET_CODE({
      //                       commit
      //                   }, code) {

      //     axios.post('/api/v1/register/forget/checkhash', {
      //         code: code
      //     }).then(response => {
      //         if (response.status === 200) {
      //             // Message
      //             // Not necessarily
      //         }
      //     }, error => {
      //         router.push({
      //             name: 'login'
      //         });
      //     });

      // },


      /**
       *  Change password
       *
       * @param {*} { commit }
       * @param {*} { email, hash, password, password }
       */

      // CHANGE_FORGET_PASSWORD({
      //                            commit
      //                        }, {
      //                            code,
      //                            password,
      //                            password_confirmation
      //                        }) {
      //     commit('BUTTON_LOAD');
      //     axios.post('/api/v1/update/register/password', {
      //         code: code,
      //         password: password,
      //         password_confirmation: password_confirmation
      //     })
      //         .then(response => {
      //             if (response.status === 200) {
      //                 router.push({
      //                     name: 'login'
      //                 });
      //                 alertify.logPosition('top right');
      //                 alertify.success(response.data.message);
      //                 commit('BUTTON_CLEAR');
      //             }
      //         }, error => {
      //             alertify.logPosition('top right');
      //             alertify.error(error.response.data.message);
      //             commit('BUTTON_CLEAR');
      //         });
      // },

      /**
       *  Send message to email to reset password
       *
       *  @param {email} email
       */

      // CHECK_EMAIL({
      //                 commit
      //             }, email) {
      //     commit('BUTTON_LOAD');
      //     axios.post('/api/v1/check/register/email', {
      //         email: email
      //     })
      //         .then(response => {
      //             if (response.status === 200) {
      //                 alertify.logPosition('top right');
      //                 alertify.success(response.data.message);
      //                 commit('BUTTON_CLEAR');
      //                 router.push({
      //                     name: 'login'
      //                 });
      //             }
      //         }, error => {
      //             alertify.logPosition('top right');
      //             alertify.error(error.response.data.message);
      //             commit('BUTTON_CLEAR');
      //         });
      // },

      /**
       * Change password of already user
       *
       * @param {*} commit
       * @param {*} password
       */
      // UPDATE_PASSWORD(commit, {
      //     current_password,
      //     password,
      //     password_confirmation
      // }) {
      //     swal({
      //         title: 'Are you sure to change password ?',
      //         icon: 'warning',
      //         buttons: true,
      //         dangerMode: true,
      //     }).then((willDelete) => {
      //         if (willDelete) {
      //             axios.post('/api/v1/update/profile/password', {
      //                 current_password: current_password,
      //                 password: password,
      //                 password_confirmation: password_confirmation
      //             }).then(response => {
      //                 if (response.status === 200) {
      //                     alertify.logPosition('top right');
      //                     alertify.success(response.data.message);
      //                     Vue.auth.destroyToken();
      //                     router.push({
      //                         name: 'login'
      //                     });
      //                 }
      //             }, error => {
      //                 alertify.logPosition('top right');
      //                 alertify.error(error.response.data.message);
      //             });
      //         }
      //     });
      // },


      /**
       * Get payment details
       *
       * @param {*}
       */
      // GET_PAYMENT({
      //                 commit
      //             }) {
      //     commit('SPINER_LOAD');
      //     axios.get('/api/v1/get/profile/payment')
      //         .then(response => {
      //             commit('SET_GET_PAYMENT', {
      //                 data: response.data
      //             });
      //             commit('SPINER_CLEAN');
      //         }, error => {
      //             alertify.logPosition("top right");
      //             alertify.error(error.response.data.message);
      //         });
      // },

      /**
       * Get billing details for one year
       *
       * @param {*}
       */
      // GET_BILLING_DETAILS({
      //                         commit
      //                     }) {
      //     commit('SPINER_LOAD');
      //     axios.get('/api/v1/get/profile/payment/billing')
      //         .then(response => {
      //             commit('SET_BILLING_DETAILS', {
      //                 data: response.data
      //             });
      //             commit('SPINER_CLEAN');
      //         }, error => {
      //             alertify.logPosition("top right");
      //             alertify.error(error.response.data.message);
      //         });
      // },

      /**
       *  Cancel membership
       *
       * @param {array} commit
       */
      // CANCEL_MEMBERSHIP({
      //                       commit
      //                   }) {
      //     swal({
      //         title: 'Are you sure?',
      //         text: 'Once Canceled, you will can resume your account Within 10 months and then will be deleted!',
      //         icon: 'warning',
      //         buttons: true,
      //         dangerMode: true,
      //     }).then((willDelete) => {
      //         if (willDelete) {
      //             commit('BUTTON_LOAD');
      //             axios.get('/api/v1/update/profile/payment/cancel_membership').then(response => {
      //                 if (response.data.status === 'success') {
      //                     commit('SET_CANCEL_MEMBERSHIP', {
      //                         data: response.data
      //                     });
      //                     commit('BUTTON_CLEAR');
      //                 }
      //             }, error => {
      //                 alertify.logPosition("top right");
      //                 alertify.error(error.response.data.message);
      //             });
      //             swal('The account is canceled!', {
      //                 icon: 'success',
      //             });
      //         }
      //     });
      // },


      /**
       * Resume membership
       *
       * @param {any} {commit }
       */

      // RESUME_MEMBERSHIP({
      //                       commit
      //                   }) {
      //     commit('BUTTON_LOAD');
      //     axios.get('/api/v1/update/profile/payment/resume_membership').then(response => {
      //         if (response.data.status === 'success') {
      //             alertify.logPosition('top right');
      //             alertify.success('Successful resume your account');
      //             commit('SET_RESUME_MEMBERSHIP', {
      //                 data: response.data
      //             });
      //             commit('BUTTON_CLEAR');
      //         }
      //     }, error => {
      //         alertify.logPosition("top right");
      //         alertify.error(error.response.data.message);
      //     });
      // },


      /**
       * Change plan
       *
       * @param {any} {commit }
       */
      // CHANGE_PLAN({
      //                 commit
      //             }, plan_id) {
      //     swal({
      //         title: 'Are you sure to change your plan?',
      //         icon: 'warning',
      //         buttons: true,
      //         dangerMode: true,
      //     }).then((willDelete) => {
      //         if (willDelete) {
      //             commit('BUTTON_LOAD');
      //             axios.post('/api/v1/update/profile/payment/change_plan', {
      //                 plan_id: plan_id
      //             }).then(response => {
      //                 if (response.data.status === 'success') {
      //                     commit('SET_PLAN', {
      //                         plan_id: plan_id
      //                     });
      //                     commit('BUTTON_CLEAR');

      //                     alertify.logPosition("top right");
      //                     alertify.success(response.data.message);
      //                 }
      //             });
      //         }
      //     }, error => {
      //         alertify.logPosition("top right");
      //         alertify.error(error.response.data.message);
      //     });
      // },

      /**
       * Change default language
       *
       * @param {*} commit
       * @param {*} lang
       */
      // SET_LANGUAGE({
      //                  commit
      //              }, lang) {
      //     axios.post('/api/v1/update/profile/language', {
      //         language: lang
      //     }).then(response => {

      //         // Message
      //         // Not necessarily

      //     });
      // },


      /**
       * Adujst caption
       *
       * @param {*} commit
       * @param {*} caption
       */
      // SET_CAPTION({
      //                 commit
      //             }, caption) {
      //     axios.post('/api/v1/update/profile/caption', {
      //         caption: caption
      //     }).then(res => {
      //         alertify.logPosition('top right');
      //         alertify.success('Successful update');
      //     }, error => {
      //         alertify.logPosition("top right");
      //         alertify.error(error.response.data.message);
      //     });
      // },


      /**
       * Get viewing history
       *
       * @param {any} {commit }
       */

      // GET_VIEWING_HISTORY({
      //                         commit
      //                     }) {
      //     commit('SPINER_LOAD');
      //     axios.get('/api/v1/get/profile/viewing_history').then(response => {
      //         if (response.data.status === 'success') {
      //             commit('SET_VIEWING_HISTORY', {
      //                 data: response.data.data,
      //             });
      //             commit('SPINER_CLEAN');
      //         }
      //     });
      // },


      /**
       * Submit Supoort Request
       *
       * @param {any} {commit }
       */

      // SUBMIT_SUPPORT_REQUEST({
      //                            commit
      //                        }, {
      //                            subject,
      //                            details
      //                        }) {
      //     commit('BUTTON_LOAD');
      //     axios.post('/api/v1/create/support/request', {
      //         subject: subject,
      //         details: details
      //     }).then(response => {
      //         if (response.data.status === 'success') {
      //             alertify.logPosition('top right');
      //             alertify.success('Successful Send The Request, We Will Response Soon.')
      //             commit('SET_SUBMIT_SUPPORT_REQUEST', {
      //                 data: response.data.data
      //             });
      //             commit('BUTTON_CLEAR');
      //         }
      //     });
      // },

      /**
       * Get Supoort Request
       *
       * @param {any} {commit }
       */

      // GET_ALL_SUPPORT_REQUEST({
      //                             commit
      //                         }) {
      //     commit('SPINER_LOAD');
      //     axios.get('/api/v1/get/support/request').then(response => {
      //         if (response.status === 200) {
      //             commit('SET_ALL_SUPPORT_REQUEST', {
      //                 data: response.data.data,
      //             });
      //             commit('SPINER_CLEAN');
      //         } else if (response.status === 204) {
      //             commit('SET_ALL_SUPPORT_REQUEST', {
      //                 data: null
      //             });
      //             commit('SPINER_CLEAN');
      //         }
      //     });
      // },


      /**
       * Get Supoort Request
       *
       * @param {any} {commit }
       */

      // GET_SUPPORT_REQUEST({
      //                         commit
      //                     }, {
      //                         id
      //                     }) {
      //     commit('SPINER_LOAD');
      //     axios.get('/api/v1/get/support/request/' + id).then(response => {
      //         if (response.status === 200) {
      //             commit('SET_SUPPORT_REQUEST', {
      //                 data: response.data.data,
      //             });
      //             commit('SPINER_CLEAN');
      //         } else if (response.status === 204) {
      //             commit('SET_SUPPORT_REQUEST', {
      //                 data: null
      //             });
      //             commit('SPINER_CLEAN');
      //         }
      //     });
      // },

      /**
       * Submit Supoort Reply
       *
       * @param {any} {commit }
       */

      // SUPPORT_REPLY({
      //                   commit
      //               }, {
      //                   id,
      //                   reply
      //               }) {
      //     commit('BUTTON_LOAD');
      //     axios.post('/api/v1/create/support/request/reply', {
      //         id: id,
      //         reply: reply
      //     }).then(response => {
      //         if (response.status === 200) {
      //             commit('SET_SUPPORT_REPLY', {
      //                 data: response.data.data,
      //             });
      //             commit('BUTTON_CLEAR');
      //         } else if (response.status === 204) {
      //             commit('SET_SUPPORT_REQUEST', {
      //                 data: null
      //             });
      //             commit('BUTTON_CLEAR');
      //         }
      //     });
      // },


      /**
       *
       * Device Activity
       *
       * @param {*} param0
       */
      // GET_DEVICE_ACTIVITY({
      //                         commit
      //                     }) {
      //     commit('SPINER_LOAD');
      //     axios.get('/api/v1/get/device/activity').then(response => {
      //         if (response.status === 200) {
      //             commit('SET_DEVICE_ACTIVITY', {
      //                 data: response.data.data,
      //             });
      //             commit('SPINER_CLEAN');
      //         }
      //     });
      // },


      /**
       *
       * Device Activity
       *
       * @param {*} param0
       */
      // DELETE_DEVICE_SESSION({
      //                           commit
      //                       }, {
      //                           id,
      //                           key
      //                       }) {
      //     axios.delete('/api/v1/delete/device/session/' + id).then(response => {
      //         if (response.status === 200) {
      //             commit('DELETE_DEVICE_SESSION', key);
      //             alertify.logPosition("top right");
      //             alertify.success(response.data.message);
      //         }
      //     }, error => {
      //         if (error.response.status === 422) {
      //             alertify.logPosition("top right");
      //             alertify.error(error.response.data.message);
      //         } else {
      //             alertify.logPosition("top right");
      //             alertify.error('Error 404');
      //         }
      //     });
      // },


      
  },

  mutations: {
    SET_ERROR(state, error) {
      state.error = error.error;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_PROFILE(state, user) {
      state.email = user.email;
      state.username = user.username;
    },
      // SET_GET_PAYMENT(state, data) {
      //     state.loading = false;
      //     state.items = data.data;
      //     state.payment_update = data.data;
      //     state.plan = data.data;
      // },

      // SET_BILLING_DETAILS(state, data) {
      //     state.loading = false;
      //     state.items = data.data;
      // },

      // SET_CANCEL_MEMBERSHIP(state, data) {
      //     state.payment_update = data.data;
      // },

      // SET_RESUME_MEMBERSHIP(state, data) {
      //     state.payment_update = data.data;
      // },

      // SET_PLAN(state, data) {
      //     state.plan.subscription_plan = data.plan_id;
      // },

      // SET_VIEWING_HISTORY(state, data) {
      //     state.items = data;
      // },

      // SET_SUBMIT_SUPPORT_REQUEST(state, data) {
      //     if (state.items.data === null) {
      //         state.items.data = [];
      //     }
      //     state.items.data.push(data.data);
      // },

      // SET_SUPPORT_REQUEST(state, data) {
      //     state.support_request = data;
      // },

      // SET_ALL_SUPPORT_REQUEST(state, data) {
      //     state.items = data;
      // },

      // SET_SUPPORT_REPLY(state, data) {
      //     if (state.support_request.data.reply === null) {
      //         state.support_request.data.reply = [];
      //     }
      //     state.support_request.data.reply.push(data.data);
      // },

      // SET_DEVICE_ACTIVITY(state, data) {
      //     state.device_activity_data = data;
      // },

      // DELETE_DEVICE_SESSION(state, key) {
      //     state.device_activity_data.data.splice(key, 1);
      // },

      SET_LOGOUT_ATUH(state) {
        state.token = null
        localStorage.removeItem('token');
        // router.go('/');
      },

      // // Spiner load
      // SPINER_LOAD(state) {
      //     state.loading = true;
      // },

      // SPINER_CLEAN(state) {
      //     state.loading = false;
      // },

      // BUTTON load
      BUTTON_LOAD(state) {
          state.button_loading = true;
      },

      BUTTON_CLEAR(state) {
          state.button_loading = false;
      },
  },
  getters: {
    hasToken: state => {
      return state.token
    },
    profile: state => {
      return {
        email: state.email,
        username: state.username
      }
    }
  }
}
export default module;