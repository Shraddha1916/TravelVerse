import DestinationCards from "../components/Destinations";
import { Link } from "react-router-dom";
import "./Destinations.css";

function Destinations() {
  return (
    <section className="destinations-page">
      <h1>All Destinations</h1>
      <p>
  Explore the best travel destinations from India and around the world.
</p>
<Link to="/">
  <button className="back-btn">← Back to Home</button>
</Link>
    <DestinationCards showTitle={false} />
    </section>
  );
}

export default Destinations;