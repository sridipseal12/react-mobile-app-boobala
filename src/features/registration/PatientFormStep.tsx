import { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { PatientData } from './RegistrationContainer';

interface PatientFormStepProps {
    data: PatientData;
    onBack: () => void;
    onSubmit: (formData: Partial<PatientData>) => void;
}

export default function PatientFormStep({ data, onBack, onSubmit }: PatientFormStepProps) {
    const [formData, setFormData] = useState({
        name: data.name,
        dob: data.dob,
        gender: data.gender,
        relationship: data.relationship || ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleNext = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name?.trim()) newErrors.name = 'Name is required';
        if (!formData.dob?.trim()) newErrors.dob = 'DOB is required';
        if (data.isFamilyMember && !formData.relationship) newErrors.relationship = 'Relationship is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className="patient-form-step p-6 flex-grow flex flex-col bg-surface">
            <header className="flex items-center mb-8">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12">New Patient Register</h2>
            </header>

            <div className="flex-grow flex flex-col gap-6">
                <div>
                    <label className="text-gray text-[10px] font-bold mb-2 block uppercase tracking-wider">Phone Number*</label>
                    <input
                        type="text"
                        value={data.phone}
                        disabled
                        className="py-4 rounded-2xl border-gray-100 bg-gray-50 text-gray-400 font-bold"
                    />
                </div>

                <div>
                    <label className="text-gray text-[10px] font-bold mb-2 block uppercase tracking-wider">Name*</label>
                    <input
                        type="text"
                        placeholder="Arav Patel"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`py-4 rounded-2xl font-bold bg-gray-50 focus:bg-white transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold px-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="text-gray text-[10px] font-bold mb-2 block uppercase tracking-wider">Date of Birth*</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="20-03-1980"
                            value={formData.dob}
                            onChange={(e) => {
                                setFormData({ ...formData, dob: e.target.value });
                                if (errors.dob) setErrors({ ...errors, dob: '' });
                            }}
                            className={`py-4 rounded-2xl font-bold bg-gray-50 focus:bg-white transition-all pr-12 ${errors.dob ? 'border-red-500' : 'border-gray-200'}`}
                        />
                        <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
                    </div>
                    {errors.dob && <p className="text-red-500 text-[10px] mt-1 font-bold px-1">{errors.dob}</p>}
                    <p className="text-[10px] text-gray-400 mt-1 px-1 font-bold">Age: 45 Yrs</p>
                </div>

                <div>
                    <label className="text-gray text-[10px] font-bold mb-3 block uppercase tracking-wider">Gender*</label>
                    <div className="flex gap-6 px-1">
                        {['Male', 'Female', 'Other'].map((g) => (
                            <label key={g} className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.gender === g ? 'border-primary' : 'border-gray-300'}`}>
                                    {formData.gender === g && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                </div>
                                <input
                                    type="radio"
                                    name="gender"
                                    className="hidden"
                                    checked={formData.gender === g}
                                    onChange={() => setFormData({ ...formData, gender: g as any })}
                                />
                                <span className={`text-sm font-bold ${formData.gender === g ? 'text-main' : 'text-gray-400'}`}>{g}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {data.isFamilyMember && (
                    <div className="animate-slide-up">
                        <label className="text-gray text-[10px] font-bold mb-2 block uppercase tracking-wider">Relationship*</label>
                        <select
                            value={formData.relationship}
                            onChange={(e) => {
                                setFormData({ ...formData, relationship: e.target.value });
                                if (errors.relationship) setErrors({ ...errors, relationship: '' });
                            }}
                            className={`w-full py-4 px-4 rounded-2xl font-bold bg-gray-50 focus:bg-white border transition-all appearance-none ${errors.relationship ? 'border-red-500' : 'border-gray-200'}`}
                        >
                            <option value="">Select</option>
                            <option value="Parent">Parent</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Child">Child</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                )}
            </div>

            <div className="mt-auto">
                <button
                    className="primary w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
