import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { influencerData } from "../../../seeder";
import YoutubeIcon from "../../../assets/icons/Youtube.png";
import FacebookIcon from "../../../assets/icons/Facebook.png";
import InstagramIcon from "../../../assets/icons/Instagram.png";
import TwitterIcon from "../../../assets/icons/Twitter.png";

interface InfluencerProfile {
  id: number;
  name: string;
  platform: string[];
  userName: string;
  profilePicture: string;
  niches: string[];
  platformScore: number;
  subscribers: number;
  Avg_views: number;
}

const platformIcons: { [key: string]: string } = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
};

const Profile: React.FC = () => {
  const { id } = useParams();
  const profileId = parseInt(id ?? "0", 10);
  const [profile, setProfile] = useState<InfluencerProfile>();

  useEffect(() => {
    const fetchProfile = () => {
      const foundProfile = influencerData.find(
        (profile) => profile.id === profileId
      );
      setProfile(foundProfile);
    };

    fetchProfile();
  }, [profileId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row  w-full -ml-3  -mb-12">
      <div className="md:w-1/5  bg-indigo-700 " id="profile-f">
        <div className="p-4 ">
          <div className="text-center">
            <img
              src={require(`../../../assets/images/avatars/${profile.profilePicture}`)}
              alt="Admin"
              className="rounded-circle mx-auto w-40 h-40"
            />
            <div className="mt-3">
              <h4>{profile.name}</h4>

              <p className="text-secondary mb-1">{profile.userName}</p>
              <p className=" font-size-sm"></p>
            </div>
          </div>
        </div>
        <div className="mt-3 mx-2 ">
          <ul className="list-group list-group-flush ">
            {profile.platform.map((platform, idx) => (
              <li key={idx} className="flex gap-4 justify-items-center ">
                <div className="w-2/5 md:pl-10">
                  <img
                    className="platform-icon h-8 w-8 mb-3 rounded"
                    src={platformIcons[platform]}
                    alt={platform}
                  />
                </div>
                <div className="w-3/5">
                  <h6 className="text-secondary">{_.startCase(platform)}</h6>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sm:w-3/5 lg:w-4/5 xl:w-4/5 " id="profile-t">
        {" "}
        <div className="card md:w-1000 border-none ">
          <div className="row no-gutters row-bordered ">
            <div className="d-flex col-md align-items-center">
              <div className="card-body d-block text-body">
                <div className="text-muted small line-height-1">
                  Platform Score
                </div>
                <div className="text-xlarge">{profile.platformScore}</div>
              </div>
            </div>
            <div className="d-flex col-md align-items-center">
              <div className="card-body d-block text-body">
                <div className="text-muted small line-height-1">
                  Subscribers
                </div>
                <div className="text-xlarge">{profile.subscribers}</div>
              </div>
            </div>
            <div className="d-flex col-md align-items-center">
              <div className="card-body d-block text-body">
                <div className="text-muted small line-height-1">Avg. Views</div>
                <div className="text-xlarge">{profile.Avg_views}</div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <table className="table user-view-table m-0">
              <tbody>
                <tr>
                  <td>Username:</td>
                  <td>{profile.userName}</td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{profile.name}</td>
                </tr>
                <tr>
                  <td>E-mail:</td>
                  <td>nmaxwell@mail.com</td>
                </tr>
              </tbody>
            </table>

            <h6 className="mt-4 mb-3">Niches:</h6>

            <div>
              {profile.niches.map((platform, idx) => (
                <div key={idx}>
                  <p className=" badge bg-indigo-600  m-1 ">
                    {platform
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </p>
                </div>
              ))}
            </div>
            <hr />

            <h6 className="mt-4 mb-3">Contacts</h6>

            <div className="flex">
              <div className="md:w-2/5">
                {" "}
                <p className="md:m-1">Phone:</p>
              </div>
              <div className="md:w-3/5">
                {" "}
                <p className="md:m-1">+0 (123) 456 7891</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
