import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Logo from '../../components/Logo';

interface OTPScreenProps {
    phoneNumber: string;
    onBack: () => void;
    onSubmit: (otp: string) => void;
    error?: string;
    loading?: boolean;
}

export default function OTPScreen({ phoneNumber, onBack, onSubmit, error: apiError, loading }: OTPScreenProps) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [localError, setLocalError] = useState(false);
    const [timer, setTimer] = useState(34);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1);
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setLocalError(false);

        // Focus next input
        if (value && index < 5) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const isComplete = otp.every(digit => digit !== '');

    const handleProceed = () => {
        const otpValue = otp.join('');
        onSubmit(otpValue);
    };

    const formatTimer = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="otp-screen p-6 flex-grow flex flex-col bg-surface h-full">
            <div className="header flex items-center mb-6 pt-2">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} />
                </button>
            </div>

            <div className="mb-6 mx-auto">
                <Logo />
            </div>

            <div className="flex-grow flex flex-col items-center">
                <h2 className="text-xl font-bold mb-2 text-center text-gray-900">Let's verify it's you</h2>
                <p className="text-center text-gray-500 text-sm mb-8 leading-relaxed">
                    We've sent a 6 digit code to <b>{phoneNumber}</b><br />
                    please enter it here
                </p>

                <div className="otp-inputs flex gap-2 mb-2">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={inputRefs[idx]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                            className={`w-12 h-14 text-center text-xl font-bold rounded-lg border focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all
                                ${(apiError || localError)
                                    ? 'border-red-500 bg-red-50 text-red-500'
                                    : 'border-gray-200 bg-gray-50 text-gray-900'
                                }`}
                            disabled={loading}
                        />
                    ))}
                </div>

                {(apiError || (localError && <p className="text-red-500 text-sm font-medium mt-2">{apiError || 'Invalid OTP'}</p>))}

                <div className="text-center mt-8">
                    <p className="text-gray-400 text-sm">Didn't get the code?</p>
                    <button
                        className={`text-orange-500 text-sm font-semibold bg-transparent p-0 mt-1 hover:text-orange-600 transition-colors ${timer > 0 ? 'opacity-50 cursor-default' : ''}`}
                        disabled={timer > 0}
                    >
                        {timer > 0 ? `Resend in ${formatTimer(timer)}` : 'Resend OTP'}
                    </button>
                </div>
            </div>

            <div className="footer mt-auto pt-6 pb-4">
                <button
                    className={`primary w-full py-4 rounded-xl text-white font-semibold text-lg shadow-lg ${(!isComplete || loading) ? 'opacity-50 cursor-not-allowed bg-orange-300' : 'bg-orange-500 hover:bg-orange-600'}`}
                    onClick={handleProceed}
                    disabled={!isComplete || loading}
                >
                    {loading ? 'Verifying...' : 'Proceed'}
                </button>
            </div>
        </div>
    );
}
