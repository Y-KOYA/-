<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Money } from '../types/types';
import { mockTransactions } from '../data/mockData';
import OthersIncome from './OthersIncome.vue';
import OthersExpense from './OthersExpense.vue';

export default defineComponent({
  name: 'OthersMoneyList',
  components: {
    OthersIncome,
    OthersExpense
  },
  setup() {
    const transactions = ref<Money[]>([]);
    const remainingBalance = ref<number>(0);
    const monthlyExpenses = ref<Money[]>([]);

    const fetchTransactions = async () => {
      try {
        transactions.value = mockTransactions.map(transaction => ({
          ...transaction,
          showDetails: false
        }));
        calculateRemainingBalance();
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const calculateRemainingBalance = () => {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      monthlyExpenses.value = transactions.value.filter(transaction => {
        const transactionDate = new Date(transaction.TransferDate);
        return (
          transactionDate.getMonth() + 1 === currentMonth &&
          transactionDate.getFullYear() === currentYear &&
          (transaction.MoneyCategory === 'だれかのためにつかいます' ||
          transaction.MoneyCategory === 'だれかのためにつかいました')
        );
      });

      const totalSelfIncome = monthlyExpenses.value.reduce((sum: number, transaction: Money) => {
        return transaction.MoneyCategory === 'だれかのためにつかいます'
          ? sum + transaction.ValueofMoney
          : sum;
      }, 0);

      const totalSelfExpense = monthlyExpenses.value.reduce((sum: number, transaction: Money) => {
        return transaction.MoneyCategory === 'だれかのためにつかいました'
          ? sum + transaction.ValueofMoney
          : sum;
      }, 0);

      remainingBalance.value = totalSelfIncome + totalSelfExpense;
    };

    const toggleDetails = (transactionId: number) => {
      const transaction = transactions.value.find(t => t.ID === transactionId);
      if (transaction) {
        transaction.showDetails = !transaction.showDetails;
      }
    };

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日`;
    };

    const addTransaction = (newTransaction: Omit<Money, 'ID'>) => {
      const newTransactionWithId: Money = {
        ...newTransaction,
        ID: transactions.value.length + 1,
        showDetails: false
      };

      transactions.value.push(newTransactionWithId);
      calculateRemainingBalance();
    };

    const recordExpense = (newExpense: Omit<Money, 'ID'>) => {
      const newExpenseWithId: Money = {
        ...newExpense,
        ID: transactions.value.length + 1,
        showDetails: false
      };

      transactions.value.push(newExpenseWithId);
      calculateRemainingBalance();
    };

    onMounted(() => {
      fetchTransactions();
    });

    return {
      monthlyExpenses,
      remainingBalance,
      toggleDetails,
      formatDate,
      fetchTransactions,
      addTransaction,
      recordExpense
    };
  }
});
</script>

<template>
  <div>
    <OthersIncome @add-transaction="addTransaction" />
    <h2 style="text-align: center; font-weight: bold; background-color: lightcoral; padding: 10px; border-radius: 5px;">
      のこり: {{ remainingBalance }}円</h2>
    <ul class="transaction-list">
      <li v-for="transaction in monthlyExpenses" :key="transaction.ID" class="transaction-item">
        <div class="transaction-summary" @click="toggleDetails(transaction.ID)">
          <span>{{ formatDate(transaction.TransferDate) }}</span>
          <span>{{ transaction.ValueofMoney }}円</span>
        </div>
        <div v-if="transaction.showDetails" class="transaction-details">
          <p>{{ transaction.MoneyCategory }}</p>
          <p>{{ transaction.Comment }}</p>
        </div>
      </li>
    </ul>
    <OthersExpense @record-expense="recordExpense" />
  </div>
</template>


<style scoped>
.deposit-money-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* コンテナが全体の高さを占めるように */
}

.remaining-balance {
  text-align: center;
  font-weight: bold;
  background-color: lightcoral;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px; /* スペースを追加 */
}


.transaction-list {
  flex: 1; /* 取引リストが残りの空間を取るように */
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 10px; /* スペースを追加 */
}

.transaction-item {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.transaction-summary {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.transaction-details {
  margin-top: 10px;
}

/* DepositExpense コンポーネントのスタイル */
.DepositExpense {
  align-self: flex-end; /* コンポーネントをコンテナの下部に配置 */
}
</style>