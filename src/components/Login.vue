<template>
    <md-card>
        <md-card-header>
            <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
            <md-button class="md-raised md-primary" @click="login" v-show="!authorized">Login</md-button>
            <md-button class="md-raised md-primary" @click="initLogout" v-show="authorized">Logout</md-button>
        </md-card-content>

        <md-dialog-confirm
                md-title="Logout"
                md-content="Are you sure you want to logout?"
                md-ok-text="Ok"
                md-cancel-text="Cancel"
                @close="onCloseSureToLogout"
                ref="sureToLogout">
        </md-dialog-confirm>
    </md-card>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'
  import auth from '../services/auth'
  export default{
    data () {
      return {
        authorized: false
      }
    },
    methods: {
      login: function () {
        var formData = new FormData();
        formData.append("grant_type", constants.OAUTH_GRANT_TYPE);
        formData.append("client_id", constants.OAUTH_CLIENT_ID);
        formData.append("client_secret",constants.OAUTH_CLIENT_SECRET);
        formData.append("username", $('#email').val());
        formData.append("password", $('#password').val());
        formData.append("scope","");
        var out = this
        axios.post('/oauth/token', formData)
          .then(function (res) {
            sweetAlert.close()
            var token = res.data.access_token
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            window.localStorage.setItem(todosVue.STORAGE_TOKEN_KEY, token)
            console.log(token)
            window.localStorage.setItem('token', token )
            out.saveToken()
            window.location.replace('/#/selectSystem')
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      initLogout: function () {
        this.openDialog('sureToLogout')
      },
      openDialog: function (ref) {
        this.$refs[ref].open()
      },
      logout: function () {
        window.localStorage.removeItem(todosVue.STORAGE_TOKEN_KEY)
        this.authorized = false
      },
      onCloseSureToLogout: function (type) {
        if (type === 'ok') this.logout()
      }
    }
  }
</script>
