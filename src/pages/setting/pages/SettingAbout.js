import React, { useEffect, useState, } from 'react';
import { Col, Button ,Form ,Input} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { aboutModel } from '../data/setting';

const SettingAbout = () => {
    const { TextArea } = Input;
    const [ formAbout, setFormAbout ] = useState(aboutModel)

    useEffect(() => {
      
    })
    return(
        <>
            <div className='setting-about'>
              <Form>
                  <row gutter={[24,0]}>
                      <Col md={24}>
                          <Form.Item
                            className='username mb-0'
                            label="Apa itu PNOM"
                            name="whatIs"
                          >
                            <TextArea value={formAbout.description} rows={4}/>

                          </Form.Item>
                      </Col>
                      <Col md={24} className='d-flex justify-end'>
                        <Button
                          type='primary'
                          icon={<SaveOutlined/>}
                          className='w-50'
                          size={'default'}
                        >
                          Simpan
                        </Button>
                      </Col>
                  </row>     
              </Form>
            </div>
        </>
    )
}

export default SettingAbout