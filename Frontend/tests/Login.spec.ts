import { mount } from '@vue/test-utils';
import Login from '@/components/Login.vue';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import router from '../src/router'

// TextDecoderとTextEncoderを定義
global.TextDecoder = global.TextDecoder || require('util').TextDecoder;
global.TextEncoder = global.TextEncoder || require('util').TextEncoder;

jest.mock('firebase/auth');
jest.mock('axios');

describe('Login.vue', () => {
  it('renders correctly', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router]
      }
    });
    await router.isReady();

    expect(wrapper.text()).toContain('ログイン');
    expect(wrapper.html()).toContain('メールアドレス:');
    expect(wrapper.html()).toContain('パスワード:');
  });

  it('logs in correctly with valid credentials', async () => {
    const mockPush = jest.fn();
    router.push = mockPush;

    const wrapper = mount(Login, {
      global: {
        plugins: [router]
      }
    });
    await router.isReady();

    // モックされた関数の設定
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: {
        getIdToken: jest.fn().mockResolvedValue('test-token')
      }
    });
    (axios.post as jest.Mock).mockResolvedValue({});

    // フォームの入力値を設定
    await wrapper.find('input[type="email"]').setValue('test@test.com');
    await wrapper.find('input[type="password"]').setValue('password');

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent');

    // 非同期処理を待つ
    await new Promise(process.nextTick);

    // トークンが取得され、バックエンドに送信されたことを確認
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@test.com', 'password');
    expect(axios.post).toHaveBeenCalledWith('/api/verifyToken', { idToken: 'test-token' });

    // ルーティングが成功したことを確認
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('displays error message on login failure', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router]
      }
    });
    await router.isReady();

    // モックされた関数の設定
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('Login failed'));

    // フォームの入力値を設定
    await wrapper.find('input[type="email"]').setValue('test@test.com');
    await wrapper.find('input[type="password"]').setValue('password');

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent');

    // 非同期処理を待つ
    await new Promise(process.nextTick);

    // エラーメッセージが表示されることを確認
    expect(wrapper.text()).toContain('ログインに失敗しました');
  });
});
