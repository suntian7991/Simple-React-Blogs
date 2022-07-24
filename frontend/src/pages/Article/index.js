import { Link, useNavigate, } from 'react-router-dom'
import {
  Card, Breadcrumb, Form, Button, Radio, DatePicker,
  Select, Table, Tag, Space, Popconfirm
} from 'antd'
import 'moment'
import './index.scss'
import img404 from '@/assets/error.png'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { http } from '@/utils'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {

  const { channelStore/* , articleStore */ } = useStore()

  // 文章列表管理
  // 文章列表数据管理 统一管理数据 将来修改给setArticleList传对象
  const [article, setArticleList] = useState({
    list: [],//文章列表
    count: 0 //文章数量
  })

  // 参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 6
  })

  useEffect(() => {
    async function fetchArticleList () {
      const res = await http.get('/article', { params })
      // console.log("article", res)
      // 解构赋值只访问一次 不解构每次都会访问数据 浪费性能
      const { articles, articlesCount } = res.data
      setArticleList({
        list: articles,
        count: articlesCount
      })
    }
    fetchArticleList()
    /* articleStore.fetchArticleList()
    setArticleList({
      list: articleStore.articles,
      count: articleStore.articlesCount
    }) */
  }, [params]/* [articleStore] */)


  // 筛选功能 核心：修改依赖项params参数 触发文章接口再次发起
  const onSearch = (values) => {
    const { status, channel_id, date } = values
    // 格式化表单数据
    const _params = {}
    // 格式化status
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      // 查看接口数据是什么
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params参数 触发接口再次发起 对象的合并是一个整体覆盖
    setParams({
      ...params,//保留之前的筛选和分页
      ..._params
    })

  }
  // 分页
  // TODO:翻页回到页面最上方
  const pageChange = (page) => {
    // 拿到当前页参数 修改params 引起接口更新
    setParams({
      ...params,
      page
    })
  }

  // 删除回调
  const delArticle = async (data) => {
    await http.delete(`/article/${data._id}`)
    // 更新列表
    setParams({
      ...params,
      // page: 1
    })
    // pageChange()
  }
  const navigate = useNavigate()
  const goPublish = (data) => {
    navigate(`/publish?id=${data._id}`)
  }

  const columns = [
    {
      title: 'Cover',
      // 用dataIndex于拿到的数据进行匹配
      dataIndex: 'cover',
      width: 120,
      /* 比较复杂的模板需要用到render来渲染 */
      render: cover => {
        /* console.log(cover)
        cover是一个对象 不能直接用 cover || img404 */
        return <img src={cover[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: data => <Tag color="green">Passed</Tag>
    },
    {
      title: 'Publish Date',
      dataIndex: 'pubdate'
    },
    {
      title: 'Read',
      dataIndex: 'read_count'
    },
    {
      title: 'Comment',
      dataIndex: 'comment_count'
    },
    {
      title: 'Like',
      dataIndex: 'like_count'
    },
    {
      title: 'Operation',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              // onClick={() => history.push(`/home/publish?id=${data.id}`)}
              onClick={() => goPublish(data)}
            />
            <Popconfirm
              title="Comfire to delete the article?"
              onConfirm={() => delArticle(data)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]




  return (
    <div>
      {/* 筛选区 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Articles</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onSearch}
          initialValues={{ status: null }}>
          <Form.Item label="State" name="status">
            <Radio.Group>
              <Radio value={null}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={1}>Pending</Radio>
              <Radio value={2}>Passed</Radio>
              <Radio value={3}>Failed</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Please choose article channel"
              style={{ width: 225 }}
            >
              {channelStore.channelList.map(channel => (
                <Option key={channel.id} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">

            <RangePicker style={{ width: 245 }}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              filter
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`According to the filter conditions, a total of ${article.count} results were found:`}>
        <Table
          dataSource={article.list}
          columns={columns}
          pagination={{
            position: ['bottomCenter'],
            current: params.page,
            pageSize: params.per_page,
            total: article.count,
            onChange: pageChange
          }}
        />
      </Card>
    </div>
  )
}


export default observer(Article)