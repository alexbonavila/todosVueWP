<template>
  <div id="notifications">
    <h1>Received notifications: </h1>
    <md-card v-for="(notification, index) in notifications">
      <md-card-header>
        <div class="md-title">{{notification.user.name}}</div>
      </md-card-header>
      <md-card-content>{{notification.message}}</md-card-content>
    </md-card>
  </div>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'
  import notifications from '../services/notifications'
  export default{
    data () {
      return {
        notifications: [],
        connecting: false,
        config: {
          errorLabel: 'Error',
          startLabel: 'Swipe',
          readyLabel: 'Release',
          loadingLabel: 'Refreshing...'
        }
      }
    },
    created () {
      var that = this
      setTimeout(function () {
//        that.fetchPage()
        that.connecting = false
      }, 500)
      document.addEventListener('deviceready', this.onDeviceReady, false)
      if (window.cordova && window.device.platform !== 'browser') {
        notifications.enable()
      }
    },
    methods: {
      onDeviceReady  () {
        console.log('Working on platform' + window.device.platform)
        console.log('Data')
      },
      fetchPage: function () {
        this.$http.get(todosVue.GET_MESSAGES_URL).then((response) => {
          console.log(response)
          this.notifications = response.data
        }, (err) => {
          console.log(err)
        })
      },
      showConnectionError () {
        this.$refs.connectionError.open()
      },
      onRefresh: function () {
        this.connecting = true
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve()
          }, 1000)
        }).then(() => {
          this.fetchData()
        }).catch(() => {
          this.showConnectionError()
        })
      }
    }
  }
</script>
