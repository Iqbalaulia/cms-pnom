import React, { useState } from "react";
import { Col, Card, Tabs } from 'antd';

import DataAdmin from './DataAdmin';
import RoleAdmin from './RoleAdmin';

const AdminPage = () => {
  const { TabPane } = Tabs

  const [ header, setHeader ] = useState('Data Admin')

  function tabsChange (item) {
    if (item === '1') setHeader('Data Admin')
    if (item === '2') setHeader('Data Role')
  }

  return (
    <>
      <div className="admin-page">
        <row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox mb-24"
            >
                <h2 className="font-bold">
                  {header}
                </h2>

                <Tabs
                  defaultActiveKey="1"
                  onChange={tabsChange}
                >
                    <TabPane
                      tab="Admin"
                      key="1"
                    >
                      <DataAdmin/>
                    </TabPane>
                    <TabPane
                      tab="Role Admin"
                      key="2"
                    >
                      <RoleAdmin/>
                    </TabPane>
                </Tabs>
            </Card>
          </Col>
        </row>
      </div>
    </>
  )
}

export default AdminPage