import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Stepper from '../../components/Stepper';

interface ReasonForVisitStepProps {
    data: { patientName: string; patientPhone: string };
    onBack: () => void;
    onSubmit: (reason: string) => void;
}

export default function ReasonForVisitStep({ data, onBack, onSubmit }: ReasonForVisitStepProps) {
    const [reason, setReason] = useState('');

    const steps = [
        { label: 'Reason for visit' },
        { label: 'Review & pay' },
        { label: 'Consultation' }
    ];

    return (
        <div className="reason-step p-6 flex-grow flex flex-col bg-white">
            <header className="flex items-center mb-10">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">New Patient Register</h2>
            </header>

            <Stepper currentStep={1} steps={steps} />

            <div className="flex-grow flex flex-col gap-10">
                <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100/50 shadow-sm transition-all hover:bg-white hover:shadow-md">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-400 text-[8px] uppercase font-bold tracking-widest">Patient Name</p>
                            <p className="text-sm font-bold text-main">{data.patientName}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-400 text-[8px] uppercase font-bold tracking-widest">Phone Number</p>
                            <p className="text-sm font-bold text-main">{data.patientPhone}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 px-2">
                    <label className="text-gray-400 text-[8px] font-bold uppercase tracking-widest px-1">Reason for visit *</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="e.g. Fever, Headache..."
                        className="w-full bg-gray-50 rounded-[28px] border border-gray-100 p-8 min-h-[160px] font-bold text-main focus:bg-white transition-all outline-none focus:border-primary/30 shadow-inner"
                    />
                </div>
            </div>

            <div className="mt-auto px-2">
                <button
                    className="primary w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 disabled:opacity-50 transition-all active:scale-[0.98] hover:shadow-orange-200"
                    disabled={!reason.trim()}
                    onClick={() => onSubmit(reason)}
                >
                    Pay consultation fee
                </button>
            </div>
        </div>
    );
}
