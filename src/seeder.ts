import _ from "lodash";
import companyLogo from "./assets/img/companyLogo.jpg";
import profile from "./assets/img/profile.jpg";

interface SocialInterface {
  [key: string]: string;
  instagram: string;
  facebook: string;
  youtube: string;
  twitter: string;
}

interface CampaignsInterface {
  id: number;
  campaign_name: string;
  platform: string;
  compensation_type: string;
  niche: string;
  campaign_image: string;
  lastDayToApplyCampaign: string;
  number_of_influencer: string;
}
export const niches_categories = [
  {
    id: 1,
    niche_name: "Fashion and Style",
  },
  {
    id: 2,
    niche_name: "Beauty and Cosmetic",
  },
  {
    id: 3,
    niche_name: "Fitness and Health",
  },
  {
    id: 4,
    niche_name: "Travel and Adventure",
  },
  {
    id: 5,
    niche_name: "Food and Beverages",
  },
  {
    id: 6,
    niche_name: "Technology",
  },
  {
    id: 7,
    niche_name: "Gaming",
  },
  {
    id: 8,
    niche_name: "Home Decor and DIY",
  },
  {
    id: 9,
    niche_name: "Art",
  },
  {
    id: 10,
    niche_name: "Business and Entrepreneurship",
  },
  {
    id: 11,
    niche_name: "Personal Development and Motivation",
  },
  {
    id: 12,
    niche_name: "Books and Literature",
  },
  {
    id: 13,
    niche_name: "Music and Entertainment",
  },
  {
    id: 14,
    niche_name: "Film and TV Shows",
  },
  {
    id: 15,
    niche_name: "Pet Care",
  },
  {
    id: 16,
    niche_name: "Finance and Investing",
  },
  {
    id: 17,
    niche_name: "Automotive",
  },
  {
    id: 18,
    niche_name: "Sports and Athletics",
  },
  {
    id: 19,
    niche_name: "Education and Learning",
  },
  {
    id: 20,
    niche_name: "Gardening",
  },
  {
    id: 21,
    niche_name: "Social Causes and Activism",
  },
];

export const Languages = [
  {
    id: 1,
    language_name: "Hindi",
  },
  {
    id: 2,
    language_name: "English",
  },
  {
    id: 3,
    language_name: "Bengali",
  },
  {
    id: 4,
    language_name: "Telugu",
  },
  {
    id: 5,
    language_name: "Marathi",
  },
  {
    id: 6,
    language_name: "Tamil",
  },
  {
    id: 7,
    language_name: "Urdu",
  },
  {
    id: 8,
    language_name: "Gujarati",
  },
  {
    id: 9,
    language_name: "Malayalam",
  },
  {
    id: 10,
    language_name: "Kannada",
  },
  {
    id: 11,
    language_name: "Odia",
  },
  {
    id: 12,
    language_name: "Punjabi",
  },
  {
    id: 13,
    language_name: "Nepali",
  },
  {
    id: 14,
    language_name: "Rajasthani",
  },
  {
    id: 15,
    language_name: "Haryanvi",
  },
];

