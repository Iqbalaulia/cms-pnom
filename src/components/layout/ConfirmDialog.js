import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const { confirm } = Modal;
const PnomConfirm = (props) => {
    const { onOkConfirm, onCancelConfirm, content } = props

    confirm({
      title: 'Apakah kamu yakin akan menghapus ini?',
      icon: <ExclamationCircleOutlined />,
      content: content,
      onOk: onOkConfirm(),
      onCancel: onCancelConfirm()
    });
};

export default PnomConfirm