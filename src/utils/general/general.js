import { notification } from 'antd';

const notificationSuccess = (message) => {
  notification.success({
    message: 'Successfully!',
    description: message,
    placement: 'topRight',
  });
};

const notificationError = (message) => {
  if(message.response.data.responseCode === `401`) {
    localStorage.clear()
    notificationSuccess('Anda berhasil logout!')
    window.location.href = '/sign-in'
  } else {
    Object.keys(message.response.data.errors).forEach(error => {
      notification.error({
       message: 'Opps!',
       description: message ?  error + ' ' + message.response.data.errors[error] : 'Mohon periksa kembali jaringan anda. Atau menghubungi call center',
       placement: 'topRight',
     });
   });
  }
};

export { 
    notificationSuccess,
    notificationError 
};