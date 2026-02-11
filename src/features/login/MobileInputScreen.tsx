import { useState } from 'react';
import Logo from '../../components/Logo';

interface MobileInputScreenProps {
    onSubmit: (phone: string) => void;
    error?: string;
    loading?: boolean;
}

export default function MobileInputScreen({ onSubmit, error: apiError, loading }: MobileInputScreenProps) {
    const [phone, setPhone] = useState('');
    const [localError, setLocalError] = useState('');

    const handleSubmit = () => {
        if (phone.length < 10) {
            setLocalError('Oops! This number is invalid');
            return;
        }
        setLocalError('');
        onSubmit(phone);
    };

    const isValid = phone.length >= 10;
    const displayError = apiError || localError;

    return (
        <div className="mobile-input-screen p-6 flex-grow flex flex-col bg-surface h-full">
            <div className="mb-8 mt-4">
                <Logo />
            </div>

            <div className="flex-grow flex flex-col">
                <h2 className="text-xl font-bold mb-8 text-left">Enter your mobile number</h2>

                <div className="input-group mb-4">
                    <label className="text-gray-500 text-sm mb-2 block">Phone number*</label>
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        maxLength={10}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setPhone(val);
                            if (localError) setLocalError('');
                        }}
                        className={`w-full p-4 rounded-xl border ${displayError ? 'border-red-500 bg-red-50' : 'border-gray-200'} text-lg font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors`}
                        autoFocus
                        disabled={loading}
                    />
                    {displayError && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="inline-block w-4 h-4 rounded-full border border-red-500 text-center leading-3 text-xs">!</span>
                        {displayError}
                    </p>}
                </div>
            </div>

            <div className="mt-auto pt-6 pb-4">
                <button
                    className={`primary w-full py-4 rounded-xl text-white font-semibold text-lg shadow-lg ${(!isValid || loading) ? 'opacity-50 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
                    onClick={handleSubmit}
                    disabled={!isValid || loading}
                >
                    {loading ? 'Sending...' : 'Next'}
                </button>
            </div>
        </div>
    );
}
