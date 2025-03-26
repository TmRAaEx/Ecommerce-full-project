interface ConfirmModalProps {
    deleteText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({deleteText, onConfirm, onCancel}: ConfirmModalProps) {
    return (
        <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white shadow-2xl border-4 border-black rounded-lg p-5 flex flex-col items-center text-center font-bold text-lg text-blue-600">
            <h1 className="mb-4">{deleteText}</h1>
            <div className="flex gap-4">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                    onClick={onConfirm}
                >
                    YES
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition"
                    onClick={onCancel}
                >
                    NO
                </button>
            </div>
        </div>
    );
}