export const campaigns: CampaignsInterface[] = [
  {
    id: 1,
    campaign_name: "winter Collection 5",
    platform: "Youtube",
    compensation_type: "Paid",
    niche: "technology",
    campaign_image:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/kurta/2/7/5/xl-mens-kurta-box-nellist-original-imagnwzm8kmytx72",
    lastDayToApplyCampaign:
      "Sat Dec 23 2023 00:00:00 GMT+0530 (India Standard Time)",
    number_of_influencer: "11-20 influencer",
  },
  {
    id: 2,
    campaign_name: "winter Collection 5",
    platform: "Youtube",
    compensation_type: "Paid",
    niche: "technology",
    campaign_image:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/kurta/2/7/5/xl-mens-kurta-box-nellist-original-imagnwzm8kmytx72",
    lastDayToApplyCampaign:
      "Sat Dec 23 2023 00:00:00 GMT+0530 (India Standard Time)",
    number_of_influencer: "11-20 influencer",
  },
  {
    id: 3,
    campaign_name: "winter Collection 5",
    platform: "Youtube",
    compensation_type: "Paid",
    niche: "technology",
    campaign_image:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/kurta/2/7/5/xl-mens-kurta-box-nellist-original-imagnwzm8kmytx72",
    lastDayToApplyCampaign:
      "Sat Dec 23 2023 00:00:00 GMT+0530 (India Standard Time)",
    number_of_influencer: "11-20 influencer",
  },
  {
    id: 4,
    campaign_name: "winter Collection 5",
    platform: "Youtube",
    compensation_type: "Paid",
    niche: "technology",
    campaign_image:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/kurta/2/7/5/xl-mens-kurta-box-nellist-original-imagnwzm8kmytx72",
    lastDayToApplyCampaign:
      "Sat Dec 23 2023 00:00:00 GMT+0530 (India Standard Time)",
    number_of_influencer: "11-20 influencer",
  },
];

export const ChannelReport = [
  ["week1", 12, 0, 0, 0],
  ["week2", 6, 0, 0, 0],
  ["week3", 8, 0, 0, 0],
  ["week4", 10, 0, 1, 0],
];
export const channel_Audience_demography = [
  ["age13-17", "female", 0.1],
  ["age18-24", "female", 7.9],
  ["age25-34", "female", 45.3],
  ["age35-44", "female", 6.3],
  ["age45-54", "female", 1.9],
  ["age55-64", "female", 1.5],
  ["age65-", "female", 0.6],
  ["age13-17", "male", 0.3],
  ["age18-24", "male", 7.8],
  ["age25-34", "male", 15.5],
  ["age35-44", "male", 7.8],
  ["age45-54", "male", 2.3],
  ["age55-64", "male", 1.5],
  ["age65-", "male", 1.2],
];

