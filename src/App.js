import "./App.css";
import { useState } from "react";
import FlashcardList from "./Components/FlashcardList";

function App() {
  const [flashcards, setFlashcards] = useState(sample);
  return (
    <div className="App">
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
