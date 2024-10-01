<!-- src/components/LogoutButton.vue -->
<template>
    <button @click="logout">ログアウト</button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { auth } from '../firebase';
  import { signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'LogoutButton',
    setup() {
      const router = useRouter();
      const logout = async () => {
        try {
          await signOut(auth);
          router.push('/'); // ログアウト後にルートパスにリダイレクト
        } catch (error) {
          console.error('ログアウトに失敗しました:', error);
        }
      };
      return {
        logout,
      };
    },
  });
  </script>
  
  <style scoped>
  button {
    background-color: #ff4b4b;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #ff6b6b;
  }
  </style>
  