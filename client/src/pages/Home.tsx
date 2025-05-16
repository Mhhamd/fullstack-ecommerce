import BestSellers from '../components/Home/BestSellers';
import CollectionPromo from '../components/Home/CollectionPromo';
import Hero from '../components/Home/Hero';
import NewArrivals from '../components/Home/NewArrivals';
import NewsLetter from '../components/Home/NewsLetter';
import QuoteCards from '../components/Home/QuoteCards';
import TopCategory from '../components/Home/TopCategory';

function Home() {
    return (
        <div>
            <Hero />
            <TopCategory />
            <BestSellers />
            <QuoteCards />
            <CollectionPromo />
            <NewArrivals />
            <NewsLetter />
        </div>
    );
}

export default Home;
