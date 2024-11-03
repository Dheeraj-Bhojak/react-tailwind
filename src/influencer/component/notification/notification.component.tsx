import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import { formatDateDifference } from "../../../utils/utilsMethods/formateDate";
import axios from "axios";

interface Notification {
  id: string;
  message: string;
}

interface notificationDataInterface {
  id: number;
  is_read: boolean;
  notificationBy: string;
  created_at: string;
  notificationStatus: string;
  notificationHeading: string;
  notificationDescription: string;
  notificationFor: {
    id: number;
  };
  notificationPicture: {
    id: number;
    img_name: string;
    img_url: string;
    is_active: true;
  };
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsData, setNotificationsData] = useState<
    notificationDataInterface[]
  >([]);
  const user = useSelector(selectCurrentUser);
  const userId = user.userData.user.id;
  useEffect(() => {
    if (!userId) return;
    const socket = io("http://localhost:9000", { query: { userId } });
    const handleNotification = (notification: Notification) => {
      setNotifications((prev) => [...prev, notification]);
    };
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
      socket.disconnect(); // Clean up the socket connection
    };
  }, [userId]);

  const { access_token } = user.userData.token;

  const fetchNotifications = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}notifications`,
        config
      );
      console.log("data", data);
      setNotificationsData(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleOpenNotification = (id: number) => {
    console.log("Open Notification page", id);
  };

  return (
    <div className="justify-center items-center flex">
      <div className="min-h-[90vh] py-2 sm:w-full md:w-9/12  lg:max-w-lg">
        <h1 className=" h-16 text-lg font-semibold justify-center items-center flex">
          Notifications
        </h1>
        {notificationsData ? (
          <div className="">
            <ul className="mt-2">
              {notificationsData.map((notif) => (
                <li
                  key={notif.id}
                  className="flex border-b-1 rounded-md min-h-32 bg-gray-100 mt-2 shadow-sm p-4 hover:cursor-pointer"
                  onClick={() => handleOpenNotification(notif.id)}>
                  <div className="w-3/12 justify-center items-center flex">
                    <img
                      src={notif.notificationPicture.img_url}
                      className="w-12 h-12 object-cover rounded-full"
                      alt={notif.notificationPicture.img_name}
                    />
                  </div>
                  <div className=" w-9/12 ">
                    <p className="text-[#b1b1b1] text-sm">
                      {notif.notificationBy}
                    </p>
                    <p
                      className={`${
                        notif.notificationStatus === "danger" &&
                        notif.is_read === false
                          ? "text-[#DB6261]"
                          : notif.notificationStatus === "success" &&
                            notif.is_read === false
                          ? "text-[#52AD60]"
                          : notif.notificationStatus === "info" &&
                            notif.is_read === false
                          ? "text-[#4267B2]"
                          : "text-[#B1B1B1]"
                      } text-semibold`}>
                      {notif.notificationHeading}
                    </p>
                    <p className="text-sm">{notif.notificationDescription}</p>
                    <p className="text-xs text-[#b1b1b1]">
                      {formatDateDifference(notif.created_at)}.
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div></div>
        )}

        <div></div>
      </div>
    </div>
  );
};

export default Notifications;
