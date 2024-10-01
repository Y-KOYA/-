import { mount } from '@vue/test-utils';
import RecoredExpense from '@/components/RecoredExpense.vue';

describe('RecoredExpense.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(RecoredExpense);
    expect(wrapper.text()).toContain('どんなことにお金をつかいましたか？');
  });

  it('adds new expense correctly', async () => {
    const wrapper = mount(RecoredExpense);

    // 入力フィールドを設定
    const valueofmoneyInput = wrapper.find('input[type="number"]');
    const dateInput = wrapper.find('input[type="date"]');
    const commentInput = wrapper.find('input[type="text"]');
    await valueofmoneyInput.setValue('100');
    await dateInput.setValue('2024-06-10');
    await commentInput.setValue('Origami');

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

  it('clears the form after adding new expense', async () => {
    const wrapper = mount(RecoredExpense);

    // 入力フィールドを設定
    const valueofmoneyInput = wrapper.find('input[type="number"]');
    const dateInput = wrapper.find('input[type="date"]');
    const commentInput = wrapper.find('input[type="text"]');
    await valueofmoneyInput.setValue('100');
    await dateInput.setValue('2024-06-10');
    await commentInput.setValue('Origami');

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent');

    // フォームがクリアされていることを確認
    expect((valueofmoneyInput.element as HTMLInputElement).value).toBe('');
    expect((dateInput.element as HTMLInputElement).value).toBe('');
    expect((commentInput.element as HTMLInputElement).value).toBe('');
  });
});
