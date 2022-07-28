import styled from "@emotion/styled";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import icon from "../assets/weatherapp.png";
import { useNavigate } from "react-router-dom";

const WeatherAppIcon = styled("img")({
  width: "120px",
  height: "120px",
  margin: "40px auto",
});

export const FormText = {
  helperText: "都市を入力してください",
  placeholder: "都市を入力",
};

/**
 * InputCityコンポーネント.
 * 検索する都市名をを入力する.
 */
export const InputCity: React.FC = () => {
  const [city, setCity] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 都市が入力されている場合、エラーとしない
    if (city) setHasError(false);
  }, [city]);

  const navigate = useNavigate();
  const handleOnClick = () => {
    if (city) {
      // 都市が入力されている場合、遷移する
      navigate(`/weather/${city}`);
    } else {
      // 都市が入力されていない場合、エラーとする
      setHasError(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "80px 10px",
        alignItems: "center",
      }}
    >
      <div>weather app</div>
      <WeatherAppIcon src={icon} />
      <TextField
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder={FormText.placeholder}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleOnClick();
          }
        }}
        error={hasError}
        helperText={hasError && FormText.helperText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleOnClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </Box>
  );
};

export default InputCity;
