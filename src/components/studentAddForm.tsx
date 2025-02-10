import { useState } from "react";
import Modal from "./Modal";
import useIsTeacher from "@/app/hooks/useIsTeacher";
import { addDoc, collection } from "firebase/firestore";
import { useParams } from "next/navigation";
import { auth, db } from "../Firebase";

type StudentAddProps = {
    isOpen: boolean;
    onClose: () => void;
    course: any;
};

export default function StudentAdd({ isOpen, onClose, course }: StudentAddProps) {
    const [firstName, setFirstName] = useState<string>("");
    const params = useParams()
    const [lastName, setLastName] = useState<string>("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addDoc(collection(db, `linkCourses/${params.id}`, "students"), { firstName, lastName });
        onClose(); // Modal'ı kapatma
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Ad
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Soyad
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Kapat
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Gönder
                    </button>
                </div>
            </form>
        </Modal>
    );
}
