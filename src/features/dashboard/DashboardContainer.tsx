import { useState } from 'react';
import Home from '../home/Home';
import ProfileScreen from '../profile/ProfileScreen';
import FAQScreen from '../profile/FAQScreen';
import RegistrationContainer from '../registration/RegistrationContainer';
import ConsultationContainer from '../consultation/ConsultationContainer';
import ConsultationDetailsView from '../consultation/ConsultationDetailsView';
import TestBookingContainer from '../test-booking/TestBookingContainer';


import PatientDetailsView from '../registration/PatientDetailsView';

import TestDetailsView from '../test-booking/TestDetailsView';

import NotificationScreen from '../notifications/NotificationScreen';

type AuthFlowState = 'HOME' | 'PROFILE' | 'FAQ' | 'REGISTRATION' | 'CONSULTATION' | 'CONSULTATION_DETAILS' | 'TEST_BOOKING' | 'PATIENT_DETAILS' | 'TEST_DETAILS' | 'NOTIFICATIONS';

export default function DashboardContainer() {
    const [view, setView] = useState<AuthFlowState>('HOME');
    const [prefillPhone, setPrefillPhone] = useState('');
    const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);

    const handleRegisterFromConsult = (phone: string = '') => {
        setPrefillPhone(phone);
        setView('REGISTRATION');
    };

    const handleViewConsultDetails = (consultation: any) => {
        setSelectedConsultation(consultation);
        setView('CONSULTATION_DETAILS');
    };

    const handleOpenTestBooking = (patientData?: any) => {
        setSelectedPatient(patientData || null);
        setView('TEST_BOOKING');
    };

    const handleSelectPatient = (patient: any) => {
        setSelectedPatient(patient);
        setView('PATIENT_DETAILS');
    };

    const renderView = () => {
        switch (view) {
            case 'HOME':
                return (
                    <Home
                        onOpenProfile={() => setView('PROFILE')}
                        onRegisterPatient={(phone) => handleRegisterFromConsult(phone)}
                        onConsultation={() => setView('CONSULTATION')}
                        onViewConsultDetails={handleViewConsultDetails}
                        onTestBooking={() => handleOpenTestBooking()}
                        onSelectPatient={handleSelectPatient}
                        onOpenNotifications={() => setView('NOTIFICATIONS')}
                    />
                );
            case 'PATIENT_DETAILS':
                return (
                    <PatientDetailsView
                        data={selectedPatient || { name: 'Aarav Patel', phone: '9087654321' }}
                        onBack={() => setView('HOME')}
                        onConsult={() => {
                            // Start consultation for this patient
                            // We might want to pass this patient to consultation flow
                            setView('CONSULTATION');
                        }}
                        onTestBooking={() => handleOpenTestBooking(selectedPatient)}
                        onAddFamily={() => setView('REGISTRATION')}
                        onViewTestDetails={() => setView('TEST_DETAILS')}
                    />
                );
            case 'TEST_DETAILS':
                return (
                    <TestDetailsView
                        onBack={() => setView('PATIENT_DETAILS')}
                    />
                );
            case 'NOTIFICATIONS':
                return (
                    <NotificationScreen
                        onBack={() => setView('HOME')}
                    />
                );
            case 'PROFILE':
                return (
                    <ProfileScreen
                        onBack={() => setView('HOME')}
                        onNavigateFAQ={() => setView('FAQ')}
                    />
                );
            case 'FAQ':
                return <FAQScreen onBack={() => setView('PROFILE')} />;
            case 'REGISTRATION':
                return (
                    <RegistrationContainer
                        initialData={{ phone: prefillPhone }}
                        onBack={() => setView('HOME')}
                        onConsult={() => setView('CONSULTATION')}
                        onViewConsultDetails={handleViewConsultDetails}
                        onTestBooking={(patient) => handleOpenTestBooking(patient)}
                    />
                );
            case 'CONSULTATION':
                return (
                    <ConsultationContainer
                        onBack={() => setView('HOME')}
                        onRegister={handleRegisterFromConsult}
                    />
                );
            case 'CONSULTATION_DETAILS':
                return (
                    <ConsultationDetailsView
                        data={selectedConsultation}
                        onBack={() => setView('HOME')}
                    />
                );
            case 'TEST_BOOKING':
                return (
                    <TestBookingContainer
                        patientData={selectedPatient}
                        onBack={() => setView('HOME')}
                        onComplete={() => setView('HOME')}
                        onRegister={handleRegisterFromConsult}
                    />
                );
            default:
                return (
                    <Home
                        onOpenProfile={() => setView('PROFILE')}
                        onRegisterPatient={(phone) => handleRegisterFromConsult(phone)}
                        onConsultation={() => setView('CONSULTATION')}
                        onViewConsultDetails={handleViewConsultDetails}
                        onTestBooking={() => handleOpenTestBooking()}
                        onSelectPatient={handleSelectPatient}
                        onOpenNotifications={() => setView('NOTIFICATIONS')}
                    />
                );
        }
    };

    return (
        <div className="dashboard-container flex-grow flex flex-col">
            {renderView()}
        </div>
    );
}
