"use client";

import React from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const VigenereCipher = () => {
  const [displayValue, setDisplayValue] = React.useState("");
  const [value, setValue] = React.useState("");
  const [key, setKey] = React.useState("");
  const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻQVX";

  const normalizeText = (text: string) => {
    return text.toUpperCase().replace(/[^A-ZĄĆĘŁŃÓŚŹŻ]/g, "");
  };

  const getChar = (index: number) => alphabet[index];
  const getIndex = (char: string) => alphabet.indexOf(char);

  const generateFullKey = (text: string, key: string) => {
    let fullKey = key;
    while (fullKey.length < text.length) {
      fullKey += key;
    }
    return fullKey.slice(0, text.length);
  };

  const encrypt = () => {
    const normalizedText = normalizeText(value);
    const normalizedKey = normalizeText(key);
    if (!normalizedKey) return;

    const fullKey = generateFullKey(normalizedText, normalizedKey);
    let result = "";

    for (let i = 0; i < normalizedText.length; i++) {
      const textChar = normalizedText[i];
      const keyChar = fullKey[i];
      const textIndex = getIndex(textChar);
      const keyIndex = getIndex(keyChar);

      if (textIndex === -1) continue;

      const newIndex = (textIndex + keyIndex) % alphabet.length;
      result += getChar(newIndex);
    }

    setDisplayValue(result);
  };

  const decrypt = () => {
    const normalizedText = normalizeText(value);
    const normalizedKey = normalizeText(key);
    if (!normalizedKey) return;

    const fullKey = generateFullKey(normalizedText, normalizedKey);
    let result = "";

    for (let i = 0; i < normalizedText.length; i++) {
      const textChar = normalizedText[i];
      const keyChar = fullKey[i];
      const textIndex = getIndex(textChar);
      const keyIndex = getIndex(keyChar);

      if (textIndex === -1) continue;

      let newIndex = textIndex - keyIndex;
      if (newIndex < 0) newIndex += alphabet.length;
      result += getChar(newIndex);
    }

    setDisplayValue(result);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Textarea
          placeholder="Wpisz tekst..."
          className="col-span-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Klucz"
            value={key}
            onChange={(e) => setKey(e.target.value)}
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

export default VigenereCipher;
