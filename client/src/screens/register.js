import Header from '../components/header';
import Footer from '../components/footer';
import RegisterForm from '../components/registerForm';

function Register(navigation, role) {
  //console.log(role);
  return (
    <div className="Register">
      <Header navigation={navigation} />
      <RegisterForm role={navigation.role} />
      <Footer navigation={navigation} />
    </div>
  );
}

export default Register;
