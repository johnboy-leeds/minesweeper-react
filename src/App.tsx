import React, { useState } from "react";
import "./App.scss";
import Game from "./components/Game";
import Menu from "./components/Menu";
import { Difficulty } from "./interfaces";

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>();
  return (
    <div className="App">
      {difficulty ? (
        <Game
          difficulty={difficulty}
          onChangeDifficulty={() => setDifficulty(undefined)}
        />
      ) : (
        <Menu onSelectDifficulty={setDifficulty} />
      )}
    </div>
  );
};

export default App;
