import { ArrowLeft, ChevronRight, HelpCircle, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import LogoutModal from '../../components/LogoutModal.tsx';
import profileService, { ProfileData } from '../../api/profile';
import callerIcon from '../../assets/caller-icon.png';
import authService from '../../api/auth';

interface ProfileScreenProps {
    onBack: () => void;
    onNavigateFAQ: () => void;
}

const DEFAULT_PROFILE: ProfileData = {
    userId: 1,
    name: 'Sanchit',
    phone: '9087654321',
    centreName: 'Mahadevapuram',
    tvamId: 'TV0075',
    role: 'Operator',
};

export default function ProfileScreen({ onBack, onNavigateFAQ }: ProfileScreenProps) {
    const [showLogout, setShowLogout] = useState(false);
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                // First try to get user from localStorage (logged in user)
                const currentUser = authService.getCurrentUser();
                console.log("Current user:", currentUser);
                if (currentUser) {
                    setProfile({
                        userId: currentUser.userId,
                        name: currentUser.name,
                        phone: currentUser.phone,
                        centreName: currentUser.centreName,
                        tvamId: currentUser.tvamId,
                        role: currentUser.role,
                    });
                } else {
                    // Fallback: fetch from API (default user ID 1 for demo)
                    const data = await profileService.getProfile(1);
                    setProfile(
                        data && data.name
                            ? data
                            : DEFAULT_PROFILE
                    );
                }
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                setError('Failed to load profile data');
                // Set default data if API fails
                setProfile({
                    userId: 1,
                    name: 'Sanchit',
                    phone: '9087654321',
                    centreName: 'Mahadevapuram',
                    tvamId: 'TV0075',
                    role: 'Operator',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        authService.logout();
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="profile-screen p-6 flex-grow flex items-center justify-center">
                <p className="text-gray">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-screen min-h-screen bg-gray-100 flex flex-col">
            <div className="p-6 flex-grow flex flex-col">
                <header className="flex items-center mb-8">
                    <button onClick={onBack} className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center">
                        <ArrowLeft size={24} className="text-main" />
                    </button>
                    <h2 className="flex-grow text-center text-lg font-bold mr-12">Profile Details</h2>
                </header>

                {error && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-yellow-700 text-sm">{error} (using cached data)</p>
                    </div>
                )}

                <div className="profile-info bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-2 gap-y-6 gap-x-10">
                        
                        <div>
                        <p className="text-gray-400 text-sm">Name</p>
                        <p className="font-bold text-main text-base mb-4">
                            {profile?.name || '-'}
                        </p>
                        </div>

                        <div>
                        <p className="text-gray-400 text-sm">Phone Number</p>
                        <p className="font-bold text-main text-base">
                            {profile?.phone || '-'}
                        </p>
                        </div>

                        <div>
                        <p className="text-gray-400 text-sm">Centre Name</p>
                        <p className="font-bold text-main text-base">
                            {profile?.centreName || '-'}
                        </p>
                        </div>

                        <div>
                        <p className="text-gray-400 text-sm">Tvam ID</p>
                        <p className="font-bold text-main text-base">
                            {profile?.tvamId || '-'}
                        </p>
                        </div>

                    </div>
                </div>

                <div className="actions-section mb-10">
                <h3 className="text-main font-bold text-lg mb-4">Actions</h3>

                <div className="bg-white rounded-2xl shadow-sm pt-3 pb-3">

                    <button
                    onClick={onNavigateFAQ}
                    className="flex items-center justify-between w-full px-6 py-4 gap-4"
                    >
                    <div className="flex items-center gap-4">
                        <div className="w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                            <HelpCircle size={18} className="text-gray-500" style={{height: '40px'}}/>
                        </div>

                        <span className="flex-1 text-left font-semibold text-base text-main">
                            FAQ's
                        </span>
                    </div>
                    <ChevronRight size={18} className="text-orange-500 shrink-0 ml-auto"/>
                    </button>

                    <button
                    onClick={() => setShowLogout(true)}
                    className="flex items-center justify-between w-full px-6 py-4 gap-4"
                    >
                    <div className="flex items-center gap-4">
                        <div className="w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                            <LogOut size={18} className="text-gray-500" style={{height: '40px'}}/>
                        </div>

                        <span className="flex-1 text-left font-semibold text-base text-main">
                            Logout
                        </span>
                    </div>

                    <ChevronRight size={18} className="text-orange-500 shrink-0" />
                    </button>
                </div>
                </div>

                {showLogout && (
                    <LogoutModal
                        onConfirm={handleLogout}
                        onCancel={() => setShowLogout(false)}
                    />
                )}
            </div>

            <div className="p-6 bg-gray-100">
                <div className="bg-white rounded-2xl shadow-sm text-center pt-6 pb-6">
                    <p className="text-gray-400 text-sm mb-2 ">
                    For Help & support:
                    </p>

                    <div className="flex items-center justify-center gap-3 font-bold text-lg text-main">
                    <img className="w-7 h-7 flex items-center justify-center" src={callerIcon} alt="Caller Icon" />
                    1800 8567 2907
                    </div>
                </div>
            </div>
        </div>
    );
}
