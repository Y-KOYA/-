<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { auth } from '../firebase';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      // const allowedEmail = 'test@etest.com'; // 許可されたメールアドレス
      // const allowedPassword = 'password'; // 許可されたパスワード
      const router = useRouter();

      const login = async () => {
        try {

        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const idToken = await userCredential.user.getIdToken();
        console.log('Token:', idToken);  // トークンを取得してコンソールに出力
        // ここでトークンをローカルストレージに保存するなどの処理が可能
        localStorage.setItem('authToken', idToken);
        router.push('/money'); // ログイン成功でリダイレクト
        } catch (error) {
          errorMessage.value = 'ログインに失敗しました';
        }
      };
      return {
        email,
        password,
        login,
        errorMessage,
      };
    },
  });
</script>

<template>
  <div>
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <div>
        <label>
          メールアドレス:<br>
          <input v-model="email" type="email" required />
        </label>
      </div>
      <div>
        <label>
          パスワード:<br>
          <input v-model="password" type="password" required />
        </label>
      </div>
      <button type="submit">ログイン</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>
  
<style scoped>
  .error {
    color: red;
  }
</style>
