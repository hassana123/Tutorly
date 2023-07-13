import "./home.css";
import image from "../../assets/rand1.jpg";
import image1 from "../../assets/random2.jpg";
const Home = () => {
  return (
    <main className="home">
      <section className="find-a-tutor">
        <div>
          <h1>Looking for your perfect peer tutor? </h1>
          <p>
            Lorem ipsum dolor sit amet adipisicing. Dignissimos quasi magni quae
            ass lorem10 ipsum nam.
          </p>
          <a className="btn-find-a-tutor" href="#">
            Find A Tutor
          </a>
        </div>
        <div>
          <img src={image} alt="image of a balck girl holding books" />
        </div>
      </section>
      <div className="blob one"></div>
      <div className="blob two"></div>
      <div className="blob three"></div>
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
    </main>
  );
};

export default Home;
