import CaesarCipher from "@/components/caesar-cipher";
import React from "react";

const CaesarPage = () => {
  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold mb-4">Szyfr Cezara</h1>
      <CaesarCipher />
    </div>
  );
};

export default CaesarPage;
