// import Boy from '../All-Banner/Boy';
// import Women from '../All-Banner/Women';
import ViewAllK from '../Kids/View-All/ViewAllK';
import ViewAllM from '../Men/View-All/ViewAllM';
import ViewAllW from '../Women/View-All/ViewAllW';
import Banner from './Banner';
import LatestProduct from './LatestProduct/LatestProduct';



const Home = () => {
  return (
    <div>
      <Banner />
      <LatestProduct></LatestProduct>
     
        <ViewAllM></ViewAllM>
      
      {/* <Women></Women> */}
    <ViewAllW></ViewAllW>
      {/* <Boy></Boy> */}
      <ViewAllK></ViewAllK>
    </div>
  );
};

export default Home;