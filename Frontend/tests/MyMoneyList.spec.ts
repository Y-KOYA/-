// tests/unit/MoneyList.spec.ts
import { mount } from '@vue/test-utils';
import MyMoneyList from '../src/components/MyMoneyList.vue';

describe('MyMoneyList.vue', () => {
  it('renders correctly', async () => {
    const wrapper = mount(MyMoneyList);
    
    // Fetch transactions (this will set the mock transactions)
    await wrapper.vm.fetchTransactions();

    // Check if the remaining balance is calculated correctly
    expect(wrapper.find('h2').text()).toContain('のこりのおかね: 350円');

    // Check if the transactions are rendered correctly
    const transactionItems = wrapper.findAll('.transaction-item');
    expect(transactionItems.length).toBe(3); // Three transactions for the current month and "自分" category

    // Check if the first transaction details are correct
    const firstTransactionSummary = transactionItems[0].find('.transaction-summary').text();
    expect(firstTransactionSummary).toContain('6月1日');
    expect(firstTransactionSummary).toContain('600円');
  });

  it('toggles transaction details', async () => {
    const wrapper = mount(MyMoneyList);
    await wrapper.vm.fetchTransactions();

    // Find the first transaction item and its summary
    const firstTransactionItem = wrapper.findAll('.transaction-item')[0];
    const firstTransactionSummary = firstTransactionItem.find('.transaction-summary');

    // Initially, details should not be visible
    expect(firstTransactionItem.find('.transaction-details').exists()).toBe(false);

    // Click to toggle details
    await firstTransactionSummary.trigger('click');
    expect(firstTransactionItem.find('.transaction-details').exists()).toBe(true);

    // Click again to hide details
    await firstTransactionSummary.trigger('click');
    expect(firstTransactionItem.find('.transaction-details').exists()).toBe(false);
  });
});
