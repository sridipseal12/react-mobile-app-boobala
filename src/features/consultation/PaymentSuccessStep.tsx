import { CheckCircle2 } from 'lucide-react';

interface PaymentSuccessStepProps {
    onProceed: () => void;
}

export default function PaymentSuccessStep({ onProceed }: PaymentSuccessStepProps) {
    return (
        <div className="payment-success-step p-6 flex-grow flex flex-col bg-surface">
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100/50 flex flex-col items-center max-w-[320px] w-full animate-slide-up">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-main text-center mb-2">₹250.00</h3>
                    <p className="text-green-500 font-bold text-sm mb-6">Payment Successful</p>

                    <div className="flex flex-col items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider gap-1">
                        <span>Order ID: 123456789</span>
                        <span>23rd Jan 2026 at 09:30 AM</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-6">
                <button
                    className="primary w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
                    onClick={onProceed}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
}