export const youtubeChannelData = {
  channel_details: {
    id: 1,
    channel_name: "Dheeraj Bhojak",
    user_name: "@dheeraj-s-bhojak",
    channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
    channel_description:
      " this is a discription. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, officia facere ipsam veritatis autem deleniti iure placeat maxime, quis consectetur odio molestiae fugiat temporibus modi. Beatae doloremque iste, natus voluptates perferendis sunt cupiditate impedit similique obcaecati nihil nulla nemo soluta alias, nisi quod accusamus possimus blanditiis id aspernatur quam asperiores. ",
    channel_publish: "2023-07-21T10:40:44.520251Z",
    channel_profile_url:
      "https://yt3.ggpht.com/ytc/APkrFKbKUxzXTYEi4iqeaXcRR0jZPqHv5ow2SR9loJoms4tqm7dxFl-7upRjKYphZnIA=s240-c-k-c0x00ffffff-no-rj",
    total_views: "13",
    subscriber_count: "2",
    videos_uploaded: "2",
  },
  videos: [
    {
      id: 9,
      video_id: "vr6jFYadxaI",
      publish_date: "2023-08-24T09:04:18Z",
      youtube_channel_id: "UC0kLpBFP3lVaoQlRORUyojA",
      title: "Reyu's Old Mac Donald had a farm | Baby Songs, Nursery Rhymes",
      description:
        "Reyu learns about sounds of different animals.\n\nPlease Subscribe!\n\n#reyuandme #babysongs #nurseryrhymes #oldmacdonaldhadafarm",
      thumbnails: "https://i.ytimg.com/vi/vr6jFYadxaI/hqdefault.jpg",
      tags: "rhymes,songs for kids,kids songs,poems",
      category_id: "24",
      default_language: "en-IN",
      default_audio_language: "en-IN",
      views: "9726",
      likes: "21",
      favorite_count: "0",
      comment_count: "0",
    },
    {
      id: 10,
      video_id: "A6pr5T0GhQI",
      publish_date: "2023-07-30T10:49:25Z",
      youtube_channel_id: "UC0kLpBFP3lVaoQlRORUyojA",
      title: "Reyu Dress up Costumes and Play - Kids Toy Stories",
      description:
        "Mummy makes new DIY dresses for Reyu and finds funny adventures inside the home. Video for kids.\n\nPlease Subscribe!\n\n#reyuandme #youtubekids #bedtimestories #baby #toddlers #toys #forkids",
      thumbnails: "https://i.ytimg.com/vi/A6pr5T0GhQI/hqdefault.jpg",
      tags: "vlad,niki,rhymes,video for kids,reyuandme,reyu and me,reyu,bed time stories",
      category_id: "24",
      default_language: "en-IN",
      default_audio_language: "hi",
      views: "2601",
      likes: "14",
      favorite_count: "0",
      comment_count: "0",
    },
    {
      id: 11,
      video_id: "tSzuoPNhJB0",
      publish_date: "2023-08-03T11:21:18Z",
      youtube_channel_id: "UC0kLpBFP3lVaoQlRORUyojA",
      title:
        "1000 Mystery Buttons But Only 1 Lets You Escape - Kids Story From Reyu",
      description:
        "Please Subscribe!\n\n#reyuandme #youtubekids #bedtimestories #challenge",
      thumbnails: "https://i.ytimg.com/vi/tSzuoPNhJB0/hqdefault.jpg",
      tags: null,
      category_id: "24",
      default_language: "en-IN",
      default_audio_language: "hi",
      views: "292",
      likes: "9",
      favorite_count: "0",
      comment_count: "0",
    },
    {
      id: 12,
      video_id: "LvQLsJ_mjOs",
      publish_date: "2023-07-26T08:14:22Z",
      youtube_channel_id: "UC0kLpBFP3lVaoQlRORUyojA",
      title:
        "Reyu Learns How to STUDY in School - Funny Kids Story about Alphabets, Colors & Numbers",
      description:
        "Reyu learns good habit of studying well in school and convert himself from dumb student to brilliant student.\n\nPlease Subscribe!\n\n#reyuandme #school #story #bedtimestories #youtubekids #toddlers #toys #alphabet #colors #number",
      thumbnails: "https://i.ytimg.com/vi/LvQLsJ_mjOs/hqdefault.jpg",
      tags: "kids,school,funny,story,stories,children,student,teacher,fun,kid,child,moral,education,educational,good,behavior,behaviour",
      category_id: "24",
      default_language: "en-IN",
      default_audio_language: "en-IN",
      views: "1710",
      likes: "85",
      favorite_count: "0",
      comment_count: "0",
    },
  ],
};

export const socialIcons: SocialInterface = {
  instagram:
    "https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8c05b256c32_a-social_in.png",
  facebook:
    "https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c83ef4256c2e_a-social_fb.png",
  youtube:
    "https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8004f256c34_a-social_y.png",
  twitter:
    "https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8596c256c2c_a-social_tw.png",
};

