<template>
    <md-card md-with-hover>
        <md-card-header>
          <md-avatar @click.native="loadCamera">
            <img id="profilePicture" :src="avatar" alt="name">
          </md-avatar>

            <div class="md-title">{{ id }} {{ name }}</div>
            <div class="md-subhead">{{ email}}</div>
        </md-card-header>

        <md-card-content>
            <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting" ></md-spinner>
            <form novalidate @submit.stop.prevent="submit">
                <md-input-container>
                    <label>Name</label>
                    <md-input v-model="name" placeholder="Put your name here"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Email</label>
                    <md-input v-model="email" placeholder="Put your email here"></md-input>
                </md-input-container>
                <md-input-container>
                    <label>Coordinates</label>
                    <md-input v-model="cords" placeholder="Coordinates"></md-input>
                </md-input-container>
                <md-input-container>
                    <label>Created at</label>
                    <md-input v-model="createdAt" placeholder="Date here"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Updated at</label>
                    <md-input v-model="updatedAt" placeholder="Date here"></md-input>
                </md-input-container>
            </form>
        </md-card-content>

        <md-card-actions>
          <md-button @click.native="loadLocation">Get Location</md-button>
          <md-button @click.native="loadContact">Save</md-button>
        </md-card-actions>
        <md-snackbar md-position="bottom center" ref="connectionError" md-duration="4000">
            <span>Connection error.</span>
        </md-snackbar>
    </md-card>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'
  import gravatar from 'gravatar'
  export default{
    data () {
      return {
        avatar: 'http://www.gravatar.com/avatar/ef7becbb69d8ea5108fb1d98567ddb68',
        cords: "",
        id: null,
        name: null,
        email: null,
        createdAt: null,
        updatedAt: null,
        connecting: true
      }
    },
    computed: {
      avatarHash: function () {
        return 'ef7becbb69d8ea5108fb1d98567ddb68'
      }
    },
    created () {
      console.log('Component profile created')
      this.fetchUserProfile()
    },
    methods: {
      fetchUserProfile: function () {
        this.$http.get(todosVue.API_PROFILE_URL).then((response) => {
          this.connecting = false
          console.log(response.data)
          this.id = response.data.id
          this.name = response.data.name
          this.email = response.data.email
          this.avatar = 'http:' + gravatar.url(this.email)
          this.createdAt = response.data.created_at
          this.updatedAt = response.data.updated_at
        }, (response) => {
          this.connecting = false
          this.showConnectionError()
        })
      },
      showConnectionError () {
        this.$refs.connectionError.open()
      },
      loadCamera () {
        if (window.cordova && window.device.platform !== 'browser') {
          this.openCamera()
        } else {
          console.log('Camera not supported')
        }
      },
      openCamera () {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
          destinationType: window.Camera.DestinationType.FILE_URI })

        function onSuccess (imageURI) {
          window.localStorage.setItem('profilePicture', null)
          console.log('Picture Taken')
          var image = document.getElementById('profilePicture')
          image.src = imageURI
          window.localStorage.setItem('profilePicture', imageURI)
          console.log(image)
        }

        function onFail (message) {
          window.alert('Error: ' + message)
        }
      },
      loadLocation () {
        if (window.cordova && window.device.platform !== 'browser') {
          this.getLocation()
        } else {
          console.log('GPS no supported')
        }
      },
      getLocation () {
        var out = this
        console.log('Get location')
        this.connecting = true
        navigator.geolocation.getCurrentPosition(
          function (position) {
            out.connecting = false
            console.log('Coordinates: ' + position.coords.latitude + ', ' + position.coords.longitude)
            window.localStorage.setItem('coords', position.coords.latitude+ ', ' + position.coords.longitude)
            out.cords=position.coords.latitude+ ', ' + position.coords.longitude
            window.alert('Location Save')
          },
          function (err) {
            out.connecting = false
            window.alert('Error :' + err)
          },
          { timeout: 10000 })
      },
      loadContact () {
        if (window.cordova && window.device.platform !== 'browser') {
          this.saveContact()
        } else {
          console.log('Contact no supported')
        }
      },
      saveContact () {
        function onSuccess (contact) {
          window.alert('Contact Save')
        }

        function onError (contactError) {
          window.alert('Error =  ' + contactError.code)
        }
        var contact = navigator.contacts.create()
        contact.displayName = contact.nickname = contact.name = this.name
        contact.phoneNumbers = new window.ContactField('mobile', this.phone, true)
        console.log(contact)
        contact.save(onSuccess, onError)
      },
    }
  }
</script>
