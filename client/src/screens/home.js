import Header from '../components/header';
import Footer from '../components/footer';


function Home({navigation}) {
    return (
      <div className="Home">
        <Header navigation={navigation}/>
        <div>
            Hello world
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default Home;