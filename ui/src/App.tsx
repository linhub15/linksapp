import { useState } from "react";
import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-xl">LinksApp</h1>
      {count}
      <button onClick={() => setCount((o) => o + 1)} type="button">
        click
      </button>
    </div>
  );
}
