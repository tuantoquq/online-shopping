import Header from '../../components/header';
import Footer from '../../components/footer';
import LoginForm from '../../components/loginForm';


function Login({navigation}) {
    return (
      <div className="Login">
        <Header navigation={navigation}/>
        <LoginForm />
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default Login;