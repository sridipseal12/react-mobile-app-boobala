import { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface OTPVerifyStepProps {
    phone: string;
    onBack: () => void;
    onVerify: () => void;
}

export default function OTPVerifyStep({ phone, onBack, onVerify }: OTPVerifyStepProps) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value !== '' && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const isComplete = otp.every(v => v !== '');

    return (
        <div className="otp-verify-step p-6 flex-grow flex flex-col bg-surface">
            <header className="flex items-center mb-8">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">New Patient Register</h2>
            </header>

            <div className="flex-grow flex flex-col pt-4">
                <div className="bg-white rounded-[32px] p-8 pb-12 shadow-sm border border-gray-100/50 flex flex-col items-center">
                    <h3 className="text-sm font-bold text-main mb-2 tracking-tight">Enter OTP</h3>
                    <p className="text-gray-400 text-[10px] font-bold mb-8">Sent to {phone}</p>

                    <div className="flex gap-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                ref={el => inputs.current[index] = el}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                className="w-11 h-14 text-center text-xl font-bold rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-primary transition-all otp-input-field"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-2">
                        <p className="text-gray-400 text-[10px] font-bold">Didn't get the code?</p>
                        <button className="text-primary text-xs font-bold hover:underline">Resend in 0:54</button>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-6">
                <button
                    className={`w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98] ${!isComplete ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                    onClick={onVerify}
                    disabled={!isComplete}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
}