export const influencerData = [
  {
    id: 1,
    name: "Deepika Padukone",
    platform: ["youtube", "instagram", "twitter", "facebook"],
    userName: "@deepikapadukone",
    profilePicture: "deepika-padukon.jpg",
    niches: ["Actor", "Bollywood", "Actor", "Actor", "Actor"],
    platformScore: 82,
    subscribers: 75445686,
    Avg_views: 71137,
  },
  {
    id: 14,
    name: "Yash",
    platform: ["instagram"],
    userName: "@thenameisyash",
    profilePicture: "yash-profile.jpg",
    niches: ["Actor", "Actor", "Actor", "Actor", "Actor"],
    platformScore: 98,
    subscribers: 13495559,
    Avg_views: 71137,
  },
  {
    id: 2,
    name: "Samantha",
    platform: ["youtube", "facebook"],
    userName: "@samantharuthprabhuoffl",
    profilePicture: "samantha.jpg",
    niches: ["Actor", "Actor", "Actor", "Actor", "Actor"],
    platformScore: 85,
    subscribers: 28964609,
    Avg_views: _.random(0, 99999),
  },
  {
    id: 3,
    name: "Jr NTR",
    platform: ["youtube", "instagram", "twitter"],
    userName: "@jrntr",
    profilePicture: "jrntr.jpg",
    niches: ["Actor", "Actor", "Actor", "Actor", "Actor"],
    platformScore: 88,
    subscribers: 6646329,
    Avg_views: _.random(0, 99999),
  },
  {
    id: 4,
    name: "Urfi Javed",
    platform: ["instagram", "twitter", "facebook"],
    userName: "@musky_Dietric",
    profilePicture: "urfi_profile.jpg",
    niches: ["clothing", "images", "actor", "Beauty", "women"],
    platformScore: 93,
    subscribers: 6545643,
    Avg_views: _.random(0, 99999),
  },
  {
    id: 5,
    name: "Ranveer Singh",
    platform: ["facebook", "twitter"],
    userName: "@ranveersingh",
    profilePicture: "ranveer-singh.jpg",
    niches: ["Actor", "Actor", "Actor", "Actor", "Actor"],
    platformScore: 88,
    subscribers: 44703526,
    Avg_views: _.random(0, 99999),
  },
  {
    id: 6,
    name: "Aliaa Bhat",
    platform: ["facebook", "youtube"],
    userName: "@aliaaBhat",
    profilePicture: "alia-bhat.jpg",
    niches: ["Actor", "Actor", "Actor", "Actor", "Actor"],
    platformScore: 79,
    subscribers: 79123495,
    Avg_views: _.random(0, 99999),
  },
  {
    id: 7,
    name: "Clementine Bauch",
    platform: ["facebook", "twitter"],
    userName: "@jonny_Vlogs",
    profilePicture: "12.jpg",
    niches: ["technology", "images", "cars", "bikes", "blogs"],
    platformScore: _.random(0, 100),
    subscribers: _.random(0, 9999999),
    Avg_views: _.random(0, 99999),
  },
  {
    id: 8,
    name: "Clementina DuBuque",
    platform: ["youtube", "twitter"],
    userName: "@jonny_Vlogs",
    profilePicture: "5.jpg",
    niches: ["technology", "images", "cars", "bikes", "blogs"],
    platformScore: _.random(0, 100),
    subscribers: _.random(0, 9999999),
    Avg_views: _.random(0, 99999),
  },
  {
    id: 9,
    name: "Ervin Howell",
    platform: ["instagram", "twitter"],
    userName: "@jonny_Vlogs",
    profilePicture: "5.jpg",
    niches: ["technology", "images", "cars", "bikes", "blogs"],
    platformScore: _.random(0, 100),
    subscribers: _.random(0, 9999999),
    Avg_views: _.random(0, 99999),
  },
  {
    id: 10,
    name: "Ervin Howell",
    platform: ["instagram", "twitter"],
    userName: "@jonny_Vlogs",
    profilePicture: "8.jpg",
    niches: ["technology", "images", "cars", "bikes", "blogs"],
    platformScore: _.random(0, 100),
    subscribers: _.random(0, 9999999),
    Avg_views: _.random(0, 99999),
  },
  {
    id: 11,
    name: "j. k.  Howell",
    platform: ["twitter"],
    userName: "@jonny_Vlogs",
    profilePicture: "10.jpg",
    niches: ["technology", "images", "cars", "comedy", "blogs"],
    platformScore: _.random(0, 100),
    subscribers: _.random(0, 9999999),
    Avg_views: _.random(0, 99999),
  },
  {
    id: 12,
    name: "Eowell",
    platform: ["twitter"],
    userName: "@jonny_Vlogs",
    profilePicture: "11.jpg",
    niches: ["technology", "standUp", "cars", "gaming", "blogs"],
    platformScore: _.random(0, 100),
    subscribers: _.random(0, 9999999),
    Avg_views: _.random(0, 99999),
  },
  {
    id: 13,
    name: "lorem",
    platform: ["instagram", "twitter", "youtube"],
    userName: "@jonny_Vlogs",
    profilePicture: "13.jpg",
    niches: ["technology", "doctor", "medical", "dentist", "blogs"],
    platformScore: _.random(0, 100),
    subscribers: _.random(0, 9999999),
    Avg_views: _.random(0, 99999),
  },
];

