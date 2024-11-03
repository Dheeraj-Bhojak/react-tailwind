export interface OverViewInterface {
  profile: {
    platfrom: string;
    platformUser_name: string;
    biography: string;
    profile_picture_url: string;
    username: string;
    redirectUrl: string;
  };
  followsGrowth: FollowsGrowthInterface[];
  profileGrowth: {
    followingGrowth: FollowingGrowthInterface[];
    followersGrowth: FollowersGrowthgInterface[];
  };
}

export interface FollowsGrowthInterface {
  name: string;
  value: string;
  growthPercentage: string;
  progressTag?: string;
}

export interface FollowingGrowthInterface {
  monthOf: string;
  growthData: number[];
}

export interface FollowersGrowthgInterface {
  monthOf: string;
  growthData: number[];
}

export interface AudienceInterface {
  id: number;
  locations: LocationInterface[];
  audience: AudienceDemographyInterface;
  country: CountryDemographyInterface[];
}

export interface LocationInterface {
  id: number;
  city: string;
  state: string;
  value: number;
}

export interface AudienceDemographyInterface {
  id: number;
  male: number;
  female: number;
  other: number;
  "female_<13": number;
  "female_13-17": number;
  "female_18-24": number;
  "female_25-34": number;
  "female_35-44": number;
  "female_45-54": number;
  "female_55-64": number;
  "female_65+": number;
  "male_<13": number;
  "male_13-17": number;
  "male_18-24": number;
  "male_25-34": number;
  "male_35-44": number;
  "male_45-54": number;
  "male_55-64": number;
  "male_65+": number;
  "other_<13": number;
  "other_13-17": number;
  "other_18-24": number;
  "other_25-34": number;
  "other_35-44": number;
  "other_45-54": number;
  "other_55-64": number;
  "other_65+": number;
}

interface CountryDemographyInterface {
  id: number;
  country: string;
  value: number;
}

export interface PlatformDataInterface {
  overview: OverViewInterface;
  audience: AudienceInterface[];
  content: ContentPostInterface[];
  industryComparison: IndustryComparisonInterface[];
  similarAccount: similarAccountInterface[];
}

export interface PlatformDataInterfaceForSocialNavBar {
  overview: OverViewInterface;
}

export interface ProfileData {
  profile: ProfileInterface;
  influencer: InfluencerInterface;
  platform: PlatformInterface[] | null;
  platformData: PlatformDataInterface[];
}

export interface ProfileInterface {
  id: number;
  profile_picture: {
    img_name: string;
    img_url: string;
  } | null;
  fullName: string;
  age: number;
  gender: string;
}

export interface InfluencerInterface {
  id: number;
  IsActive: boolean;
  interest: string;
  qikgro_score: number;
  niche: {
    id: number;
    niche_name: string;
  } | null;
  city: {
    location_title: string;
    location_description: string;
    country: string;
  } | null;
}

export interface PlatformInterface {
  platformName: string;
  platformAudience: number;
}

export interface ContentPostInterface {
  id: number;
  comments_count: number;
  like_count: number;
  media_product_type: string;
  media_url: string;
  pram_link: string;
  post_at: string;
}

export interface IndustryComparisonInterface {
  reach: {
    per_post: 780;
    industryAverage: 500;
  };
  view: {
    per_post: 565;
    industryAverage: 500;
  };
  engagement: {
    per_post: 6.32;
    industryAverage: 6.5;
  };
  pricing: {
    per_post: 500;
    industryAverage: 500;
  };
}

export interface similarAccountInterface {
  id: number;
  fullName: string;
  profile_picture: {
    img_name: string;
    img_url: string;
  };
  audience: number;
  engagement: string;
}

