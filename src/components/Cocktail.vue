<template>
  <v-card
    class="ma-3 mx-auto d-flex flex-column"
    width="340"
  >
    <v-img
      v-if="cocktail.images && cocktail.images[0]"
      class="align-end text-white"
      max-height="200"
      :src="cocktail.images[0].url"
      cover
    >
      <v-card-title style="text-shadow: 1px 1px 2px rgba(0,0,0, 0.8)">{{ cocktail.name }}</v-card-title>
    </v-img>
    <v-card-title v-else>{{ cocktail.name }}</v-card-title>
    
    <v-card-text v-if="cocktail.description" v-html="cocktail.description"></v-card-text>
    <v-card-text v-else class="text-disabled">No Description.</v-card-text>
    
    <v-card-actions class="align-bottom">
      <v-btn
        class="mt-auto mx-auto"
        size="small"
        text="View Recipe"
        variant="outlined"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['cocktail'],
    
    data() {
      return {
        
      }
    },
    
    computed: {
      
    },
    
    methods: {
      
    }
  }
</script>
