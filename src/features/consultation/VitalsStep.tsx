import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Stepper from '../../components/Stepper';

interface VitalsStepProps {
    data: { patientName: string; patientPhone: string };
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
        { label: 'Consultation' }
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

            <div className="flex-grow flex flex-col gap-8 mt-4 px-1">
                <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100/50 shadow-sm transition-all hover:bg-white hover:shadow-md">
                    <div className="grid grid-cols-2 gap-10">
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-400 text-[8px] uppercase font-bold tracking-widest">Patient Name</p>
                            <p className="text-sm font-bold text-main">{data.patientName}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-400 text-[8px] uppercase font-bold tracking-widest">Phone Number</p>
                            <p className="text-sm font-bold text-main">{data.patientPhone}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                    <div className="flex flex-col gap-3">
                        <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-1">Height</label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="175"
                                value={vitals.height}
                                onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                                className="w-full py-4 pr-14 pl-6 rounded-[24px] bg-gray-50 border border-gray-100 font-bold text-main focus:bg-white transition-all outline-none focus:border-primary/30 shadow-inner group-hover:bg-white"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-gray-300 uppercase tracking-tighter">CM</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-1">Weight</label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="70"
                                value={vitals.weight}
                                onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                                className="w-full py-4 pr-14 pl-6 rounded-[24px] bg-gray-50 border border-gray-100 font-bold text-main focus:bg-white transition-all outline-none focus:border-primary/30 shadow-inner group-hover:bg-white"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-gray-300 uppercase tracking-tighter">KG</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-1">Temperature</label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="98.6"
                                value={vitals.temp}
                                onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                                className="w-full py-4 pr-14 pl-6 rounded-[24px] bg-gray-50 border border-gray-100 font-bold text-main focus:bg-white transition-all outline-none focus:border-primary/30 shadow-inner group-hover:bg-white"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-gray-300 uppercase tracking-tighter">°F</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-1">Blood Pressure</label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="120/80"
                                value={vitals.bp}
                                onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                                className="w-full py-4 pr-14 pl-6 rounded-[24px] bg-gray-50 border border-gray-100 font-bold text-main focus:bg-white transition-all outline-none focus:border-primary/30 shadow-inner group-hover:bg-white"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-gray-300 uppercase tracking-tighter">BP</span>
                        </div>
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
