
import React from 'react';
import type { Persona, PersonaSection } from '../types';
import { AI_PERSONA } from '../constants';

const PersonaSectionCard: React.FC<{ section: PersonaSection }> = ({ section }) => (
  <div className="bg-slate-800 rounded-lg p-4">
    <h3 className="font-bold text-lg text-cyan-400 mb-2">{section.title}</h3>
    {Array.isArray(section.content) ? (
      <ul className="list-disc list-inside space-y-1 text-slate-300">
        {section.content.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}></li>
        ))}
      </ul>
    ) : (
       <p className="text-slate-300" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}></p>
    )}
  </div>
);

const PersonaDisplay: React.FC = () => {
  const persona: Persona = AI_PERSONA;

  return (
    <aside className="w-full lg:w-1/3 xl:w-2/5 p-4 md:p-6 lg:p-8 h-full overflow-y-auto chat-scrollbar">
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 sticky top-8">
        <h2 className="text-2xl font-bold text-white mb-1">Persona da IA</h2>
        <p className="text-cyan-400 font-semibold text-lg mb-6">{persona.role}</p>
        <div className="space-y-4">
          {persona.sections.map((section) => (
            <PersonaSectionCard key={section.title} section={section} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default PersonaDisplay;
