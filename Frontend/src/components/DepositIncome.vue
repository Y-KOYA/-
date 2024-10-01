<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DepositIncome',
  emits: ['add-transaction'],
  setup(props, { emit }) {
    const newTransactionDate = ref<string>('');
    const newTransactionValue = ref<number | null>(null);
    const newTransactionCategory = ref<string>('ちょきんしました');
    const newTransactionComment = ref<string>('');

    const handleSubmit = () => {
      if (!newTransactionDate.value || !newTransactionValue.value || !newTransactionCategory.value) {
        return;
      }

      const newTransaction = {
        TransferDate: newTransactionDate.value,
        ValueofMoney: newTransactionValue.value,
        MoneyCategory: 'ちょきんしました',
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
  /* フォーム全体のスタイル */
  .add-transaction-form {
    margin-bottom: 20px; /* 下部のマージンを20pxに設定 */
    padding: 20px; /* 内部に余白を追加してフォームを空間を作成 */
    border-radius: 8px; /* 角丸を8pxに設定 */
    background-color: #f0f0f0; /* 薄い背景色 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 微細な影を追加 */
  }

  /* ラベルのスタイル */
  .add-transaction-form label {
    display: block; /* ブロックレベル要素として表示 */
    margin-bottom: 10px; /* 下部のマージンを10pxに設定 */
  }

  /* 入力フィールドのスタイル */
  .add-transaction-form input {
    width: calc(100% - 22px); /* マージンを考慮した調整された幅 */
    margin-left: 10px; /* 左側に10pxのマージンを設定 */
    padding: 10px; /* 入力フィールド内に余白を追加 */
    border: 1px solid #ccc; /* 薄い境界線 */
    border-radius: 4px; /* 角丸を4pxに設定 */
    font-size: 16px; /* 大きめのフォントサイズ */
    box-sizing: border-box; /* 幅計算にパディングと境界線を含める */
  }

  /* ボタンのスタイル */
  .add-transaction-form button {
    display: block; /* ブロックレベル要素として表示 */
    width: 80%; /* 親要素の幅いっぱいに広がる幅 */
    margin-top: 10px; /* 上部のマージンを10pxに設定 */
    padding: 12px; /* ボタンに余白を追加 */
    background-color: #fabe65; /* 濃い背景色 */
    color: #fff; /* 白いテキスト色 */
    border: none; /* 境界線をなしに設定 */
    border-radius: 4px; /* 角丸を4pxに設定 */
    font-size: 16px; /* フォントサイズ */
    cursor: pointer; /* ポインターを指定 */
    transition: background-color 0.3s ease; /* 背景色の変化をアニメーション化 */
    margin-left: auto; /* 右寄せ */
    margin-right: auto; /* 左寄せ */
    display: block; /* ブロックレベル要素として表示 */
  }

  /* ホバー時のボタンのスタイル */
  .add-transaction-form button:hover {
    background-color: rgb(185, 179, 116); /* ホバー時のより濃い背景色 */
  }
</style>
