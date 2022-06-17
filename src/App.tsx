import React, { useState } from 'react';
import './App.scss';
import Game from './components/Game';
import Instructions from './components/Instructions';
import DifficultySelect from './components/DifficultySelect';
import { Difficulty } from './interfaces';

enum View {
    INSTRUCTIONS,
    DIFFICULTY_SELECT,
    GAME,
}

/* istanbul ignore file */
const App: React.FC = () => {
    const [view, setView] = useState<View>(View.INSTRUCTIONS);
    const [difficulty, setDifficulty] = useState<Difficulty>();

    const showDifficultySelect = () => {
        setDifficulty(undefined);
        setView(View.DIFFICULTY_SELECT);
    };

    const startGame = (chosenDifficulty: Difficulty) => {
        setDifficulty(chosenDifficulty);
        setView(View.GAME);
    };

    const showInstructions = () => {
        setDifficulty(undefined);
        setView(View.INSTRUCTIONS);
    };

    return (
        <div className="App">
            {
                {
                    [View.INSTRUCTIONS]: (
                        <Instructions onStart={showDifficultySelect} />
                    ),
                    [View.DIFFICULTY_SELECT]: (
                        <DifficultySelect
                            onSelectDifficulty={startGame}
                            onShowInstructions={showInstructions}
                        />
                    ),
                    [View.GAME]: (
                        <Game
                            difficulty={difficulty!}
                            onChangeDifficulty={showDifficultySelect}
                        />
                    ),
                }[view]
            }
        </div>
    );
};

export default App;
