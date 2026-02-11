import { ArrowLeft, CheckCircle2, FlaskConical, ClipboardCheck, Wallet, WifiOff } from 'lucide-react';

interface NotificationScreenProps {
    onBack: () => void;
}

export default function NotificationScreen({ onBack }: NotificationScreenProps) {
    const notifications = [
        {
            id: 1,
            title: 'Walk-in Registered',
            message: 'A walk-in patient has been successfully registered.',
            type: 'success',
            icon: ClipboardCheck,
            iconClass: 'bg-green-50 text-green-600'
        },
        {
            id: 2,
            title: 'Pending Test Details',
            message: 'Consultation has been completed. Proceed with test booking.',
            type: 'info',
            icon: FlaskConical,
            iconClass: 'bg-orange-50 text-primary'
        },
        {
            id: 3,
            title: 'Consultation Completed',
            message: 'Consultation has been completed. Proceed with discharge.',
            type: 'success',
            icon: CheckCircle2,
            iconClass: 'bg-green-50 text-green-600'
        },
        {
            id: 4,
            title: 'Payment Pending',
            message: 'Payment is pending. Please collect and update status.',
            type: 'warning',
            icon: Wallet,
            iconClass: 'bg-yellow-50 text-yellow-600'
        },
        {
            id: 5,
            title: 'Connectivity Issue',
            message: 'Internet connection is unstable. Please check network.',
            type: 'error',
            icon: WifiOff,
            iconClass: 'bg-red-50 text-red-600'
        }
    ];

    return (
        <div className="notification-screen p-6 flex-grow flex flex-col bg-surface h-screen overflow-y-auto">
            <header className="flex items-center mb-6">
                <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ArrowLeft size={24} className="text-main" />
                </button>
                <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main">Notification</h2>
            </header>

            <div className="flex flex-col gap-4">
                {notifications.map((notification) => (
                    <div key={notification.id} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99]">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${notification.iconClass}`}>
                            <notification.icon size={22} />
                        </div>
                        <div className="flex flex-col gap-1 pr-2">
                            <h3 className="text-sm font-bold text-main">{notification.title}</h3>
                            <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 leading-tight">{notification.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
