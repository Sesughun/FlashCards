import "./App.css";
import { useState, useContext } from "react";
import FlashcardList from "./Components/FlashcardList";
import Header from "./Components/Header";
import FlashcardContext from "./FlashcardContext";

function App() {
  const [flashcards, setFlashcards] = useState([]);

  return (
    <div className="container">
      <FlashcardContext.Provider value={{ setFlashcards }}>
        <Header></Header>
      </FlashcardContext.Provider>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

const sample = [
  {
    id: 1,
    question: " Value of 2+2",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: " Value of 3+2",
    answer: "5",
    options: ["2", "3", "4", "5"],
  },
];
export default App;
