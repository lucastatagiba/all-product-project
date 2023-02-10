import { useUserContext } from 'src/context';
import { apiWithAuth } from 'src/services';
import { IAuthState } from 'src/utils/storage';

const Login = () => {
  const { handleLogin } = useUserContext();

  const submitLogin = async () => {
    try {
      const { data } = await apiWithAuth.post<IAuthState>('/auth/login', {
        email: 'bruno@email.com',
        password: 'bruno',
      });

      handleLogin(data);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={submitLogin}>Login</button>
    </div>
  );
};

export default Login;
