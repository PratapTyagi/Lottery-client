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

  const onSubmit = async (e) => {
    e.preventDefault();
  };

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
      <div className="app__bottom">
        <form onSubmit={onSubmit}>
          <h3>Try your luck !</h3>
          <div>
            <p>Amount of ether</p>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button type="submit">Enter</button>
        </form>
        <div className="app__bottom__right">
          <p>Loading</p>
        </div>
      </div>
    </div>
  );
}

export default App;
