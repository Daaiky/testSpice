<template>
    <div>
    <div v-on:click="openModal2" class="cards-container">
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
            <el-input
            class="spice-name"
            type="text"
            placeholder="名前：塩コショウ"
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
                selected: this.selected,
                createdAt: new Date().getTime()
            })
            this.modalVisible = false
            this.name = null
            this.selected = ""
            window.alert('登録されました！')
        },
        async update() {
            //下記のドキュメントIDの取得方法
            await db.collection('posts').doc().update({
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
        }
    },
    mounted () {
        db.collection('posts').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const doc = change.doc
                if (change.type === 'added') {
                    this.cards.push({ id: doc.id, ...doc.data()}) //unshife・・・新しい投稿ほど上に表示
                }
                if (change.type === 'removed') { //残量更新した時表示変更
                    this.cards.push({ id: doc.id, ...doc.data()})
                }
            })
        })
    }
}
</script>
