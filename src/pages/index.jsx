import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import LinearIndeterminate from "./loader";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://api.openai.com/v1/completions";

const OpenAIChat = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
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
      setResponse(result.data.choices[0].text);
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  console.log("RESpone", response);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Grid
        item
        lg={12}
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" fontFamily="Anton" sx={{ padding: "20px" }}>
          CHAT <span style={{ color: "red" }}>TEST</span>
        </Typography>
        <Typography variant="h5" fontFamily="Anton" color="#B4B4B4">
          @thoni
        </Typography>
      </Grid>
      <Grid
        item
        lg={6}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          item
          lg={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <TextField
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            fullWidth
            placeholder="Preguntale al chat..."
          />
          <hr></hr>
          <Button
            type="buttonr"
            variant="contained"
            fullWidth
            onClick={() => handleSubmit()}
          >
            <Typography variant="h4" fontFamily="Cabin">
              Enviar
            </Typography>
          </Button>
        </Grid>
        <Grid
          item
          lg={12}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "start",
          }}
        >
          <Typography
            variant="h4"
            fontFamily="monospace"
            sx={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              wordWrap: "break-word",
              padding: "30px",
            }}
          >
            {inputValue === "" ? "Preguntale al chat de AI..." : inputValue}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        lg={6}
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F2EBE8",
          borderRadius: "10px",
        }}
      >
        {response === "" ? (
          <LinearIndeterminate />
        ) : (
          <Typography
            fontFamily="monospace"
            variant="h4"
            sx={{ padding: "20px" }}
          >
            {response}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default OpenAIChat;
