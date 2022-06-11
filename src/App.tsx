import React from "react";
import "./App.scss";
import Game from "./components/Game";

const App: React.FC = () => {
  return (
    <div className="App">
      <Game cols={6} rows={6} mines={4} />
    </div>
  );
};

export default App;
