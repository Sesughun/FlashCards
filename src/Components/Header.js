import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Header() {
  const categoryEl = useRef();
  const amountEl = useRef();
  const [categories, setCategories] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
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
      </form>
    </div>
  );
}
