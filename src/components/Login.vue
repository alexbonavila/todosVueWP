<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Login</div>
    </md-card-header>
    <md-card-content>
      <div v-show="!authorized">
        <md-input-container v-bind:class="{ 'md-input-invalid': api_unauthorized }">
          <label>e-mail</label>
          <md-input type="email" required placeholder="Enter Email" v-model="email"></md-input>
          <span v-show="api_unauthorized" class="md-error">Possible email incorrect</span>
        </md-input-container>

        <md-input-container v-bind:class="{ 'md-input-invalid': api_unauthorized }">
          <label>Password</label>
          <md-input type="password" required placeholder="Enter Password" v-model="password"></md-input>
          <span v-show="api_unauthorized" class="md-error">Possible password incorrect</span>
        </md-input-container>
      </div>

      <md-button type="button" class="md-raised md-primary" v-on:click.native="login" v-show="!authorized">Login</md-button>
      <md-button type="button" class="md-raised md-primary" v-on:click.native="initLogout" v-show="authorized">Logout</md-button>
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
        authorized: false,
        email: '',
        password:'',
        api_unauthorized: false
      }
    },
    created(){
      if (this.token == null) this.token = window.localStorage.getItem(todosVue.STORAGE_TOKEN_KEY)

      if (this.token) {
        this.authorized = true
        this.$http.defaults.headers.common['Authorization'] = auth.getAuthHeader()
        console.log(auth.getAuthHeader())
      } else {
        this.authorized = false
        this.$http.defaults.headers.common['Authorization'] = ''
      }

    },
    methods: {
      login () {
        var out=this

        var formData = new FormData();
        formData.append("grant_type", todosVue.OAUTH_GRANT_TYPE);
        formData.append("client_id", todosVue.OAUTH_CLIENT_ID);
        formData.append("client_secret", todosVue.OAUTH_CLIENT_SECRET);
        formData.append("username", this.email);
        formData.append("password", this.password);
        formData.append("scope", "");
        axios.post(todosVue.OAUTH_SERVER_URL, formData)
          .then(function (res) {
            var token = res.data.access_token
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            window.localStorage.setItem(todosVue.STORAGE_TOKEN_KEY, token)
            console.log(token)
            auth.saveToken(token)
            out.authorized=true
            out.api_unauthorized=false
          })
          .catch(function (err) {
              if(err.message.includes(401)){
                  out.api_unauthorized=true
                  out.email= ''
                  out.password= ''
              }else{
                console.log(err.message)
              }
          });
      },
      initLogout () {
        this.openDialog('sureToLogout')
      },
      openDialog (ref) {
        this.$refs[ref].open()
      },
      logout () {
        window.localStorage.removeItem(todosVue.STORAGE_TOKEN_KEY)
        this.authorized = false
      },
      onCloseSureToLogout (type) {
        if (type === 'ok') {
          this.logout()
          this.authorized = false
        }

      }
    }
  }
</script>
