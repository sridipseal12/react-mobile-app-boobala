import { useState } from 'react';
import MobileInputScreen from './MobileInputScreen.tsx';
import OTPScreen from './OTPScreen.tsx';
import DashboardContainer from '../dashboard/DashboardContainer';
import authService from '../../api/auth';

type FlowState = 'MOBILE_INPUT' | 'OTP_INPUT' | 'SUCCESS';

export default function LoginContainer() {
    const [flow, setFlow] = useState<FlowState>('MOBILE_INPUT');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMobileSubmit = async (phone: string) => {
        setLoading(true);
        setError('');

        try {
            // Call API to send OTP
            const response = await authService.sendOtp(phone);

            if (response.success) {
                setPhoneNumber(phone);
                setFlow('OTP_INPUT');
            } else {
                setError(response.message);
            }
        } catch (err) {
            console.error('Send OTP error:', err);
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOTPSubmit = async (otp: string) => {
        setLoading(true);
        setError('');

        try {
            // Call API to verify OTP
            const response = await authService.verifyOtp(phoneNumber, otp);

            if (response.success && response.user) {
                // Store user data
                authService.setCurrentUser(response.user);
                setFlow('SUCCESS');
            } else {
                setError(response.message);
            }
        } catch (err) {
            console.error('Verify OTP error:', err);
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setError('');
        setFlow('MOBILE_INPUT');
    };

    if (flow === 'SUCCESS') {
        return <DashboardContainer />;
    }

    return (
        <div className="login-container flex-grow">
            {flow === 'MOBILE_INPUT' ? (
                <MobileInputScreen
                    onSubmit={handleMobileSubmit}
                    error={error}
                    loading={loading}
                />
            ) : (
                <OTPScreen
                    phoneNumber={phoneNumber}
                    onBack={handleBack}
                    onSubmit={handleOTPSubmit}
                    error={error}
                    loading={loading}
                />
            )}
        </div>
    );
}
