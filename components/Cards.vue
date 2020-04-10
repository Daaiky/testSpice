<template>
    <div>
    <div v-on:click="openModal2" class="cards-container">
         <!--<card v-for="(card, index) in cards" :card="card" :key="index"/>-->
         <card v-for="card in cards" :card="card" :key="card.id"/>
    </div>
    <div v-if="modalVisible" class="modal">
        <div class="btns">
            <div class="back-btn" @click="modalVisible = false">
                <el-button type="primary" icon="el-icon-arrow-left">戻る</el-button>
            </div>
            <div class="post-btn" @click="post">
                <el-button type="primary">登録<i class="el-icon-arrow-right el-icon-right"></i></el-button>
            </div>
        </div>
        <div class="modal-content">
            <div>
                <img :src="imageUrl" class="uploaded-image">
            </div>
            <el-upload
                v-if="!imageUrl"
                action=""
                :show-file-list="false"
                :http-request="uploadFile"
                >
                <el-button class="upload-btn">画像アップロード</el-button>
            </el-upload>
            <el-input
            class="spice-name"
            type="text"
            placeholder="名前：キッコーマン"
            v-model="name"
            >
            </el-input><br>
            <select v-model="selected" class="remaining">
                <option disabled value="">残量を選択してください</option>
                <option value="多">多</option>
                <option value="中">中</option>
                <option value="少">少</option>
                <option value="なし">なし</option>
            </select>
            <span class="select-remaining">残量: {{ selected }}</span>
        </div>
    </div>
    <div v-if="modalVisible2" class="modal-2">
        <div class="btns2">
            <div class="back-btn2" @click="modalVisible2 = false">
                <el-button type="primary" icon="el-icon-arrow-left">戻る</el-button>
            </div>
            <div class="post-btn2" @click="update">
                <el-button type="primary">更新<i class="el-icon-arrow-right el-icon-right"></i></el-button>
            </div>
        </div>
        <p>残量の変更</p>
        <select v-model="selected" class="remaining">
                <option disabled value="">残量を選択してください</option>
                <option value="多">多</option>
                <option value="中">中</option>
                <option value="少">少</option>
                <option value="なし">なし</option>
            </select>
            <span class="select-remaining">残量: {{ selected }}</span>
    </div>
    </div>
</template>

<script>
import Card from '~/components/Card.vue'
import { db, firebase } from '~/plugins/firebase'

export default {
    components: {
        Card
    },
    data() {
        return {
            cards: [],
            imageUrl: null,
            name: null,
            modalVisible: false,
            modalVisible2: false,
            selected: ""
        }
    },
    methods: {
        async post() {
            await db.collection('posts').add({
                name: this.name,
                image: this.imageUrl,
                selected: this.selected,
                createdAt: new Date().getTime()
            })
            this.modalVisible = false
            this.name = null
            this.imageUrl = null
            this.selected = ""
            window.alert('登録されました！')
        },
        async update() {
            await db.collection('posts').doc('doc.id').update({
                selected: this.selected
            })
            this.modalVisible2 = false
            this.selected = ""
            window.alert('更新されました！')
        },
        openModal() {
            this.modalVisible = true
        },
        openModal2 () {
            this.modalVisible2 = true
        },
        async uploadFile(data) {
            const storageRef = firebase.storage().ref()
            const time = new Date().getTime()
            const ref = storageRef.child(`posts/${time}_${data.file.name}`)
            const snapshot = await ref.put(data.file)
            const url = await snapshot.ref.getDownloadURL()
            this.imageUrl = url
        }
    },
    mounted () {
        db.collection('posts').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const doc = change.doc
                if (change.type === 'added') {
                    this.cards.unshift({ id: doc.id, ...doc.data()}) //unshife・・・新しい投稿ほど上に表示
                }
                if (change.type === 'removed') { //残量更新した時表示変更
                    this.cards.unshift({ id: doc.id, ...doc.data()})
                }
            })
        })
    }
}
</script>

<style scoped>

.cards-container {
    display: grid;
    gap: 30px 30px;
    grid-template-columns: repeat(auto-fit,260px);   /*レスポンシブにも対応*/
    justify-content: center;
    margin: 50px 0;
}

.modal {
    background: white;
    width: 1150px;
    height: 100%;
    position: fixed;
    top: 0;
}

.btns {
    padding: 0 100px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.modal-content {
    text-align: center;
}

.upload-btn {
    background: black;
    color: white;
    width: 100%;
    padding: 10px 300px;
    margin-top: 80px;
}

.uploaded-image {
  max-height: 120px;
}

.spice-name {
    margin-top: 20px;
    width: 62%;
}

.remaining {
    margin-top: 20px;
    width: 40%;
    height: 40px;
}

.select-remaining {
    margin-left: 20px;
    font-size: 20px;
}

.modal-2 {
    background: white;
    width: 400px;
    height: 30%;
    position: fixed;
    top: 0;
    text-align: center;
    padding: 5px;
}

.modal-2 p {
    font-size: 20px;
}

.btns2 {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>

