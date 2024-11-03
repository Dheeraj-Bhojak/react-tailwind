import { CToast, CToastBody, CToastClose } from "@coreui/react";
import React from "react";

const ToastAlert = () => {
  return (
    <div>
      <CToast
        autohide={true}
        visible={true}
        animation={true}
        color="primary"
        className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>Hello, world! This is a toast message.</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
    </div>
  );
};

export default ToastAlert;
