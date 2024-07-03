import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import FlashcardContext from "../FlashcardContext";

export default function Header() {
  const categoryEl = useRef();
  const amountEl = useRef();
  const [categories, setCategories] = useState([]);
  const { setFlashcards } = useContext(FlashcardContext);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
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
  }

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => setCategories(res.data.trivia_categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []); // Added dependency array to run once

  return (
    <div>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn" onClick={handleSubmit}>
            Generate
          </button>
        </div>
      </form>
    </div>
  );
}
