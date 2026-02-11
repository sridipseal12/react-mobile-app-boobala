import { ArrowLeft, Download, Share2, FileText, CheckCircle2 } from 'lucide-react';

interface TestDetailsViewProps {
    onBack: () => void;
}

export default function TestDetailsView({ onBack }: TestDetailsViewProps) {
    const patientData = {
        name: 'Aarav Patel',
        id: 'P1001',
        phone: '9876543210',
        dob: '03/08/1980',
        age: '45 Yrs',
        gender: 'Male'
    };

    const reports = [
        { id: 1, name: 'ECG Report', date: 'Dec 31, 2024 - 5:30 PM', status: 'Normal sinus rhythm', type: 'ECG' },
        { id: 2, name: 'Blood Test - Lipid Profile', date: 'Dec 31, 2024 - 5:30 PM', status: 'All parameters normal', type: 'Blood' },
    ];

    const paymentDetails = {
        items: [
            { name: 'ECG', price: 500 },
            { name: 'Blood Test - Lipid Profile', price: 1100 },
        ],
        total: 1600,
        status: 'Paid',
        method: 'UPI (Transaction ID: 1234567890)'
    };

    return (
        <div className="test-details-view p-6 flex-grow flex flex-col bg-surface h-screen overflow-y-auto">
            <header className="flex items-center mb-6">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">Test Details</h2>
            </header>

            <div className="flex flex-col gap-6 pb-24">
                {/* Patient Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Patient Details</h3>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h4 className="text-lg font-bold text-main">{patientData.name}</h4>
                                <span className="px-2 py-0.5 bg-orange-100 text-primary text-[8px] font-black rounded uppercase tracking-tighter">{patientData.id}</span>
                            </div>
                            <p className="text-[11px] font-bold text-gray-400">📞 {patientData.phone}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Date of Birth</span>
                            <span className="text-[11px] font-bold text-main">{patientData.dob} ({patientData.age})</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Gender</span>
                            <span className="text-[11px] font-bold text-main">{patientData.gender}</span>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="text-[10px] font-bold text-primary hover:underline">Edit Details</button>
                    </div>
                </div>

                {/* Doctor Details */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Doctor Details</h3>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <h4 className="text-sm font-bold text-main">Dr. Roy</h4>
                            <p className="text-[10px] font-bold text-gray-400">General Physician</p>
                        </div>
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-bold rounded-full border border-green-100">12 years experience</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Doctor's Diagnosis</p>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                            Patient has fever with body ache. Vitals stable, temperature elevated. Likely viral fever. Advised rest, fluids, paracetamol as needed. Return if breathing difficulty, persistent vomiting, severe headache, neck stiffness, rash, or worsening symptoms.
                        </p>
                    </div>
                </div>

                {/* Test Reports */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-main px-1 uppercase tracking-widest">Test Reports</h3>
                    {reports.map((report) => (
                        <div key={report.id} className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-100/50 flex flex-col gap-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-xs font-bold text-main">{report.name}</h4>
                                        <p className="text-[9px] font-bold text-gray-400">{report.date}</p>
                                    </div>
                                </div>
                                <ArrowLeft className="rotate-180 text-gray-300" size={16} />
                            </div>
                            <div className="ml-13 pl-13">
                                <p className="text-[10px] font-medium text-green-500">{report.status}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment Details */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Details</h3>
                    <div className="flex flex-col gap-3 mb-4">
                        {paymentDetails.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[11px] font-bold">
                                <span className="text-gray-400">{item.name}</span>
                                <span className="text-main">₹{item.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-gray-50 flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-main">Total Amount</span>
                        <span className="text-sm font-black text-main">₹{paymentDetails.total}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 p-3 rounded-xl border border-green-100">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Payment Status: {paymentDetails.status}</span>
                            <span className="text-[9px] font-bold text-green-600/70">Payment Mode: {paymentDetails.method}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex flex-col gap-3 z-10">
                <button className="w-full py-4 bg-white border border-primary text-primary font-bold rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Report
                </button>
                <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Share2 size={18} />
                    Share Report
                </button>
            </div>
        </div>
    );
}
