import React, { useState } from "react";

const FAQ_Data = [
  {
    id: 1,
    question: "How can I set up my profile on QikGro?",
    answer:
      "Simply click the provided link and complete the registration form. This will enable you to receive notifications about upcoming campaigns tailored to your niche.",
  },
  {
    id: 2,
    question:
      "Is it possible to include multiple social media handles on QikGro?",
    answer:
      "Definitely, you can add your multiple accounts available on multiple social media platforms",
  },
  {
    id: 3,
    question: "What are the benefits of registering with QikGro?",
    answer:
      "QikGrow facilitates a direct connection between brands and influencers, eliminating the need for any middleman involvement. Hence, increased earnings through brand collaborations.",
  },
  {
    id: 4,
    question: "Can other influencers see the campaigns I applied for?",
    answer:
      "Nope! Your details remain private and will NEVER be shared to other influencers.",
  },
];
const FAQ: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setActiveQuestion((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div className="bg-gray-100 min-h-full  py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-5xl items-center flex flex-col  text-ri-orange tracking-tight mb-8 ">
            FAQs
          </h2>
          <h1 className="text-2xl font-bold mb-4 text-center text-ri-blue">
            Frequently Asked Questions
          </h1>
          {FAQ_Data.map((item) => (
            <div key={item.id} className="border-b p-4">
              <div
                className="cursor-pointer flex justify-between items-center"
                onClick={() => toggleQuestion(item.id)}
              >
                <h2 className="font-semibold text-xl">{item.question}</h2>
                <span className="text-2xl font-bold text-[#4267b2]">
                  {activeQuestion === item.id ? "-" : "+"}
                </span>
              </div>
              <div
                className={`mt-2 text-gray-700 overflow-hidden transition-max-height ease-in-out duration-700 ${
                  activeQuestion === item.id ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;
