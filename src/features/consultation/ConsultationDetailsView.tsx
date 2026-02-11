import { ArrowLeft, Phone, User, CheckCircle2, Share2, Download } from 'lucide-react';

interface ConsultationDetailsViewProps {
    data: any;
    onBack: () => void;
}

export default function ConsultationDetailsView({ data, onBack }: ConsultationDetailsViewProps) {
    if (!data) return null;

    const vitals = [
        { label: 'Blood Pressure', value: '120/80 mmHg', status: 'Normal' },
        { label: 'Heart Rate', value: '72 bpm', status: 'Normal' },
        { label: 'Temperature', value: '98.6 °F', status: 'High' },
        { label: 'Weight', value: '70 kg', status: '' },
        { label: 'Height', value: '175 cm', status: '' },
    ];

    const prescriptions = [
        { name: 'Aspirin 75mg', qty: '10 discs', generic: 'Salsalate, Acetylsalicylic Acid', dosage: 'dosage: 1 tablet once daily', instruction: 'Timing: After Breakfast', warning: 'Instruction: Take with water, should be empty st...' }
    ];

    return (
        <div className="consultation-details-view p-6 flex flex-col gap-6 bg-surface overflow-y-auto h-screen">
            <header className="flex items-center mb-2">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main leading-tight">Ongoing Consultation</h2>
            </header>

            <div className="flex flex-col gap-6">
                {/* Blood Tests / Recommendations */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-main">Blood tests</h3>
                        <span className="px-2 py-0.5 bg-orange-100 text-primary text-[8px] font-bold rounded uppercase tracking-tighter">1 test to be taken</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold leading-relaxed px-1">
                        Fasting Blood Sugar, HbA1C, Urine Sugar, Lipid Profile
                    </p>
                </div>

                {/* Reason of Visit */}
                <div className="px-1">
                    <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest mb-2">Reason of Visit</p>
                    <p className="text-[11px] font-bold text-main leading-relaxed">Fever and body cache</p>
                </div>

                {/* Patient Profile Card */}
                <div className="flex flex-col gap-3">
                    <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest px-1">Patient Details</p>
                    <div className="bg-white border border-gray-100/50 rounded-[32px] p-6 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-bold text-main tracking-tight">{data.name}</h3>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Phone size={10} strokeWidth={3} />
                                    <span className="text-[10px] font-bold">{data.phone}</span>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 bg-orange-50 text-primary text-[8px] font-bold rounded uppercase tracking-tighter">Active</span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-gray-50 pt-6">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-extrabold text-gray-300 uppercase tracking-widest">Date of Birth</span>
                                <span className="text-[10px] font-bold text-main">{data.dob} (45 Yrs)</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] font-extrabold text-gray-300 uppercase tracking-widest">Gender</span>
                                <span className="text-[10px] font-bold text-main">{data.gender}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patient Vitals */}
                <div className="flex flex-col gap-3">
                    <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest px-1">Patient Vitals</p>
                    <div className="bg-white rounded-[28px] border border-gray-100/50 shadow-sm overflow-hidden">
                        <div className="bg-orange-50 px-6 py-3 grid grid-cols-vitals text-[8px] font-extrabold text-gray-400 uppercase tracking-widest">
                            <span>Vitals</span>
                            <span>Value</span>
                            <span className="text-right">Status</span>
                        </div>
                        <div className="flex flex-col">
                            {vitals.map((vital, idx) => (
                                <div key={idx} className="px-6 py-3.5 grid grid-cols-vitals items-center border-b border-gray-50 last:border-0">
                                    <span className="text-[10px] font-bold text-gray-500">{vital.label}</span>
                                    <span className="text-[10px] font-bold text-main">{vital.value}</span>
                                    <div className="text-right">
                                        {vital.status === 'Normal' ? (
                                            <span className="px-2 py-0.5 bg-green-50 text-green-500 text-[8px] font-bold rounded uppercase tracking-tighter">Normal</span>
                                        ) : vital.status === 'High' ? (
                                            <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[8px] font-bold rounded uppercase tracking-tighter">High</span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-gray-300">-</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Doctor Details */}
                <div className="flex flex-col gap-3">
                    <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest px-1">Doctor Details</p>
                    <div className="bg-white border border-gray-100/50 p-6 rounded-[28px] shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                                <User size={24} className="text-blue-500" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h4 className="text-[13px] font-bold text-main">{data.doctor || 'Dr. Roy'}</h4>
                                <p className="text-[10px] font-bold text-gray-400">General Physician</p>
                            </div>
                        </div>
                        <span className="px-2 py-1 bg-orange-100/50 text-primary text-[8px] font-bold rounded-lg uppercase tracking-tighter">15 years experience</span>
                    </div>
                </div>

                {/* Doctor's Diagnosis */}
                <div className="flex flex-col gap-3">
                    <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest px-1">Doctor's Diagnosis</p>
                    <div className="bg-white border border-gray-100/50 p-6 rounded-[28px] shadow-sm">
                        <p className="text-[10px] font-medium text-main leading-relaxed">
                            Patient has fever with Body Ache. Vitals stable, temperature elevated. Likely viral fever. Advised breathing difficulty, persistent vomiting, severe headache, neck stiffness, rash or worsening symptoms.
                        </p>
                    </div>
                </div>

                {/* Prescription */}
                <div className="flex flex-col gap-3">
                    <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest px-1">Prescription</p>
                    <div className="flex flex-col gap-4">
                        {prescriptions.map((p, i) => (
                            <div key={i} className="bg-white border border-gray-100/50 p-6 rounded-[28px] shadow-sm flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-[13px] font-bold text-main">{p.name}</h4>
                                    <span className="px-2 py-0.5 bg-orange-100/30 text-primary text-[8px] font-bold rounded uppercase tracking-tighter">{p.qty}</span>
                                </div>
                                <p className="text-[9px] text-gray-400 font-medium italic">{p.generic}</p>
                                <div className="flex flex-col gap-2 mt-1">
                                    <p className="text-[10px] font-bold text-main">{p.dosage}</p>
                                    <p className="text-[10px] font-bold text-gray-400">{p.instruction}</p>
                                    <p className="text-[9px] text-gray-400">{p.warning} <span className="text-primary cursor-pointer">See more</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white border border-gray-100/50 p-6 rounded-[28px] shadow-sm flex flex-col gap-4">
                    <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest">Payment Details</p>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-gray-400">Fees</span>
                            <span className="text-main">₹250</span>
                        </div>
                        <div className="flex justify-between text-[13px] font-black border-t border-gray-50 pt-3">
                            <span className="text-main">Total amount</span>
                            <span className="text-main">₹250</span>
                        </div>
                        <div className="flex justify-between items-center bg-green-50/50 p-3 rounded-xl mt-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-green-600">Payment status</span>
                                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle2 size={12} className="text-green-600" />
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-green-600 uppercase">Paid</span>
                        </div>
                        <p className="text-[8px] text-gray-300 font-bold text-center mt-1">Paytm UPI: TX-123456789</p>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-3 mt-4 pb-10">
                    <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                        <Share2 size={18} />
                        Share Prescription
                    </button>
                    <button className="w-full py-4 bg-white border border-gray-200 text-primary font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-gray-50">
                        <Download size={18} />
                        Download Prescription
                    </button>
                </div>
            </div>
        </div>
    );
}
