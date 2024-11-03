import React from "react";

/**
 * InfluencerStatic
 * @returns
 */
const InfluencerStatic: React.FC = () => {
  //stats contain all influencer home page stats
  const stats = [
    {
      id: 1,
      title: "144k",
      description: "Downloads",
    },
    {
      id: 2,
      title: "32.1K",
      description: "Users",
    },
    {
      id: 3,
      title: "12.9K",
      description: "Live Campaign",
    },
    {
      id: 4,
      title: "24.5K",
      description: "Companies",
    },
    {
      id: 5,
      title: "19.5K",
      description: "Brands",
    },
  ];
  return (
    <div className=" container px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-6 lg:py-20 bg-gray-50">
      <h1 className="text-4xl text-center pb-8 font-bold uppercase text-indigo-600 ">
        lorem ipsum
      </h1>
      <p className="text-center pb-16 px-32">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
        tenetur laborum repellendus consequatur culpa adipisci minima eius minus
        ducimus necessitatibus, suscipit illo cum labore error aperiam nam!
        Praesentium, numquam recusandae?
      </p>
      <div className="grid grid-cols-2 row-gap-8 md:grid-cols-5">
        {stats.map((state) => (
          <div key={state.id} className="text-center">
            <h6 className="text-3xl font-bold text-deep-purple-accent-400">
              {state.title}
            </h6>
            <p className="font-bold">{state.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfluencerStatic;
