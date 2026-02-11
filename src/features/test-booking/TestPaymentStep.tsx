import { ArrowLeft, QrCode, Smartphone, Banknote } from 'lucide-react';
import { useState } from 'react';

interface TestPaymentStepProps {
    selectedTests: any[];
    onBack: () => void;
    onSuccess: () => void;
}

export default function TestPaymentStep({ selectedTests, onBack, onSuccess }: TestPaymentStepProps) {
    const [qrGenerated, setQrGenerated] = useState(false);
    const totalPrice = selectedTests.reduce((sum, t) => sum + t.price, 0);

    return (
        <div className="test-payment-step p-6 flex-grow flex flex-col bg-surface overflow-y-auto h-screen">
            <header className="flex items-center mb-8">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">Payment</h2>
            </header>

            <div className="flex flex-col gap-6">
                {/* Summary Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100/50">
                    <div className="flex flex-col gap-6">
                        {selectedTests.map((test, idx) => (
                            <div key={idx} className="flex justify-between items-start">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-sm font-bold text-main">{test.name}</h3>
                                    {test.description && (
                                        <p className="text-[9px] text-gray-400 font-medium italic max-w-[200px]">{test.description}</p>
                                    )}
                                </div>
                                <span className="text-sm font-bold text-main">₹{test.price}</span>
                            </div>
                        ))}
                        <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-400">Total amount</span>
                            <span className="text-xl font-black text-main">₹{totalPrice}</span>
                        </div>
                    </div>
                </div>

                {!qrGenerated ? (
                    <div className="flex-grow flex flex-col justify-center items-center py-10">
                        <div className="bg-white w-full rounded-[40px] p-10 flex flex-col items-center gap-6 shadow-sm border border-gray-50 border-dashed">
                            <div className="w-48 h-48 bg-gray-50 rounded-3xl flex flex-col items-center justify-center gap-2">
                                <QrCode size={48} className="text-gray-200" />
                                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Preview Only</p>
                            </div>
                            <button
                                onClick={() => setQrGenerated(true)}
                                className="w-full py-5 bg-white border-2 border-primary text-primary font-bold rounded-2xl active:scale-95 transition-all text-sm"
                            >
                                Generate QR Code
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col justify-center items-center py-10 animate-in zoom-in-95 duration-500">
                        <div className="bg-white w-full rounded-[40px] p-10 flex flex-col items-center gap-8 shadow-md border border-gray-100">
                            {/* Real QR Mock */}
                            <div className="p-6 bg-white border-2 border-gray-50 rounded-3xl shadow-inner shadow-gray-100">
                                <div className="p-2 border border-gray-100 rounded-xl">
                                    <img
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=antigravity"
                                        className="w-48 h-48"
                                        alt="Payment QR"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-main font-bold">Scan with any UPI App</p>
                                <div className="flex gap-4 opacity-50 grayscale">
                                    {['GPay', 'PhonePe', 'Paytm'].map(a => <span key={a} className="text-[9px] font-black tracking-tighter uppercase">{a}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-auto flex flex-col gap-4">
                <button
                    onClick={onSuccess}
                    className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                    <Smartphone size={18} />
                    Share payment link
                </button>
                <button
                    onClick={onSuccess}
                    className="w-full py-5 bg-white border border-gray-200 text-main font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                >
                    <Banknote size={18} className="text-gray-400" />
                    Collect cash
                </button>
            </div>
        </div>
    );
}