export const profileData: ProfileData = {
  profile: {
    id: 2,
    profile_picture: {
      img_name: "4d8c7058-bf7c-445d-a783-51e6166eb5d313.jpg",
      img_url:
        "https://qikgro.s3.ap-south-1.amazonaws.com/4d8c7058-bf7c-445d-a783-51e6166eb5d313.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZQ3DQROSX3GZW5YL%2F20240411%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240411T053426Z&X-Amz-Expires=360000&X-Amz-Signature=90ab723714c2d329d9b77683a3aabbcd85627315b002fafb7166d621bdb4694f&X-Amz-SignedHeaders=host&x-id=GetObject",
    },
    fullName: "joney doe",

    age: 54,
    gender: "m",
  },
  influencer: {
    id: 1,
    qikgro_score: 0,
    IsActive: true,
    interest: "Tech, Gedgets",
    niche: {
      id: 6,
      niche_name: "Technology",
    },
    city: {
      location_title: "Deoria",
      location_description: "Uttar Pradesh",
      country: "India",
    },
  },
  platform: [
    {
      platformName: "instagram",
      platformAudience: 1125282,
    },
    {
      platformName: "youtube",
      platformAudience: 122939,
    },
  ],
  platformData: [
    {
      overview: {
        profile: {
          platfrom: "instagram",
          platformUser_name: "rajat",
          biography:
            "want your help to learn instagram apis,100 followers for get dempgraphy data,Unlock the world of IG_API & Web Dev?let's connect PLEASE FOLLOW BACK!",
          profile_picture_url:
            "https://scontent.fjai1-2.fna.fbcdn.net/v/t51.2885-15/275947766_361567135849146_2886876814856557194_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7d201b&_nc_ohc=2h1hUQ010M0AX8yMR0e&_nc_ht=scontent.fjai1-2.fna&edm=AL-3X8kEAAAA&oh=00_AfDytgZotWEqUFSAhol8bbMzNXV8K4kOzPiYQliT9vCykg&oe=6611B803",
          username: "___._anonymous____",
          redirectUrl: "https://www.instagram.com/___._anonymous____/",
        },
        followsGrowth: [
          {
            name: "followers",
            value: "112",
            growthPercentage: "-1.4",
            progressTag: "good",
          },
          {
            name: "engagement",
            value: "21.88",
            growthPercentage: "13.4",
            progressTag: "good",
          },
          {
            name: "following",
            value: "525",
            growthPercentage: "246.8",
            progressTag: "poor",
          },
          {
            name: "post frequency",
            value: "4",
            growthPercentage: "3",
          },
        ],
        profileGrowth: {
          followingGrowth: [
            {
              monthOf: "mar-2024",
              growthData: [462, 527, 592, 525],
            },
            {
              monthOf: "feb-2024",
              growthData: [245, 287, 362, 453],
            },
            {
              monthOf: "jan-2024",
              growthData: [192, 198, 202, 220],
            },
          ],
          followersGrowth: [
            {
              monthOf: "mar-2024",
              growthData: [107, 102, 103, 112],
            },
            {
              monthOf: "feb-2024",
              growthData: [103, 103, 105, 110],
            },
            {
              monthOf: "jan-2024",
              growthData: [92, 98, 102, 103],
            },
          ],
        },
      },
      audience: [
        {
          id: 1,
          locations: [
            {
              id: 1,
              city: "Sangod",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 2,
              city: "Jaitaran",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 3,
              city: "Bilara",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 4,
              city: "Kolkata",
              state: "West Bengal",
              value: 1,
            },
            {
              id: 5,
              city: "Atru",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 6,
              city: "Phulera",
              state: "Rajasthan",
              value: 2,
            },
            {
              id: 7,
              city: "Chomu",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 8,
              city: "Bandikui",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 9,
              city: "Barpeta Road",
              state: "Assam",
              value: 1,
            },
            {
              id: 10,
              city: "Ratangarh",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 11,
              city: "Ramanagara",
              state: "Karnataka",
              value: 1,
            },
            {
              id: 12,
              city: "Barmer",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 13,
              city: "Bikaner",
              state: "Rajasthan",
              value: 71,
            },
            {
              id: 14,
              city: "Dungarpur",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 15,
              city: "Nashik",
              state: "Maharashtra",
              value: 1,
            },
            {
              id: 16,
              city: "Tibi",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 17,
              city: "Delhi",
              state: "Delhi",
              value: 2,
            },
            {
              id: 18,
              city: "Jaisalmer",
              state: "Rajasthan",
              value: 2,
            },
            {
              id: 19,
              city: "Kolayat",
              state: "Rajasthan",
              value: 2,
            },
            {
              id: 20,
              city: "Jodhpur",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 21,
              city: "Chhabra",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 22,
              city: "Itaunja",
              state: "Uttar Pradesh",
              value: 1,
            },
            {
              id: 23,
              city: "Ghaziabad",
              state: "Uttar Pradesh",
              value: 1,
            },
            {
              id: 24,
              city: "Jaipur",
              state: "Rajasthan",
              value: 3,
            },
            {
              id: 25,
              city: "Dausa",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 26,
              city: "Alwar",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 27,
              city: "Didwana",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 28,
              city: "Phalodi",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 29,
              city: "Patiala",
              state: "Punjab region",
              value: 1,
            },
            {
              id: 30,
              city: "Surat",
              state: "Gujarat",
              value: 1,
            },
            {
              id: 31,
              city: "Mandalgarh",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 32,
              city: "Mumbai",
              state: "Maharashtra",
              value: 2,
            },
            {
              id: 33,
              city: "Tikamgarh",
              state: "Madhya Pradesh",
              value: 1,
            },
            {
              id: 34,
              city: "Nathdwara",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 35,
              city: "Mahwah",
              state: "Rajasthan",
              value: 1,
            },
          ],
          audience: {
            id: 1,
            male: 77,
            female: 14,
            other: 21,
            "female_<13": 0,
            "female_13-17": 2,
            "female_18-24": 5,
            "female_25-34": 4,
            "female_35-44": 2,
            "female_45-54": 1,
            "female_55-64": 0,
            "female_65+": 0,
            "male_<13": 0,
            "male_13-17": 5,
            "male_18-24": 24,
            "male_25-34": 32,
            "male_35-44": 13,
            "male_45-54": 3,
            "male_55-64": 0,
            "male_65+": 0,
            "other_<13": 0,
            "other_13-17": 3,
            "other_18-24": 9,
            "other_25-34": 7,
            "other_35-44": 2,
            "other_45-54": 0,
            "other_55-64": 0,
            "other_65+": 0,
          },
          country: [
            {
              id: 1,
              country: "IN",
              value: 112,
            },
          ],
        },
      ],
      content: [
        {
          id: 2,
          comments_count: 1,
          like_count: 19,
          media_product_type: "REELS",
          media_url:
            "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/61412527D944BBF12796A8F59B608FB0_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&vs=2690940854395254_4263301674&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC82MTQxMjUyN0Q5NDRCQkYxMjc5NkE4RjU5QjYwOEZCMF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dLNHd2eGtPb3BaNHNyc0NBTEdMOGdtdEhTNWticV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJuLJnpDxjoZAFQIoAkMzLBdALi8an752yRgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAhKuhK2G0Njdh312YzdmGlpaGs_ToP2iOzXm9bAsCf-Q&oe=660C642F&_nc_sid=1d576d&_nc_rid=70ab1463f0",
          pram_link: "https://www.instagram.com/reel/C4XtBgNg8EB/",
          post_at: "2024-03-11T10:19:42.000Z",
        },
        {
          id: 3,
          comments_count: 0,
          like_count: 12,
          media_product_type: "FEED",
          media_url:
            "https://scontent.cdninstagram.com/v/t51.29350-15/431339606_781866120468392_4471538299088275150_n.heic?stp=dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=GcnPDH86EOYAX_chgXV&_nc_ht=scontent.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCwaSq8KiU43lNY_WfEaxy4yGOF2WIUvNc2H5cE-QuQvA&oe=66107333",
          pram_link: "https://www.instagram.com/p/C4KV0FNP16-/",
          post_at: "2024-03-06T05:46:33.000Z",
        },
        {
          id: 1,
          comments_count: 0,
          like_count: 4,
          media_product_type: "FEED",
          media_url:
            "https://scontent.cdninstagram.com/v/t51.29350-15/434730664_403378992399657_1206643487413137400_n.heic?stp=dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=mA9OpJW5kjgAX9VZQQ5&_nc_ht=scontent.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCM0CUXHAJJKjj-UEcPlX6v2g-I8iQB2vsnJs_WOBDnTw&oe=661087E0",
          pram_link: "https://www.instagram.com/p/C5F8BJYvS8P/",
          post_at: "2024-03-29T09:15:35.000Z",
        },
      ],
      industryComparison: [
        {
          reach: {
            per_post: 780,
            industryAverage: 500,
          },
          view: {
            per_post: 565,
            industryAverage: 500,
          },
          engagement: {
            per_post: 6.32,
            industryAverage: 6.5,
          },
          pricing: {
            per_post: 500,
            industryAverage: 500,
          },
        },
      ],
      similarAccount: [
        {
          id: 5,
          fullName: "Gagan verma",
          profile_picture: {
            img_name: "cd9ef1b1-4621-4ad0-9b14-5ac7f422a93dcampaign3.png",
            img_url:
              "https://qikgro.s3.ap-south-1.amazonaws.com/cd9ef1b1-4621-4ad0-9b14-5ac7f422a93dcampaign3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZQ3DQROSX3GZW5YL%2F20240626%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240626T082841Z&X-Amz-Expires=360000&X-Amz-Signature=27993cc2e50392e131db22fb42e5e56e0a9a993d23acdb7a5328b1e9e43de7ea&X-Amz-SignedHeaders=host&x-id=GetObject",
          },
          audience: 39582,
          engagement: "4.5",
        },
      ],
    },
    {
      overview: {
        profile: {
          platfrom: "instagram",
          platformUser_name: "rajat",
          biography:
            "want your help to learn instagram apis,100 followers for get dempgraphy data,Unlock the world of IG_API & Web Dev?let's connect PLEASE FOLLOW BACK!",
          profile_picture_url:
            "https://scontent.fjai1-2.fna.fbcdn.net/v/t51.2885-15/275947766_361567135849146_2886876814856557194_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7d201b&_nc_ohc=2h1hUQ010M0AX8yMR0e&_nc_ht=scontent.fjai1-2.fna&edm=AL-3X8kEAAAA&oh=00_AfDytgZotWEqUFSAhol8bbMzNXV8K4kOzPiYQliT9vCykg&oe=6611B803",
          username: "_maximus777",
          redirectUrl: "https://www.instagram.com/___._anonymous____/",
        },
        followsGrowth: [
          {
            name: "followers",
            value: "112",
            growthPercentage: "-1.4",
            progressTag: "good",
          },
          {
            name: "engagement",
            value: "21.88",
            growthPercentage: "13.4",
            progressTag: "good",
          },
          {
            name: "following",
            value: "525",
            growthPercentage: "246.8",
            progressTag: "poor",
          },
          {
            name: "post frequency",
            value: "4",
            growthPercentage: "3",
          },
        ],
        profileGrowth: {
          followingGrowth: [
            {
              monthOf: "mar-2024",
              growthData: [462, 527, 592, 525],
            },
            {
              monthOf: "feb-2024",
              growthData: [245, 287, 362, 453],
            },
            {
              monthOf: "jan-2024",
              growthData: [192, 198, 202, 220],
            },
          ],
          followersGrowth: [
            {
              monthOf: "mar-2024",
              growthData: [107, 102, 103, 112],
            },
            {
              monthOf: "feb-2024",
              growthData: [103, 103, 105, 110],
            },
            {
              monthOf: "jan-2024",
              growthData: [92, 98, 102, 103],
            },
          ],
        },
      },
      audience: [
        {
          id: 1,
          locations: [
            {
              id: 1,
              city: "Sangod",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 2,
              city: "Jaitaran",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 3,
              city: "Bilara",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 4,
              city: "Kolkata",
              state: "West Bengal",
              value: 1,
            },
            {
              id: 5,
              city: "Atru",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 6,
              city: "Phulera",
              state: "Rajasthan",
              value: 2,
            },
            {
              id: 7,
              city: "Chomu",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 8,
              city: "Bandikui",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 9,
              city: "Barpeta Road",
              state: "Assam",
              value: 1,
            },
            {
              id: 10,
              city: "Ratangarh",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 11,
              city: "Ramanagara",
              state: "Karnataka",
              value: 1,
            },
            {
              id: 12,
              city: "Barmer",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 13,
              city: "Bikaner",
              state: "Rajasthan",
              value: 71,
            },
            {
              id: 14,
              city: "Dungarpur",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 15,
              city: "Nashik",
              state: "Maharashtra",
              value: 1,
            },
            {
              id: 16,
              city: "Tibi",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 17,
              city: "Delhi",
              state: "Delhi",
              value: 2,
            },
            {
              id: 18,
              city: "Jaisalmer",
              state: "Rajasthan",
              value: 2,
            },
            {
              id: 19,
              city: "Kolayat",
              state: "Rajasthan",
              value: 2,
            },
            {
              id: 20,
              city: "Jodhpur",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 21,
              city: "Chhabra",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 22,
              city: "Itaunja",
              state: "Uttar Pradesh",
              value: 1,
            },
            {
              id: 23,
              city: "Ghaziabad",
              state: "Uttar Pradesh",
              value: 1,
            },
            {
              id: 24,
              city: "Jaipur",
              state: "Rajasthan",
              value: 3,
            },
            {
              id: 25,
              city: "Dausa",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 26,
              city: "Alwar",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 27,
              city: "Didwana",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 28,
              city: "Phalodi",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 29,
              city: "Patiala",
              state: "Punjab region",
              value: 1,
            },
            {
              id: 30,
              city: "Surat",
              state: "Gujarat",
              value: 1,
            },
            {
              id: 31,
              city: "Mandalgarh",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 32,
              city: "Mumbai",
              state: "Maharashtra",
              value: 2,
            },
            {
              id: 33,
              city: "Tikamgarh",
              state: "Madhya Pradesh",
              value: 1,
            },
            {
              id: 34,
              city: "Nathdwara",
              state: "Rajasthan",
              value: 1,
            },
            {
              id: 35,
              city: "Mahwah",
              state: "Rajasthan",
              value: 1,
            },
          ],
          audience: {
            id: 1,
            male: 77,
            female: 14,
            other: 21,
            "female_<13": 0,
            "female_13-17": 2,
            "female_18-24": 5,
            "female_25-34": 4,
            "female_35-44": 2,
            "female_45-54": 1,
            "female_55-64": 0,
            "female_65+": 0,
            "male_<13": 0,
            "male_13-17": 5,
            "male_18-24": 24,
            "male_25-34": 32,
            "male_35-44": 13,
            "male_45-54": 3,
            "male_55-64": 0,
            "male_65+": 0,
            "other_<13": 0,
            "other_13-17": 3,
            "other_18-24": 9,
            "other_25-34": 7,
            "other_35-44": 2,
            "other_45-54": 0,
            "other_55-64": 0,
            "other_65+": 0,
          },
          country: [
            {
              id: 1,
              country: "IN",
              value: 112,
            },
          ],
        },
      ],
      content: [
        {
          id: 2,
          comments_count: 1,
          like_count: 19,
          media_product_type: "REELS",
          media_url:
            "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/61412527D944BBF12796A8F59B608FB0_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&vs=2690940854395254_4263301674&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC82MTQxMjUyN0Q5NDRCQkYxMjc5NkE4RjU5QjYwOEZCMF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dLNHd2eGtPb3BaNHNyc0NBTEdMOGdtdEhTNWticV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJuLJnpDxjoZAFQIoAkMzLBdALi8an752yRgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAhKuhK2G0Njdh312YzdmGlpaGs_ToP2iOzXm9bAsCf-Q&oe=660C642F&_nc_sid=1d576d&_nc_rid=70ab1463f0",
          pram_link: "https://www.instagram.com/reel/C4XtBgNg8EB/",
          post_at: "2024-03-11T10:19:42.000Z",
        },
        {
          id: 3,
          comments_count: 0,
          like_count: 12,
          media_product_type: "FEED",
          media_url:
            "https://scontent.cdninstagram.com/v/t51.29350-15/431339606_781866120468392_4471538299088275150_n.heic?stp=dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=GcnPDH86EOYAX_chgXV&_nc_ht=scontent.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCwaSq8KiU43lNY_WfEaxy4yGOF2WIUvNc2H5cE-QuQvA&oe=66107333",
          pram_link: "https://www.instagram.com/p/C4KV0FNP16-/",
          post_at: "2024-03-06T05:46:33.000Z",
        },
        {
          id: 1,
          comments_count: 0,
          like_count: 4,
          media_product_type: "FEED",
          media_url:
            "https://scontent.cdninstagram.com/v/t51.29350-15/434730664_403378992399657_1206643487413137400_n.heic?stp=dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=mA9OpJW5kjgAX9VZQQ5&_nc_ht=scontent.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCM0CUXHAJJKjj-UEcPlX6v2g-I8iQB2vsnJs_WOBDnTw&oe=661087E0",
          pram_link: "https://www.instagram.com/p/C5F8BJYvS8P/",
          post_at: "2024-03-29T09:15:35.000Z",
        },
      ],
      industryComparison: [
        {
          reach: {
            per_post: 780,
            industryAverage: 500,
          },
          view: {
            per_post: 565,
            industryAverage: 500,
          },
          engagement: {
            per_post: 6.32,
            industryAverage: 6.5,
          },
          pricing: {
            per_post: 500,
            industryAverage: 500,
          },
        },
      ],
      similarAccount: [
        {
          id: 5,
          fullName: "Gagan verma",
          profile_picture: {
            img_name: "cd9ef1b1-4621-4ad0-9b14-5ac7f422a93dcampaign3.png",
            img_url:
              "https://qikgro.s3.ap-south-1.amazonaws.com/cd9ef1b1-4621-4ad0-9b14-5ac7f422a93dcampaign3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZQ3DQROSX3GZW5YL%2F20240626%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240626T082841Z&X-Amz-Expires=360000&X-Amz-Signature=27993cc2e50392e131db22fb42e5e56e0a9a993d23acdb7a5328b1e9e43de7ea&X-Amz-SignedHeaders=host&x-id=GetObject",
          },
          audience: 39582,
          engagement: "4.5",
        },
      ],
    },
  ],
};
