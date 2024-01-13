import React from 'react';
import { Modal, Button } from 'antd';

const PnomModal = (props) => {
  const { title, width, children , visible, onOk, onCancel, stepAction } = props;
  
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={width}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={onOk}>
          {stepAction === 'save-data' ? 'Simpan Data': 'Ubah Data'}
        </Button>,
      ]}
    >
      { children }
    </Modal>
  );
};

export default PnomModal;
