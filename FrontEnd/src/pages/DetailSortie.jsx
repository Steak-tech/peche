import React, { useState, useEffect } from 'react';
import { MapPin, Fish, Cloud, Droplets, Calendar, Ruler, Weight, Waves, Navigation } from 'lucide-react';


export default function DetailSortie({ user_id = 1, sortie_id = 1}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Appel à l'API Laravel
    useEffect(() => {
        const fetchSortie = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8000/api/users/${user_id}/sorties/${sortie_id}`);

                if (!response.ok) throw new Error('Sortie introuvable');

                const json = await response.json();
                setData(json.sortie);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSortie();
    }, [user_id, sortie_id]);

    // États : Chargement et Erreur
    if (loading) return <div className="flex justify-center p-20 text-slate-400 animate-pulse">Chargement de la session...</div>;
    if (error) return <div className="p-10 text-red-500 bg-red-50 rounded-xl m-4 border border-red-100">Erreur: {error}</div>;
    if (!data) return null;

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6 bg-slate-50 min-h-screen font-sans">

            {/* --- ENTETE DE LA SORTIE --- */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    data.sortie_status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {data.sortie_status}
                </span>
                                <span className="text-slate-400 text-sm flex items-center gap-1 font-medium">
                  <Calendar size={14} /> {new Date(data.start_time).toLocaleDateString('fr-FR')}
                </span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 leading-tight">
                                {data.lieu}
                            </h1>
                            <p className="flex items-center gap-1 text-slate-500 text-sm">
                                <Navigation size={14} /> Lat: {parseFloat(data.gps_lat).toFixed(4)} • Long: {parseFloat(data.gps_long).toFixed(4)}
                            </p>
                        </div>

                        {/* Badges Météo/Eau */}
                        <div className="flex gap-2">
                            <div className="bg-slate-100 px-4 py-2 rounded-2xl text-center">
                                <Cloud size={18} className="mx-auto text-slate-400 mb-1" />
                                <p className="text-[10px] font-bold text-slate-500 uppercase">{data.weather}</p>
                            </div>
                            <div className="bg-blue-50 px-4 py-2 rounded-2xl text-center border border-blue-100">
                                <Waves size={18} className="mx-auto text-blue-400 mb-1" />
                                <p className="text-[10px] font-bold text-blue-600 uppercase">{data.water_type}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description / Observation */}
                    <div className="mt-6 p-5 bg-slate-50 rounded-2xl border-l-4 border-blue-500 relative">
                        <span className="absolute -top-3 left-6 bg-white px-2 text-[10px] font-black text-blue-500 uppercase tracking-tighter">Journal de bord</span>
                        <p className="text-slate-700 italic leading-relaxed">"{data.observation}"</p>
                    </div>
                </div>
            </div>

            {/* --- SECTION DES CAPTURES --- */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                        <Fish size={24} className="text-blue-600" />
                        Tableau des prises
                    </h2>
                    <span className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-lg">
            {data.captures.length} {data.captures.length > 1 ? 'POISSONS' : 'POISSON'}
          </span>
                </div>

                <div className="grid gap-4">
                    {data.captures.map((capture) => (
                        <div key={capture.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row hover:border-blue-300 transition-colors group">

                            {/* Image miniature avec placeholder dynamique */}
                            <div className="sm:w-40 h-40 bg-slate-100 relative shrink-0">
                                <img
                                    src={`/storage/species/${capture.poisson.image_url}`}
                                    alt={capture.poisson.espece}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${capture.poisson.espece}&background=random&size=200`; }}
                                />
                            </div>

                            {/* Détails du poisson */}
                            <div className="p-5 flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                                            {capture.poisson.espece}
                                        </h3>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                            Heure de capture : {new Date(capture.created_at).toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-2">
                                    <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <div className="flex items-center gap-2 text-blue-500 mb-1">
                                            <Ruler size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Taille</span>
                                        </div>
                                        <p className="text-xl font-black text-slate-700">{capture.taille}<span className="text-sm ml-1 font-medium">cm</span></p>
                                    </div>

                                    <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <div className="flex items-center gap-2 text-orange-500 mb-1">
                                            <Weight size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Poids</span>
                                        </div>
                                        <p className="text-xl font-black text-slate-700">{capture.poids}<span className="text-sm ml-1 font-medium">g</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            <p className="text-center text-slate-400 text-[10px] mt-10 uppercase font-bold tracking-[0.2em]">
                Données certifiées FishLog • {new Date().getFullYear()}
            </p>
        </div>
    );
}