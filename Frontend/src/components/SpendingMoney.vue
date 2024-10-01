<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SpendingMoney',
  emits: ['add-transaction'],
  setup(props, { emit }) {
    const newTransactionDate = ref<string>('');
    const newTransactionValue = ref<number | null>(null);
    const newTransactionCategory = ref<string>('じぶんのためにつかいます');
    const newTransactionComment = ref<string>('');

    const handleSubmit = () => {
      if (!newTransactionDate.value || !newTransactionValue.value || !newTransactionCategory.value) {
        return;
      }

      const newTransaction = {
        TransferDate: newTransactionDate.value,
        ValueofMoney: newTransactionValue.value,
        MoneyCategory: 'じぶんのためにつかいます',
        Comment: newTransactionComment.value,
      };

      emit('add-transaction', newTransaction);

      // フォームをリセット
      newTransactionDate.value = '';
      newTransactionValue.value = null;
      newTransactionComment.value = '';
    };

    return {
      newTransactionDate,
      newTransactionValue,
      newTransactionCategory,
      newTransactionComment,
      handleSubmit,
    };
  },
});
</script>

<template>
  <div class="add-transaction-form">
    <h2>おこづかいゲット！</h2>
    <label>
      いつ:
      <input v-model="newTransactionDate" type="date" />
    </label>
    <label>
      いくら:
      <input v-model="newTransactionValue" type="number" />
    </label>
    <label>
      なんのおかね？:
      <input v-model="newTransactionComment" type="text" />
    </label>
    <button @click="handleSubmit">もらいました</button>
  </div>
</template>

<style scoped>
  /* 入力フォーム全体のスタイル */
  .add-transaction-form {
    margin-bottom: 20px; /* 下部に20pxのマージンを追加 */
    padding: 20px; /* 内部に余白を設定してスペースを作成 */
    border-radius: 8px; /* 角丸の設定 */
    background-color: #f0f0f0; /* 薄い背景色 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 微かな影を付ける */
  }

  /* ラベルのスタイル */
  .add-transaction-form label {
    display: block; /* ブロックレベルで表示 */
    margin-bottom: 10px; /* 下部に10pxのマージンを追加 */
  }

  /* 入力フィールドのスタイル */
  .add-transaction-form input {
    width: calc(100% - 22px); /* 左右のマージンを考慮して幅を設定 */
    margin-left: 10px; /* 左側に10pxのマージンを追加 */
    padding: 10px; /* 内部に余白を設定してスペースを作成 */
    border: 1px solid #ccc; /* 薄い境界線を設定 */
    border-radius: 4px; /* 角丸の設定 */
    font-size: 16px; /* フォントサイズを拡大 */
    box-sizing: border-box; /* 幅計算にpaddingとborderを含める */
  }

  /* ボタンのスタイル */
  .add-transaction-form button {
    width: 80%; /* ボタンの幅を親要素の80%に設定 */
    margin-top: 10px; /* 上部に10pxのマージンを追加 */
    padding: 12px; /* ボタン内部に余白を設定 */
    background-color: #fabe65; /* 濃い背景色 */
    color: #fff; /* 白色のテキスト色 */
    border: none; /* 境界線をなくす */
    border-radius: 4px; /* 角丸の設定 */
    font-size: 16px; /* フォントサイズを設定 */
    cursor: pointer; /* カーソルをポインターに変更 */
    transition: background-color 0.3s ease; /* 背景色の変化にアニメーションを追加 */

    /* ボタンを中央揃えにする */
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  /* ボタンにホバー時のスタイルを設定 */
  .add-transaction-form button:hover {
    background-color: rgb(209, 199, 178); /* ホバー時の暗い背景色 */
  }
</style>
