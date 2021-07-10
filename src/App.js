import { useEffect, useState } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery.js";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    const getManager = async () => await lottery.methods.manager().call();
    getManager().then((data) => setManager(data));
    const getPlayers = async () => await lottery.methods.getPlayers().call();
    getPlayers().then((data) => setPlayers(data));
    const getBalance = async () =>
      await web3.eth.getBalance(lottery.options.address);
    getBalance().then((data) => setBalance(data));
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Lottery App</h1>
      </header>
      <div className="app__top">
        <h4>
          Manager:
          <p>{manager}</p>
        </h4>
        <h4>
          No. of players: <br /> {players.length}
        </h4>
        <h4>
          Winning prize: <br /> {balance} ether
        </h4>
      </div>
    </div>
  );
}

export default App;
