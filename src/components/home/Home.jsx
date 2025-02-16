import Navbar from "../navBar/NavBar";
import Hero from "../home/Hero"
import Gallery from "../home/Gallery"
import Categories from "../home/Categories"
import Testimoneal from "../home/Testimoneal"
import Statistic from "../home/Statistic"
import Features from "../home/Features"
import NewRentals from "../home/NewRentals";
import "./home.css";
import Footer from "../footer/Footer";

export default function Home() {

  return (
    <div>
      <Navbar />
      <Hero />
      <NewRentals />
      <Statistic />
      <Categories />
      <Features />
      <Gallery />
      <Testimoneal />
      <Footer />
    </div>


  );
}

