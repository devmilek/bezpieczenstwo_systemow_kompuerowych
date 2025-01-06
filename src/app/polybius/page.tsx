import React from "react";
import PolybiusCipher from "./_components/polybius-cipher";

const PolybiusCipherPage = () => {
  return (
    <div className="my-10">
      <h1 className="text-4xl font-bold mb-8">Szyfr Polibiusza</h1>
      <PolybiusCipher />
    </div>
  );
};

export default PolybiusCipherPage;
