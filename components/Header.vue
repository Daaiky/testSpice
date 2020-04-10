<template>
    <div class="header">
      <div class="header-content">
        <div class="header-logo">
          <img src="~/assets/logo.png" />
        </div>
        <div class="header-nav">
          <div class="sign-in" v-on:click="openLoginModal" v-if="!isAuthenticated">ログイン</div>
          <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="30%">
            <div class="image-container">
              <img src="~/assets/google_signin.png" @click="login">
            </div>
          </el-dialog>
        </div>
      </div>
   </div>
</template>


<script>
import { firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions(['setUser']),
    openLoginModal () {
         this.dialogVisible = true
     },
    login () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const user = result.user
          this.setUser(this.$store.state.user)
          console.log(user)
          this.dialogVisible = false
        }).catch((error) => {
          window.alert(error)
        })
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user)
      }
    }
  )},
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.header-logo img {
  margin-top: 4px;
}

.sign-in,
.sign-out {
  display: inline-block;
  border: solid 1px black;
  border-radius: 4px;
  color: #4A4141;
  padding: 8px 30px;
  background-color: #F1F1F1;
  cursor: pointer;
}

.sign-in:hover {
  opacity: 0.7;
}

.sign-out:hover {
  opacity: 0.7;
}

.image-container {
    display: flex;
    justify-content: center;
}

.image-container img {
    width: 70%;
    cursor: pointer;
}
</style>