"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const PolybiusCipher = () => {
  const [value, setValue] = useState("ŚCIŚLE TAJNE");
  const [displayValue, setDisplayValue] = useState("");
  const [keyword, setKeyword] = useState("ESTONIA");
  const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWXYZŻŹ,. ".split("");

  const createPolybiusSquare = () => {
    // Ustawienie unikalnych liter ze słowa-klucza
    const keywordSet = new Set(keyword.toUpperCase().split(""));

    // Obliczenie liczby wierszy (z dwoma dodatkowymi na rozwidlenie)
    const remainingLetters = alphabet.length - keywordSet.size;
    const numRows = Math.ceil(remainingLetters / 10) + 2;

    // utworzenie pustej szachownicy
    const table = Array(numRows)
      .fill(null)
      .map(() => Array(11).fill(""));

    // pierwszy wiersz z liczbami od 1 do 0 ale pierwsza kolumne zostawiamy pusta
    for (let i = 0; i < 10; i++) {
      table[0][i + 1] = (i + 1) % 10;
    }

    // Ustawienie słowa-klucza w drugim wierszu
    for (let i = 0; i < Math.min(keyword.length, 8); i++) {
      table[1][i + 1] = keyword[i].toUpperCase();
      keywordSet.add(keyword[i].toUpperCase());
    }

    // Znalezienie wolnych cyfr, które nie były przypisane w rozwidleniu
    const availableNumbers = [];
    for (let i = 1; i <= 9; i++) {
      if (!keywordSet.has(table[1][i])) {
        availableNumbers.push(i);
      }
    }
    availableNumbers.push(0); // Dodaj cyfrę 0 na końcu

    // Ustawienie cyfr w pierwszej kolumnie od trzeciego wiersza
    for (let row = 2; row < numRows; row++) {
      table[row][0] = availableNumbers[row - 2];
    }

    // Uzupełniamy szachownicę pozostałymi literami alfabetu, pomijając litery z klucza
    let alphabetIdx = 0;
    for (let row = 2; row < numRows; row++) {
      for (let col = 1; col < 11; col++) {
        // Pomijamy litery ze słowa-klucza
        while (keywordSet.has(alphabet[alphabetIdx])) {
          alphabetIdx++;
        }
        table[row][col] = alphabet[alphabetIdx++] || "";
      }
    }

    return table;
  };

  const encrypt = () => {
    const table = createPolybiusSquare();
    const keywordSet = new Set(keyword.toUpperCase().split(""));
    const coordinates = [];

    for (const char of value.toUpperCase()) {
      let found = false;
      if (keywordSet.has(char)) {
        // Jeśli litera jest w słowie-kluczu, użyj cyfry z pierwszego wiersza
        for (let j = 1; j < table[1].length; j++) {
          if (table[1][j] === char) {
            coordinates.push(`${table[0][j]}`);
            found = true;
            break;
          }
        }
      } else {
        // Dla pozostałych liter znajdź ich współrzędne w tabeli
        for (let i = 2; i < table.length; i++) {
          for (let j = 1; j < table[i].length; j++) {
            if (table[i][j] === char) {
              console.log("Szukam teraz miejsca: " + char);
              // coordinates.push({ char, row: table[i][0], col: table[0][j] });
              coordinates.push(`${table[i][0]}${table[0][j]}`);
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }
    }

    setDisplayValue(coordinates.join(" "));
  };

  const decrypt = () => {
    const table = createPolybiusSquare();
    const decryptedValue = [];

    const encryptedValue = value.split(" ");

    for (const value of encryptedValue) {
      if (value.length === 1) {
        decryptedValue.push(keyword[Number(value) - 1]);
      } else {
        // Znajdź odpowiednie wartości w tabeli
        let foundValue = "";
        for (let i = 2; i < table.length; i++) {
          if (table[i][0] === Number(value[0])) {
            for (let j = 1; j < table[i].length; j++) {
              if (table[0][j] === Number(value[1])) {
                foundValue = table[i][j];
                break;
              }
            }
            break;
          }
        }

        decryptedValue.push(foundValue);
      }
    }

    setDisplayValue(decryptedValue.join(""));
  };

  return (
    <div>
      {" "}
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
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
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

export default PolybiusCipher;
