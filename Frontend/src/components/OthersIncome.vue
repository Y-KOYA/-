
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'OthersIncome',
    emits: ['add-transaction'],
    setup(props, { emit }) {
      const newTransactionDate = ref<string>('');
      const newTransactionValue = ref<number | null>(null);
      const newTransactionCategory = ref<string>('だれかのためにつかいます');
      const newTransactionComment = ref<string>('');
  
      const handleSubmit = () => {
        if (!newTransactionDate.value || !newTransactionValue.value || !newTransactionCategory.value) {
          return;
        }
  
        const newTransaction = {
          TransferDate: newTransactionDate.value,
          ValueofMoney: newTransactionValue.value,
          MoneyCategory: 'だれかのためにつかいます',
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
  .add-transaction-form {
    margin-bottom: 20px;
    padding: 20px; /* Add padding to create space inside the form */
    border-radius: 8px; /* Rounded corners */
    background-color: #f0f0f0; /* Light background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }

  .add-transaction-form label {
    display: block;
    margin-bottom: 10px;
  }

  .add-transaction-form input {
    width: calc(100% - 22px); /* Adjusted width to accommodate margins */
    margin-left: 10px;
    padding: 10px; /* Add padding inside input fields */
    border: 1px solid #ccc; /* Light border */
    border-radius: 4px; /* Rounded corners */
    font-size: 16px; /* Increased font size */
    box-sizing: border-box; /* Include padding and border in width calculation */
  }

  .add-transaction-form button {
    display: block;
    width: 80%; /* Button width spans full width of parent */
    margin-top: 10px;
    padding: 12px; /* Add padding to the button */
    background-color: #fabe65; /* Dark background color */
    color: #fff; /* White text color */
    border: none;
    border-radius: 4px; /* Rounded corners */
    font-size: 16px; /* Font size */
    cursor: pointer;
    transition: background-color 0.3s ease;
     /* Center align button */
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  .add-transaction-form button:hover {
    background-color: rgb(185, 179, 116); /* Darker background on hover */
  }
</style>
