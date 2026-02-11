import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How do I register a new patient?",
        answer: "To register a new patient, navigate to the Home screen and click on the 'Register Patient' icon. Fill in the required details like Name, Age, and Contact info to proceed."
    },
    {
        question: "How do I book a test?",
        answer: "You can book diagnostic tests by clicking on 'Smart Diagnosis' on the Home screen. Select the required test and confirm the patient details."
    },
    {
        question: "How do I view previous test reports?",
        answer: "Previous test reports can be found in the Patient History section. Search for the patient by ID and click on 'Reports'."
    },
    {
        question: "How do I add or select a family member?",
        answer: "After entering the mobile number, all linked family members will be shown. You can select an existing member or add a new one if needed."
    }
];

export default function FAQScreen({ onBack }: { onBack: () => void }) {
    const [openIndex, setOpenIndex] = useState<number | null>(3); // Standard behavior: one open by default as in screenshot

    return (
        <div className="faq-screen p-6 flex-grow flex flex-col bg-white">
            <header className="flex items-center mb-8">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12">FAQ's</h2>
            </header>

            <div className="faq-list flex flex-col gap-4">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div key={idx} className="faq-item border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:border-gray-200">
                            <button
                                className="w-full flex items-center justify-between p-4 text-left font-bold text-sm"
                                onClick={() => setOpenIndex(isOpen ? null : idx)}
                            >
                                <span className={isOpen ? 'text-primary' : 'text-main'}>{faq.question}</span>
                                {isOpen ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-gray" />}
                            </button>
                            {isOpen && (
                                <div className="px-4 pb-5 text-[11px] text-gray leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
