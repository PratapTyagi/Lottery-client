import { useEffect, useState } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery.js";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);

  useEffect(() => {
    const getManager = async () => await lottery.methods.manager().call();
    getManager().then((data) => setManager(data));
    const getPlayers = async () => await lottery.methods.getPlayers().call();
    getPlayers().then((data) => setPlayers(data));
    const getBalance = async () =>
      await web3.eth.getBalance(lottery.options.address);
    getBalance().then((data) => setBalance(web3.utils.fromWei(data, "ether")));
  }, [players, balance]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.requestAccounts();
    setLoader1(true);
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
    setLoader1(false);
  };

  const onClick = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.requestAccounts();
    setLoader2(true);
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setLoader2(false);
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
          {loader1 ? (
            <p className="loading"></p>
          ) : (
            <button type="submit">Enter</button>
          )}
        </form>
        <div className="app__bottom__right">
          <div>
            <p>Ready to pick winner?</p>
            {loader2 ? (
              <p className="loading"></p>
            ) : (
              <button onClick={onClick}>Pick Winner</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
