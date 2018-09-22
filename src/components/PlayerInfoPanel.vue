<template>
  <v-card height="60" class="custom-card">
    <v-card-title>
      <h2>{{ trackInfo.artist }} - {{ trackInfo.title }}</h2>
      <v-spacer></v-spacer>
      <h3>{{trackInfo.seek | minutes}}/{{trackInfo.duration | minutes}}</h3>
    </v-card-title>    
  </v-card>
</template>
 
<script>
  export default {
    props: {
      trackInfo: Object
    },
  }
</script>

<style>
  .custom-card.v-card{
    background-color:orangered !important;
  }
</style>
