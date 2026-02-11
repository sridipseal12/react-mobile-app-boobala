import { ArrowLeft, Search, X } from 'lucide-react';
import { useState } from 'react';

interface PatientSearchStepProps {
    onBack: () => void;
    onSearch: (phone: string) => void;
}

export default function PatientSearchStep({ onBack, onSearch }: PatientSearchStepProps) {
    const [phone, setPhone] = useState('');

    return (
        <div className="patient-search-step p-6 flex-grow flex flex-col bg-surface">
            <header className="flex items-center mb-10">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">Book Consultation</h2>
            </header>

            <div className="flex-grow flex flex-col">
                <h3 className="text-sm font-bold text-main mb-6">Enter patient's number</h3>

                <div className="relative group">
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Search"
                        className="w-full py-4 pl-6 pr-12 rounded-2xl bg-gray-50 border border-gray-100 font-bold text-main focus:bg-white transition-all outline-none focus:border-primary/20 shadow-inner group-hover:bg-white"
                    />
                    {phone ? (
                        <button
                            onClick={() => setPhone('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500"
                        >
                            <X size={18} />
                        </button>
                    ) : (
                        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    )}
                </div>

                {phone.length >= 10 && (
                    <div className="mt-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        <button
                            onClick={() => onSearch(phone)}
                            className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98] hover:shadow-orange-200"
                        >
                            Search Patient
                        </button>
                    </div>
                )}
            </div>

            {/* Numeric Keypad Mock (optional, if app is mobile-focused) */}
            <div className="mt-auto grid grid-cols-3 gap-x-8 gap-y-4 px-4 py-8 pointer-events-none opacity-20">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((n) => (
                    <div key={n} className="h-12 flex items-center justify-center text-xl font-bold text-main">{n}</div>
                ))}
            </div>
        </div>
    );
}
