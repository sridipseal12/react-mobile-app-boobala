import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface MobileInputStepProps {
    onBack: () => void;
    onSubmit: (phone: string) => void;
}

export default function MobileInputStep({ onBack, onSubmit }: MobileInputStepProps) {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (phone.length !== 10) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }
        onSubmit(phone);
    };

    const isValid = phone.length === 10;

    return (
        <div className="mobile-input-step p-6 flex-grow flex flex-col bg-surface">
            <header className="flex items-center mb-8">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12">New Patient Register</h2>
            </header>

            <div className="flex-grow flex flex-col">
                <div className="mb-8">
                    <label className="text-gray text-xs font-bold mb-2 block uppercase tracking-wider">Phone Number*</label>
                    <input
                        type="tel"
                        placeholder="9087654321"
                        value={phone}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setPhone(val);
                            if (val.length === 10) setError('');
                        }}
                        className={`text-lg font-bold py-4 rounded-2xl ${error ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:bg-white transition-all`}
                        autoFocus
                    />
                    {error && <p className="text-red-500 text-[10px] mt-2 font-bold px-1">{error}</p>}
                </div>
            </div>

            <div className="mt-auto">
                <button
                    className="primary w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
                    onClick={handleSubmit}
                    disabled={!isValid}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
