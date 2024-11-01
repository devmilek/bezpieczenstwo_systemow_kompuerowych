import CaesarCipher from "@/components/caesar-cipher";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Szyfrowanie</h1>
      <CaesarCipher />
    </div>
  );
}
