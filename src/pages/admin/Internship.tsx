import { useState, useEffect } from "react";
import { Trash2, Eye } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";
import axios from "axios";

// ✅ Type
interface Internship {
    id: number;
    name: string;
    email: string;
    phone: string;
    college: string;
    degree: string;
    city: string;
    motivation: string;
    created_at?: string;
    test_answers?: string;
}

const InternshipPage = () => {
    const [data, setData] = useState<Internship[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Internship | null>(null);

    const toastStyle = {
        duration: 1000,
        position: "top-right" as const,
        style: { background: "#0B41E3", color: "#fff", fontWeight: "bold" },
    };

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            const res = await axios.get<{ data: Internship[] }>(
                "http://localhost:8090/api/internship"
            );
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ Delete
    const handleDelete = (id: number) => {
        setData(data.filter((item) => item.id !== id));
        toast.success("Deleted successfully!", toastStyle);
    };

    // ✅ View More
    const handleViewMore = (item: Internship) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 relative">
            <Toaster />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-900">
                    Internship Applications
                </h1>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-sm">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Phone</th>
                            <th className="px-6 py-3 text-left">College</th>
                            <th className="px-6 py-3 text-left">Degree</th>
                            <th className="px-6 py-3 text-left">City</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-3">{item.id}</td>
                                    <td className="px-6 py-3 font-semibold">{item.name}</td>
                                    <td className="px-6 py-3">{item.email}</td>
                                    <td className="px-6 py-3">{item.phone}</td>
                                    <td className="px-6 py-3">{item.college}</td>
                                    <td className="px-6 py-3">{item.degree}</td>
                                    <td className="px-6 py-3">{item.city}</td>

                                    <td className="px-6 py-3 flex justify-center gap-3">

                                        {/* Delete */}
                                        {/* <button
                                            onClick={() => handleDelete(item.id)}
                                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button> */}

                                        {/* View More */}
                                        <button
                                            onClick={() => handleViewMore(item)}
                                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-4">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Modal */}
            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {/* <div className="bg-white w-[90%] max-w-3xl p-5 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]"> */}
                    <div className="bg-white w-[95%] max-w-5xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">

                        {/* Header with Close Icon */}
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h2 className="text-xl font-bold">User Details</h2>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-red-500 transition"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-lg border">
                            <table className="w-full text-sm">
                                <tbody>

                                    <tr className="border-b">
                                        <td className="bg-gray-100 px-4 py-2 font-medium w-1/3">Name</td>
                                        <td className="px-4 py-2">{selectedItem.name}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="bg-gray-100 px-4 py-2 font-medium">Email</td>
                                        <td className="px-4 py-2">{selectedItem.email}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="bg-gray-100 px-4 py-2 font-medium">Phone</td>
                                        <td className="px-4 py-2">{selectedItem.phone}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="bg-gray-100 px-4 py-2 font-medium">College</td>
                                        <td className="px-4 py-2">{selectedItem.college}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="bg-gray-100 px-4 py-2 font-medium">Degree</td>
                                        <td className="px-4 py-2">{selectedItem.degree}</td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="bg-gray-100 px-4 py-2 font-medium">City</td>
                                        <td className="px-4 py-2">{selectedItem.city}</td>
                                    </tr>

                                    <tr>
                                        <td className="bg-gray-100 px-4 py-2 font-medium">Motivation</td>
                                        <td className="px-4 py-2">{selectedItem.motivation}</td>
                                    </tr>

                                    {/* Optional created_at */}
                                    {selectedItem.created_at && (
                                        <tr className="border-t">
                                            <td className="bg-gray-100 px-4 py-2 font-medium">
                                                Created At
                                            </td>
                                            <td className="px-4 py-2">
                                                {new Date(selectedItem.created_at).toLocaleString()}
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>


                        {/* Test Answers */}
                        {selectedItem.test_answers && (
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg mb-2">Test Answers:</h3>

                                {Object.entries(JSON.parse(selectedItem.test_answers)).map(
                                    ([section, questions]: any, i) => (
                                        <div key={i} className="mb-4">
                                            <h4 className="font-semibold text-blue-600 mb-2">
                                                {section}
                                            </h4>

                                            {Object.entries(questions).map(
                                                ([q, ans]: any, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-gray-100 p-2 rounded mb-2"
                                                    >
                                                        <p className="text-sm">
                                                            <strong>Q:</strong> {q}
                                                        </p>
                                                        <p className="text-sm text-green-700">
                                                            <strong>A:</strong> {ans}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* Close */}
                        <div className="text-right">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default InternshipPage;