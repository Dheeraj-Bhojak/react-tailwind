import React from "react";
import BlogsView from "./global/global_component/blogs/blogsView.component";
import path from "path";
import PricingScreen from "./global/global_pages/legalDocument/price2.0/pricingScreen.page";
const Blog = React.lazy(
  () => import("./global/global_component/blogs/blog.component")
);

const LoginForm = React.lazy(
  () => import("./global/global_pages/login/login.pages")
);

const RegistrationForm = React.lazy(
  () => import("./global/global_pages/register/sign-up.pages")
);

const MarketerHome = React.lazy(() => import("./marketer/pages/home_marketer"));
const InfluencerProfile = React.lazy(
  () => import("./global/global_component/profile/profile")
);
const OtpVerification = React.lazy(
  () => import("./global/global_pages/otp_verification/otp_verification.page")
);

const Privacy = React.lazy(
  () => import("./global/global_pages/legalDocument/privacy.pages")
);
const TermsOfService = React.lazy(
  () => import("./global/global_pages/legalDocument/termsOfService.page")
);
const RefundPolicy = React.lazy(
  () => import("./global/global_pages/legalDocument/refundPolicy.component")
);

const ContactUs = React.lazy(
  () => import("./global/global_pages/legalDocument/contactUs.page")
);
const FAQs = React.lazy(
  () => import("./global/global_pages/legalDocument/faqs.page")
);

const PricingListLayout = React.lazy(
  () => import("./global/global_pages/legalDocument/Pricing/pricing.component")
);

const PricingCalculator = React.lazy(
  () =>
    import("./global/global_component/calculator/estimatedPricing.component")
);
const AppRoutes = [
  { path: "/", name: "Home", element: MarketerHome },
  { path: "/privacy-policy", name: "Privacy-Policy", element: Privacy },
  {
    path: "/terms-of-services",
    name: "Terms-Services",
    element: TermsOfService,
  },
  { path: "/refund-policy", name: "Refund-Policy", element: RefundPolicy },
  { path: "/register", name: "Register", element: RegistrationForm },
  { path: "/login", name: "Log-in", element: LoginForm },

  {
    path: "/register/otp-verification",
    name: "Otp-Verification",
    element: OtpVerification,
  },
  {
    path: "influencer-profile/:id",
    name: "Influencer-Profile",
    element: InfluencerProfile,
  },
  {
    path: "/contact-us",
    name: "Contact-Us",
    element: ContactUs,
  },
  {
    path: "/faqs",
    name: "FAQs",
    element: FAQs,
  },
  {
    path: "/pricing",
    name: "Pricing",
    element: PricingListLayout,
  },
  {
    path: "/pricing2.0",
    name: "Pricing_2.0",
    element: PricingScreen,
  },
  {
    path: "/pricing-calculator",
    name: "PricingCalculator",
    element: PricingCalculator,
  },
  {
    path: "/blogs",
    name: "BlogsView",
    element: BlogsView,
  },
  {
    path: "/blog/:id",
    name: "BlogView",
    element: Blog,
  },
];

export default AppRoutes;
