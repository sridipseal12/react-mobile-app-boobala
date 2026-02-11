import { useState } from 'react';
import PatientSearchStep from './PatientSearchStep.tsx';
import PatientSelectionStep from './PatientSelectionStep.tsx';
import ReasonForVisitStep from './ReasonForVisitStep.tsx';
import PaymentStep from './PaymentStep.tsx';
import PaymentSuccessStep from './PaymentSuccessStep.tsx';
import VitalsStep from './VitalsStep.tsx';

type ConsultationStep =
    | 'SEARCH_PATIENT'
    | 'SELECT_PATIENT'
    | 'REASON_FOR_VISIT'
    | 'PAYMENT'
    | 'PAYMENT_SUCCESS'
    | 'VITALS'
    | 'COMPLETE';

interface ConsultationContainerProps {
    onBack: () => void;
    onRegister: (phone: string) => void;
}

export default function ConsultationContainer({ onBack, onRegister }: ConsultationContainerProps) {
    const [step, setStep] = useState<ConsultationStep>('SEARCH_PATIENT');
    const [consultData, setConsultData] = useState({
        reason: '',
        patientName: '',
        patientPhone: ''
    });

    const renderStep = () => {
        switch (step) {
            case 'SEARCH_PATIENT':
                return (
                    <PatientSearchStep
                        onBack={onBack}
                        onSearch={(phone) => {
                            setConsultData({ ...consultData, patientPhone: phone });
                            setStep('SELECT_PATIENT');
                        }}
                    />
                );
            case 'SELECT_PATIENT':
                return (
                    <PatientSelectionStep
                        phone={consultData.patientPhone}
                        onBack={() => setStep('SEARCH_PATIENT')}
                        onSelect={(patient) => {
                            setConsultData({
                                ...consultData,
                                patientName: patient.name,
                                patientPhone: patient.phone
                            });
                            setStep('REASON_FOR_VISIT');
                        }}
                        onRegister={onRegister}
                    />
                );
            case 'REASON_FOR_VISIT':
                return (
                    <ReasonForVisitStep
                        data={consultData}
                        onBack={() => setStep('SELECT_PATIENT')}
                        onSubmit={(reason: string) => {
                            console.log('Transitioning to PAYMENT with reason:', reason);
                            setConsultData({ ...consultData, reason });
                            setStep('PAYMENT');
                        }}
                    />
                );
            case 'PAYMENT':
                return (
                    <PaymentStep
                        data={consultData}
                        onBack={() => setStep('REASON_FOR_VISIT')}
                        onSuccess={() => setStep('PAYMENT_SUCCESS')}
                    />
                );
            case 'PAYMENT_SUCCESS':
                return (
                    <PaymentSuccessStep
                        onProceed={() => setStep('VITALS')}
                    />
                );
            case 'VITALS':
                return (
                    <VitalsStep
                        data={consultData}
                        onBack={() => setStep('PAYMENT_SUCCESS')}
                        onComplete={onBack} // Done, go Home
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="consultation-container flex-grow flex flex-col bg-surface" data-step={step}>
            {renderStep()}
        </div>
    );
}
