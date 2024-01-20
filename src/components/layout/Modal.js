import React from 'react';
import { Modal, Button } from 'antd';

const PnomModal = (props) => {
  const { title, width, children , visible, onOk, onCancel, isAction } = props;
  
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
          {isAction === 'save-data' ? 'Simpan Data': 'Ubah Data'}
        </Button>,
      ]}
    >
      { children }
    </Modal>
  );
};

export default PnomModal;
