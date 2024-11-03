interface headingProps {
  Heading: {
    title: string;
    timeStamp: string;
  };
}

const HeadingHeader: React.FC<headingProps> = ({ Heading }) => {
  return (
    <>
      <div className=" bg-ri-blue bg-gradient-to-b from-ri-blue  to-gray-100  h-72 flex flex-col justify-center">
        <div className="mx-auto">
          <h1 className="text-gray-900 text-7xl">{Heading.title}</h1>
          <h6 className="text-gray-900 flex justify-center mt-3">
            {Heading.timeStamp}
          </h6>
        </div>
      </div>
    </>
  );
};

export default HeadingHeader;
