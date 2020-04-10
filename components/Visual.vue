<template>
    <div class="visual">
     <div class="text">
        <h2 class="title">自宅にある調味料の管理</h2><br>
        <p class="top-text">どの調味料が残っていて、どれを使いあげた。<br>
            分かりやすく管理しましょう！</p>
      </div>
      <div class="visual-img">
        <img src="~/assets/spice002.jpg" />
      </div>
   </div>
</template>

<style scoped>
.visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-img img {
  width: 320px;
  height: 210px;
  border-radius: 3px;
}

.title {
    display: inline-block;
    font-weight: normal;
}
</style>