"use client";

import React from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const PlayfairCipher = () => {
  const [displayValue, setDisplayValue] = React.useState("");
  const [value, setValue] = React.useState("");
  const [key, setShift] = React.useState("KLUCZ");

  const generateKeyMatrix = (key: string) => {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    const matrix: string[] = [];
    const usedChars = new Set();

    for (let char of key.toUpperCase()) {
      if (char === "J") char = "I";
      if (!usedChars.has(char)) {
        usedChars.add(char);
        matrix.push(char);
      }
    }

    for (const char of alphabet) {
      if (!usedChars.has(char)) {
        usedChars.add(char);
        matrix.push(char);
      }
    }

    return Array.from({ length: 5 }, (_, i) =>
      matrix.slice(i * 5, (i + 1) * 5)
    );
  };

  const findPosition = (matrix: string[][], letter: string) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (matrix[i][j] === letter) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  };

  const encrypt = () => {
    let text = value
      .toUpperCase()
      .replace(/J/g, "I")
      .replace(/[^A-Z]/g, "");
    const keyMatrix = generateKeyMatrix(key);
    let result = "";

    for (let i = 0; i < text.length; i += 2) {
      if (i === text.length - 1) {
        text += "X";
      } else if (text[i] === text[i + 1]) {
        text = text.slice(0, i + 1) + "X" + text.slice(i + 1);
      }
    }

    for (let i = 0; i < text.length; i += 2) {
      const [row1, col1] = findPosition(keyMatrix, text[i]);
      const [row2, col2] = findPosition(keyMatrix, text[i + 1]);

      if (row1 === row2) {
        result +=
          keyMatrix[row1][(col1 + 1) % 5] + keyMatrix[row2][(col2 + 1) % 5];
      } else if (col1 === col2) {
        result +=
          keyMatrix[(row1 + 1) % 5][col1] + keyMatrix[(row2 + 1) % 5][col2];
      } else {
        result += keyMatrix[row1][col2] + keyMatrix[row2][col1];
      }
    }

    setDisplayValue(result);
  };

  const decrypt = () => {
    const text = value
      .toUpperCase()
      .replace(/J/g, "I")
      .replace(/[^A-Z]/g, "");
    const keyMatrix = generateKeyMatrix(key);
    let result = "";

    for (let i = 0; i < text.length; i += 2) {
      const [row1, col1] = findPosition(keyMatrix, text[i]);
      const [row2, col2] = findPosition(keyMatrix, text[i + 1]);

      if (row1 === row2) {
        result +=
          keyMatrix[row1][(col1 + 4) % 5] + keyMatrix[row2][(col2 + 4) % 5];
      } else if (col1 === col2) {
        result +=
          keyMatrix[(row1 + 4) % 5][col1] + keyMatrix[(row2 + 4) % 5][col2];
      } else {
        result += keyMatrix[row1][col2] + keyMatrix[row2][col1];
      }
    }

    setDisplayValue(result);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Textarea
          placeholder="Wpisz tekst do zaszyfrowania..."
          className="col-span-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="space-y-2">
          <Input
            placeholder="Klucz..."
            type="text"
            value={key}
            onChange={(e) => setShift(e.target.value.toUpperCase())}
          />
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={decrypt} variant="secondary">
              Odszyfruj
            </Button>
            <Button onClick={encrypt}>Szyfruj</Button>
          </div>
        </div>
      </div>
      <h2 className="mt-8 text-xl font-bold">Wynik</h2>
      <p>{displayValue}</p>
    </div>
  );
};

export default PlayfairCipher;
