import { mount } from '@vue/test-utils';
import OthersMoneyList from '../src/components/OthersMoneyList.vue';


describe('OthersMoneyList.vue', () => {
  it('renders correctly and calculates the remaining balance', async () => {
    const wrapper = mount(OthersMoneyList);

    // Fetch transactions (this will set the mock transactions)
    await wrapper.vm.fetchTransactions();

    // Check if the remaining balance is calculated correctly
    expect(wrapper.find('h2').text()).toContain('のこりのおかね: -200円');

    // Check if the transactions are rendered correctly
    const transactionItems = wrapper.findAll('.transaction-item');
    expect(transactionItems.length).toBe(2); // Two transactions for the current month and "だれか" category

    // Check if the first transaction details are correct
    const firstTransactionSummary = transactionItems[0].find('.transaction-summary').text();
    expect(firstTransactionSummary).toContain('6月1日');
    expect(firstTransactionSummary).toContain('200円');
  });

  it('toggles transaction details', async () => {
    const wrapper = mount(OthersMoneyList);
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
