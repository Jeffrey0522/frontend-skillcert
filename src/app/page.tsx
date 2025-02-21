import Navbar from './components/nabvar';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1F1F2E] text-white">
      <Navbar />
      <main className="container mx-auto py-20">
        <h1 className="text-4xl font-bold text-center text-[#9F47F2]">
          Bienvenido a Skillcert
        </h1>
      </main>
    </div>
  );
}
