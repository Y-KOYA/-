<script setup lang="ts">

  import { ref, onMounted } from 'vue';
  import Login from './views/Login.vue';
  import Money from './views/Money.vue';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';

  const isAuthenticated = ref(false); //認証状態を管理するref
  onMounted(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isAuthenticated.value = true; //ユーザーがログインしている場合
      } else {
        isAuthenticated.value = false; //ユーザーがログインしていない場合
      }
    });
  });
  
</script>


<template>
  <div class="container">
    <header>
      <!-- タイトル -->
      <h1>おこづかいちょう</h1>
    </header>

    <div id="app">
      <!-- 認証状態によってコンポーネント切り替え -->
      <component :is="isAuthenticated ? Money : Login" />
    </div>

  </div>
</template>


<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  header {
    text-align: center;
    font-size: 36px; 
    font-weight: bold; 
    margin-bottom: 20px;
    width: 100%;
    color: #7f7f7f; 
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Soft text shadow */
    position: relative; /* Positioning for pseudo-element */
  }

  header::before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 6px;
    background-color: #67b3e5e9; /* Matching background color */
    border-radius: 50%; /* Rounded shape */
  }


  .money-lists {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .money-lists > * {
    flex: 0 0 auto; /* 固定幅の要素として設定 */
    width: 400px; /* ここで各 MoneyList コンポーネントの幅を指定 */
    margin: 0 10px;
  }
</style>