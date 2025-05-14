import BestSellers from '../components/BestSellers';
import Hero from '../components/Hero';
import TopCategory from '../components/TopCategory';

function Home() {
    return (
        <div>
            <Hero />
            <TopCategory />
            <BestSellers />
        </div>
    );
}

export default Home;
