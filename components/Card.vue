<template>
    <div class="card-container">
             <div class="img-container">
                 <img :src="card.image" />
             </div>
             <div class="name-container">
                 <div class="spice-name">{{ card.name }}</div>
                 <div class="selected">残量：{{ card.selected }}</div>
                 <div>{{ card.id }}</div>
             </div>
         </div>
</template>

<script>
export default {
    props: ['card']
}
</script>

<style scoped>

.card-container {
    background-color: white;
    width: 260px;
    box-shadow: 5px 5px 8px;
    border-radius: 9px;
    text-align: center;
}

.card-container:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.img-container img {
    width: 100%;
    height: 170px; /*height: auto;*/
    border-radius: 9px 9px 0 0;
}

.spice-name {
    margin: 8px 0;
}
</style>