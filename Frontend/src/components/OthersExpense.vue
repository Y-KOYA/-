
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'OthersExpense',
  emits: ['record-expense'],
  setup(props, { emit }) {
    const newExpenseDate = ref<string>('');
    const newExpenseValue = ref<number | null>(null);
    const newExpenseComment = ref<string>('');

    const handleSubmit = () => {
      if (!newExpenseDate.value || !newExpenseValue.value) {
        return;
      }

      const newExpense = {
        TransferDate: newExpenseDate.value,
        ValueofMoney: newExpenseValue.value*(-1),
        MoneyCategory: 'だれかのためにつかいました',
        Comment: newExpenseComment.value,
      };

      emit('record-expense', newExpense);

      // フォームをリセット
      newExpenseDate.value = '';
      newExpenseValue.value = null;
      newExpenseComment.value = '';
    };

    return {
      newExpenseDate,
      newExpenseValue,
      newExpenseComment,
      handleSubmit,
    };
  },
});
</script>

<template>
  <div class="record-expense-form">
    <h3>どんなことにお金をつかいましたか？</h3>
    <label>
      いつ:
      <input v-model="newExpenseDate" type="date" />
    </label>
    <label>
      いくら:
      <input v-model="newExpenseValue" type="number" />
    </label>
    <label>
      なにに？:
      <input v-model="newExpenseComment" type="text" />
    </label>
    <button @click="handleSubmit">つかいました</button>
  </div>
</template>


<style scoped>
  .record-expense-form {
    margin-bottom: 20px;
    padding: 20px; /* Add padding to create space inside the form */
    border-radius: 8px; /* Rounded corners */
    background-color: #f0f0f0; /* Light background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }

  .record-expense-form label {
    display: block;
    margin-bottom: 10px;
  }

  .record-expense-form input {
    width: calc(100% - 22px); /* Adjusted width to accommodate margins */
    margin-left: 10px;
    padding: 10px; /* Add padding inside input fields */
    border: 1px solid #ccc; /* Light border */
    border-radius: 4px; /* Rounded corners */
    font-size: 16px; /* Increased font size */
    box-sizing: border-box; /* Include padding and border in width calculation */
  }

  .record-expense-form button {
    display: block;
    width: 80%; /* Button width spans full width of parent */
    margin-top: 10px;
    padding: 12px; /* Add padding to the button */
    background-color: #6a6868; /* Dark background color */
    color: #fff; /* White text color */
    border: none;
    border-radius: 4px; /* Rounded corners */
    font-size: 16px; /* Font size */
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  .record-expense-form button:hover {
    background-color: #555; /* Darker background on hover */
  }
</style>