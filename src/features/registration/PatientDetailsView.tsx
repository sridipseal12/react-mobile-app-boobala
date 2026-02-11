import { ArrowLeft, Stethoscope, Activity } from 'lucide-react';
import { useState } from 'react';
import { PatientData } from './RegistrationContainer';

interface PatientDetailsViewProps {
    data: PatientData;
    onBack: () => void;
    onAddFamily: () => void;
    onConsult: () => void;
    onTestBooking: () => void;
    onViewPastConsult?: (consult: any) => void;
    onViewTestDetails?: () => void;
}

export default function PatientDetailsView({ data, onBack, onAddFamily, onConsult, onTestBooking, onViewPastConsult, onViewTestDetails }: PatientDetailsViewProps) {
    const [activeTab, setActiveTab] = useState<'Consultation' | 'Test'>('Consultation');
    const [selectedProfile, setSelectedProfile] = useState<PatientData>(data);

    // Mock Family Members (In a real app, this would come from the backend linked to the patient)
    const FAMILY_MEMBERS = [
        { id: '1', name: data.name, role: 'Primary', phone: data.phone, gender: data.gender, isPrimary: true },
        { id: '2', name: 'Sanju', role: 'Son', phone: data.phone, gender: 'Male', isPrimary: false },
        // { id: '3', name: 'Riya', role: 'Wife', phone: data.phone, gender: 'Female', isPrimary: false }, // Uncomment to test scroll
    ];

    const pastConsultations = [
        { id: '1', date: '08/11/2025', doctor: 'Dr. Roy', reason: 'Fever and body cache', time: '5:30 PM' },
        { id: '2', date: '04/11/2025', doctor: 'Dr. Roy', reason: 'Fever and body cache', time: '5:30 PM' },
    ];

    const pendingTests = [
        { id: 'T1', name: 'Blood test', note: 'pending from previous consultation!' }
    ];

    return (
        <div className="patient-details-view p-6 bg-surface flex-grow flex flex-col overflow-y-auto h-screen">
            <header className="flex items-center mb-6">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main leading-tight">{selectedProfile.name}</h2>
            </header>

            <div className="flex flex-col gap-6">
                {/* Family Member List */}
                <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
                    <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group" onClick={onAddFamily}>
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-primary/50 transition-all">
                            <span className="text-2xl font-light text-primary">+</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-primary transition-colors text-center w-16 leading-tight">Add member</span>
                    </div>

                    {FAMILY_MEMBERS.map((member) => {
                        const isSelected = member.name === selectedProfile.name; // Simple name matching for mock
                        return (
                            <div
                                key={member.id}
                                className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
                                onClick={() => setSelectedProfile({ ...selectedProfile, name: member.name, gender: member.gender as any })}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm transition-all ${isSelected ? 'bg-orange-100 border-2 border-primary text-primary' : 'bg-orange-50 border border-transparent text-main group-hover:bg-orange-100'}`}>
                                    <span className="font-bold text-lg">{member.name.charAt(0)}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className={`text-[10px] font-bold text-center w-16 truncate ${isSelected ? 'text-main' : 'text-gray-400'}`}>{member.name}</span>
                                    {member.isPrimary && (
                                        <span className="text-[8px] font-bold text-orange-400 uppercase tracking-tighter bg-orange-50 px-1.5 rounded-sm mt-0.5">• Self •</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Profile Details Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-main leading-tight">{selectedProfile.name}</h3>
                                {selectedProfile.name === data.name && (
                                    <span className="px-2 py-0.5 bg-orange-100 text-primary text-[8px] font-black rounded uppercase tracking-tighter">P1001</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                                <span>📞 {selectedProfile.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-50 text-[10px] font-bold text-gray-400">
                        <div className="flex flex-col gap-1">
                            <span className="uppercase tracking-widest text-gray-300 text-[9px]">Date of Birth</span>
                            <span className="text-main">03/08/1980 (45 Yrs)</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="uppercase tracking-widest text-gray-300 text-[9px]">Gender</span>
                            <span className="text-main">{selectedProfile.gender}</span>
                        </div>
                        <div className="flex flex-col justify-end items-end">
                            <span className="text-primary cursor-pointer hover:underline">Edit Details</span>
                        </div>
                    </div>

                    {/* Pending Tests Card */}
                    {pendingTests.length > 0 && (
                        <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="bg-gray-50 border border-gray-100 rounded-[28px] p-5 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[13px] font-bold text-main">{pendingTests.length} test to be taken</p>
                                    <p className="text-[10px] text-gray-400 font-medium">{pendingTests[0].name} {pendingTests[0].note}</p>
                                </div>
                                <button
                                    onClick={onTestBooking}
                                    className="w-full py-3.5 bg-primary text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-100 active:scale-[0.98] transition-all"
                                >
                                    Start Test
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={onConsult}
                            className="py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-bold text-main flex flex-col items-center gap-2 hover:border-primary/30 transition-all active:scale-95"
                        >
                            <Stethoscope size={20} className="text-primary" />
                            Doctor Consultation
                        </button>
                        <button
                            onClick={onTestBooking}
                            className="py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-bold text-main flex flex-col items-center gap-2 hover:border-primary/30 transition-all active:scale-95"
                        >
                            <Activity size={20} className="text-primary" />
                            Tests / Diagnosis
                        </button>
                    </div>
                </div>

                {/* Bookings Section */}
                <section className="bookings-section flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-main px-1 uppercase tracking-widest">All Bookings</h4>

                    <div className="flex flex-col bg-white rounded-[28px] shadow-sm border border-gray-100/50 overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-50 p-1">
                            {['Consultation', 'Test / Diagnosis'].map((tab) => {
                                const isConsult = tab === 'Consultation';
                                const active = (isConsult && activeTab === 'Consultation') || (!isConsult && activeTab === 'Test');
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(isConsult ? 'Consultation' : 'Test')}
                                        className={`flex-grow py-3 text-[10px] font-bold rounded-2xl transition-all ${active ? 'bg-orange-50 text-primary shadow-inner' : 'text-gray-400 hover:text-gray-500'}`}
                                    >
                                        {tab}
                                    </button>
                                );
                            })}
                        </div>

                        {/* List */}
                        <div className="flex flex-col">
                            {activeTab === 'Consultation' ? (
                                pastConsultations.map((consult) => (
                                    <div key={consult.id} className="p-5 border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-bold text-main">{consult.date}</p>
                                                <p className="text-[10px] font-bold text-gray-400">{consult.doctor}</p>
                                            </div>
                                            <button
                                                onClick={() => onViewPastConsult?.(consult)}
                                                className="px-4 py-1.5 border border-primary/20 text-primary text-[9px] font-bold rounded-lg uppercase tracking-tight hover:bg-primary/5 active:scale-95 transition-all"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-bold">
                                            <p className="text-gray-400 italic">{consult.reason}</p>
                                            <p className="text-gray-300">{consult.time}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                [{ id: 't1', date: '08/11/2025', doctor: 'Dr. Roy', reason: 'Fever and body ache', time: '5:30 PM' }].map((test) => (
                                    <div key={test.id} className="p-5 border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-bold text-main">{test.date}</p>
                                                <p className="text-[10px] font-bold text-gray-400">{test.doctor}</p>
                                            </div>
                                            <button
                                                onClick={onViewTestDetails}
                                                className="px-4 py-1.5 border border-primary/20 text-primary text-[9px] font-bold rounded-lg uppercase tracking-tight hover:bg-primary/5 active:scale-95 transition-all"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-bold">
                                            <p className="text-gray-400 italic">{test.reason}</p>
                                            <p className="text-gray-300">{test.time}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <div className="mt-8 pb-6">
                <button
                    className="w-full py-4 text-gray-400 font-bold text-sm hover:text-primary transition-colors active:scale-95"
                    onClick={onBack}
                >
                    Done
                </button>
            </div>
        </div>
    );
}
