import { Search, Bell, UserPlus, Stethoscope, Microscope, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HomeProps {
    onOpenProfile: () => void;
    onRegisterPatient: (prefill?: string) => void;
    onConsultation: () => void;
    onViewConsultDetails: (consultation: any) => void;
    onTestBooking: () => void;
    onSelectPatient: (patient: any) => void;
    onOpenNotifications: () => void;
}

const mockQueue = [
    { id: '01', name: 'Aarav Patel', type: 'GC', status: 'Ongoing', phone: '9876543210', dob: '25/08/1998', gender: 'Male' },
    { id: '02', name: 'Suraj', type: 'GP', status: 'Consulted' },
    { id: '03', name: 'Alok', type: 'GP', status: 'Consulted' }
];

const MOCK_SEARCH_RESULTS = [
    { id: 'P1001', name: 'Aarav Patel', role: 'Primary', phone: '9876543210', age: '45Y', gender: 'Male' },
    { id: 'P1002', name: 'Sanju Patel', role: 'FM', phone: '9876543210', age: '14Y', gender: 'Male' },
];

export default function Home({ onOpenProfile, onRegisterPatient, onConsultation, onViewConsultDetails, onTestBooking, onSelectPatient, onOpenNotifications }: HomeProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setHasSearched(query.length > 2);
        if (query.length > 2) {
            setResults(MOCK_SEARCH_RESULTS.filter(p => p.phone.includes(query) || p.id.toLowerCase().includes(query.toLowerCase()) || p.name.toLowerCase().includes(query.toLowerCase())));
        } else {
            setResults([]);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setResults([]);
        setHasSearched(false);
    };

    return (
        <div className="home-screen p-6 flex flex-col gap-6 h-screen overflow-y-auto">
            <header className="flex justify-between items-center px-1">
                <div className="flex items-center gap-3">
                    <button onClick={onOpenProfile} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center">
                        <Menu size={20} className="text-main" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-main tracking-tight leading-tight">Sanchit</h1>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Mahadevapuram</p>
                    </div>
                </div>
                <div className="relative p-2 bg-orange-50 rounded-xl cursor-pointer active:scale-95 transition-transform" onClick={onOpenNotifications}>
                    <Bell size={20} className="text-primary" />
                    <span className="absolute -top-1 -right-1 bg-primary text-white font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-orange-50 leading-none"
                    style={{
                        fontSize: '10px',
                        lineHeight: '1',
                    }}>
                    2
                    </span>

                </div>
            </header>

            <div className="flex flex-col gap-2">
                <div className="search-bar relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by Name, Phone, Patient ID"
                        className="w-full py-4 pl-12 pr-12 rounded-2xl bg-gray-50 border border-gray-100 font-bold text-main focus:bg-white transition-all outline-none focus:border-primary/20 shadow-inner text-sm focus:shadow-lg"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    {searchQuery && (
                        <div className="absolute w-full search-results flex-grow flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
                        {results.length > 0 ? (
                                <>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{results.length} Patients Found</p>
                                    <div className="flex flex-col gap-3">
                                        {results.map((patient) => (
                                            <div
                                                key={patient.id}
                                                onClick={() => onSelectPatient(patient)}
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
                                </>
                            ) : (hasSearched && (
                                <div className="p-6 flex flex-col items-center justify-center py-12 gap-6 animate-in fade-in zoom-in-95 duration-300 bg-white rounded-[32px] border border-gray-100 shadow-sm mt-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                        <Search size={32} className="text-gray-200" />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-main font-bold mb-1">No patients found</h4>
                                        <p className="text-[10px] text-gray-400 font-medium">Try searching by name, phone, or ID</p>
                                    </div>
                                    <div className="w-full px-8">
                                        <button
                                            onClick={() => onRegisterPatient(searchQuery)}
                                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 active:scale-[0.95] transition-all"
                                        >
                                            Register Patient
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                </div>
            </div>
            

            <>
                <div className="actions grid grid-cols-3 gap-3">
                    <div className="action-card bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer" onClick={() => onRegisterPatient()}>
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                            <UserPlus size={20} className="text-primary" />
                        </div>
                        <span className="text-[10px] font-bold text-main text-center leading-tight">Register Patient</span>
                    </div>
                    <div className="action-card bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer" onClick={onConsultation}>
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                            <Stethoscope size={20} className="text-primary" />
                        </div>
                        <span className="text-[10px] font-bold text-main text-center leading-tight">Doctor Consultation</span>
                    </div>
                    <div className="action-card bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer" onClick={onTestBooking}>
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                            <Microscope size={20} className="text-primary" />
                        </div>
                        <span className="text-[10px] font-bold text-main text-center leading-tight">Test / Diagnosis</span>
                    </div>
                </div>

                <section className="patients-queue flex-grow flex flex-col gap-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="text-sm font-bold text-main uppercase tracking-widest">Patients In Queue</h3>
                    </div>

                    <div className="flex flex-col overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="bg-orange-100 p-4 grid grid-cols-queue text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-orange-100">
                            <span>P.ID</span>
                            <span>Name</span>
                            <span>Type</span>
                            <span>Status</span>
                            <span className="text-right">Action</span>
                        </div>
                        <div className="flex flex-col overflow-y-auto">
                            {mockQueue.map((item, idx) => (
                                <div key={idx} className="p-4 grid grid-cols-queue items-center border-b border-gray-50 last:border-0">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{item.id}</span>
                                    <span className="flex flex-col gap-1">
                                        <span className="text-[13px] font-bold text-main truncate">{item.name}</span>
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{item.type}</span>
                                    {/* NEW STATUS COLUMN */}
                                    <span className="text-[9px] font-bold text-gray-500">
                                        {item.status}
                                    </span>
                                    <span className="flex items-center text-right">
                                        {item.status === 'Ongoing' ? (
                                            <button
                                                onClick={() => onViewConsultDetails(item)}
                                                className="text-[9px] font-bold text-primary uppercase tracking-tighter hover:underline"
                                            >
                                                View details
                                            </button>
                                        ) : (
                                            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">{item.status}</span>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="w-full py-2 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-orange-50 transition-colors rounded-xl">View All Patients ➞</button>
                </section>
            </>
            
        </div>
    );
}
