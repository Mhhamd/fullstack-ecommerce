import BestSellers from '../components/BestSellers';
import CollectionPromo from '../components/CollectionPromo';
import Hero from '../components/Hero';
import NewArrivals from '../components/NewArrivals';
import NewsLetter from '../components/NewsLetter';
import QuoteCards from '../components/QuoteCards';
import TopCategory from '../components/TopCategory';

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
