import { notification } from 'antd';

const notificationSuccess = (message) => {
  notification.success({
    message: 'Successfully!',
    description: JSON.stringify(message),
    placement: 'bottomRight',
  });
};

const notificationError = (message) => {
    notification.error({
      message: 'Opps!',
      description: message ?  message.message : 'Mohon periksa kembali jaringan anda. Atau menghubungi call center',
      placement: 'bottomRight',
    });
};

export { 
    notificationSuccess,
    notificationError 
};