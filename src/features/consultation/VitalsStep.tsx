import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Stepper from '../../components/Stepper';

interface VitalsStepProps {
    data: { patientName: string; 
        patientPhone: string ;
        dob?: string;
        age?: string;
        gender?: string;
     };
    onBack: () => void;
    onComplete: () => void;
}

export default function VitalsStep({ data, onBack, onComplete }: VitalsStepProps) {
    const [vitals, setVitals] = useState({
        height: '',
        weight: '',
        temp: '',
        bp: ''
    });

    const steps = [
        { label: 'Reason for visit' },
        { label: 'Review & pay' },
        { label: 'Record Vitals' }
    ];

    const isComplete = vitals.height && vitals.weight && vitals.temp && vitals.bp;

    return (
        <div className="vitals-step p-6 flex-grow flex flex-col bg-surface">
            <header className="flex items-center mb-8">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">New Patient Register</h2>
            </header>

            <Stepper currentStep={3} steps={steps} />

            <div className="flex-grow flex flex-col gap-6 mt-4 px-1 mb-8">
                                {/* Patient Info Card */}
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '20px',
                    border: '1px solid #F3F4F6',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '4px' }}>
                                Name
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                                {data.patientName || 'Aarav Patel'}
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '4px' }}>
                                Phone Number
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                                {data.patientPhone || '9876543210'}
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '4px' }}>
                                Date of Birth
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                                {data.dob || '26/03/1980'}{data.age ? ` (${data.age} Yrs)` : ' (45 Yrs)'}
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '4px' }}>
                                Gender
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                                {data.gender || 'Male'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="relative group">
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                setVitals({ ...vitals, height: onlyNums });
                            }}
                            placeholder="Height (in cm) *"
                            value={vitals.height}
                            className="w-full py-4 pr-14 pl-6 rounded-[24px] bg-gray-50 border text-main focus:bg-white transition-all outline-none focus:border-black group-hover:bg-white"
                            style={{ border: "1px solid gray" }}
                        />                        
                        {vitals.height && (
                            <label
                                style={{ left: '16px' }}
                                className="absolute top-0 -translate-y-1/2 text-xs px-1 bg-white text-gray-500"
                            >
                                Height (in cm) *
                            </label>
                        )}  
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="relative group">
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                setVitals({ ...vitals, weight: onlyNums });
                            }}
                            placeholder="Weight (in kg) *"
                            value={vitals.weight}
                            className="w-full py-4 pr-14 pl-6 rounded-[24px] bg-gray-50 border text-main focus:bg-white transition-all outline-none group-hover:bg-white"
                            style={{ border: "1px solid gray" }}
                        />              
                        {vitals.weight && (
                            <label
                                style={{ left: '16px' }}
                                className="absolute top-0 -translate-y-1/2 text-xs px-1 bg-white text-gray-500"
                            >
                                Weight (in kg) *
                            </label>
                        )}          
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Temperature (in °F) *"
                            value={vitals.temp}
                            onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                            className="w-full py-4 pr-14 pl-6 rounded-[24px] bg-gray-50 border text-main focus:bg-white transition-all outline-none focus:border-black group-hover:bg-white"
                            style={{ border: "1px solid gray" }}
                        />
                        {vitals.temp && (
                            <label
                                style={{ left: '16px' }}
                                className="absolute top-0 -translate-y-1/2 text-xs px-1 bg-white text-gray-500"
                            >
                                Temperature (in °F) *
                            </label>
                        )}  
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Blood Pressure (in mmHg) *"
                            value={vitals.bp}
                            onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                            className="w-full py-4 pr-14 pl-6 rounded-[24px] bg-gray-50 border text-main focus:bg-white transition-all outline-none focus:border-black group-hover:bg-white"
                            style={{ border: "1px solid gray" }}
                        />                        
                        {vitals.bp && (
                            <label
                                style={{ left: '16px' }}
                                className="absolute top-0 -translate-y-1/2 text-xs px-1 bg-white text-gray-500"
                            >
                                Blood Pressure (in mmHg) *
                            </label>
                        )}  
                    </div>
                </div>                
            </div>

            <div className="mt-auto pt-10">
                <button
                    className={`primary w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98] ${!isComplete ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:shadow-orange-200 hover:-translate-y-0.5'}`}
                    disabled={!isComplete}
                    onClick={onComplete}
                >
                    Add to Queue
                </button>
            </div>
        </div>
    );
}
