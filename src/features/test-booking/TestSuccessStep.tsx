import { CheckCircle2 } from 'lucide-react';

interface TestSuccessStepProps {
    amount: number;
    onFinish: () => void;
}

export default function TestSuccessStep({ amount, onFinish }: TestSuccessStepProps) {
    return (
        <div className="test-success-step p-6 flex-grow flex flex-col bg-surface items-center justify-center h-screen">
            <div className="bg-white rounded-[40px] p-12 shadow-xl border border-gray-100 flex flex-col items-center max-w-[340px] w-full animate-in zoom-in-90 duration-500">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 text-green-500 shadow-inner">
                    <CheckCircle2 size={48} strokeWidth={2.5} />
                </div>

                <h2 className="text-3xl font-black text-main mb-2">₹{amount}.00</h2>
                <p className="text-sm font-bold text-green-500 uppercase tracking-widest mb-10">Payment Successful</p>

                <div className="w-full flex flex-col gap-4 border-t border-gray-50 pt-8">
                    <div className="flex justify-between items-center px-2">
                        <span className="text-[10px] font-bold text-gray-300 uppercase">Order-ID: 12356789</span>
                        <span className="text-[10px] font-bold text-gray-300">22nd Oct 2024, 18:20 PM</span>
                    </div>
                </div>
            </div>

            <div className="mt-12 w-full max-w-[340px]">
                <button
                    className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 active:scale-[0.98] transition-all"
                    onClick={onFinish}
                >
                    Done
                </button>
            </div>
        </div>
    );
}
