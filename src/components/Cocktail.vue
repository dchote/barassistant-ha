<template>
  <v-card
    class="ma-3 mx-auto d-flex flex-column"
    width="360"
  >
    <v-img
      v-if="cocktail.images && cocktail.images[0]"
      class="align-end text-white"
      max-height="200"
      :src="cocktail.images[0].url"
      cover
    >
      <v-card-title style="text-shadow: 1px 1px 2px rgba(0,0,0, 0.9)">{{ cocktail.name }}</v-card-title>
    </v-img>
    <v-card-title v-else>{{ cocktail.name }}</v-card-title>
    
    <v-row 
      v-if="cocktail.ingredients.length > 0" 
      class="mx-3 mt-3"
    >
      <v-chip
        v-for="ingredient in cocktail.ingredients" :key="ingredient.sort"
        class="ma-1"
        size="x-small"
        variant="tonal"
        label
      >
        {{ ingredient.ingredient.name }}
      </v-chip>
    </v-row>
    
    <v-card-text 
      v-if="cocktail.description" 
      v-html="cocktail.description"
      style="display:inline-block; height: 100px; overflow: hidden; text-overflow: ellipsis;"
    >
    </v-card-text>
    <v-card-text v-else class="text-disabled">No Description.</v-card-text>
    
    <v-card-actions class="align-bottom">
      <v-btn
        class="mx-auto"
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
