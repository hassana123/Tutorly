import "./home.css";
import image from "../../assets/rand1.jpg";
import image1 from "../../assets/random2.jpg";
const Home = () => {
  return (
    <main className="home">
      <section className="md:flex justify-center gap-5 items-center w-[80%] mx-auto ">
        <div>
          <h1 className="text-5xl mb-6">
            Looking for your perfect peer tutor?{" "}
          </h1>
          <p className="text-2xl mb-10">
            Lorem ipsum dolor sit amet adipisicing. Dignissimos quasi magni quae
            ass lorem10 ipsum nam.
          </p>
          <a className="bg-[#e35f50] text-white py-5 px-10 rounded-xl" href="#">
            Find A Tutor
          </a>
        </div>
        <div>
          <img
            className="blobi md:my-0 my-20"
            src={image}
            alt="image of a balck girl holding books"
          />
        </div>
      </section>

      <section className="how-it-works">
        <div>
          <img src={image1} alt="an image of an ongoing tutorial" />
        </div>
        <div>
          <h1>How it Works?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            eum aliquid obcaecati. Assumenda odit explicabo quidem error
            similique harum enim! Cumque exercitationem volugnam.
          </p>
          <a href="#">Become a Tutor</a>
        </div>
      </section>
      <section className="reviews-section"></section>
    </main>
  );
};

export default Home;
