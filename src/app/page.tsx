import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const ciphers = [
  {
    name: "Szyfr Cezara",
    description:
      "Jedna z najprostszych technik szyfrowania. Jest to szyfr podstawieniowy, w którym każda litera tekstu jawnego jest zastępowana literą oddaloną od niej o stałą liczbę pozycji w alfabecie łacińskim. W naszym przypadku będzie to przesunięcie o 3 pozycje.",
    href: "/caesar",
  },
  {
    name: "Szyfr Polibiusza",
    description:
      "Historyczna technika szyfrowania, wykorzystująca tablicę 5x5 liter. Każda litera jest zamieniana na dwie liczby odpowiadające współrzędnym jej położenia w tablicy. Jest to prosty, ale efektywny sposób kodowania wiadomości.",
    href: "/polybius",
  },
  {
    name: "Szyfr Vigenère'a",
    description:
      "Polialfabetyczny szyfr podstawieniowy, który wykorzystuje serię różnych szyfrów Cezara opartych na literach klucza. Jest znacznie trudniejszy do złamania niż szyfr Cezara, ponieważ ta sama litera może być szyfrowana na różne sposoby.",
    href: "/vigenere",
  },
  {
    name: "Szyfr Playfair",
    description:
      "Pierwsza praktyczna technika szyfrowania digraficznego. Wykorzystuje macierz 5x5 liter do szyfrowania par liter, co czyni go znacznie bezpieczniejszym niż szyfry jednoliterowe. Był szeroko używany w celach wojskowych.",
    href: "/playfair",
  },
  {
    name: "Szyfr RSA",
    description:
      "System kryptografii asymetrycznej, wykorzystujący parę kluczy: publiczny do szyfrowania i prywatny do deszyfrowania. Opiera się na trudności faktoryzacji dużych liczb pierwszych. Jest powszechnie stosowany w bezpiecznej komunikacji internetowej.",
    href: "/rsa",
  },
];

export default function Home() {
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold mb-3">Szyfry poligraficzne</h1>
      <p className="text-muted-foreground">
        Wykonanie projektu na Labolatoria z Bezpieczeństwa Systemów
        Komputerowych
      </p>
      <section className="grid grid-cols-2 gap-4 mt-8">
        {ciphers.map((cipher) => (
          <Link key={cipher.name} href={cipher.href} className="group">
            <Card className="group-hover:bg-accent transition">
              <CardHeader>
                <Avatar>
                  <AvatarFallback>{cipher.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="pt-4">{cipher.name}</CardTitle>
                <CardDescription>{cipher.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
