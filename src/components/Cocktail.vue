<template>
  <div
    class="ma-3 mx-auto d-flex flex-column"
  >
    <v-dialog
      v-model="showFullRecipe"
      fullscreen
    >
      <v-card>
        <v-card-title class="pa-3">
          <div 
            class="d-flex flex-row align-center"
          >
            <v-icon class="mr-2">mdi-glass-cocktail</v-icon>
            {{ cocktail.name }}
            <v-spacer/>
            <v-rating
              v-if="cocktail.rating"
              class="self-justify-end"
              readonly
              :length="5"
              :size="32"
              :model-value="cocktail.rating.average"
              active-color="primary"
            />
            <v-btn
              class="ml-3"
              icon="mdi-close"
              variant="text"
              @click="showFullRecipe = false"
            >
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="py-0">
          <cocktail-recipe :cocktail="cocktail" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text="Close"
            @click="showFullRecipe = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-card
      :width="xs ? width - 40 : '360px'"
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
              v-for="tag in cocktail.tags" :key="tag.id"
              class="ma-1"
              size="x-small"
              color="secondary"
              variant="elevated"
              label
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
        justify="space-evenly"
      >
        <v-chip
          v-for="ingredient in cocktail.ingredients" :key="ingredient.sort"
          class="ma-1"
          size="small"
          color="primary"
          variant="outlined"
          label
        >
          {{ ingredient.ingredient.name }}
        </v-chip>
      </v-row>
      
      <v-card-actions class="align-bottom justify-space-between">
        <v-rating
          v-if="cocktail.rating"
          class="mx-1"
          readonly
          :length="5"
          :size="32"
          :model-value="cocktail.rating.average"
          active-color="primary"
        />
        <v-btn
          class="mx-1"
          size="small"
          text="View Recipe"
          variant="text"
          @click="showFullRecipe = true"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
  import { useDisplay } from 'vuetify'
  const { xs, width } = useDisplay()
</script>
  
<script>
  export default {
    props: ['cocktail'],
    
    data() {
      return {
        showFullRecipe: false
      }
    }
  }
</script>
