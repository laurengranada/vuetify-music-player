<template>
  <div class="test">
    
        <v-progress-linear height="40" v-model="trackProgress"  @click="updateSeek($event)"></v-progress-linear>

  </div>
</template>

<script>
export default {

 props: {

      progress: Number
  },

  computed: {
      trackProgress (){
          return this.progress * 100
      },
  },

  methods: {
    updateSeek(event){
        var el = document.querySelector(".v-progress-linear__bar");
        var mousePos = event.offsetX;
        var  elWidth = el.clientWidth;
        var percents = (mousePos / elWidth) * 100
        this.$emit('updateseek', percents)
    }
  },

};
</script>

<style>
    .test .v-progress-linear{
        margin-top: 0px;
        margin-bottom: 0px;
    }
</style>
