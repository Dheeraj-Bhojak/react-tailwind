import React from "react";

/**
 * FAQ
 * @returns
 */
const FAQ_Data = [
  {
    id: 1,
    question: "Lorem ipsum dolor sit amet.",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum alias molestiae sunt consequatur deleniti officiis magni, sequi adipisci excepturi unde, ipsum, consequuntur eos nobis maiores?",
  },
  {
    id: 4,
    question: "Lorem ipsum dolor sit amet.",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum alias molestiae sunt consequatur deleniti officiis magni, sequi adipisci excepturi unde, ipsum, consequuntur eos nobis maiores?",
  },
  {
    id: 3,
    question: "Lorem ipsum dolor sit amet.",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum alias molestiae sunt consequatur deleniti officiis magni, sequi adipisci excepturi unde, ipsum, consequuntur eos nobis maiores?",
  },
  {
    id: 2,
    question: "Lorem ipsum dolor sit amet.",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum alias molestiae sunt consequatur deleniti officiis magni, sequi adipisci excepturi unde, ipsum, consequuntur eos nobis maiores?",
  },
];
const FAQ: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 w-full">
        <div className="w-9/12 text-center mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-5xl  text-indigo-600 tracking-tight">
              FAQ
            </h2>
            <p className="text-gray-600 text-xl mt-3">
              Frequenty asked questions
            </p>
          </div>
          {FAQ_Data.map((item) => (
            <div
              key={item.id}
              className="grid divide-y divide-neutral-200 mx-auto mt-8 "
            >
              <div className="border-b ">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span className="text-gray-950">{item.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-800 mt-3 group-open:animate-fadeIn">
                    {item.answer}
                  </p>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default FAQ;
