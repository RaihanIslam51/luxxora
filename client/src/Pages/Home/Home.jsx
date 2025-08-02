import Boy from '../All-Banner/Boy';
import Girls from '../All-Banner/Girls';
import Women from '../All-Banner/Women';
import ViewAllE from '../Eyewear/ViewAll/ViewAllE';
import ViewAllK from '../Kids/View-All/ViewAllK';
import ViewAllMC from '../Men/Clothing/ViewAllMC';
import ViewAllWC from '../Women/Clothing/ViewAllWC';
import Banner from './Banner';


const Home = () => {
  return (
    <div>
      <Banner />
      <ViewAllMC></ViewAllMC>
      <Women></Women>
    <ViewAllWC></ViewAllWC>
      <Boy></Boy>
      <ViewAllK></ViewAllK>
      <Girls></Girls>
      <ViewAllE></ViewAllE>
    </div>
  );
};

export default Home;