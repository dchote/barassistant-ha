<template>
  <div
    class="ma-3 mx-auto d-flex flex-column"
  >
    <v-dialog
      v-model="showFullRecipe"
      width="90%"
    >
      <v-card
        prepend-icon="mdi-glass-cocktail"
        :title="cocktail.name"
      >
        <template v-slot:text>
          <pre>{{cocktail}}</pre>
        </template>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Close Recipe"
            @click="showFullRecipe = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-card
      width="360"
    >
      <v-img
        v-if="cocktail.images && cocktail.images[0]"
        class="text-white"
        height="160"
        :src="cocktail.images[0].url"
        cover
      >
        <v-row style="height: 160px;" no-gutters>
          <div 
            class="d-flex flex-row justify-end ma-1"
            style="width: 100%"
          >
            <v-chip
              variant="elevated"
              v-for="tag in cocktail.tags" :key="tag.id"
              class="ma-1"
              size="x-small"
              color="secondary"
            >
              {{ tag.name }}
            </v-chip>
          </div>
          <v-card-title style="text-shadow: 1px 1px 2px rgba(0,0,0, 0.9)" class="align-self-end">{{ cocktail.name }}</v-card-title>
        </v-row>
      </v-img>
      <v-card-title v-else>{{ cocktail.name }}</v-card-title>
    
      <v-row 
        v-if="cocktail.ingredients.length > 0" 
        class="mx-3 mt-3 mb-1"
        style="min-height: 60px;"
      >
        <v-chip
          v-for="ingredient in cocktail.ingredients" :key="ingredient.sort"
          class="ma-1"
          size="small"
          color="primary"
          variant="outlined"
        >
          {{ ingredient.ingredient.name }}
        </v-chip>
      </v-row>
    
      <v-row 
        v-if="cocktail.rating"
        justify="center"
        class="mb-1"
      >
        <v-rating
          readonly
          :length="5"
          :size="32"
          :model-value="cocktail.rating.average"
          active-color="primary"
         />
      </v-row>
    
      <v-card-actions class="align-bottom">
        <v-btn
          class="mx-auto"
          size="small"
          text="View Recipe"
          variant="outlined"
          @click="showFullRecipe = true"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: ['cocktail'],
    
    data() {
      return {
        showFullRecipe: false
      }
    },
    
    computed: {
      
    },
    
    methods: {
      
    }
  }
</script>
