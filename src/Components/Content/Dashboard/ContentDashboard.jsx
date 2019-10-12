import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Icon,
  Table,
} from "antd";
import { getInfoTodayIncome, getInfoWeeksOrders, getInfoYearIncome, getRecentOrder } from '../../../Public/Redux/Actions/Reports'
import Rupiah from 'rupiah-format'
import "./ContentDashboard.css";
import { Line } from 'react-chartjs-2';

// Redux + Axios Fetch Data
import { useSelector, useDispatch } from "react-redux";
const { Content } = Layout;
const { Title } = Typography;

const ContentDashboard = props => {
  const content = useSelector(state => state.Product.productList);
  const dispatch = useDispatch();

  const [todayIncome, setTodayIncome] = useState([])
  const [yesterdayIncome, setYesterdayIncome] = useState([])
  const [precentToday, setPrecentToday] = useState([])
  const [weekOrders, setWeekOrders] = useState([])
  const [yearIncome, setYearIncome] = useState([])
  const [dataHistory, setDataHistory] = useState([])

  const columns = [
    {
      title: "Invoices",
      dataIndex: "Invoices",
      key: "Invoices",
    },
    {
      title: "User",
      dataIndex: "User",
      key: "User"
    },
    {
      title: "Date",
      dataIndex: "transaction_date",
      key: "transaction_date"
    },
    {
      title: "Orders",
      dataIndex: "Orders",
      key: "Orders"
    },
    {
      title: "Amount",
      key: "transaction_price",
      dataIndex: "transaction_price",
      key: "transaction_price"
    }
  ];

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
  }

  const fetchInformationCard = async () => {
    // Today Income Card
    const todayIncomeCard = await getInfoTodayIncome()
    setTodayIncome(todayIncomeCard.results[1].transaction_price)
    setYesterdayIncome(todayIncomeCard.results[0].transaction_price)
    console.log(yesterdayIncome)
    setPrecentToday(Math.round(((todayIncome - yesterdayIncome)/yesterdayIncome) * 100))

    // Week Order Card
    const weekOrderCard = await getInfoWeeksOrders()
    let totalOrderThisWeek = 0
    weekOrderCard.results.map(item => {
      totalOrderThisWeek += item.total_order
    })
    setWeekOrders(totalOrderThisWeek)

    // Year Income Card
    const yearIncomeCard = await getInfoYearIncome()
    setYearIncome(yearIncomeCard.results[0].transaction_price)
  }

  const fetchRecentOrder = async () => {
    const recentOrder = await getRecentOrder()
    setDataHistory(recentOrder.results)
    fetchInformationCard()
  }
  
  useEffect(() => {
    fetchRecentOrder()
    // const { datasets } = this.refs.chart.chartInstance.data
  },[])

  return (
    <Content className="container">
      <Layout className="section-card">
        <Row gutter={6}>
          <Title level={3}>Dashboard</Title>
          <Col sm={8}>
            <Card className="card-static card-first" onClick={fetchInformationCard}>
              <div className="text-group">
                <span className="text-item text-head">Today's Income</span>
                <span className="text-item text-price">{Rupiah.convert(todayIncome)}</span>
                <span className="text-item text-inc"><Icon type={precentToday > 0 ? 'caret-up' : 'caret-down'}/>{Math.abs(precentToday)}% Yesterday</span>
                <div className="icon-card">
                  <Icon className="icon" type="stock" />
                </div>
              </div>
            </Card>
          </Col>
          <Col sm={8}>
            <Card className="card-static card-second">
              <div className="text-group">
                <span className="text-item text-head">
                  Total Orders Accepted
                </span>
                <span className="text-item text-price">{weekOrders} Order</span>
                <span className="text-item text-inc"><Icon type="caret-up"/> 5% Last Week</span>
                <div className="icon-card">
                  <Icon className="icon" type="form" />
                </div>
              </div>
            </Card>
          </Col>
          <Col sm={8}>
            <Card className="card-static card-third">
              <div className="text-group">
                <span className="text-item text-head">This Year's Income</span>
                <span className="text-item text-price">{Rupiah.convert(yearIncome)}</span>
                <span className="text-item text-inc"><Icon type="caret-up"/> 10% Last Year</span>
                <div className="icon-card">
                  <Icon className="icon" type="shopping" />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Layout>
      <Layout className="section-chart">
        <Row gutter={6}>
          <Col sm={24}>
            <Card>
              <Title level={3}>Revenue</Title>
              {/* <Line ref="chart" data={data_chart} /> */}
            </Card>
          </Col>
        </Row>
      </Layout>
      <Layout className="section-history">
        <Row gutter={6}>
          <Col sm={24}>
            <Card>
              <Title level={3}>Recent Order</Title>
              <Table columns={columns} dataSource={dataHistory} />
            </Card>
          </Col>
        </Row>
      </Layout>
    </Content>
  );
};

export default ContentDashboard;
