<template>
 <div class="app-layout">
    <Header />
    <Visual />
   <div >
      <nuxt />
   </div>
   <Footer />
 </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Visual from '~/components/Visual.vue'
import Footer from '~/components/Footer.vue'

export default {
    components: {
        Header,
        Visual,
        Footer
    }
}
</script>

<style>
.app-layout {
  width: 1170px;
  margin: 0 auto;
  background-color: #FCFDFE;
}

.contents {
  display: flex;
}

</style>