import React, { useEffect, useState } from "react";
import _ from "lodash";
import Cropper from "react-cropper";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTooltip,
} from "@coreui/react";

import EmployeeSatisfactionSliders from "./employeeSatisfaction.component";
import HiringDetails from "./hiringDetails.component";
import AdminProfilePersonalDetails from "./adminProfilePersonalDetails.component";
import AdminProfileContactDetails from "./adminProfileContactDetails.component";
import EmployeeReviewCard from "./employeeReviewCard.component";

import userProfile from "../../../assets/images/avatars/user.png";

import profile from "../../../assets/img/profile.jpg";
import question from "../../../assets/img/question.png";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";

const employeeReviewCardData = [
  {
    employeeName: "Aarav Patel",
    reviewDate: "Feb 14, 2022",
    reviewStatus:
      "Rajat is a stellar team player, always willing to go the extra mile to ensure project success. His attention to detail and problem-solving skills are commendable. A true asset to the team!",
    employeeProfilePic: profile,
  },
  {
    employeeName: "Aisha Desai",
    reviewDate: "Sep 25, 2022",
    reviewStatus:
      "Working with Rajat has been a pleasure! His proactive approach to tasks and excellent communication skills make him an invaluable colleague. He consistently delivers high-quality work and exceeds expectations.",
    employeeProfilePic: profile,
  },
  {
    employeeName: "Vihaan Sharma",
    reviewDate: "Apr 01, 2023",
    reviewStatus:
      "Rajat demonstrates exceptional leadership qualities and consistently motivates his team to achieve outstanding results. His dedication to his work is evident in the consistently high-quality deliverables he produces. A true professional!",
    employeeProfilePic: profile,
  },
  {
    employeeName: "Riya Gupta",
    reviewDate: "Jul 11, 2022",
    reviewStatus:
      "Rajat is a highly skilled and adaptable team member. His ability to quickly grasp new concepts and technologies is impressive. He consistently meets deadlines and delivers exceptional results. Its a pleasure to work alongside him!",
    employeeProfilePic: profile,
  },
  {
    employeeName: "Arjun Singh",
    reviewDate: "Dec 30, 2023",
    reviewStatus:
      "I have had the privilege of working closely with Rajat, and I must say, his professionalism and dedication are unmatched. He possesses strong analytical skills and consistently delivers top-notch work. An absolute pleasure to work with!",
    employeeProfilePic: profile,
  },
  {
    employeeName: "Ananya Mehta",
    reviewDate: "May 19, 2022",
    reviewStatus:
      "Rajat is an outstanding team member who consistently demonstrates a strong work ethic and commitment to excellence. His positive attitude and willingness to take on challenges make him an invaluable asset to the team. Highly recommended!",
    employeeProfilePic: profile,
  },
  {
    employeeName: "Aryan Joshi",
    reviewDate: "Aug 08, 2023",
    reviewStatus:
      "Rajat attention to detail and problem-solving abilities make him a standout performer. He consistently delivers high-quality work and is always willing to lend a helping hand to his colleagues. A true team player!",
    employeeProfilePic: profile,
  },
  {
    employeeName: "Ishita Choudhary",
    reviewDate: "Jan 03, 2024",
    reviewStatus:
      "I have had the pleasure of working with Rajat for several projects, and I am continually impressed by his professionalism and expertise. He is a proactive problem solver who consistently delivers exceptional results. Highly recommended!",
    employeeProfilePic: profile,
  },
];

interface addressInterface {
  id: number;
  house_no: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pin_code: string;
}

interface profilePictureInterface {
  id: number;
  img_name: string;
  img_url: string | null;
}
interface userInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string | null;
  dob: string;
  gender: string;
  role: string;
  profile_picture: profilePictureInterface[] | null;
}

export interface adminPersonalDetail {
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  account_number: string;
  pan_number: string;
  ifsc: string;
}

export interface adminAddressInterface {
  house_no: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pin_code: string;
}

interface AdminProfileContactDetailsInterface {
  id: number;
  user_name: string;
  mobile_no: string;
  user: userInterface;
  address: addressInterface;
  satisfaction_score: satisfaction_scoreInterface;
  hiring_status: HiringStatusInterface[];
  receivedAppreciations: employeeReviewInterface[];
}
export interface satisfaction_scoreInterface {
  Excited: number;
  Not_So_Good: number;
  Good: number;
}

export interface HiringStatusInterface {
  id: number;
  designation: string;
  startTime: string;
  endTime: null;
}