export const PriceListSeed = [
  {
    heading: "",
    data: [" ", "Most Popular", " "],
  },
  {
    heading: "",
    data: [
      {
        tag: "",
        heading: "Basic",
        yearlyPlan: "134/mo",
        price: "168/mo",
        monthlyTimePeriod: "Paid monthly",
        yearlyTimePeriod: "₹2,016",
        yearlyTimePeriodWithDiscount: "₹1,613",
        button: "Start a 7-day free trial",
        option: "No credit card required",
      },
      {
        tag: "",
        heading: "Professional",
        yearlyPlan: "278/mo",
        price: "348/mo",
        monthlyTimePeriod: "Paid monthly",
        yearlyTimePeriod: "₹4,176",
        yearlyTimePeriodWithDiscount: "₹3,340",
        button: "Start a 7-day free trial",
        option: "No credit card required",
      },
      {
        tag: "",
        heading: "Business",
        yearlyPlan: "558/mo",
        price: "698/mo",
        monthlyTimePeriod: "Paid monthly",
        yearlyTimePeriod: "₹8,376",
        yearlyTimePeriodWithDiscount: "₹6,700",
        button: "Start a 7-day free trial",
        option: "No credit card required",
      },
    ],
  },
  {
    heading: "Social Networks",
    data: ["Instagram", "Youtube"],
  },
  {
    heading: "Discover",
    data: [true, true, true],
  },
  {
    subHeading: "Access to 200M+ influencers",
    data: [true, true, true],
  },
  {
    subHeading: "Number of searchs",
    data: ["Unlimited", "Unlimited", "Unlimited"],
  },
  {
    subHeading: "Monthly results",
    data: ["5000", "10000", "25000"],
  },
  {
    subHeading: "Add more results",
    data: [true, true, true],
  },
  {
    subHeading: "Save your searches",
    data: [true, true, true],
  },
  {
    subHeading: "Export results",
    data: [false, true, true],
  },
  {
    heading: "IRM & Data",
    data: [true, true, true],
  },
  {
    subHeading: "Influencer storage",
    data: ["100", "600", "2000"],
  },
  {
    subHeading: "Monthly analysis",
    data: ["30", "150", "500"],
  },
  {
    subHeading: "Advanced data",
    data: [true, true, true],
  },
  {
    subHeading: "Audience quality",
    data: [true, true, true],
  },
  {
    subHeading: "Lists",
    data: ["1", "100", "100"],
  },
  {
    subHeading: "Follower overlap",
    data: [true, true, true],
  },
  {
    subHeading: "Email integration",
    data: [false, true, true],
  },
  {
    subHeading: "Share & PDF",
    data: [false, true, true],
  },
  {
    subHeading: "Export Data",
    data: [true, true, true],
  },
  {
    subHeading: "Bulk Email",
    data: [true, true, true],
  },
  {
    heading: "Campaigns",
    data: [true, true, true],
  },
  {
    subHeading: "Campaign storage",
    data: [false, "10", "50"],
  },
  {
    subHeading: "Number of influencers in a campaign",
    data: [false, "600", "2000"],
  },
  {
    subHeading: "Estimated results",
    data: [false, true, true],
  },
  {
    subHeading: "Custom workflows",
    data: [false, true, true],
  },
  {
    subHeading: "Programs",
    data: [false, "Unlimited", "Unlimited"],
  },
  {
    heading: "Reports",
    data: [false, true, true],
  },
  {
    subHeading: "Report storage",
    data: [false, "10", "50"],
  },
  {
    subHeading: "Monthly posts",
    data: [false, "200", "600"],
  },
  {
    subHeading: "Metrics per influencer",
    data: [false, true, true],
  },
  {
    subHeading: "Metrics per post",
    data: [false, true, true],
  },
  {
    subHeading: "Share & PDF",
    data: [false, true, true],
  },
  {
    subHeading: "Export reports",
    data: [false, true, true],
  },
  {
    heading: "General",
    data: [true, true, true],
  },
  {
    subHeading: "Users",
    data: ["4", "10", "Unlimited"],
  },
  {
    subHeading: "Supports",
    data: ["Email", "Email & Phone", "Email & Phone"],
  },
  {
    subHeading: "Dedicated Customer Success	",
    data: [false, true, true],
  },
];

