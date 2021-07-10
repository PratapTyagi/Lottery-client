import { useEffect, useState } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery.js";

function App() {
  const [manager, setManager] = useState("");
  useEffect(() => {
    const getManager = async () => await lottery.methods.manager().call();
    getManager().then((data) => setManager(data));
  }, []);
  return (
    <div className="App">
      <h1>Manager: {manager}</h1>
    </div>
  );
}

export default App;
