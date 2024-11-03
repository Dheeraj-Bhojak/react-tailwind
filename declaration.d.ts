declare module "*.jpg";
declare module "*.png";

// declare module ".mp4";
declare module "*.gif";

declare module "*.mp4" {
  const src: string;
  export default src;
}
// Declare Razorpay on the window object

declare global {
  interface Window {
    Razorpay: Razorpay;
  }
}
