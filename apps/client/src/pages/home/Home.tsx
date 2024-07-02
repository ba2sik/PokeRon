import { useState } from "react";
import "./Home.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1> PokéRon</h1>
      <div className="card">
        <button type="button" onClick={() => setCount(() => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default Home;
