import { ArrowLeft, Search, X } from 'lucide-react';
import { useState } from 'react';

interface Patient {
    id: string;
    name: string;
    phone: string;
}

interface PatientSelectionStepProps {
    phone: string;
    onBack: () => void;
    onSelect: (patient: Patient) => void;
    onRegister: (phone: string) => void;
}

const mockPatients: Patient[] = [
    { id: '#1234', name: 'Aarav Patel', phone: '9876543210' },
    { id: '#5678', name: 'Gunbir Patel', phone: '9876543210' }
];

export default function PatientSelectionStep({ phone, onBack, onSelect, onRegister }: PatientSelectionStepProps) {
    const [searchTerm, setSearchTerm] = useState(phone);

    const filteredPatients = mockPatients.filter(p => p.phone === searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const hasResults = filteredPatients.length > 0;

    return (
        <div className="patient-selection-step p-6 flex-grow flex flex-col bg-surface">
            <header className="flex items-center mb-10">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">Book Consultation</h2>
            </header>

            <div className="flex-grow flex flex-col">
                <h3 className="text-sm font-bold text-main mb-6">Enter patient's number</h3>

                <div className="relative mb-8 group">
                    <input
                        type="tel"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="w-full py-4 pl-6 pr-12 rounded-2xl bg-gray-50 border border-gray-100 font-bold text-main focus:bg-white transition-all outline-none focus:border-primary/20 shadow-inner group-hover:bg-white"
                    />
                    {searchTerm ? (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500"
                        >
                            <X size={18} />
                        </button>
                    ) : (
                        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    )}
                </div>

                {hasResults ? (
                    <>
                        <div className="flex items-center justify-between mb-6 px-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{filteredPatients.length} Patients Found</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {filteredPatients.map((patient) => (
                                <button
                                    key={patient.id}
                                    onClick={() => onSelect(patient)}
                                    className="bg-white border border-gray-100 p-6 rounded-[28px] shadow-sm hover:shadow-md transition-all text-left flex items-start justify-between group active:scale-[0.98]"
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold text-main">{patient.name}</span>
                                            <span className="px-2 py-0.5 bg-orange-100 text-primary text-[8px] font-bold rounded uppercase tracking-tighter">Patient</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400">{patient.phone}</p>
                                        <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{patient.id} Visits</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {patient.id}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Search className="text-gray-200" size={24} />
                        </div>
                        <h4 className="text-sm font-bold text-main mb-2">No patients found</h4>
                        <p className="text-[10px] text-gray-400 text-center mb-8 max-w-[180px] leading-relaxed font-medium">To proceed logic, create patient profile</p>

                        <button
                            onClick={() => onRegister(searchTerm)}
                            className="bg-primary text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all active:scale-[0.98]"
                        >
                            Register Patient
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-auto px-1 pt-8">
                <button
                    onClick={() => onRegister(searchTerm)}
                    className="w-full py-4 text-gray-400 font-bold text-sm hover:text-primary transition-colors"
                >
                    + Add New Patient
                </button>
            </div>
        </div>
    );
}
