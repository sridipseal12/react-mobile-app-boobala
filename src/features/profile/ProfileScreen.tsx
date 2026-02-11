import { ArrowLeft, ChevronRight, HelpCircle, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import LogoutModal from '../../components/LogoutModal.tsx';
import profileService, { ProfileData } from '../../api/profile';
import authService from '../../api/auth';

interface ProfileScreenProps {
    onBack: () => void;
    onNavigateFAQ: () => void;
}

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
                    setProfile(data);
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
        <div className="profile-screen p-6 flex-grow flex flex-col">
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

            <div className="profile-info flex flex-col gap-6 mb-10">
                <div className="info-item">
                    <p className="text-gray text-xs mb-1">Name</p>
                    <p className="font-bold text-main">{profile?.name || '-'}</p>
                </div>
                <div className="info-item">
                    <p className="text-gray text-xs mb-1">Phone Number</p>
                    <p className="font-bold text-main">{profile?.phone || '-'}</p>
                </div>
                <div className="info-item">
                    <p className="text-gray text-xs mb-1">Centre Name</p>
                    <p className="font-bold text-main">{profile?.centreName || '-'}</p>
                </div>
                <div className="info-item">
                    <p className="text-gray text-xs mb-1">Tvam ID</p>
                    <p className="font-bold text-main">{profile?.tvamId || '-'}</p>
                </div>
            </div>

            <div className="actions-section">
                <h3 className="text-main font-bold mb-5">Actions</h3>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={onNavigateFAQ}
                        className="flex items-center gap-4 p-3 border rounded-2xl bg-gray-50/50 w-full text-left active:scale-[0.98] transition-all"
                    >
                        <div className="p-2 bg-white rounded-lg text-gray border border-gray-100 flex items-center justify-center">
                            <HelpCircle size={20} />
                        </div>
                        <span className="flex-grow font-bold text-sm">FAQ's</span>
                        <ChevronRight size={18} className="text-primary" />
                    </button>

                    <button
                        onClick={() => setShowLogout(true)}
                        className="flex items-center gap-4 p-3 border rounded-2xl bg-gray-50/50 w-full text-left active:scale-[0.98] transition-all"
                    >
                        <div className="p-2 bg-white rounded-lg text-gray border border-gray-100 flex items-center justify-center">
                            <LogOut size={20} />
                        </div>
                        <span className="flex-grow font-bold text-sm">Logout</span>
                        <ChevronRight size={18} className="text-primary" />
                    </button>
                </div>
            </div>

            <div className="mt-auto text-center py-6">
                <p className="text-gray text-xs mb-2">For help & support</p>
                <p className="text-primary font-bold flex items-center justify-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center border border-primary rounded-full text-[10px]">📞</span>
                    1800 8567 2907
                </p>
            </div>

            {showLogout && (
                <LogoutModal
                    onConfirm={handleLogout}
                    onCancel={() => setShowLogout(false)}
                />
            )}
        </div>
    );
}
