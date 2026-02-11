import { ArrowLeft, Search, X } from 'lucide-react';
import { useState } from 'react';

interface TestPatientSearchStepProps {
    onBack: () => void;
    onSelect: (patient: any) => void;
    onRegister: (phone: string) => void;
}

const MOCK_PATIENTS = [
    { id: 'P1001', name: 'Aarav Patel', role: 'Primary', phone: '9876543210', age: '45Y', gender: 'Male' },
    { id: 'P1002', name: 'Sanju Patel', role: 'FM', phone: '9876543210', age: '14Y', gender: 'Male' },
];

export default function TestPatientSearchStep({ onBack, onSelect, onRegister }: TestPatientSearchStepProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setHasSearched(query.length > 3);
        if (query.length > 3) {
            // Mock search filtering
            setResults(MOCK_PATIENTS.filter(p => p.phone.includes(query) || p.name.toLowerCase().includes(query.toLowerCase())));
        } else {
            setResults([]);
        }
    };

    return (
        <div className="test-patient-search p-6 flex-grow flex flex-col bg-surface overflow-y-auto h-screen">
            <header className="flex items-center mb-8">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">Book Test</h2>
            </header>

            <div className="flex flex-col gap-6">
                <h3 className="text-sm font-bold text-main">Enter patient's number</h3>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full py-4 pl-6 pr-12 rounded-2xl bg-white border border-gray-100 font-bold text-main focus:border-primary/20 outline-none shadow-sm"
                    />
                    {searchQuery ? (
                        <button
                            onClick={() => handleSearch('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-300"
                        >
                            <X size={18} />
                        </button>
                    ) : (
                        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    )}
                </div>

                {results.length > 0 ? (
                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{results.length} Patients Found</p>

                        <div className="flex flex-col gap-3">
                            {results.map((patient) => (
                                <div
                                    key={patient.id}
                                    onClick={() => onSelect(patient)}
                                    className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm hover:border-primary/20 transition-all cursor-pointer group active:scale-[0.98]"
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-main">{patient.name}</span>
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase text-white ${patient.role === 'Primary' ? 'bg-orange-400' : 'bg-orange-300'}`}>
                                                {patient.role}
                                            </span>
                                        </div>
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">ID: {patient.id}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 mb-1">{patient.phone}</p>
                                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{patient.age}, {patient.gender}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : hasSearched && (
                    <div className="flex flex-col items-center justify-center py-12 gap-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                            <Search size={32} className="text-gray-200" />
                        </div>
                        <div className="text-center">
                            <h4 className="text-main font-bold mb-1">No patients found</h4>
                            <p className="text-[10px] text-gray-400 font-medium">Try searching by name, phone, or ID</p>
                        </div>
                        <button
                            onClick={() => onRegister(searchQuery)}
                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 active:scale-[0.95] transition-all"
                        >
                            Register Patient
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
