import { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import './MobileInputStep.css';

interface MobileInputStepProps {
  onBack: () => void;
  onSubmit: (data: {
    phone: string;
    name: string;
    dob: string;
    gender: string;
  }) => void;
}

export default function MobileInputStep({ onBack, onSubmit }: MobileInputStepProps) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!name.trim()) {
      setError('Please enter name');
      return;
    }
    if (!dob) {
      setError('Please select date of birth');
      return;
    }

    onSubmit({ phone, name, dob, gender });
  };

  const isValid = phone.length === 10 && name && dob;

return (
  <div className="h-screen justify-between flex flex-col bg-surface">

    <div>
    {/* Header */}
    <div className="p-6">
      <header className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="flex-grow text-center text-lg font-bold mr-12">
          New Patient Register
        </h2>
      </header>
    </div>

    {/* Form Section */}
    <div className="flex-1 px-6 flex flex-col gap-6 overflow-y-auto">

      {/* Phone */}
      <div className="relative w-full">
        <input
          type="tel"
          value={phone}
          maxLength={10}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          placeholder="Phone Number*"
          className="w-full p-4 rounded-xl border text-lg font-medium focus:border-gray-500 focus:ring-0 outline-none transition-all"
        />
        {phone && (
          <label className="absolute left-4 top-0 -translate-y-1/2 text-xs px-1 bg-white">
            Phone Number*
          </label>
        )}
      </div>

      {/* Name */}
      <div className="relative w-full">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name*"
          className="w-full p-4 rounded-xl border text-lg font-medium focus:border-gray-500 focus:ring-0 outline-none transition-all"
        />
        {name && (
          <label className="absolute left-4 top-0 -translate-y-1/2 text-xs px-1 bg-white">
            Name*
          </label>
        )}
      </div>

      {/* DOB */}
      <div className="relative w-full">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-4 rounded-xl border text-lg font-medium focus:border-gray-500 focus:ring-0 outline-none transition-all appearance-none"
        />
        {dob && (
          <label className="absolute left-4 top-0 -translate-y-1/2 text-xs px-1 bg-white">
            Date of Birth*
          </label>
        )}
        <Calendar
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
        />
      </div>

      {/* Gender */}
      <div className="flex gap-8 mt-2">
        {['Male', 'Female', 'Other'].map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value={option}
              checked={gender === option}
              onChange={() => setGender(option)}
              className="accent-orange-500 w-4 h-4"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

    </div>
    </div>

    {/* Footer Button */}
    <div className="p-6 bg-surface">
      <button
        className="w-full py-4 bg-primary text-white font-bold rounded-2xl disabled:opacity-50 transition-all"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        Next
      </button>
    </div>

  </div>
);

}
