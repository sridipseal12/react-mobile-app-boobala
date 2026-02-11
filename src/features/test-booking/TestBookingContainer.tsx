// Test Booking Flow Container
import { useState } from 'react';
import TestSelectionStep from './TestSelectionStep';
import TestPaymentStep from './TestPaymentStep';
import TestSuccessStep from './TestSuccessStep';
import TestPatientSearchStep from './TestPatientSearchStep';

type TestBookingStep = 'SEARCH' | 'SELECTION' | 'PAYMENT' | 'SUCCESS';

interface TestBookingContainerProps {
    patientData: any;
    onBack: () => void;
    onComplete: () => void;
    onRegister: (phone: string) => void;
}

export default function TestBookingContainer({ patientData, onBack, onComplete, onRegister }: TestBookingContainerProps) {
    const [step, setStep] = useState<TestBookingStep>(patientData ? 'SELECTION' : 'SEARCH');
    const [selectedPatient, setSelectedPatient] = useState<any>(patientData);
    const [selectedTests, setSelectedTests] = useState<any[]>([]);

    const renderStep = () => {
        switch (step) {
            case 'SEARCH':
                return (
                    <TestPatientSearchStep
                        onBack={onBack}
                        onSelect={(patient) => {
                            setSelectedPatient(patient);
                            setStep('SELECTION');
                        }}
                        onRegister={onRegister}
                    />
                );
            case 'SELECTION':
                return (
                    <TestSelectionStep
                        patientData={selectedPatient}
                        selectedTests={selectedTests}
                        onBack={onBack}
                        onNext={(tests: any[]) => {
                            setSelectedTests(tests);
                            setStep('PAYMENT');
                        }}
                    />
                );
            case 'PAYMENT':
                return (
                    <TestPaymentStep
                        selectedTests={selectedTests}
                        onBack={() => setStep('SELECTION')}
                        onSuccess={() => setStep('SUCCESS')}
                    />
                );
            case 'SUCCESS':
                return (
                    <TestSuccessStep
                        amount={selectedTests.reduce((sum, t) => sum + t.price, 0)}
                        onFinish={onComplete}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="test-booking-container flex-grow flex flex-col bg-surface">
            {renderStep()}
        </div>
    );
}
