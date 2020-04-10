<template>
 <div class="container">
     <div class="main-content">
        <cards ref="cards"/>
    </div>
     <div class="side-content">
        <p v-if="isAuthenticated" @click="openModal">調味料新規登録</p>
        <p>検索機能</p>
        <p>調味料一覧</p>
        <p>共有</p>
        <p v-if="isAuthenticated" @click="logout">ログアウト</p>
     </div>
 </div>
</template>

<script>
import Cards from '~/components/Cards.vue'
import { firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
 components: {
     Cards
 },
 data () {
     return {
         dialogVisible: false
     }
 },
 methods: {
     ...mapActions(['setUser']),
     logout() {
         firebase.auth().signOut()
         .then(() => {
             this.setUser(null)
             window.alert('ログアウトしました')
         })
         .catch((e) => {
             window.alert('ログアウトに失敗しました')
             console.log(e)
         })
     },
     openModal () {
         this.$refs.cards.openModal()
     },
     openLoginModal () {
         this.dialogVisible = true
     }
 },
 computed: {
     isAuthenticated() {
         return this.$store.getters.isAuthenticated
     }
 }
}
</script>

<style scoped>
.container {
    height: 100%;
    display: flex;
}

.main-content {
  overflow: scroll;
  width: 3600px;
  height: 100vh;
  background-image: url(../assets/spice001.jpg);
  background-color:rgba(255,255,255,0.8);
  background-blend-mode:lighten;   
  margin-left: 10px;
}

.side-content {
  width: 100%;
  background: #4A4141;
  height: 100vh;
  text-align: center;
}

.side-content p {
  color: #4A4141;
  border: solid 1px black;
  background-color: #F1F1F1;
  padding: 8px 12px;
  margin: 15px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.side-content p:hover {
    opacity: 0.7;
}
</style>