import React from 'react'
import { Spin, Modal, Icon, Form, Row, Col, Tag, Menu } from 'antd'

function NoticeInfo(props) {

	const FormItem = Form.Item;
	const formItemLayout = {
		labelCol: { span: 2 },
		wrapperCol: { span: 14 },
	};

	const ModalProps = {
		title: '文章详情',
		visible: props.modalVisible,
		width: "100%",
		onOk() {
			props.hideModal()
		},
		onCancel() {
			props.hideModal()
		}
	};

	function handleClick() {
		if (props.contentItem) {
			props.fullScreen();
		}
	}

	//显示栏目方法
	function columnFilter() {
		const columnsArr = props.dropdownItem.columns;
		if (Array.isArray(columnsArr)) {
			if (columnsArr.length === 0) {
				return "";
			} else {
				const column = columnsArr.filter((item) => {
					return item.program_id === props.contentItem.program_id;
				})
				return column[0] ? column[0].program_name : "";
			}
		} else {
			return ''
		}
	}
	
	//显示城市类别方法
	function cityFilter() {
		if (props.contentItem) {
			const cityArr = props.contentItem.citytype;
			if (Array.isArray(cityArr)) {
				return ""
			} else if (cityArr) {
				const citytypeArr = cityArr.infoArlist.map((item) => {
					return item.content;
				});
				return citytypeArr.map((item) => { return item + "  " })
			} else {
				return ""
			}
		} else {
			return ""
		}
	}

	return (
		<div className="Content">
			<h1 className="ContentHeader">文章详情
				<a onClick={handleClick}>
					<Icon type="scan" style={{ float: 'right', lineHeight: '60px' }} />
				</a>
			</h1>
			<div className="ContentBody">
				<Spin spinning={props.loading} tip="加载中..." size="large" style={{ marginTop: '200px' }}>
					{
						props.contentItem ?
							<div className="formWrapper" style={{ padding: '20px' }}>
								<h3 className="article-title">{props.contentItem ? props.contentItem.NoticeTitle + ' ---  ' : ""}{props.contentItem ? columnFilter() : ""}</h3>
								<ul className="article-subtitle">
									<li>
										<Icon type="user" /> 作者: {props.contentItem ? props.contentItem.NoticeAuthor : ""}
									</li>
									<li>
										<Icon type="unlock" /> 状态: {props.contentItem ? props.contentItem.use_status === 0 ? "正式使用" : props.contentItem.use_status === 1 ? "不可查阅" : "草稿" : ""}
									</li>
									<li>
										<Icon type="environment-o" /> 城市类别: {props.contentItem ? cityFilter() : ""}
									</li>
									<li>
										<Icon type="link" /> 文档附件:
									{
											props.contentItem ?
												props.contentItem.doc_url !== "" ?
													(<a href={props.contentItem.doc_url}><Icon type="paper-clip" />点我下载</a>)
													: " 暂无" : ""
										}
									</li>
								</ul>
								<div className="article-content">
									{
										props.contentItem ?
											(<span dangerouslySetInnerHTML={{ __html: props.contentItem.content }} style={{ fontSize: '16px' }}></span>) : ""
									}
								</div>
							</div> : ''
					}
				</Spin>
			</div>
			<Modal {...ModalProps}>
				<div style={{ padding: '40px' }} dangerouslySetInnerHTML={{ __html: props.contentItem ? props.contentItem.content : "" }}></div>
			</Modal>
		</div>
	);
}

export default NoticeInfo
