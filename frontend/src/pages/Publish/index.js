import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { http } from '@/utils'
import { useEffect, useState, useRef } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'


const { Option } = Select

const Publish = () => {

  const { channelStore } = useStore()
  // TODO:Upload Cover
  // const [maxCount, setMaxCount] = useState(1)
  // const fileListRef = useRef([])

  // const [fileList, setFileList] = useState([])
  // const onUploadChange = (values) => {
  //   const { fileList } = values
  //   console.log('fileList', fileList)
  //   console.log('values', values)
  //      // Re-assign image in onUploadChange
  //      const formatList = fileList.map(file => {

  //        if (file.response) {
  //          console.log('file.response.data', file.response.data)
  //          return {
  //            // The picture is uploaded
  //            url: file.response.data.url
  //          }
  //        }
  //        // Uploading without processing
  //        return file
  //      })
  //      setFileList(formatList)
  //      fileListRef.current = formatList
  // }

  // TODO:Upload Cover
  // const changeType = e => {
  //   const count = e.target.value
  //   setMaxCount(count)
  //   if (count === 1) {
  //     // 单图，只展示第一张
  //     const firstImg = fileListRef.current[0]
  //     setFileList(!firstImg ? [] : [firstImg])
  //   } else if (count === 3) {
  //     // 三图，展示所有图片
  //     setFileList(fileListRef.current)
  //   }
  // }


  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log("values", values)
    const { channel_id, description, title, type } = values
    const article = {
      channel: { id: channel_id },
      description,
      title,
      type,
      //  TODO:Upload Cover
      // cover: {
      //   coverType: type,
      //   // images: fileList.map(item => item.response.data.url)
      //   //不需要这么多数据 在进行数据修改 重新上传图片后 新数据格式与旧的数据格式不一致 item.response.data.url是上传图片才有的response
      //   // 在onUploadChange中重新赋值
      //   coverImg: fileList.map(item => item.url)
      // }
    }
    if (articleId) {
      await http.put(`/article/${articleId}`, { article })
    } else {
      await http.post('/article', { article })
    }
    navigate('/article')
    message.success(`${articleId ? 'Successfully Update' : 'Successfully Publish'}`)
  }


  // Get the articleId through the routing param
  const [params] = useSearchParams()
  const articleId = params.get('id')
  // console.log('route:', articleId)

  // Data backfill
  const form = useRef(null)//获取表单实例
  useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/article/${articleId}`)
      // console.log('http.get res:', res)
      const { channel, ...formValue } = res.data.article
      form.current.setFieldsValue({ ...formValue, channel_id: channel.id })
      // TODO:Upload Cover backfill
      // const { channel, cover, ...formValue } = res.data.article
      // form.current.setFieldsValue({ ...formValue, channel_id: channel.id, type: cover.type })
      // 格式化封面图片数据
      //  const imageList = cover.images.map(url => ({ url }))
      //  // 调用setFileList方法回填upload
      //  setFileList(imageList)
      //  setMaxCount(cover.type)
      //  // 暂存图片列表 格式需要和fileList回显列表数据格式保持一致
      //  fileListRef.current = imageList
    }
    if (articleId) {
      // console.log('form:', form.current)
      getArticle()
    }
  }, [articleId])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleId ? 'Update Article' : 'Publish Article'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          // 注意：此处需要为富文本编辑表示的 content 文章内容设置默认值
          initialValues={{ content: '' }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter article title!' }]}
          >
            <Input placeholder="Please enter article title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[{ required: true, message: 'Please choose article channel!' }]}
          >
            <Select placeholder="Please choose article channel" style={{ width: 225 }}>

              {/* 数据来自后端接口 放入store */}
              {channelStore.channelList.map(channel => (
                <Option key={channel.id} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
              {/* {channels.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))} */}
            </Select>
          </Form.Item>
          {/* TODO: Upload cover */}
          {/* <Form.Item label="Cover">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>One</Radio>
                <Radio value={3}>Three</Radio>
                <Radio value={0}>Zero</Radio>
              </Radio.Group>
            </Form.Item>
            {maxCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                // 上传时是否显示已经上传的所有图片预览列表
                showUploadList
                // 配置要上传的接口地址
                action="http://localhost:3600/api/upload"
                fileList={fileList}
                // 每次文件变化都会执行回调 上传前中后 会执行三次 最后一次才会拿到response中的url
                onChange={onUploadChange}
                maxCount={maxCount}
                multiple={maxCount > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}

          </Form.Item> */}

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter article description!' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please enter article description"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }} >
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? 'Update Article' : 'Publish Article'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)