


import React, { useEffect, useState, } from 'react';
import { Col, Button ,Form ,Input} from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import PnomNotification from 'components/layout/Notification';
import { aboutModel } from 'utils/models/SettingModels';

const SettingAbout = () => {
    const { TextArea } = Input;
    const [ formAbout, setFormAbout ] = useState(aboutModel)
    const [ isLoading, setLoading ] = useState(false);
    
    useEffect(() => {
      getDataAbout()
    }, [])
   
    const handleSubmit = () => {
      setLoading(true)
      try {
        PnomNotification({
          type: 'success',
          message: 'Simpan Data',
          description:'Data berhasil tersimpan.',
        })
        getDataAbout()
        console.log(isLoading)
      } catch (error) {
        PnomNotification({
          type: 'danger',
          message: 'Simpan Data',
          description:'Data berhasil tersimpan.',
        })
      }
    }

    const getDataAbout = () => {
      setLoading(true)
     
      
      setLoading(false)
    }

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
                            <TextArea 
                              value={formAbout.description} 
                              rows={4}
                              onChange={
                                e => setFormAbout({
                                  ...formAbout,
                                  description: e.target.value
                                })
                              }
                            />
                          </Form.Item>
                      </Col>
                      <Col md={24} className='d-flex justify-end'>
                        <Button
                          onClick={handleSubmit}
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