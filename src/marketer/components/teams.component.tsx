import React from "react";

// teamsArray
const teamsArray: {
  id: number;
  name: string;
  imgUrl: string;
  profession: string;
}[] = [
  {
    id: 1,
    imgUrl:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    name: "dany Bailey",
    profession: "Software Engineer",
  },
  {
    id: 2,
    imgUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    name: "lucy carter",
    profession: "Graphic Designer",
  },
  {
    id: 3,
    imgUrl:
      "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80",
    name: "Jade Bradley",
    profession: "Dev Ops",
  },
  {
    id: 4,
    imgUrl:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    name: "dany Bailey",
    profession: "Software Engineer",
  },
  {
    id: 5,
    imgUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    name: "lucy carter",
    profession: "Graphic Designer",
  },
  {
    id: 6,
    imgUrl:
      "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80",
    name: "Jade Bradley",
    profession: "Dev Ops",
  },
];
const Teams: React.FC = () => {
  return (
    <>
      <section className="teams mx-auto px-4 sm:px-6 lg:px-4 py-12 bg-gray-200  sm:py-16 ">
        <div className="text-center pb-12">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
            Check our awesome{" "}
            <span className="text-indigo-600">Influencer</span>{" "}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {teamsArray.map((member) => (
            <div
              key={member.id}
              className="member w-full bg-gray-300 rounded-lg p-12 flex flex-col justify-center items-center  "
            >
              <div className="mb-8">
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src={member.imgUrl}
                  alt={`${member.id}_${member.name}`}
                />
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">
                  {member.name}
                </p>
                <p className="text-base text-gray-400 font-normal">
                  {member.profession}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default Teams;
