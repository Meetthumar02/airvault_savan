import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URI from "@/config";

const Internship = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        degree: "",
        city: "",
        motivation: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [questionsList, setQuestionsList] = useState([0]);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(60);
    const [lockedQuestions, setLockedQuestions] = useState({});

    const sections = [
        {
            title: "Section A - Air freight fundamentals",
            questions: [
                {
                    question: "What does AWB stand for in air freight?",
                    options: ["Airway Bill", "Air Waybill", "Advanced Weight Bill", "Airfreight Weight Booking"],
                },
                {
                    question: "Which organisation sets international standards for air cargo transport?",
                    options: ["WTO", "IATA", "WHO", "IMO"],
                },
                {
                    question: "What is the standard unit used to calculate chargeable weight in air freight?",
                    options: ["Gross weight only", "Volumetric or actual weight, whichever is higher", "Net weight only", "Declared weight only"],
                },
                {
                    question: "What is the volumetric weight divisor used in air freight (IATA standard)?",
                    options: ["4,000", "5,000", "6,000", "3,000"],
                },
                {
                    question: "Which cargo requires a Shipper's Declaration for Dangerous Goods?",
                    options: ["Perishable goods", "Hazardous materials (DG cargo)", "Live animals", "Valuable goods"],
                },
                {
                    question: "What does ULD stand for in aviation cargo?",
                    options: ["Unit Load Device", "Unified Logistics Dispatch", "Universal Loading Document", "Unit Logistics Data"],
                },
                {
                    question: "Which IATA cargo class covers human remains?",
                    options: ["VAL", "HUM", "AVI", "PER"],
                },
                {
                    question: "What is 'freight all kinds' (FAK) in air cargo?",
                    options: ["A rate applied regardless of commodity", "A type of ULD container", "A customs clearance process", "A dangerous goods category"],
                },
                {
                    question: "Primary difference between express cargo and standard air freight?",
                    options: ["Express uses dedicated aircraft", "Express offers faster transit with guaranteed timelines", "Express is only for documents", "Express needs no customs clearance"],
                },
                {
                    question: "Which document is a contract of carriage between shipper and airline?",
                    options: ["Commercial Invoice", "Packing List", "Air Waybill", "Bill of Lading"],
                }
            ]
        },
        {
            title: "Section B - Indian aviation & regulatory framework",
            questions: [
                {
                    question: "Which government body regulates civil aviation in India?",
                    options: ["AAI", "DGCA", "MoCA", "BCAS"],
                },
                {
                    question: "AAI stands for?",
                    options: ["Airport Authority of India", "Airports Authority of India", "Aviation Authority of India", "Air Authority of India"],
                },
                {
                    question: "Which is the busiest cargo airport in India by volume?",
                    options: ["Delhi IGI Airport", "Bengaluru Kempegowda Airport", "Mumbai CSIA Airport", "Chennai Anna Airport"],
                },
                {
                    question: "BCAS stands for?",
                    options: ["Bureau of Civil Aviation Security", "Board of Central Aviation Safety", "Bureau of Cargo Aviation Standards", "Board of Civil Airspace Security"],
                },
                {
                    question: "Under which ministry does DGCA operate?",
                    options: ["Ministry of Commerce", "Ministry of Finance", "Ministry of Civil Aviation", "Ministry of Transport"],
                },
                {
                    question: "Which Indian airline operates a dedicated freighter fleet?",
                    options: ["IndiGo", "SpiceJet", "Vistara", "Blue Dart Aviation"],
                },
                {
                    question: "What is IATA's e-freight initiative designed to do?",
                    options: ["Enable online flight booking", "Replace paper cargo documents with electronic equivalents", "Track passenger baggage", "Automate customs"],
                },
                {
                    question: "India's SEZs offer what primary advantage to logistics companies?",
                    options: ["Lower fuel prices", "Tax exemptions and simplified customs procedures", "Free air cargo", "Unlimited warehouse space"],
                },
                {
                    question: "CIAL refers to which Indian airport?",
                    options: ["Chennai International Airport Ltd", "Cochin International Airport Limited", "Central India Aerodrome Ltd", "Calcutta International Airport Ltd"],
                },
                {
                    question: "Which organisation manages air cargo security screening in India?",
                    options: ["DGCA", "AAI", "BCAS", "Customs Dept."],
                },

            ]
        },
        {
            title: "Section C - Logistics & supply chain",
            questions: [
                {
                    question: "What does 3PL stand for in logistics?",
                    options: ["Third-Party Logistics", "Three-Point Logistics", "Triple Package Logistics", "Three-Part Loading"],
                },
                {
                    question: "Which Incoterm places maximum responsibility on the seller?",
                    options: ["EXW", "FOB", "DDP", "CIF"],
                },
                {
                    question: "What is the 'last mile' in logistics?",
                    options: ["The longest supply chain segment", "Final delivery from distribution centre to customer", "The customs clearance process", "The last flight of the day"],
                },
                {
                    question: "What does FIFO stand for in warehouse management?",
                    options: ["First In First Out", "First Invoice First Order", "Freight In Free Out", "Fast Inventory For Orders"],
                },
                {
                    question: "Cold chain logistics refers to?",
                    options: ["Logistics during winter months", "Temperature-controlled supply chain for perishable goods", "Air freight only logistics", "Night-time cargo movement"],
                },
                {
                    question: "What is cross-docking in logistics?",
                    options: ["Loading cargo onto two planes", "Transferring cargo directly from inbound to outbound without storage", "Customs examination", "Splitting a shipment"],
                },
                {
                    question: "Which Indian government scheme aims to improve logistics infrastructure?",
                    options: ["Make in India", "NIRVIK", "PM Gati Shakti", "Digital India"],
                },
                {
                    question: "What does POD stand for in logistics?",
                    options: ["Point of Dispatch", "Proof of Delivery", "Port of Departure", "Package on Demand"],
                },
                {
                    question: "Primary advantage of multimodal transport?",
                    options: ["Cheapest option", "Combines multiple modes for efficiency and cost optimisation", "Uses only air and sea", "Eliminates customs"],
                },
                {
                    question: "Which document does a freight forwarder issue as contract of carriage?",
                    options: ["House Air Waybill (HAWB)", "Master Air Waybill (MAWB)", "Commercial Invoice", "Packing List"],
                }
            ],
        },
        {
            title: "Section D - Documentation & compliance",
            questions: [
                {
                    question: "Purpose of a Certificate of Origin?",
                    options: ["Certifies the weight of goods", "Certifies the country where goods were manufactured", "Lists shipment contents", "Confirms payment"],
                },
                {
                    question: "GST on international air freight for exports in India?",
                    options: ["18%", "12%", "0% (exempt)", "5%"],
                },
                {
                    question: "IGST stands for?",
                    options: ["Integrated Goods & Services Tax", "Internal Goods & Services Tariff", "Indian Goods & Supply Tax", "International GST"],
                },
                {
                    question: "What is an IEC in the context of Indian exports?",
                    options: ["Import Export Code", "International Electronic Certificate", "Integrated Entry Code", "India Export Clearance"],
                },
                {
                    question: "Which document does Indian customs require to release imported air cargo?",
                    options: ["Only the invoice", "Bill of Entry", "Air Waybill only", "Packing list only"],
                },
                {
                    question: "ICEGATE is an Indian government portal used for?",
                    options: ["Aircraft booking", "E-filing of customs documents", "Cargo insurance", "Freight rate comparison"],
                },
                {
                    question: "What does ETA stand for in shipping?",
                    options: ["Estimated Time of Arrival", "Expected Transport Amount", "Extended Transit Agreement", "Earliest Terminal Availability"],
                },
                {
                    question: "Which international convention governs liability for international air cargo?",
                    options: ["Hamburg Rules", "Rotterdam Rules", "Montreal Convention", "Warsaw Treaty"],
                },
                {
                    question: "A Letter of Credit (LC) in international trade is issued by?",
                    options: ["The exporter's lawyer", "The buyer's bank on behalf of the buyer", "The freight forwarder", "The airline"],
                },
                {
                    question: "What is the CITES convention relevant to in air cargo?",
                    options: ["Chemical cargo regulations", "International trade in endangered species", "Customs tariff standards", "Air cargo insurance rules"],
                }
            ],
        },
    ];

    const questions = sections.flatMap(s => s.questions);
    const sectionTitles = sections.flatMap(s => s.questions.map(() => s.title));

    const currentIndex = questionsList.length - 1;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ FORM SUBMIT (NO REDIRECT)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${BASE_URI}/api/internship`, form);

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Form submitted!",
                showConfirmButton: false,
                timer: 2000,
            });

            setSubmitted(true);

        } catch (error) {

            let errorMessage = "Error submitting form";

            // ✅ Backend se actual message lo
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

    // ✅ TIMER
    useEffect(() => {
        if (!submitted) return;

        if (timeLeft === 0) {
            if (currentIndex === questions.length - 1) {
                handleFinalSubmit(); // 🔥 last question auto submit
            } else {
                handleNext();
            }
            return;
        }
        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, submitted]);

    // ✅ SELECT
    const handleSelect = (qIndex, opt) => {
        if (lockedQuestions[qIndex]) return;

        setAnswers((prev) => ({
            ...prev,
            [qIndex]: opt,
        }));
    };

    // ✅ FINAL SUBMIT (TOAST ONLY)
    const handleFinalSubmit = async () => {
        try {
            let globalIndex = 0;
            const formattedAnswers = {};

            sections.forEach((section) => {
                const sectionData = {};

                section.questions.forEach((q) => {
                    sectionData[q.question] = answers[globalIndex] || "None";
                    globalIndex++;
                });

                formattedAnswers[section.title] = sectionData;
            });

            await axios.post(`${BASE_URI}/api/internship/submit-test`, {
                email: form.email,
                answers: formattedAnswers,
            });

            // ✅ TOAST
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Test submitted successfully!",
                showConfirmButton: false,
                timer: 2000,
            });

            // 🔥 REDIRECT AFTER SUBMIT
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);

        } catch {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Submit failed",
                timer: 2000,
            });
        }
    };

    // ✅ NEXT
    const handleNext = () => {

        setLockedQuestions((prev) => ({
            ...prev,
            [currentIndex]: true,
        }));

        setTimeLeft(60);

        if (currentIndex < questions.length - 1) {
            setQuestionsList([...questionsList, currentIndex + 1]);
        } else {
            handleFinalSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f7fc] py-10 px-6">
            <div className="w-full bg-white rounded-xl shadow">

                {/* HEADER */}
                <div className="bg-[#0057b8] text-white px-8 py-6 rounded-t-xl">
                    <h1 className="text-xl font-semibold">Internship Application</h1>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="p-3 border rounded-lg" required />
                        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-3 border rounded-lg" required />
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-3 border rounded-lg" required />
                        <input name="college" value={form.college} onChange={handleChange} placeholder="College" className="p-3 border rounded-lg" />
                        <input name="degree" value={form.degree} onChange={handleChange} placeholder="Degree" className="p-3 border rounded-lg" />
                        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="p-3 border rounded-lg" />
                    </div>

                    <textarea name="motivation" value={form.motivation} onChange={handleChange} className="w-full mt-4 p-3 border rounded-lg" placeholder="Motivation"></textarea>

                    <div className="mt-6 flex justify-end">
                        <button
                            disabled={submitted}
                            className={`px-8 py-3 rounded-lg text-white 
                            ${submitted ? "bg-gray-400 cursor-not-allowed" : "bg-[#0057b8]"}`}
                        >
                            Continue →
                        </button>
                    </div>
                </form>

                {/* QUIZ */}
                {submitted && (
                    <div className="px-8 pb-8 border-t">

                        {questionsList.map((qIndex, idx) => {

                            const currentSection = sectionTitles[qIndex];
                            const prevSection = sectionTitles[questionsList[idx - 1]];
                            const isNewSection = idx === 0 || currentSection !== prevSection;

                            const [label, title] = currentSection.split(" - ");

                            return (
                                <div key={idx}>

                                    {isNewSection && (
                                        <div className="flex items-center gap-3 mt-6 mb-3">
                                            <span className="bg-[#0D2DD0] text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                {label}
                                            </span>
                                            <h2 className="text-lg font-semibold">{title}</h2>
                                        </div>
                                    )}

                                    <div className="border rounded-xl p-5 mb-4 bg-white shadow-sm">

                                        <p className="mb-3 font-medium">
                                            {questions[qIndex].question}
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-3">
                                            {questions[qIndex].options.map((opt, i) => (
                                                <label key={i} className={`p-3 border rounded-lg cursor-pointer ${answers[qIndex] === opt ? "bg-blue-50 border-blue-500" : ""}`}>
                                                    <input
                                                        type="radio"
                                                        checked={answers[qIndex] === opt}
                                                        onChange={() => handleSelect(qIndex, opt)}
                                                    />
                                                    <span className="ml-2">{opt}</span>
                                                </label>
                                            ))}
                                        </div>

                                        {idx === currentIndex && (
                                            <div className="flex justify-between mt-4">
                                                <p className="text-red-500">⏱ {timeLeft}s</p>
                                                <button
                                                    onClick={handleNext}
                                                    className="bg-[#0057b8] text-white px-4 py-2 rounded"
                                                >
                                                    Next →
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            );
                        })}

                    </div>
                )}

            </div>
        </div>
    );
};

export default Internship;