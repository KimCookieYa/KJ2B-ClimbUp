import logo from "./logo.svg";
import "./App.css";
import phaserGame from "./PhaserGame";
import HelloWorldScene from "./scenes/HelloWorldScene";
import axios from "axios";
import { useEffect } from "react";

const handleClick = () => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene;
  scene.createEmitter();
};

function App() {
  const callApi = async () => {
    axios
      .get("http://localhost:5000/api")
      .then((res) => console.log(res.data.test));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-button" onClick={handleClick}>
          Or click me
        </button>
      </header>
    </div>
  );
}

export default App;
