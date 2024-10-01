<script setup lang="ts">

  import MyMoneyList from '../components/MyMoneyList.vue';
  import OthersMoneyList from '../components/OthersMoneyList.vue';
  import DepositMoneyList from '../components/DepositMoneyList.vue';
  import LogoutButton from '../components/LogoutButton.vue';
  import { ref, onMounted } from 'vue';
  import { Money } from '../types/types';
  import axios from 'axios';

// 状態を管理するためのrefを定義
const moneyData = ref<Money[]>([]);

// データを取得する関数を定義
const fetchMoneyData = async () => {
  try {
    const response = await axios.get<Money[]>('http://localhost:8080');
    moneyData.value = response.data;
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
  }
};

// 新しい取引を追加する関数
const addTransaction = (transaction: Money) => {
  moneyData.value.push(transaction);
};

// コンポーネントがマウントされたときにデータを取得
onMounted(() => {
  fetchMoneyData();
});

</script>


<template>
  <div class="container">
    <header>
      <h2>3つにわけて たいせつにつかおう!</h2>
    </header>

    <div class="subtitle">
      <h1>じぶんにつかう</h1>
      <h1>だれかにつかう</h1>
      <h1>ちょきんする</h1>
    </div> 

    <main class="money-management">
    <!-- 取得したデータを用いてMoneyListコンポーネントを表示 -->
      <!-- <MoneyList v-for="item in moneyData" :key="item.id" :data="item" /> -->
      <!-- MoneyListコンポーネントを3つ横並びに表示 -->
      <MyMoneyList />
      <OthersMoneyList />
      <DepositMoneyList />
    </main>

    <!-- ログアウトボタン -->
    <LogoutButton />
  </div>
</template>


<style scoped>
 /* コンテナ全体のスタイル */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e3efcc; /* Soft background */
    padding: 20px;
    border-radius: 10px; /* Rounded corners */
  }

  /* ヘッダーのスタイル */
  header {
    text-align: center;
    margin-bottom: 20px;
    width: 100%;
    font-family: 'Arial', sans-serif;
    color: #333;
  }
/* メインタイトルのスタイル */
  h1 {
    font-size: 28px; 
    font-weight: bold; /* Bold font weight */
    letter-spacing: 2px; /* Increased letter spacing for emphasis */
    margin-bottom: 10px; /* Adjusted bottom margin */
  }
 /* サブタイトルのスタイル */
  .subtitle {
    display: flex;
    justify-content: space-around;
    align-items: flex-end; /* Align items at the bottom */
    width: 100%;
    margin-bottom: 10px; /* Adjusted margin */
  }
/* サブタイトルのテキストのスタイル */
  .subtitle h2 {
    font-size: 24px;
    font-weight: bold;
    color: #666; /* Subdued title color */
    margin: 5px 0; /* 垂直方向のマージンを均等に設定 */
  }
 /* ボタン群のスタイル */
  .spending-button, .money-management, .Expensed-button {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 20px;
  }

  .spending-button > *, .money-management > *, .Expensed-button > * {
    flex: 0 0 auto;/* 固定幅の要素として設定 */
    width: 300px;/* 各 MoneyList コンポーネントの幅を指定 */
    margin: 0 10px;
    background-color: #fff; /* コンポーネントの背景色を白に設定 */
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 影を追加 */
    transition: background-color 0.3s ease;/* 背景色の変化をアニメーション化 */
  }

  .spending-button > *:hover, .money-management > *:hover, .Expensed-button > *:hover {
    background-color: #f5f5f5;  /* ホバー時の薄いグレーの背景色 */
  }

  .LogoutButton {
    margin-top: 20px; /* Space below content */
  }
</style>
