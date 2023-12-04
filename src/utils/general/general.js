import { notification } from 'antd';

const notificationSuccess = (message) => {
  notification.success({
    message: 'Successfully!',
    description: message,
    placement: 'bottomRight',
  });
};

const notificationError = (message) => {
    notification.error({
      message: 'Opps!',
      description: message,
      placement: 'bottomRight',
    });
  };

export { 
    notificationSuccess,
    notificationError 
};