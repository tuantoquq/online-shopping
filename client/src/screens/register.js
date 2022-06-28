import Header from '../components/header';
import Footer from '../components/footer';
import RegisterForm from '../components/registerForm';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Navigate } from 'react-router-dom';

function Register(navigation, role) {
  //console.log(role);
  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  if (accessToken) {
    if (RoleService.getLocalRole() === 'customer') {
      return <Navigate to="/"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'shopper') {
      return <Navigate to="/shopper/accept-order"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'admin') {
      return <Navigate to="/admin"></Navigate>;
    }
  } else {
    return (
      <div className="Register">
        <Header navigation={navigation} />
        <RegisterForm role={navigation.role} />
        <Footer navigation={navigation} />
      </div>
    );
  }
}
export default Register;
