import { mount } from '@vue/test-utils';
import SpendingMoney from '@/components/SpendingMoney.vue';

describe('SpendingMoney.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(SpendingMoney);
    expect(wrapper.text()).toContain('おこづかいゲット');
  });

  it('adds new income correctly', async () => {
    const wrapper = mount(SpendingMoney);

    // 入力フィールドを設定
    const amountInput = wrapper.find('input[type="number"]');
    const dateInput = wrapper.find('input[type="date"]');
    const descriptionInput = wrapper.find('input[type="text"]');
    await amountInput.setValue('1000');
    await dateInput.setValue('2024-06-10');
    await descriptionInput.setValue('Salary');

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent');

    // 収入が追加されたことを確認
    const incomes = (wrapper.vm as any).incomes;
    expect(incomes.length).toBe(1);
    expect(incomes[0]).toEqual({
      id: expect.any(Number),
      amount: 1000,
      date: '2024-06-10',
      description: 'Salary'
    });
  });

  it('clears the form after adding new income', async () => {
    const wrapper = mount(SpendingMoney);

    // 入力フィールドを設定
    const amountInput = wrapper.find('input[type="number"]');
    const dateInput = wrapper.find('input[type="date"]');
    const descriptionInput = wrapper.find('input[type="text"]');
    await amountInput.setValue('1000');
    await dateInput.setValue('2024-06-10');
    await descriptionInput.setValue('Salary');

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent');

    // フォームがクリアされていることを確認
    expect((amountInput.element as HTMLInputElement).value).toBe('');
    expect((dateInput.element as HTMLInputElement).value).toBe('');
    expect((descriptionInput.element as HTMLInputElement).value).toBe('');
  });
});
