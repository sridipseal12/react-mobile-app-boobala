import { ArrowLeft, Search, Info } from 'lucide-react';
import { useState } from 'react';

interface TestSelectionStepProps {
    patientData: any;
    selectedTests: any[];
    onBack: () => void;
    onNext: (tests: any[]) => void;
}

const TEST_COMBOS = [
    { id: 'c1', name: 'Diabetes Care', price: 500, description: 'Fasting Blood Sugar, HbA1c, Urine Sugar, Lipid Profile', type: 'combo' },
    { id: 'c2', name: 'Thyroid Check', price: 350, description: 'TSH, T3, T4', type: 'combo' },
    { id: 'c3', name: 'Heart Health Package', price: 1200, description: 'Lipid Profile, ECG, ECHO, TMT', type: 'combo' },
    { id: 'c4', name: 'Complete Wellness', price: 2500, description: 'CBC, LFT, KFT, Vitamin D, Vitamin B12', type: 'combo' },
];

const INDIVIDUAL_TESTS = [
    { id: 'i1', name: 'Fasting Blood Sugar', price: 100, type: 'individual', description: 'Glucose levels after fasting' },
    { id: 'i2', name: 'HbA1c', price: 450, type: 'individual', description: '3rd month average glucose' },
    { id: 'i3', name: 'Lipid Profile', price: 600, type: 'individual', description: 'Cholesterol, Triglycerides, HDL, LDL' },
    { id: 'i4', name: 'Thyroid (TSH)', price: 200, type: 'individual', description: 'Thyroid stimulating hormone' },
    { id: 'i5', name: 'Vitamin D', price: 1200, type: 'individual', description: 'Calcium absorption and bone health' },
];

export default function TestSelectionStep({ patientData, selectedTests: initialSelected, onBack, onNext }: TestSelectionStepProps) {
    const [activeTab, setActiveTab] = useState<'Combos' | 'Individual'>('Combos');
    const [selected, setSelected] = useState<any[]>(initialSelected);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleTest = (test: any) => {
        if (selected.find(t => t.id === test.id)) {
            setSelected(selected.filter(t => t.id !== test.id));
        } else {
            setSelected([...selected, test]);
        }
    };

    const totalPrice = selected.reduce((sum, t) => sum + t.price, 0);

    const filteredTests = (activeTab === 'Combos' ? TEST_COMBOS : INDIVIDUAL_TESTS).filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="test-selection-step p-6 flex-grow flex flex-col bg-surface overflow-y-auto h-screen">
            <header className="flex items-center mb-6">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">Book Test</h2>
            </header>

            {/* Patient Summary Header */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100/50 mb-6 flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</p>
                    <p className="text-sm font-bold text-main">{patientData.name}</p>
                </div>
                <div className="flex flex-col gap-1 text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                    <p className="text-sm font-bold text-main">{patientData.phone}</p>
                </div>
            </div>

            <div className="flex flex-col gap-6 flex-grow">
                <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-main px-1 uppercase tracking-widest">Available Tests</h3>

                    {/* Tabs */}
                    <div className="flex bg-gray-100/50 p-1 rounded-2xl">
                        {['Combos', 'Individual'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`flex-grow py-3 text-[10px] font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tests..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-4 pl-12 pr-6 rounded-2xl bg-white border border-gray-100 font-bold text-main focus:border-primary/20 outline-none shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    </div>
                </div>

                {/* Test Cards */}
                <div className="flex flex-col gap-4">
                    {filteredTests.map((test) => {
                        const isSelected = selected.find(t => t.id === test.id);
                        return (
                            <div key={test.id} className="bg-white border border-gray-100/50 rounded-[28px] p-6 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all">
                                <div className="flex flex-col gap-2 flex-grow pr-4">
                                    <h4 className="text-sm font-bold text-main">{test.name}</h4>
                                    {test.description && (
                                        <div className="flex items-start gap-1">
                                            <Info size={10} className="text-gray-300 mt-0.5" />
                                            <p className="text-[9px] text-gray-400 font-medium leading-relaxed italic">{test.description}</p>
                                        </div>
                                    )}
                                    <p className="text-sm font-bold text-primary">₹{test.price}</p>
                                </div>
                                <button
                                    onClick={() => toggleTest(test)}
                                    className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${isSelected
                                        ? 'bg-red-50 text-red-500 border border-red-100'
                                        : 'bg-orange-50 text-primary border border-orange-100'
                                        }`}
                                >
                                    {isSelected ? 'Remove' : 'Add'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer with Price */}
            {selected.length > 0 && (
                <div className="sticky bottom-0 mt-auto pt-6 pb-2 bg-surface">
                    <div className="bg-white rounded-[28px] p-6 shadow-lg border border-gray-100/50 flex items-center justify-between animate-in slide-in-from-bottom-4 duration-300">
                        <div className="flex flex-col">
                            <p className="text-[14px] font-bold text-main">₹{totalPrice}</p>
                            <p className="text-[10px] text-gray-400 font-bold">{selected.length} Test Selected</p>
                        </div>
                        <button
                            onClick={() => onNext(selected)}
                            className="px-8 py-4 bg-primary text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-100 active:scale-[0.98] transition-all"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
