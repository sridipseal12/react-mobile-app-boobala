import { useState } from 'react';
import MobileInputStep from './MobileInputStep';
import PatientFormStep from './PatientFormStep';
import ReviewStep from './ReviewStep';
import OTPVerifyStep from './OTPVerifyStep';
import SuccessStep from './SuccessStep';
import PatientDetailsView from './PatientDetailsView';

type RegistrationStep =
    | 'MOBILE_INPUT'
    | 'PATIENT_FORM'
    | 'REVIEW_DETAILS'
    | 'OTP_VERIFY'
    | 'SUCCESS'
    | 'PATIENT_PROFILE';

export interface PatientData {
    phone: string;
    name: string;
    dob: string;
    gender: 'Male' | 'Female' | 'Other';
    relationship?: string;
    isFamilyMember: boolean;
}

interface RegistrationContainerProps {
    onBack: () => void;
    onConsult?: () => void;
    onViewConsultDetails?: (consult: any) => void;
    onTestBooking: (patient: any) => void;
    initialData?: Partial<PatientData>;
}

export default function RegistrationContainer({ onBack, onConsult, onViewConsultDetails, onTestBooking, initialData }: RegistrationContainerProps) {
    const [step, setStep] = useState<RegistrationStep>('MOBILE_INPUT');
    const [data, setData] = useState<PatientData>({
        phone: initialData?.phone || '',
        name: initialData?.name || '',
        dob: initialData?.dob || '',
        gender: initialData?.gender || 'Male',
        relationship: initialData?.relationship || '',
        isFamilyMember: !!initialData?.isFamilyMember
    });

    const updateData = (newData: Partial<PatientData>) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    const renderStep = () => {
        switch (step) {
            case 'MOBILE_INPUT':
                return (
                    <MobileInputStep
                        onBack={onBack}
                        onSubmit={(phone: string) => {
                            updateData({ phone });
                            setStep('PATIENT_FORM');
                        }}
                    />
                );
            case 'PATIENT_FORM':
                return (
                    <PatientFormStep
                        data={data}
                        onBack={() => setStep('MOBILE_INPUT')}
                        onSubmit={(formData: Partial<PatientData>) => {
                            updateData(formData);
                            setStep('REVIEW_DETAILS');
                        }}
                    />
                );
            case 'REVIEW_DETAILS':
                return (
                    <ReviewStep
                        data={data}
                        onBack={() => setStep('PATIENT_FORM')}
                        onEdit={() => setStep('PATIENT_FORM')}
                        onProceed={() => setStep('OTP_VERIFY')}
                    />
                );
            case 'OTP_VERIFY':
                return (
                    <OTPVerifyStep
                        phone={data.phone}
                        onBack={() => setStep('REVIEW_DETAILS')}
                        onVerify={() => setStep('SUCCESS')}
                    />
                );
            case 'SUCCESS':
                return (
                    <SuccessStep
                        onProceed={() => setStep('PATIENT_PROFILE')}
                    />
                );
            case 'PATIENT_PROFILE':
                return (
                    <PatientDetailsView
                        data={data}
                        onBack={onBack}
                        onConsult={onConsult || (() => { })}
                        onViewPastConsult={onViewConsultDetails}
                        onTestBooking={() => onTestBooking(data)}
                        onAddFamily={() => {
                            // Reset for family member registration flow
                            setData({ ...data, name: '', dob: '', relationship: '', isFamilyMember: true });
                            setStep('PATIENT_FORM');
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="registration-container flex-grow flex flex-col bg-surface">
            {renderStep()}
        </div>
    );
}
