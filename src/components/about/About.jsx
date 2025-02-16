import { Navbar } from '../index.js';
import OurTeam from './OurTeam';
import Process from './Process';
import Hero from './Hero';
import Footer from "../footer/Footer";

function About() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Process /> */}
      <OurTeam />
      <Footer />
    </>
  );
}

export default About;