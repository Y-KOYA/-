<template>
    <div>
      <!-- Your template here -->
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import axios, { setAuthToken } from '../services/api';
  
  export default defineComponent({
    name: 'YourComponent',
    setup() {
      onMounted(() => {
        axios.get('http://localhost:8080/money')
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
    }
  });
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  