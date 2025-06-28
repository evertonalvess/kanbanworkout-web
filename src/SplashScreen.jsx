import React from 'react';

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0E1116] text-white">
      <img src="/Imagens/icon_kanbanworkout.png" alt="Kanban Workout" className="w-24 h-24 mb-6" />
      <img src="/Imagens/stiff.png" alt="Carregando" className="w-40 h-40 animate-pulse rounded-lg" />
      <p className="mt-4 text-blue-400">Carregando...</p>
    </div>
  );
}
