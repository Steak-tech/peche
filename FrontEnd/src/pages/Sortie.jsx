import {Link} from "react-router-dom";


function CreateTripModal() {
  // Styles communs pour éviter la répétition
  const inputBaseStyle = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors";
  const labelStyle = "block text-sm font-medium text-gray-800 mb-1.5";

  return (
    // Overlay (Fond sombre)
    <div className="min-h-screen bg-gray-600/50 flex items-center justify-center p-4 font-sans">
      
      {/* Container Modal */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[93vh] z-10000">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 relative">
          
          <h2 className="text-lg font-bold text-gray-900 w-full text-center">
            Créer une sortie
          </h2>
            {/* Bouton Fermer (X) */}
            <Link to="/" className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </Link>
        </div>

        {/* --- Corps du formulaire (Scrollable) --- */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {/* Date de sortie */}
          <div>
            <label className={labelStyle}>Date de sortie</label>
            <div className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="DD" className={`${inputBaseStyle} text-center`} />
              <input type="text" placeholder="MM" className={`${inputBaseStyle} text-center`} />
              <input type="text" placeholder="YYYY" className={`${inputBaseStyle} text-center`} />
            </div>
          </div>

          {/* Heure de début */}
          <div>
            <label className={labelStyle}>Heure de début</label>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Heures" className={inputBaseStyle} />
              <input type="text" placeholder="Minutes" className={inputBaseStyle} />
            </div>
          </div>

          {/* Heure de fin */}
          <div>
            <label className={labelStyle}>Heure de fin</label>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Heures" className={inputBaseStyle} />
              <input type="text" placeholder="Minutes" className={inputBaseStyle} />
            </div>
          </div>

          {/* Lieu de sortie */}
          <div>
            <label className={labelStyle}>Lieu de sortie</label>
            <input type="text" placeholder="Value" className={inputBaseStyle} />
          </div>

          {/* Type de cours d'eau (Select Custom avec SVG) */}
          <div>
            <label className={labelStyle}>Type de cours d'eau</label>
            <div className="relative">
              <select className={`${inputBaseStyle} appearance-none bg-white pr-10`}>
                <option>Value</option>
                <option>Rivière</option>
                <option>Lac</option>
                <option>Mer</option>
              </select>
              {/* Icône Chevron Down SVG */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Condition météo */}
          <div>
            <label className={labelStyle}>Condition météo</label>
            <div className="relative">
              <select className={`${inputBaseStyle} appearance-none bg-white pr-10`}>
                <option>Value</option>
                <option>Ensoleillé</option>
                <option>Nuageux</option>
                <option>Pluvieux</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={labelStyle}>Notes</label>
            <textarea 
              placeholder="Value" 
              className={`${inputBaseStyle} h-28 resize-none`}
            />
          </div>

          {/* Bouton Ajouter une capture */}
          <button className="w-full bg-[#464ec9] hover:bg-[#383ea3] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]">
            {/* SVG Plus */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Ajouter une capture
          </button>

          {/* Liste des Captures (Cards) */}
          <div className="space-y-3 pt-2">
            {[1, 2].map((_, index) => (
              <div key={index} className="flex items-center p-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                {/* Placeholder Image */}
                <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0 mr-4"></div>
                <span className="font-bold text-gray-900 text-sm">Nom du poisson</span>
              </div>
            ))}
          </div>

        </div>

        {/* --- Footer (Bouton Enregistrer) --- */}
        <div className="p-5 border-t border-gray-100 bg-white">
          <button className="w-full bg-[#464ec9] hover:bg-[#383ea3] text-white font-semibold py-3.5 rounded-xl shadow-md transition-colors active:scale-[0.99]">
            Enregistrer la sortie
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateTripModal;