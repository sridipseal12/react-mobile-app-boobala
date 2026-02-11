import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Stepper from '../../components/Stepper';

interface PaymentStepProps {
    data: { patientName: string; patientPhone: string; reason: string };
    onBack: () => void;
    onSuccess: () => void;
}

export default function PaymentStep({ data, onBack, onSuccess }: PaymentStepProps) {
    const [qrGenerated, setQrGenerated] = useState(false);
    console.log('PaymentStep rendered');

    const steps = [
        { label: 'Reason for visit' },
        { label: 'Review & pay' },
        { label: 'Consultation' }
    ];

    return (
        <div className="payment-step p-6 flex-grow flex flex-col bg-surface">
            <header className="flex items-center mb-8">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">New Patient Register</h2>
            </header>

            <Stepper currentStep={2} steps={steps} />

            <div className="flex-grow flex flex-col gap-6 mt-4">
                <div className="bg-gray-50 rounded-[32px] p-6 border border-gray-100/50">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-start border-b border-gray-100 pb-5">
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider">Patient</p>
                                <p className="text-sm font-bold text-main">{data.patientName}</p>
                            </div>
                            <div className="flex flex-col gap-1 text-right">
                                <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider">Phone</p>
                                <p className="text-sm font-bold text-main">{data.patientPhone}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-5 pt-1">
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider">Doctor Consultation</p>
                                <p className="text-lg font-bold text-primary">₹250</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 px-1">
                            <p className="text-main font-bold text-sm">Item total</p>
                            <p className="text-main font-extrabold text-lg">₹250</p>
                        </div>
                    </div>
                </div>

                <div className="flex-grow flex flex-col items-center justify-center min-h-[240px]">
                    {!qrGenerated ? (
                        <div className="bg-gray-50 rounded-[32px] p-12 flex flex-col items-center gap-4 w-full cursor-pointer hover:bg-gray-100/50 transition-all border border-dashed border-gray-200" onClick={() => setQrGenerated(true)}>
                            <p className="text-main font-bold">Generate QR Code</p>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-[32px] border-2 border-primary/20 shadow-xl shadow-orange-50/50 animate-slide-up" onClick={onSuccess}>
                            {/* Mock QR Code */}
                            <div className="w-48 h-48 bg-gray-900 rounded-2xl flex items-center justify-center p-2">
                                <div className="w-full h-full bg-white rounded-lg flex flex-wrap p-1">
                                    {Array.from({ length: 256 }).map((_, i) => (
                                        <div key={i} className={`w-[6.25%] h-[6.25%] ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-auto flex flex-col gap-3">
                <button
                    className="primary w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
                    onClick={() => setQrGenerated(true)}
                >
                    Share payment link
                </button>
                <button
                    className="w-full py-4 bg-white border-2 border-gray-100 text-gray-400 font-bold rounded-2xl transition-all active:scale-[0.98] hover:border-primary/20 hover:text-primary"
                    onClick={onSuccess}
                >
                    Collect cash
                </button>
            </div>
        </div>
    );
}
