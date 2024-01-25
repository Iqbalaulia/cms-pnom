import React from 'react';
import { Form, Checkbox, Row, Col } from 'antd';

const MenuComponent = ({ enableMenuModel, setFormData }) => {
  return (
    <Form.Item
      className="username"
      label="Menu"
    >
      <Row gutter={[24, 0]}>
        {Object.entries(enableMenuModel).map(([menuKey]) => (
          <Col key={menuKey} md={{ span: 8 }}>
            <Checkbox.Group
              onChange={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  permission: {
                    ...prevData.permission,
                    [menuKey]: {
                        "create": true,
                        "update": true
                    },
                  },
                }));
              }}
            >
              <Checkbox value={menuKey}>
                {menuKey.replace(/_/g, " ")}
              </Checkbox>
            </Checkbox.Group>
          </Col>
        ))}
      </Row>
    </Form.Item>
  );
};

export default MenuComponent;
