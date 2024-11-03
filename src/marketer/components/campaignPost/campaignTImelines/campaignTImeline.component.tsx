import React, { useState, forwardRef, useImperativeHandle } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { campaignPostFormState } from "../campaignPostOverview/campaignPostOverview.component";

const CustomInput = forwardRef(({ value, onClick }: any, ref) => {
  useImperativeHandle(ref, () => ({
    focus: onClick,
  }));

  return (
    <button onClick={onClick} className="custom-datepicker-button">
      <i className="far fa-calendar-alt text-xl p-4"></i>
    </button>
  );
});

const CampaignTimeline: React.FC<campaignPostFormState> = ({
  campaignPostState,
}) => {
  const { campaignFormObject, setCampaignFormObject } = campaignPostState;
  const campaignTimeline = campaignFormObject.campaign_timeline;

  const [isOpen, setIsOpen] = useState({
    datePicker1: false,
    datePicker2: false,
    datePicker3: false,
    datePicker4: false,
  });

  function formatDateToDdMmYyyy(date: any): string {
    if (date) {
      const newDate = new Date(date);
      const day = newDate.getDate().toString().padStart(2, "0");
      const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
      const year = newDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return "";
  }

  const initialCampaignDates = {
    applicationStartDate:
      campaignFormObject.campaign_timeline.applicationStartDate !== null
        ? new Date(campaignFormObject.campaign_timeline.applicationStartDate)
        : null,

    lastDayToApproveInfluencer:
      campaignFormObject.campaign_timeline.lastDayToApproveInfluencer !== null
        ? new Date(
            campaignFormObject.campaign_timeline.lastDayToApproveInfluencer
          )
        : null,
    contentVerification:
      campaignFormObject.campaign_timeline.contentVerification !== null
        ? new Date(campaignFormObject.campaign_timeline.contentVerification)
        : null,
    LastDayOfContentPost:
      campaignFormObject.campaign_timeline.LastDayOfContentPost !== null
        ? new Date(campaignFormObject.campaign_timeline.LastDayOfContentPost)
        : null,
  };

  const [timelineDates, setTimelineDate] = useState(initialCampaignDates);
  const datePickerRefs = {
    applicationStartDate: React.createRef(),
    lastDayToApproveInfluencer: React.createRef(),
    contentVerification: React.createRef(),
    LastDayOfContentPost: React.createRef(),
  };

  const handleDateChange = (date: Date | null, fieldName: string) => {
    setCampaignFormObject((prevState) => ({
      ...prevState,
      campaign_timeline: {
        ...prevState.campaign_timeline,
        [fieldName]: date,
      },
    }));
    setTimelineDate((prevState) => ({
      ...prevState,
      [fieldName]: date,
    }));
  };
  const handleDatePickerClick = (pickerName: string) => {
    setIsOpen((prev) => ({
      ...prev,
      [pickerName]: !isOpen[pickerName as keyof typeof prev],
    }));
  };
  console.warn("data ", campaignFormObject);
  return (
    <div className="" id="marketerBrandForm">
      <div className="bg-white">
        <div className="p-3">
          <div className="w-full  ">
            <div className="2xl:w-3/4 w-full mx-auto  rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md p-5 ">
              <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                Campaign Timelines
              </h1>
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae architecto, dolore quo maiores optio veniam?
              </span>

              <div className=" w-full flex flex-wrap mt-10 border">
                <label htmlFor="datePicker" className="w-10/12 p-4">
                  <h1 className=" text-xl font-bold">Application Start Date</h1>
                  <p className="mt-1 font-semibold">
                    {timelineDates.applicationStartDate
                      ? formatDateToDdMmYyyy(timelineDates.applicationStartDate)
                      : ""}
                  </p>
                </label>
                <div
                  className="float-right m-auto "
                  onClick={() => handleDatePickerClick("datePicker1")}>
                  <DatePicker
                    className="w-full right-0"
                    selected={timelineDates.applicationStartDate}
                    onChange={(date) =>
                      handleDateChange(date, "applicationStartDate")
                    }
                    customInput={
                      <CustomInput ref={datePickerRefs.applicationStartDate} />
                    }
                    minDate={new Date()}
                  />
                </div>
              </div>
              <div
                className={`w-full flex flex-wrap mt-4 border ${
                  !timelineDates.applicationStartDate ? "bg-gray-200" : ""
                }`}>
                <label htmlFor="datePicker" className="w-10/12 p-4">
                  <h1 className=" text-xl font-bold">
                    Last date to approve influencer
                  </h1>
                  <p className="mt-1 font-semibold">
                    {timelineDates.lastDayToApproveInfluencer
                      ? formatDateToDdMmYyyy(
                          timelineDates.lastDayToApproveInfluencer
                        )
                      : ""}
                  </p>
                </label>
                <div
                  className={`float-right m-auto`}
                  onClick={() => handleDatePickerClick("datePicker2")}>
                  <DatePicker
                    shouldCloseOnSelect={true}
                    className={`w-full right-0 `}
                    selected={timelineDates.lastDayToApproveInfluencer}
                    onChange={(date) =>
                      handleDateChange(date, "lastDayToApproveInfluencer")
                    }
                    customInput={
                      <CustomInput
                        ref={datePickerRefs.lastDayToApproveInfluencer}
                      />
                    }
                    minDate={
                      timelineDates.applicationStartDate
                        ? new Date(
                            new Date(
                              timelineDates.applicationStartDate
                            ).getFullYear(),
                            new Date(
                              timelineDates.applicationStartDate
                            ).getMonth(),
                            new Date(
                              timelineDates.applicationStartDate
                            ).getDate() + 5
                          )
                        : null
                    }
                    disabled={!timelineDates.applicationStartDate}
                  />
                </div>
              </div>
              <div
                className={`w-full flex flex-wrap mt-4 border ${
                  !timelineDates.lastDayToApproveInfluencer ? "bg-gray-200" : ""
                }`}>
                <label htmlFor="datePicker" className="w-10/12 p-4">
                  <h1 className=" text-xl font-bold">
                    Content verification Day period
                  </h1>
                  <p className="mt-1 font-semibold">
                    {timelineDates.contentVerification
                      ? formatDateToDdMmYyyy(timelineDates.contentVerification)
                      : ""}
                  </p>
                </label>
                <div
                  className={`float-right m-auto`}
                  onClick={() => handleDatePickerClick("datePicker3")}>
                  <DatePicker
                    shouldCloseOnSelect={true}
                    className={`w-full right-0`}
                    selected={timelineDates.contentVerification}
                    onChange={(date) =>
                      handleDateChange(date, "contentVerification")
                    }
                    customInput={
                      <CustomInput ref={datePickerRefs.contentVerification} />
                    }
                    minDate={
                      timelineDates.lastDayToApproveInfluencer
                        ? new Date(
                            new Date(
                              timelineDates.lastDayToApproveInfluencer
                            ).getFullYear(),
                            new Date(
                              timelineDates.lastDayToApproveInfluencer
                            ).getMonth(),
                            new Date(
                              timelineDates.lastDayToApproveInfluencer
                            ).getDate() + 5
                          )
                        : null
                    }
                    disabled={!timelineDates.lastDayToApproveInfluencer}
                  />
                </div>
              </div>

              <div
                className={`w-full flex flex-wrap mt-4 border ${
                  !timelineDates.contentVerification ? "bg-gray-200" : ""
                }`}>
                <label htmlFor="datePicker" className="w-10/12 p-4">
                  <h1 className=" text-xl font-bold">End day post </h1>
                  <p className="mt-1 font-semibold">
                    {timelineDates.LastDayOfContentPost
                      ? formatDateToDdMmYyyy(timelineDates.LastDayOfContentPost)
                      : ""}
                  </p>
                </label>
                <div
                  className={`float-right m-auto`}
                  onClick={() => handleDatePickerClick("datePicker4")}>
                  <DatePicker
                    className={`w-full right-0 `}
                    selected={timelineDates.LastDayOfContentPost}
                    onChange={(date) =>
                      handleDateChange(date, "LastDayOfContentPost")
                    }
                    customInput={
                      <CustomInput ref={datePickerRefs.LastDayOfContentPost} />
                    }
                    minDate={
                      timelineDates.contentVerification
                        ? new Date(
                            new Date(
                              timelineDates.contentVerification
                            ).getFullYear(),
                            new Date(
                              timelineDates.contentVerification
                            ).getMonth(),
                            new Date(
                              timelineDates.contentVerification
                            ).getDate() + 2
                          )
                        : null
                    }
                    disabled={!timelineDates.contentVerification}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignTimeline;
