import "./App.css";
import { useState, useEffect } from "react";
import FlashcardList from "./Components/FlashcardList";
import axios from "axios";
import Header from "./Components/Header";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: questionItem.correct_answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
      console.log(res.data);
    });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }
  return (
    <div className="container">
      <Header></Header>
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
