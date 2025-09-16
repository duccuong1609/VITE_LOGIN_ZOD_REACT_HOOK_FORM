import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <title>Home</title>
      <div>
        <Link to="/dashboard">
          <button className="text-white">Dashboard</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
