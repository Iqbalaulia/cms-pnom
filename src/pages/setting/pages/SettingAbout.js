import React, { useEffect, useState, } from 'react';

import { Col, Button, Input, Row } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { notificationError } from 'utils/general/general';
import { ApiGetRequest, ApiPostRequest, ApiPutRequest } from 'utils/api/config';

import PnomNotification from 'components/layout/Notification';

const SettingAboutus = () => {
    const { TextArea } = Input;

    const [ stepAction, setStepAction ] = useState('save-data')
    const [ isUuid, setUuid ] = useState('')

    const [ dataAboutUs, setDataAboutUs ] = useState({});
    const [ parentUuid, setParentUuid ] = useState(null);
  
    useEffect(() => {
      getDataAboutUs()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = () => {
      if(stepAction === `save-data`)  saveDataForm()
      if(stepAction === `update-data`) updateDataForm(isUuid)
    }

    const getDataAboutUs = async () => {
      try {
        let params = {
          name: 'about_us',
        }

        const response = await ApiGetRequest(`setting`, params)
        setDataAboutUs({
          name: response.data.data.child[0].name,
          value: response.data.data.child[0].value,
        })

        if(response.data.data.child.length > 0) {
          setStepAction('update-data')
        } else {
          setStepAction('save-data')
        }

        setParentUuid(response.data.data.uuid)
        setUuid(response.data.data.uuid)
      } catch (error) {
        notificationError(error)
      }
    }
    const saveDataForm = async () => {
      try {
        let formDataAboutus = {
          parentUuid: parentUuid,
          name: dataAboutUs.name,
          value: dataAboutUs.value,
        }

        await ApiPostRequest(`setting`, formDataAboutus)
        PnomNotification({
          type: 'success',
          message: 'Berhasil disimpan!',
          description:'Data kontak berhasil disimpan!',
        })
        getDataAboutUs()
      } catch (error) {
        notificationError(error)
      }
    }
    const updateDataForm = async (uuid) => {
      try {
        let formDataAboutus = {
          parentUuid: parentUuid,
          name: dataAboutUs.name,
          value: dataAboutUs.value,
        }
        await ApiPutRequest(`setting/${uuid}`, formDataAboutus)
        PnomNotification({
          type: 'success',
          message: 'Berhasil diupdate!',
          description:'Data admin berhasil diupdate!',
        })
        await getDataAboutUs()
      } catch (error) {
        PnomNotification({
          type: 'error',
          message: 'Maaf terjadi kesalahan!',
          description: error.message,
       })
      }
    }

    
    return(
      <div className='setting-aboutus'>
        <Row gutter={[24, 0]} className='mb-2'>
            <Col 
               md={{ span: 24 }}
               xs={{ span: 24 }}
            >
              
                <TextArea 
                    value={dataAboutUs.value}
                    onChange={(e) => setDataAboutUs({...dataAboutUs, value: e.target.value})}  
                    rows={10} 
                  />
            </Col>
        </Row>
        <Row gutter={[24, 0]}>
            <Col 
              md={{span: 21}}
              xs={{ span: 24 }}
            />
            
            <Col 
              md={{span: 3}}
              xs={{ span: 24 }}
            >
              <Button
                  type='primary'
                  className='w-100'
                  icon={<PlusCircleOutlined/>}
                  size="large"
                  block
                  onClick={() => handleSubmit()}
                >
                  Simpan Data
                </Button>
            </Col>
        </Row>
      </div>
    )
}

export default SettingAboutus