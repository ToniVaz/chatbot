import React, { useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://api.openai.com/v1/completions";

const OpenAIChat = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        API_URL,
        {
          model: "text-davinci-003",
          prompt: inputValue,
          temperature: 0.5,
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setInputValue("");
      setResponse(result.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
      <p>{inputValue}</p>
      <p>{response}</p>
    </div>
  );
};

export default OpenAIChat;
