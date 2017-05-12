import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Row, Col, Alert, Icon, Table, Card  } from 'antd'
import styles from './todos.less'
import auth from '../utils/auth'

function Todos({app,dispatch}){
	const { contentItem, loading } = app;
	const funcArr = auth([95,65,45,85,124]);
	return (
		<div className="Relative">
		  <div className="Content" style={{width: '100%', left: '0'}}>
		    <h1 className="ContentHeader">工作台</h1>
		    <div className="ContentBody">
		    	<Row type="flex" align="top" style={{margin:'20px'}} justify="space-between" gutter={8}>
		    		{
		    			funcArr.map((item,index) => {
		    				const title = item === 95 ? "文章" : item === 65 ? "物料" : item === 45 ? "回盘" : item === 85 ? "账单" : item === 124 ? "通知" : "";
		    				const link = item === 95 ? "Notice" : item === 65 ? "Allot" : item === 45 ? "Ffers" : item === 85 ? "Bill" : item === 124 ? "Activity" : "";
		    				const dataIndex = item === 95 ? "infoData" : item === 65 ? "allotData" : item === 45 ? "ffersData" : item === 85 ? "billData" : item === 124 ? "acitivityListData" : "";
		    				const smallTitle = item === 95 ? "title" : item === 65 ? "content" : item === 45 ? "moviename" : item === 85 ? "theatername" : item === 124 ? "title" : "";
		    				const rightTitle = item === 95 ? "author" : item === 65 ? "theatername" : item === 45 ? "theatername" : item === 85 ? "createtime" : item === 124 ? "theatername" :  "";
		    				return (
		    					<Col span={item === 124 ? 4 : 5} key={index}>
		    							<Card title={<h3>{ title }</h3>} extra={<Link to={`/cinemacloud/${link}`}>更多</Link>} loading={loading}>
		    							    {
		    							    	contentItem ? contentItem[dataIndex] ? contentItem[dataIndex].length === 0 ? <p>暂无内容</p> : contentItem[dataIndex].map((item,index) => {
		    		    				    		return (
		    		    				    			<div key={index} style={{margin:'8px 1px'}}>
		    		    				    				<span style={{marginRight:'0px',verticalAlign:'Top',display:'inline-block',width:'10%'}}>{index + 1}.</span>
		    		    				    				<span style={{display:'inline-block',width:'65%',textOverflow: 'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>{item[smallTitle] ? item[smallTitle] : '暂无内容...'}</span>
		    		    				    				<span style={{float:'right',display:'inline-block',width:'25%',textOverflow: 'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>{item[rightTitle]}</span>
		    		    				    			</div>
		    	    				    			)
		    							    	}) : <p>暂无内容...</p> : <p>暂无内容...</p>
		    							    }
		    							  </Card>
		    						</Col>
	    					)
		    			})
		    		}

		    	</Row>
		    </div>
		  </div>
		</div>
	)
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Todos)

{/*
<div className={styles.pageWrapper}>
	<div className={styles.container}>
		<Row>
			<Col>
				<div className={styles.contentHeader}>
					<h1 className={styles.pageHeader}>
						待办事项
					</h1>
				</div>
			</Col>
		</Row>
		<Row type="flex" justify="space-around" align="middle" style={{marginTop:'80px'}}>
			<Col span={6}>
				<Col span={24}>
					<div className={styles.panel + ' ' + styles.panelPrimary}>
						<div className={styles.panelHeading}>
							<Row type="flex" justify="space-between" style={{textAlign:'right'}}>
								<Col span={4}>
									<Icon type="notification" className={styles.icon}/>
								</Col>
								<Col span={12}>
									<div className={styles.huge}>通知</div>
									<div>有新通知22篇！</div>
								</Col>
							</Row>
						</div>
						<a href="">
							<div className={styles.panelFooter}>

								<Table columns={columns} dataSource={data} pagination={false} showHeader={false}/>
							</div>
						</a>
					</div>
				</Col>
			</Col>
			<Col span={16}>
				<Row type="flex" justify="space-around" align="middle">
					<Col span={10}>
						<div className={styles.panel + ' ' + styles.panelGreen}>
							<div className={styles.panelHeading}>
								<Row type="flex" justify="space-between" style={{textAlign:'right'}}>
									<Col span={4}>
										<Icon type="file-text" className={styles.icon}/>
									</Col>
									<Col span={12}>
										<div className={styles.huge}>文章</div>
										<div>有新文章11篇！</div>
									</Col>
								</Row>
							</div>
							<a href="">
								<div className={styles.panelFooter}>
									<span className={styles.pullLeft}>查看详情</span>
									<span className={styles.pullRight}>
										<Icon type="right-circle" /></span>
									<div className={styles.clearfix}></div>
								</div>
							</a>
						</div>
					</Col>
					<Col span={10}>
						<div className={styles.panel + ' ' + styles.panelYellow}>
							<div className={styles.panelHeading}>
								<Row type="flex" justify="space-between" style={{textAlign:'right'}}>
									<Col span={4}>
										<Icon type="shopping-cart" className={styles.icon}/>
									</Col>
									<Col span={12}>
										<div className={styles.huge}>物料分发</div>
										<div>有新物料分发10篇！</div>
									</Col>
								</Row>
							</div>
							<a href="">
								<div className={styles.panelFooter}>
									<span className={styles.pullLeft}>查看详情</span>
									<span className={styles.pullRight}>
										<Icon type="right-circle" /></span>
									<div className={styles.clearfix}></div>
								</div>
							</a>
						</div>
					</Col>
					<Col span={10}>
						<div className={styles.panel + ' ' + styles.panelPurple}>
							<div className={styles.panelHeading}>
								<Row type="flex" justify="space-between" style={{textAlign:'right'}}>
									<Col span={4}>
										<Icon type="database" className={styles.icon}/>
									</Col>
									<Col span={12}>
										<div className={styles.huge}>回盘</div>
										<div>有新回盘11篇！</div>
									</Col>
								</Row>
							</div>
							<a href="">
								<div className={styles.panelFooter}>
									<span className={styles.pullLeft}>查看详情</span>
									<span className={styles.pullRight}>
										<Icon type="right-circle" /></span>
									<div className={styles.clearfix}></div>
								</div>
							</a>
						</div>
					</Col>
					<Col span={10}>
						<div className={styles.panel + ' ' + styles.panelRed}>
							<div className={styles.panelHeading}>
								<Row type="flex" justify="space-between" style={{textAlign:'right'}}>
									<Col span={4}>
										<Icon type="bank" className={styles.icon}/>
									</Col>
									<Col span={12}>
										<div className={styles.huge}>账单</div>
										<div>有新账单10篇！</div>
									</Col>
								</Row>
							</div>
							<a href="">
								<div className={styles.panelFooter}>
									<span className={styles.pullLeft}>查看详情</span>
									<span className={styles.pullRight}>
										<Icon type="right-circle" /></span>
									<div className={styles.clearfix}></div>
								</div>
							</a>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	</div>
</div>
*/}
