import Header from '../components/header';
import Footer from '../components/footer';
import LoginForm from '../components/loginForm';

function Login(navigation, role) {
  //console.log(role);
  return (
    <div className="Login">
      <Header navigation={navigation} />
      <LoginForm role={navigation.role} />
      <Footer navigation={navigation} />
    </div>
  );
}

export default Login;
