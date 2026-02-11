export default function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
    return (
        <div className="modal-overlay fixed inset-0 modal-backdrop flex items-end justify-center z-50">
            <div className="modal-content bg-white w-full max-w-[480px] p-6 pb-12 rounded-t-[32px] flex flex-col gap-8 animate-slide-up shadow-2xl">
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto"></div>

                <div className="text-center">
                    <h3 className="text-xl font-bold text-main px-4">Are you sure want to Log out?</h3>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={onConfirm}
                        className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-200 hover:bg-primary-hover active:scale-[0.98] transition-all"
                    >
                        Yes, Log out
                    </button>

                    <button
                        onClick={onCancel}
                        className="w-full py-4 border-2 border-primary text-primary font-bold rounded-2xl active:scale-[0.98] transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
