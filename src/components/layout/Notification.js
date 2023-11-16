import { notification} from 'antd';

const PnomNotification = (props) => {
    const {type, message, description} = props
    notification[type]({
      message: message,
      description: description
    });
  };

export default PnomNotification;