export interface employeeReviewInterface {
  id: number;
  appreciate_message: string;
  created_at: string;
  appreciate_by: {
    id: number;
    first_name: string;
    last_name: string;
    img_name: string;
    img_url: string | null;
  };
}

const AdminProfileSettings: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>(userProfile);
  const [cropper, setCropper] = useState<any>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const [adminProfile, setAdminProfile] =
    useState<AdminProfileContactDetailsInterface | null>(null);

  const [personalDetail, setPersonalDetail] = useState<adminPersonalDetail>({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    account_number: "",
    pan_number: "",
    ifsc: "",
  });

  const [addressData, setAddressData] = useState<adminAddressInterface>({
    house_no: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pin_code: "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
        setModalIsOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = () => {
    if (cropper) {
      // Get the cropped image as a blob
      cropper.getCroppedCanvas().toBlob((blob: Blob) => {
        // Convert blob to URL
        const croppedImageUrl = URL.createObjectURL(blob);
        // Update profile image
        setProfileImage(croppedImageUrl);
      });
      setModalIsOpen(false); // Close modal after cropping
    }
  };

  const handleOkay = () => {
    handleCropComplete();
  };

  const handleCancel = () => {
    setModalIsOpen(false);
  };

  // Function to handle remove button click
  const handleRemove = () => {
    setProfileImage(userProfile); // Reset profile image to user.jpg
    setModalIsOpen(false); // Close modal
    if (cropper.current) {
      cropper.current.clear(); // Clear the Cropper
    }
  };

  useEffect(() => {
    const fetchDataAdminProfileData = async () => {
      const adminProfileDataUri = `${process.env.REACT_APP_API_URL}admin/profile`;
      const headers = {
        authorization: `Bearer ${access_token}`,
      };
      try {
        const response = await axios.get(adminProfileDataUri, { headers });
        const { data, status } = response;

        if (status === 200) {
          setAdminProfile(data);
          if (data.user) {
            const { user } = data;
            setPersonalDetail({
              first_name: user.first_name,
              last_name: user.last_name,
              gender: user.gender,
              dob: user.dob,
              account_number: "",
              pan_number: "",
              ifsc: "",
            });
          }

          if (data.bankDetail) {
            const { bankDetail } = data;
            setPersonalDetail((prev) => ({
              ...prev,
              account_number: bankDetail.account_number
                ? bankDetail.account_number
                : "",
              pan_number: bankDetail.pan_number ? bankDetail.pan_number : "",
              ifsc: bankDetail.ifsc ? bankDetail.ifsc : "",
            }));
          }

          if (data.address) {
            const { address } = data;
            setAddressData({
              house_no: address.house_no ? address.house_no : "",
              street: address.street ? address.street : "",
              landmark: address.landmark ? address.landmark : "",
              city: address.city ? address.city : "",
              state: address.state ? address.state : "",
              pin_code: address.pin_code ? address.pin_code : "",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAdminProfileData();
  }, []);
  return (
    <>
      {
        window.innerWidth <= 1024 ? (
          <div className="flex justify-center items-center h-screen text-red-500 text-lg">
            This page cannot be opened in mobile screen.
          </div>
        ) : (
          // adminProfile ? (
          <div className="bg-[#EBEBEB] h-full">
            <div className="flex w-[99%] py-3 space-x-4 > * + *">
              <div className="bg-white 3xl:p-3 rounded-md w-2/12 ml-4 items-center justify-center flex">
                <div className="py-6 items-center justify-center flex flex-col">
                  <img
                    src={profileImage}
                    alt=""
                    className="w-28 h-28 2xl:w-32 2xl:h-32 3xl:w-48 3xl:h-48 rounded-full items-center border-1"
                  />
                  <div className="flex mt-4">
                    <div className="flex">
                      <label
                        htmlFor="fileInput"
                        className="py-[3px] 2xl:py-[6px] 3xl:py-2 px-[10px] 2xl:px-[12px] 3xl:px-4 rounded-md border mr-2 flex items-center justify-center">
                        <p className="text-[10px] 2xl:text-[12px] 3xl:text-base">
                          Change
                        </p>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                      {
                        <button
                          className="py-[3px] 2xl:py-[6px] 3xl:py-2 px-[10px] 2xl:px-[12px] 3xl:px-4 rounded-md ml-2 bg-[#E6E6E6] flex items-center justify-center"
                          onClick={handleRemove}>
                          <p className="text-[10px] 2xl:text-[12px] 3xl:text-base">
                            Remove
                          </p>
                        </button>
                      }
                    </div>
                  </div>

                  {/* Core UI Modal */}
                  <CModal
                    visible={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                    size="lg">
                    <CModalHeader closeButton>
                      <CModalTitle>Crop Image</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <Cropper
                        src={profileImage}
                        style={{ height: "400px", width: "100%" }}
                        initialAspectRatio={1}
                        guides={true}
                        crop={handleCropComplete}
                        zoomable={false}
                        aspectRatio={1}
                        viewMode={1}
                        onInitialized={(instance) => setCropper(instance)}
                      />
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={handleCancel}>
                        Cancel
                      </CButton>
                      <CButton color="primary" onClick={handleOkay}>
                        Okay
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>
              <div className="bg-white p-3 rounded-md w-4/12 ">
                <p className="font-semibold text-[12px] 2xl:text-sm 3xl:text-lg">
                  Daily Performance
                </p>
                {/* <AdminProfileMultiAxisLineChart /> */}
              </div>
              <div className="bg-white p-3 rounded-md w-3/12 ">
                <p className="font-semibold text-[12px] 2xl:text-sm 3xl:text-lg">
                  Hiring History
                </p>
                <div className="mt-3 overflow-scroll h-36 2xl:h-40 3xl:h-64">
                  {adminProfile &&
                    adminProfile.hiring_status.map((hiringDetails, index) => (
                      <HiringDetails
                        key={index}
                        hiringDate={hiringDetails.startTime}
                        hiringStatus={hiringDetails.designation}
                      />
                    ))}
                </div>
              </div>
              <div className="bg-white p-3 rounded-md w-[24%] mr-4">
                <p className="font-semibold text-[12px] 2xl:text-sm 3xl:text-lg flex">
                  Employee Satisfaction
                  <CTooltip content="Last 30 Days score" placement="bottom">
                    <img
                      className="w-4 h-4 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 ml-2 mt-[2px]"
                      src={question}
                      alt="questionMark"
                    />
                  </CTooltip>
                </p>

                {adminProfile && adminProfile.satisfaction_score && (
                  <div className="mt-2">
                    <EmployeeSatisfactionSliders
                      satisfaction_score={adminProfile.satisfaction_score}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-9/12 flex flex-col">
                <div className="bg-white p-3 rounded-md mb-3 ml-4 ">
                  <p className="font-semibold text-sm 2xl:text-base 3xl:text-lg">
                    Personal Details
                  </p>
                  <AdminProfilePersonalDetails
                    personalDetail={personalDetail}
                    setPersonalDetail={setPersonalDetail}
                  />
                </div>
                <div className="bg-white p-3 rounded-md ml-4 ">
                  <p className="font-semibold text-sm 2xl:text-base 3xl:text-lg mb-2">
                    Contact Details
                  </p>
                  <AdminProfileContactDetails
                    addressData={addressData}
                    setAddressData={setAddressData}
                  />
                </div>
              </div>
              <div className="w-3/12">
                <div className="bg-white p-3 rounded-md mr-4 ml-4">
                  <p className="font-semibold text-sm 2xl:text-base 3xl:first-line:text-lg mb-2">
                    Employee Reviews
                  </p>
                  <div className="h-[676px] 2xl:h-[725px] 3xl:h-[797px] overflow-scroll">
                    {adminProfile &&
                      adminProfile.receivedAppreciations &&
                      adminProfile.receivedAppreciations.map(
                        (employeeReview, index) => (
                          <EmployeeReviewCard
                            key={index}
                            employeeName={`${employeeReview.appreciate_by.first_name} ${employeeReview.appreciate_by.last_name}`}
                            employeeProfilePic={
                              employeeReview.appreciate_by.img_url
                                ? employeeReview.appreciate_by.img_url
                                : ""
                            }
                            reviewDate={employeeReview.created_at}
                            reviewStatus={employeeReview.appreciate_message}
                          />
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        // ) : (
        //   ""
        // )
      }
    </>
  );
};

export default AdminProfileSettings;

export const AgeCalculator = (dob: string) => {
  const currentDate = new Date();
  const birthDate = new Date(dob);

  const yearsDiff = _.subtract(
    currentDate.getFullYear(),
    birthDate.getFullYear()
  );

  const birthDayCurrentYear = new Date(
    currentDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (currentDate < birthDayCurrentYear) {
    return yearsDiff - 1;
  } else {
    return yearsDiff;
  }
};
