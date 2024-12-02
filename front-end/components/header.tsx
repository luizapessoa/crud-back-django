import React from 'react';

export function Header() {
  return (
    <header className="bg-slate-600 flex justify-between p-4 h-[80px] w-full m-0 top-0 left-0 z-50">
      <div className="flex items-center">
        <h1 className="text-white font-bold text-2xl items-start transition-transform transform hover:scale-110">
          CURSO PREPARATÓRIO
        </h1>
      </div>
    </header>
  );
}
