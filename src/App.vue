<template>
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">Todos</h2>
    </md-toolbar>


    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')" md-swipeable>
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Todos</h3>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <router-link @click.native="toggleLeftSidenav" exact to="/todos">Todos <md-icon>move_to_inbox</md-icon></router-link>
        </md-list-item>

        <md-list-item>
          <router-link @click.native="toggleLeftSidenav" exact to="/tokens">Tokens <md-icon>send</md-icon> </router-link>
        </md-list-item>

        <md-list-item>
          <router-link @click.native="toggleLeftSidenav" exact to="/profile">Profile <md-icon>account_circle</md-icon> </router-link>
        </md-list-item>

        <md-list-item>
          <router-link @click.native="toggleLeftSidenav" exact to="/device_info">Device Info <md-icon>info</md-icon></router-link>
        </md-list-item>

        <md-list-item>
          <router-link @click.native="toggleLeftSidenav" exact  to="/cordova" >Cordova <md-icon>android</md-icon></router-link>
        </md-list-item>

        <md-list-item >
          <router-link @click.native="toggleLeftSidenav" exact  to="/notifications" >Notifications <md-icon>priority_high</md-icon></router-link>
        </md-list-item>

        <md-list-item>
          <router-link @click.native="toggleLeftSidenav" exact  to="/login" >Login/Logout <md-icon>input</md-icon></router-link>
        </md-list-item>

        <md-list-item>
          <router-link @click.native="closeApp" exact to="/exit">Close Application <md-icon>cancel</md-icon></router-link>
        </md-list-item>

      </md-list>
    </md-sidenav>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import auth from './services/auth'
  export default {
    name: 'app',
    created () {
      console.log(window.location.href)

      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    methods: {
      toggleLeftSidenav () {
        this.$refs.leftSidenav.toggle()
      },
      open (ref) {
        console.log('Opened: ' + ref)
        // Cutre
        this.$http.defaults.headers.common['Authorization'] = auth.getAuthHeader()
      },
      close (ref) {
        console.log('Closed: ' + ref)
      },
      onDeviceReady  () {
        console.log('Working on platform' + window.device.platform)
//      notifications.enable()
      },
      closeApp () {
        navigator.notification.confirm(
          'Do you want to close the aplication?',
          this.onConfirmQuit,
          'QUIT',
          'OK,Cancel'
        )
      },
      onConfirmQuit (button) {
        console.log(button)
        if (button === 1) {
          navigator.app.exitApp()
        }
      }
    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
