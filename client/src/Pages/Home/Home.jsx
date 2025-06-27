import Boy from '../All-Banner/Boy';
import Girls from '../All-Banner/Girls';
import Women from '../All-Banner/Women';
import Banner from './Banner';
import ProductCard from './ProductCard';

const Home = () => {
  return (
    <div>
      <Banner />
      <ProductCard />
      <Women></Women>
      <ProductCard />
      <Boy></Boy>
      <ProductCard />
      <Girls></Girls>
      <ProductCard />
    </div>
  );
};

export default Home;