export interface PricingInterface {
  monthly: PricingDataInterface[];
  yearly: PricingDataInterface[];
}

export interface PricingDataInterface {
  plan_id: string;
  header: {
    heading: string;
    monthlyPrice: string;
    billPeriod: string;
    yearlyPrice: string;
    discountedYearlyPrice: string;
    billPrice: string;
    discount: string;
    priceDescription: string;
    button: string;
    isPopular: boolean;
  };
  data: {
    heading: string;
    subHeading: string[];
  }[];
}

export const pricing: PricingInterface = {
  monthly: [
    {
      plan_id: "plan_O9w51h39OclzBk",
      header: {
        heading: "basic",
        monthlyPrice: "",
        billPeriod: "Billed Monthly",
        yearlyPrice: "",
        discountedYearlyPrice: "",
        billPrice: "5,000",
        discount: "",
        isPopular: false,
        priceDescription:
          "Key search engine and influencer management la tech techniques.",
        button: "Get Started",
      },
      data: [
        {
          heading: "Influencer Discover",
          subHeading: ["5,000 monthly results"],
        },
        {
          heading: "Influencer Relationship Management",
          subHeading: [
            "100 stored influencers",
            "30 monthly profiles analyses",
            "1 segmentation lists",
          ],
        },
        {
          heading: "Social Media Management",
          subHeading: ["Inbox & Comments", "Content planner", "Bio links"],
        },
        {
          heading: "General",
          subHeading: ["1 User"],
        },
      ],
    },
    {
      plan_id: "plan_OnpwO5MEgRl0NJ",
      header: {
        heading: "professional",
        monthlyPrice: "",
        billPeriod: "Billed Monthly",
        yearlyPrice: "",
        discountedYearlyPrice: "",
        billPrice: "9,000",
        discount: "",
        isPopular: true,
        priceDescription:
          "Elevate your experience with campaign management and reports.",
        button: "Get Started",
      },
      data: [
        {
          heading: "Influencer Discover",
          subHeading: ["10,000 monthly results"],
        },
        {
          heading: "Influencer Relationship Management",
          subHeading: [
            "600 stored influencer",
            "150 monthly profiles analyses",
            "100 segmentation lists",
            "3,000 monthly outreach emails",
          ],
        },
        {
          heading: "Influencer Campaign Management",
          subHeading: ["10 stored campaigns", "Shopify integration"],
        },
        {
          heading: "Influencer Campaign Reports",
          subHeading: ["10 campaigns reports", "200 monthly post analyses"],
        },
        {
          heading: "Social Media Management",
          subHeading: [
            "Inbox & Comments",
            "Social profiles analytics",
            "Content planner",
            "Bio links",
            "Paid ads",
          ],
        },
        {
          heading: "General",
          subHeading: ["5 Users", "Dedicated customer success"],
        },
      ],
    },
    {
      plan_id: "plan_OnptFCBhPmdY2P",
      header: {
        heading: "business",
        monthlyPrice: "",
        billPeriod: "Billed Monthly",
        yearlyPrice: "",
        discountedYearlyPrice: "",
        billPrice: "15,000",
        discount: "",
        isPopular: false,
        priceDescription:
          "The all inclusive solution designed to meet higher requirements.",
        button: "Get Started",
      },
      data: [
        {
          heading: "Influencer Discover",
          subHeading: ["25,000 monthly results"],
        },
        {
          heading: "Influencer Relationship Management",
          subHeading: [
            "2000 stored influencers",
            "500 monthly profiles analyses",
            "100 segmentation lists",
            "10,000 monthly outreach emails",
          ],
        },
        {
          heading: "Influencer Campaign Management",
          subHeading: ["50 stored campaigns", "Shopify integration"],
        },
        {
          heading: "Influencer Campaign Reports",
          subHeading: ["50 campaigns reports", "600 monthly post analyses"],
        },
        {
          heading: "Social Media Management",
          subHeading: [
            "Inbox & Comments",
            "Social profiles analytics",
            "Content planner",
            "Bio links",
            "Paid ads",
          ],
        },
        {
          heading: "General",
          subHeading: ["Unlimited Users", "Dedicated customer success"],
        },
      ],
    },
  ],
  yearly: [
    {
      plan_id: "plan_O9w51h39OclzBk",
      header: {
        heading: "basic",
        monthlyPrice: "5,000",
        billPeriod: "Billed At",
        yearlyPrice: "60,000",
        discountedYearlyPrice: "48,000",
        billPrice: "4,000",
        discount: "Save ₹12,000",
        isPopular: false,
        priceDescription:
          "Key search engine and influencer management techniques.",
        button: "Get Started",
      },
      data: [
        {
          heading: "Influencer Discover",
          subHeading: ["5,000 monthly results"],
        },
        {
          heading: "Influencer Relationship Management",
          subHeading: [
            "100 stored influencers",
            "30 monthly profiles analyses",
            "1 segmentation lists",
          ],
        },
        {
          heading: "Social Media Management",
          subHeading: ["Inbox & Comments", "Content planner", "Bio links"],
        },
        {
          heading: "General",
          subHeading: ["1 User"],
        },
      ],
    },

    {
      plan_id: "plan_O9w51h39OclzBk",
      header: {
        heading: "professional",
        monthlyPrice: "9,000",
        billPeriod: "Billed At",
        yearlyPrice: "1,08,000",
        discountedYearlyPrice: "86,400",
        billPrice: "7,200",
        discount: "Save ₹21,600",
        isPopular: true,
        priceDescription:
          "Elevate your experience with campaign management and reports.",
        button: "Get Started",
      },
      data: [
        {
          heading: "Influencer Discover",
          subHeading: ["10,000 monthly results"],
        },
        {
          heading: "Influencer Relationship Management",
          subHeading: [
            "600 stored influencers",
            "150 monthly profiles analyses",
            "100 segmentation lists",
            "3,000 monthly outreach emails",
          ],
        },
        {
          heading: "Influencer Campaign Management",
          subHeading: ["10 stored campaigns", "Shopify integration"],
        },
        {
          heading: "Influencer Campaign Reports",
          subHeading: ["10 campaigns reports", "200 monthly post analyses"],
        },
        {
          heading: "Social Media Management",
          subHeading: [
            "Inbox & Comments",
            "Social profiles analytics",
            "Content planner",
            "Bio links",
            "Paid ads",
          ],
        },
        {
          heading: "General",
          subHeading: ["5 Users", "Dedicated customer success"],
        },
      ],
    },

    {
      plan_id: "plan_O9w51h39OclzBk",
      header: {
        heading: "business",
        monthlyPrice: "15,000",
        billPeriod: "Billed At",
        yearlyPrice: "1,80,000",
        discountedYearlyPrice: "1,44,000",
        billPrice: "12,000",
        discount: "Save ₹36,000",
        isPopular: false,
        priceDescription:
          "The all inclusive solution designed to meet higher requirements.",
        button: "Get Started",
      },
      data: [
        {
          heading: "Influencer Discover",
          subHeading: ["25,000 monthly results"],
        },
        {
          heading: "Influencer Relationship Management",
          subHeading: [
            "2000 stored influencers",
            "500 monthly profiles analyses",
            "100 segmentation lists",
            "10,000 monthly outreach emails",
          ],
        },
        {
          heading: "Influencer Campaign Management",
          subHeading: ["50 stored campaigns", "Shopify integration"],
        },
        {
          heading: "Influencer Campaign Reports",
          subHeading: ["50 campaigns reports", "600 monthly post analyses"],
        },
        {
          heading: "Social Media Management",
          subHeading: [
            "Inbox & Comments",
            "Social profiles analytics",
            "Content planner",
            "Bio links",
            "Paid ads",
          ],
        },
        {
          heading: "General",
          subHeading: ["Unlimited Users", "Dedicated customer success"],
        },
      ],
    },
  ],
};
