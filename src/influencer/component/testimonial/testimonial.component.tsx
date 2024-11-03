import _ from "lodash";
import { Fragment } from "react";

const testimonialUser = {
  name: "Jessica Lynn",
  description:
    "I like that you find brands [on QikGro ] that you wouldn t normally work with, which I think is rewarding... this platform brings you many different projects that you might now have thought of",
  userName: "@jessicalynnmusic",
  professions: ["Singer", "Songwriter", "Creator"],
};

const Testimonial = () => {
  return (
    <Fragment>
      <div className="py-16  md:max-w-full xl:max-w-[95rem] md:px-24 lg:px-4 lg:py-20 mx-auto">
        <section className="text-center text-lg-start shadow-1-strong ">
          <div className="row d-flex center justify-center ">
            <div className="card bg-[#4267b2]">
              <div className="card-body m-3">
                <div className="row">
                  <div className="col-lg-4 d-flex center justify-center items-center mb-4 mb-lg-0">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20%2810%29.webp"
                      className="img-fluid shadow-1 "
                      alt="woman avatar"
                      width="220"
                      height="220"
                    />
                  </div>
                  <div className="col-lg-8">
                    <p className=" text-ri-orange font-bold lead mb-4">
                      <strong>{testimonialUser.name} </strong>
                    </p>
                    <p className="mb-4 font-thin text-white">
                      {testimonialUser.description}
                    </p>
                    <p className=" font-bold  text-ri-orange mb-0">
                      {testimonialUser.userName}
                    </p>
                    <p className=" text-white font-semibold mb-0">
                      {_.join(testimonialUser.professions, "/ ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};
export default Testimonial;
