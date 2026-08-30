import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Courses from "./sections/Courses";
import WhyChooseUs from "./sections/WhyChooseUs";
import EnquiryForm from "./sections/EnquiryForm";
import Interactive3D from "./sections/Interactive3D";
import LearningJourney from "./sections/LearningJourney";
import Testimonials from "./sections/Testimonials";
import CTA from "./sections/CTA";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <WhyChooseUs />
        <Interactive3D />
        <LearningJourney />
        <Testimonials />
        <CTA />
        <EnquiryForm />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </>
  );
}

export default App;
