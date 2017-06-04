<template>
  <div>
    <md-button @click.native="delay" class="md-raised md-primary">Delay</md-button>
    <md-list>
      <p v-show="delayTry">Delay Interval: {{ delayTime }}ms.</p>
    </md-list>
    <md-button @click.native="vibrate" class="md-raised md-warn">Vibrate</md-button>
  </div>
</template>
<style>
</style>
<script>
  export default{
    data () {
      return {
        delayTry: false,
        delayTime: null,
        cTime: null
      }
    },
    created () {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    beforeDestroy () {
      document.removeEventListener('deviceready', this.onBeforeDestroy, false)
    },
    methods: {
      onDeviceReady () {
        console.log('XIVATO device Ready!')
      },
      onBeforeDestroy () {
        console.log('XIVATO device onBeforeDestroy!')
      },
      vibrate () {
        if (window.cordova && window.device.platform !== 'browser') {
          navigator.vibrate(3000)
        } else {
          console.log('vibration not supported')
        }
      },
      delay () {
        this.delayTry = true
        this.delayTime = this.cTime - Date.now()
      }
    }
  }
</script>