export const stateCodeMapping = {
  "Andhra Pradesh": "IN-AP",
  "Arunachal Pradesh": "IN-AR",
  Assam: "IN-AS",
  Bihar: "IN-BR",
  Chhattisgarh: "IN-CT",
  Goa: "IN-GA",
  Gujarat: "IN-GJ",
  Haryana: "IN-HR",
  "Himachal Pradesh": "IN-HP",
  "Jammu And Kashmir": "IN-JK",
  Jharkhand: "IN-JH",
  Karnataka: "IN-KA",
  Kerala: "IN-KL",
  "Madhya Pradesh": "IN-MP",
  Maharashtra: "IN-MH",
  Manipur: "IN-MN",
  Meghalaya: "IN-ML",
  Mizoram: "IN-MZ",
  Nagaland: "IN-NL",
  Odisha: "IN-OR",
  Punjab: "IN-PB",
  Rajasthan: "IN-RJ",
  Sikkim: "IN-SK",
  TamilNadu: "IN-TN",
  Telangana: "IN-TG",
  Tripura: "IN-TR",
  Uttarakhand: "IN-UK",
  "Uttar Pradesh": "IN-UP",
  "West Bengal": "IN-WB",
  "Andaman And Nicobar Islands": "IN-AN",
  Chandigarh: "IN-CH",
  "Dadra And Nagar Haveli And Daman And Diu": "IN-DD",
  Lakshadweep: "IN-LD",
  Delhi: "IN-DL",
  Puducherry: "IN-PY",
};

