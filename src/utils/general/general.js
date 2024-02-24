import { notification } from "antd";

const notificationSuccess = (message) => {
  notification.success({
    message: "Successfully!",
    description: message,
    placement: "topRight",
  });
};

const notificationError = (message) => {
  if (message.response.data.responseCode === `401`) {
    localStorage.clear();
    notificationSuccess("Anda berhasil logout!");
    window.location.href = "/sign-in";
  } else {
    Object.keys(message.response.data.errors).forEach((error) => {
      notification.error({
        message: "Opps!",
        description: message
          ? error + " " + message.response.data.errors[error]
          : "Mohon periksa kembali jaringan anda. Atau menghubungi call center",
        placement: "topRight",
      });
    });
  }
};

const sourceOrder = (code) => {
  if (code === "1") return "Order from Web";
  if (code === "2") return "Shoppe";
  if (code === "3") return "Tokopedia";
  if (code === "4") return "Offline";
};

const statusOrder = (code) => {
  if (code === "1") return "Created";
  if (code === "2") return "Printing";
  if (code === "3") return "Cutting";
  if (code === "4") return "Shipping";
  if (code === "5") return "Delivered";
  if (code === "6") return "Done";
  if (code === "7") return "Refund";
};

const paymentOder = (code) => {
  if (code === 'payment_in_marketplace') return "Marketplace"
  if (code === 'cod') return "COD"
}


export {
  notificationSuccess,
  notificationError,
  sourceOrder,
  statusOrder,
  paymentOder
};
