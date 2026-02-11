import { CheckCircle2 } from 'lucide-react';

interface SuccessStepProps {
    onProceed: () => void;
}

export default function SuccessStep({ onProceed }: SuccessStepProps) {
    return (
        <div className="success-step p-6 flex-grow flex flex-col bg-surface">
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100/50 flex flex-col items-center max-w-[320px] w-full animate-slide-up">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-sm font-bold text-main text-center leading-relaxed">
                        Aarav Patel<br />has been successfully registered
                    </h3>
                </div>
            </div>

            <div className="mt-auto pt-6">
                <button
                    className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
                    onClick={onProceed}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
}