export const campaignTableData = [
  {
    id: 1,
    campaignProfilePic: companyLogo,
    campaignName: "tokyo drift",
    company: "x factor",
    industry: "automobiles",
    budget: {
      tentative: "Below ₹1 Lakh",
      spent: 136000,
    },
    influencers: {
      expected: "1-10",
      coming: 13,
    },
    status: "active",
    reach: 5700,
    engagement: 67.9,
    amProfilePic: profile,
    am: "Karan Kapoor",
  },
  {
    id: 2,
    campaignProfilePic: companyLogo,
    campaignName: "Speedy Motors",
    company: "Motorworks Inc.",
    industry: "Automobiles",
    budget: {
      tentative: "₹1 Lakh to 10 Lakh",
      spent: 4800000,
    },
    influencers: {
      expected: "11-20",
      coming: 25,
    },
    status: "completed",
    reach: 92000,
    engagement: 73.2,
    amProfilePic: profile,
    am: "Sophia Rodriguez",
  },
  {
    id: 3,
    campaignProfilePic: companyLogo,
    campaignName: "Eco Drive",
    company: "Green Wheels Co.",
    industry: "Environmental",
    budget: {
      tentative: "₹10 Lakh to 50 Lakh",
      spent: 2800000,
    },
    influencers: {
      expected: "21-50",
      coming: 8,
    },
    status: "under review",
    reach: 41000,
    engagement: 55.6,
    amProfilePic: profile,
    am: "Alex Thompson",
  },
  {
    id: 4,
    campaignProfilePic: companyLogo,
    campaignName: "Urban Rush",
    company: "Metro Motors",
    industry: "Automobiles",
    budget: {
      tentative: "₹50 Lakh & Above",
      spent: 5500000,
    },
    status: "active",
    influencers: {
      expected: "50 & Above",
      coming: 37,
    },
    reach: 105000,
    engagement: 81.5,
    amProfilePic: profile,
    am: "Emily Chen",
  },
  {
    id: 5,
    campaignProfilePic: companyLogo,
    campaignName: "Adventure Wheels",
    company: "Wanderlust Motors",
    industry: "Travel & Adventure",
    budget: {
      tentative: "Below ₹1 Lakh",
      spent: 6000000,
    },
    influencers: {
      expected: "1-10",
      coming: 19,
    },
    status: "completed",
    reach: 72000,
    engagement: 68.7,
    amProfilePic: profile,
    am: "Michael Johnson",
  },
  {
    id: 6,
    campaignProfilePic: companyLogo,
    campaignName: "Tech Drive",
    company: "InnovateTech",
    industry: "Technology",
    budget: {
      tentative: "₹1 Lakh to 10 Lakh",
      spent: 8500000,
    },
    influencers: {
      expected: "11-20",
      coming: 30,
    },
    status: "under review",
    reach: 125000,
    engagement: 78.3,
    amProfilePic: profile,
    am: "Sarah Lee",
  },
  {
    id: 7,
    campaignProfilePic: companyLogo,
    campaignName: "Health Wheels",
    company: "FitLife Inc.",
    industry: "Health & Fitness",
    budget: {
      tentative: "₹10 Lakh to 50 Lakh",
      spent: 7000000,
    },
    influencers: {
      expected: "21-50",
      coming: 15,
    },
    status: "active",
    reach: 89000,
    engagement: 72.1,
    amProfilePic: profile,
    am: "Daniel Smith",
  },
  {
    id: 8,
    campaignProfilePic: companyLogo,
    campaignName: "Fashion Drive",
    company: "Style Trends Ltd.",
    industry: "Fashion",
    budget: {
      tentative: "₹50 Lakh & Above",
      spent: 9500000,
    },
    influencers: {
      expected: "50 & Above",
      coming: 41,
    },
    status: "completed",
    reach: 150000,
    engagement: 85.6,
    amProfilePic: profile,
    am: "Jessica Brown",
  },
  {
    id: 9,
    campaignProfilePic: companyLogo,
    campaignName: "Foodies on Wheels",
    company: "Taste Buds Co.",
    industry: "Food & Beverage",
    budget: {
      tentative: "Below ₹1 Lakh",
      spent: 5000000,
    },
    influencers: {
      expected: "1-10",
      coming: 24,
    },
    status: "under review",
    reach: 98000,
    engagement: 76.4,
    amProfilePic: profile,
    am: "David Wilson",
  },
  {
    id: 10,
    campaignProfilePic: companyLogo,
    campaignName: "Gadget Galore",
    company: "Tech Innovations Ltd.",
    industry: "Electronics",
    budget: {
      tentative: "₹1 Lakh to 10 Lakh",
      spent: 12000000,
    },
    influencers: {
      expected: "11-20",
      coming: 49,
    },
    status: "active",
    reach: 180000,
    engagement: 90.2,
    amProfilePic: profile,
    am: "Sophie Miller",
  },
  {
    id: 11,
    campaignProfilePic: companyLogo,
    campaignName: "Petrol Heads",
    company: "Revolution Motors",
    industry: "Automobiles",
    budget: {
      tentative: "₹10 Lakh to 50 Lakh",
      spent: 4200000,
    },
    influencers: {
      expected: "21-50",
      coming: 20,
    },
    status: "completed",
    reach: 65000,
    engagement: 69.8,
    amProfilePic: profile,
    am: "Brian Davis",
  },
  {
    id: 12,
    campaignProfilePic: companyLogo,
    campaignName: "Green Machines",
    company: "EcoDrive Ltd.",
    industry: "Environmental",
    budget: {
      tentative: "₹50 Lakh & Above",
      spent: 5900000,
    },
    influencers: {
      expected: "50 & Above",
      coming: 28,
    },
    status: "under review",
    reach: 85000,
    engagement: 75.2,
    amProfilePic: profile,
    am: "Linda Johnson",
  },
  {
    id: 13,
    campaignProfilePic: companyLogo,
    campaignName: "Fitness Fusion",
    company: "FitPro",
    industry: "Health & Fitness",
    budget: {
      tentative: "Below ₹1 Lakh",
      spent: 5100000,
    },
    influencers: {
      expected: "1-10",
      coming: 16,
    },
    status: "active",
    reach: 72000,
    engagement: 71.5,
    amProfilePic: profile,
    am: "John Smith",
  },
  {
    id: 14,
    campaignProfilePic: companyLogo,
    campaignName: "Gaming Galore",
    company: "PlayTech",
    industry: "Gaming",
    budget: {
      tentative: "₹1 Lakh to 10 Lakh",
      spent: 8000000,
    },
    influencers: {
      expected: "11-20",
      coming: 27,
    },
    status: "completed",
    reach: 105000,
    engagement: 79.3,
    amProfilePic: profile,
    am: "Alicia Johnson",
  },
  {
    id: 15,
    campaignProfilePic: companyLogo,
    campaignName: "Travel Trek",
    company: "WanderMore",
    industry: "Travel & Adventure",
    budget: {
      tentative: "₹10 Lakh to 50 Lakh",
      spent: 6700000,
    },
    influencers: {
      expected: "21-50",
      coming: 36,
    },
    status: "under review",
    reach: 98000,
    engagement: 74.8,
    amProfilePic: profile,
    am: "Christopher White",
  },
  {
    id: 16,
    campaignProfilePic: companyLogo,
    campaignName: "Food Frenzy",
    company: "TasteDelights",
    industry: "Food & Beverage",
    budget: {
      tentative: "₹50 Lakh & Above",
      spent: 5800000,
    },
    influencers: {
      expected: "50 & Above",
      coming: 21,
    },
    status: "active",
    reach: 83000,
    engagement: 70.2,
    amProfilePic: profile,
    am: "Michelle Thompson",
  },
  {
    id: 17,
    campaignProfilePic: companyLogo,
    campaignName: "Tech Titans",
    company: "TechGurus",
    industry: "Technology",
    budget: {
      tentative: "Below ₹1 Lakh",
      spent: 11000000,
    },
    influencers: {
      expected: "1-10",
      coming: 50,
    },
    status: "completed",
    reach: 160000,
    engagement: 85.9,
    amProfilePic: profile,
    am: "Robert Harris",
  },
  {
    id: 18,
    campaignProfilePic: companyLogo,
    campaignName: "Style Showcase",
    company: "FashionHub",
    industry: "Fashion",
    budget: {
      tentative: "₹1 Lakh to 10 Lakh",
      spent: 7500000,
    },
    influencers: {
      expected: "11-20",
      coming: 31,
    },
    status: "under review",
    reach: 120000,
    engagement: 78.5,
    amProfilePic: profile,
    am: "Rachel Martinez",
  },
  {
    id: 19,
    campaignProfilePic: companyLogo,
    campaignName: "Home Haven",
    company: "HomeStyle",
    industry: "Home & Decor",
    budget: {
      tentative: "₹10 Lakh to 50 Lakh",
      spent: 6300000,
    },
    influencers: {
      expected: "21-50",
      coming: 26,
    },
    status: "active",
    reach: 95000,
    engagement: 76.9,
    amProfilePic: profile,
    am: "Daniel Taylor",
  },
  {
    id: 20,
    campaignProfilePic: companyLogo,
    campaignName: "Music Melody",
    company: "SoundWave",
    industry: "Entertainment",
    budget: {
      tentative: "₹50 Lakh & Above",
      spent: 9000000,
    },
    influencers: {
      expected: "50 & Above",
      coming: 39,
    },
    status: "completed",
    reach: 140000,
    engagement: 82.4,
    amProfilePic: profile,
    am: "Emma Wilson",
  },
];
