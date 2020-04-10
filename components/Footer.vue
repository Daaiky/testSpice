<template>
    <div class="footer">
     <div class="footer-nav">
       <p class="footer-text">TOPへ戻る</p>
     </div>
     <div class="footer-logo">
       <img src="~/assets/logo.png" />
     </div>
   </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.footer-text {
  color: #4A4141;
  margin-left: 20px;
}

.footer-logo img {
    width: 200px;
    height: auto;
    margin-right: 20px;
}
</style>