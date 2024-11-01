"use client";

import React from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CaesarCipher = () => {
  const [displayValue, setDisplayValue] = React.useState("");
  const [value, setValue] = React.useState("");
  const [shift, setShift] = React.useState(3);
  const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻQVX";

  const encrypt = () => {
    let result = "";
    let filteredValue = "";

    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      if (alphabet.includes(char.toUpperCase())) {
        filteredValue += char;
      }
    }

    for (let i = 0; i < filteredValue.length; i++) {
      const char = filteredValue[i];
      const index = alphabet.indexOf(char.toUpperCase());
      let shiftedIndex = (index + shift) % alphabet.length;
      if (shiftedIndex < 0) {
        shiftedIndex = alphabet.length + shiftedIndex;
      }
      const shiftedChar = alphabet[shiftedIndex];
      result += shiftedChar;
    }

    setDisplayValue(result);
  };

  const decrypt = () => {
    let result = "";
    let filteredValue = "";

    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      if (alphabet.includes(char.toUpperCase())) {
        filteredValue += char;
      }
    }

    for (let i = 0; i < filteredValue.length; i++) {
      const char = filteredValue[i];
      const index = alphabet.indexOf(char.toUpperCase());
      let shiftedIndex = (index - shift) % alphabet.length;
      if (shiftedIndex < 0) {
        shiftedIndex = alphabet.length + shiftedIndex;
      }
      const shiftedChar = alphabet[shiftedIndex];
      result += shiftedChar;
    }

    setDisplayValue(result);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Textarea
          placeholder="Wpisz wartość..."
          className="col-span-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="space-y-2">
          <Input
            placeholder="Przesunięcie..."
            type="number"
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
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

export default CaesarCipher;
