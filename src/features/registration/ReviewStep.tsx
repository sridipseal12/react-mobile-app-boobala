import { ArrowLeft } from 'lucide-react';
import { PatientData } from './RegistrationContainer';

interface ReviewStepProps {
    data: PatientData;
    onBack: () => void;
    onEdit: () => void;
    onProceed: () => void;
}

export default function ReviewStep({ data, onBack, onEdit, onProceed }: ReviewStepProps) {
    return (
        <div className="review-step p-6 flex-grow flex flex-col bg-surface">
            <header className="flex items-center mb-8">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">New Patient Register</h2>
            </header>

            <div className="flex-grow flex flex-col pt-4">
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100/50">
                    <h3 className="text-sm font-bold text-main mb-8 tracking-tight">Review Patient details</h3>

                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Name</p>
                                <p className="text-sm font-bold text-main">{data.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Phone Number</p>
                                <p className="text-sm font-bold text-main">{data.phone}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Date of Birth</p>
                                <p className="text-sm font-bold text-main">{data.dob}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Gender</p>
                                <p className="text-sm font-bold text-main">{data.gender}</p>
                            </div>
                        </div>

                        {data.isFamilyMember && (
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Relationship</p>
                                <p className="text-sm font-bold text-main">{data.relationship}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 flex flex-col gap-4 items-center">
                        <button
                            className="bg-primary/5 text-primary text-xs font-bold px-8 py-2 rounded-full active:scale-95 transition-all"
                            onClick={onEdit}
                        >
                            Edit
                        </button>
                        <p className="text-gray-400 text-[10px] font-bold">OTP will be sent to - {data.phone}</p>
                    </div>
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
