import { notification } from "antd";
import { platform, statusOrderData } from "./contant";

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
  if (code === "1") return platform.web;
  if (code === "2") return platform.shoppe;
  if (code === "3") return platform.tokopedia;
  if (code === "4") return platform.offline;
};

const statusOrder = (code) => {
  if (code === "1") return statusOrderData.created;
  if (code === "2") return statusOrderData.printing;
  if (code === "3") return statusOrderData.cutting;
  if (code === "4") return statusOrderData.shipping;
  if (code === "5") return statusOrderData.delivered;
  if (code === "6") return statusOrderData.done;
  if (code === "7") return statusOrderData.refund;
};

const paymentOder = (code) => {
  if (code === "payment_in_marketplace") return "Marketplace";
  if (code === "cod") return "COD";
};

const convertToRupiah = (amount) => {
  const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const rupiah = rupiahFormatter.format(amount);
  return rupiah;
};

export {
  notificationSuccess,
  notificationError,
  sourceOrder,
  statusOrder,
  paymentOder,
  convertToRupiah,
};
