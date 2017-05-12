import React, { Component }from 'react'
import moment from 'moment'
import { Button,
	Table,
	Icon,
	Form,
	Row,
	Col,
	Input,
	Select,
	Upload,
	Steps,
	Radio,
	DatePicker,
	message,
	Modal,
	Spin,
	} from 'antd'
import Editor from 'react-umeditor'
import {picUploadUrl} from '../../services/requests'

const FormItem = Form.Item;
const Step = Steps.Step;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {RangePicker} = DatePicker;


class NoticeInfo extends Component {

	constructor(props){
        super(props);
        this.state = {
            content:"",
            steps:0,
            loadingText:'请先选择栏目.......',
            fileSaveName:"",
            // picSaveName:"",
            author:"",
            citytype:[],
            // jointype:[],
            program_id:[],
            startEndTime:[],
            use_status:"0",
            title:"",
            // picDefaultFileList:[],
            fileDefaultFileList:[],
        }
    }

    getIcons(){
        var icons = [
            "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
            "paragraph fontfamily fontsize | superscript subscript | ",
            "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
            "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
            "horizontal date time  | image emotion spechars | inserttable"
        ]
        return icons;
    }

    getPlugins(){
        return {
            "image": {
                "uploader": {
                    "name":"file",
                    "url": picUploadUrl
                }
            }
        }
    }
    //取消返回上一步
    goBack = () => {
    	this.props.goBack();
    }
    //点击下一步
    handleNext = () => {

    	this.props.form.validateFields((err,values) => {
    		if(!err){
    			this.setState({
    				program_id:this.props.form.getFieldValue('program_id').key,
    				title:this.props.form.getFieldValue('title'),
    				use_status:this.props.form.getFieldValue('use_status'),
    				author:this.props.form.getFieldValue('author'),
    				citytype:values.citytype || [],
    				// jointype:values.jointype || [],
    				startEndTime:this.props.form.getFieldValue('startEndTime') || [],
    				steps:1,
    			})
    		}
    	})
    }
    //点击上一步
    handlePrev = () => {
    	this.setState({
    		steps:0,
    		content:this.refs.editor.getContent()
    	})
    }
    //提交表单
    handleSubmit = () => {
    	const editorValue = this.refs.editor.getContent();

    	if( editorValue === ""){
    		Modal.warning({
    			title:'错误信息',
    			content:'文章内容为空，请填写文字内容',
    			style:{ top: 300 }
    		});
    	} else {

    		const cityCateProps = this.state.citytype.map((item) => {
    			return {
    				archiveid:this.props.dropdownItem.citytype.archiveid,
					  archive_value:item.key,
					  archive_content:item.label
    			}
    		})

			// const allyModelProps = this.state.jointype.map((item) => {
			// 	return {
			// 		archiveid:this.props.dropdownItem.jointype.archiveid,
			// 		archive_value:item.key,
			// 		archive_content:item.label
			// 	}
			// })

			// const archive_Array = cityCateProps.concat(allyModelProps);
			const archive_Array = cityCateProps;
    		const rangeValue = this.state.startEndTime;
    		const stepPrevValue = {
    			program_id:this.state.program_id,
    			title:this.state.title,
    			use_status:this.state.use_status,
    			author:this.state.author,
    			start_time:rangeValue.length !== 0 ? rangeValue[0].format('YYYY-MM-DD') : '',
    			end_time:rangeValue.length !== 0 ? rangeValue[1].format('YYYY-MM-DD') : '',
    			content:encodeURIComponent(editorValue),
    			doc_name:this.state.fileSaveName,
    			// image_name:this.state.picSaveName,
    			operatorid:JSON.parse(sessionStorage.getItem('user')).userid,
    			archiveArr:encodeURIComponent(JSON.stringify(archive_Array)),
    			columnChoosem:parseInt(this.props.columnChoosem),
    		}

			this.props.handleSubmit(stepPrevValue)
    	}
    }
    //查询栏目
    findColumns = () => {
    	this.props.findColumns();
    };
    //查询归档
    findProfile = (value) => {
    	this.setState({
    		loadingText:'暂无',
    		program_id:value,
    		citytype:[],
    		jointype:[]
    	});
    	this.props.findProfile(value);
    };

	render(){
        const _that = this;
		    const icons = this.getIcons();
        const plugins = this.getPlugins();
        const dateFormat = 'YYYY/MM/DD';
        const formItemLayout = {
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 16,
          },
        };
        //上传图片待定
        // const pictureProps = {
        //     name: 'pic',
        //     action: picUploadUrl,
        //   	accept:'.png, .jpg, .jpeg, .gif, .bmp',
        //   	defaultFileList:this.state.picDefaultFileList ,
        //   	onChange(info) {

        //   		if (info.file.name === _that.props.contentItem.image_name) {
        //   			_that.setState({
        //   				picDefaultFileList:[]
        //   			})
        //   		}

        //   		//数量限制
        //   		if(info.fileList.length > 1){
        //   		    message.warning('只能上传一张图片')
        //   		    return;
        //   		}

        //   		if(info.file.status === 'uploading'){
        //   	  		const hide = message.loading('图片正在上传，请稍后', 0);
        //   	  		setTimeout(hide, 3000);
        //   	  	}
        //   	  	if (info.file.status === 'done') {

        //   	  		_that.setState({
        //   	  			picDefaultFileList: info.fileList,
        //   	  			picSaveName: info.file.response.data.savename
        //   	  		})

        //   	    	if(info.file.response.status === 'success'){
        //   	    		message.success(`${info.file.name} 上传成功！`,2);
        //   	    	}

        //   	    	if(info.file.response.status === '缺少参数'){
        //   	    		message.error(`${info.file.name} 上传失败！缺少参数！`,2);
        //   	    	}

        //   	  	} else if (info.file.status === 'error') {

        //   	    	message.error(`${info.file.name} 上传失败！请重新上传！.`,2);

        //   	  	}
        //   	},
        // };


        const fileProps = {
        	name:'file',
        	action: picUploadUrl,
        	accept:'.docx,.doc',
          defaultFileList:this.state.fileDefaultFileList ,
        	onChange(info) {

        		if (info.file.name === _that.props.contentItem.doc_name) {
          			_that.setState({
          				docDefaultFileList:[]
          			})
          		}

          		//数量限制
          		if(info.fileList.length > 1){
          		    message.warning('只能上传一份文档')
          		    return;
          		}

        		if(info.file.status === 'uploading'){
        	  		const hide = message.loading('文档正在上传，请稍后', 0);
        	  		setTimeout(hide, 3000);
        	  	}

        	  	if (info.file.status === 'done') {

        	  		_that.setState({
        	    			fileDefaultFileList: info.fileList,
        	    			fileSaveName: info.file.response.data.savename
        	    		})

        	    	if(info.file.response.status === 'success'){
        	    		message.success(`${info.file.name} 上传成功！`,2);
        	    	}

        	    	if(info.file.response.status === '缺少参数'){
        	    		message.error(`${info.file.name} 上传失败！缺少参数！`,2);
        	    	}

        	  	} else if (info.file.status === 'error') {
        	    	message.error(`${info.file.name} 上传失败！请重新上传！.`,2);
        	  	}
        	},
        };

		return (
		  <div className="Content">
		    <h1 className="ContentHeader">
		    	添加文章
		    	{
		    		this.props.goBackBtn ?
		    		<Button style={{float:'right',marginTop:'16px',marginRight:'40px'}} onClick={this.goBack}>
		    	      <Icon type="left" />取消并返回
		    	    </Button> : ''
		    	}
	    	</h1>
	    	<div className="ContentBody">
		    	<div style={{height:'100px',paddingTop:'30px'}}>
		    		<Steps current={this.state.steps} style={{width: '100%', padding: '0 5%'}}>
		    			<Step title="文章信息" description="填写文章的详细情况" />
	    			    <Step title="文章内容" description="填写文章主体内容" />
		    		</Steps>
		    	</div>
			    {
			    	this.state.steps === 0 ?
			    	(
					    <div>
			    		    <Form layout="horizontal" style={{width:'500px',marginTop:'20px'}}>
			    		      <Row>
			    		        <Col span={24}>
			    		          <FormItem
			    		            label="所属栏目:"
			    		            {...formItemLayout}
			    		          >
			    		            {
			    		            	this.props.form.getFieldDecorator('program_id',{
			    		            		initialValue: this.state.program_id.length === 0 ? [] : {key: this.state.program_id},
			    		            		rules:[{
			    		            			required:true,
			    		            			message:'请选择文章所属栏目'
			    		            		}]
			    		            	})(
	    			    		              <Select
	    			    		              	placeholder="请选择一个栏目"
	    			    		              	onFocus={this.findColumns}
	    			    		              	onSelect={(value) => this.findProfile(value.key)}
	    			    		              	labelInValue
	    			    		              >
	    			    		              	{
	    			    		              		this.props.dropdownItem.columns === undefined ?
	    			    		              			[] : this.props.dropdownItem.columns ?
	    			    		              					this.props.dropdownItem.columns.map((item) => {
	    			    		              					  return item.status == 1 ? (
	    			    		              					    <Option key={item.program_id}>{item.program_name}</Option>
	    			    		              					  ) : []
	    			    		              					}) :
	    			    		              				<Option key="0" disabled>正在查询,请等待......<Icon type="loading" style={{float:'right',marginTop:'2px'}}/></Option>
	    			    		              	}
	    			    		              </Select>
		    		            		)
			    		            }
			    		          </FormItem>
			    		        </Col>
					          </Row>
					          <Row>
			    		        <Col span={24}>
			    		          <FormItem
			    		            label="标题:"
			    		            {...formItemLayout}
			    		            >
			    		            	{
			    		            		this.props.form.getFieldDecorator('title',{
			    		            			initialValue:this.state.title,
			    		            			rules:[{
			    		            				required:true,
			    		            				message:'请填写文章标题'
			    		            			},{
			    		            				max:30,
			    		            				message:'最多可输入30个字'
			    		            			}]
			    		            		})(
			    		            			<Input type="text" placeholder="请输入文章标题" />
		    		            			)
			    		            	}
			    		          </FormItem>
			    		        </Col>
			    		      </Row>
			    		      <Row>
			    		        <Col span={24}>
			    		          <FormItem
			    		            label="状态:"
			    		            {...formItemLayout}
			    		          >
			    		          	{
			    		          		this.props.form.getFieldDecorator('use_status',{
			    		          			initialValue: this.state.use_status,
			    		          			rules:[{
			    		          				required:true,
			    		          			}]
			    		          		})(
	      			    		          	<RadioGroup>
	      			    		          	     <RadioButton value="0">正式使用</RadioButton>
	      			    		          	     <RadioButton value="1">不可查阅</RadioButton>
	      			    		          	     <RadioButton value="2">草稿</RadioButton>
	      					          	    </RadioGroup>
		    		          			)
			    		          	}
			    		          </FormItem>
			    		        </Col>
			    		       </Row>
			    		       <Row>
			    		        <Col span={24}>
			    		          <FormItem
			    		            label="作者:"
			    		            {...formItemLayout}
			    		          >
			    		          	{
			    		             	this.props.form.getFieldDecorator('author',{
			    		             		initialValue: this.state.author === "" ?
			    		             			JSON.parse(sessionStorage.getItem('user')).username : this.state.author,
			    		             		rules:[{
			    		             			max:20,
			    		             			message:'作者名称不能超过20字'
			    		             		}]
			    		             	})(
			    		             		<Input type="text" placeholder="请输入作者名称" />
		    		             		)
			    		          	}
			    		          </FormItem>
			    		        </Col>
			    		       </Row>
			    		       <Row>
			    		      	<Col span={24}>
			    		      		<FormItem
			    		      			label='城市类别:'
			    		      			{...formItemLayout}
			    		      		>
			    		      			<Spin spinning={this.props.loading} tip="加载中..." size="small">
				    		      			{
				    		      				this.props.form.getFieldDecorator('citytype',{
				    		      					initialValue: this.state.citytype.length === 0 ?
				    		      									!Array.isArray(this.props.dropdownItem.citytype) ?
					    		      									this.props.dropdownItem.citytype.parlist.map((item,index) => {
					    		      											let i = item.value.toString();
								  												return { key : i }
					    		      										}) : []
			    		      									  : this.state.citytype.map((item,index) => {
                                              let i = item.key;
							  												return { key : i }
							  											})

				    		      				})(
							    		      			<Select notFoundContent="请先选择栏目....." placeholder="请选择城市类别" multiple labelInValue>
							    		      				{
							    		      					// this.props.dropdownItem.citytype === undefined ?
							    		      					// 	<Option key="empty" disabled>{this.state.loadingText}</Option> :
						    		      							this.props.dropdownItem.citytype.length !== 0 ?
									    		      					this.props.dropdownItem.citytype.parlist.map((item,index) => {
                                            let i = item.value.toString();
							  												return (<Option key={i}>{item.content}</Option>)
							  											}) : []
							    		      				}
							    		      			</Select>
			    		      					)
			    		      				}
		    		      				</Spin>
			    		      		</FormItem>
			    		      	</Col>
			    		       </Row>
			    		      {/*图片上传和日期选择暂时不用
			    		      <Row>
			    		      	<Col span={24}>
			    		      	  <FormItem
			    		      	    label="活动日期:"
			    		      	    {...formItemLayout}
			    		      	  >
			    		      	  	<Spin spinning={this.props.loading} tip="加载中..."  size="small">
				    		      	  	{
				    		      	  		this.props.form.getFieldDecorator('startEndTime',{
				    		      	  			initialValue: this.state.startEndTime
				    		      	  		})(
				  			    		      	   	<RangePicker
				  				      	   		        format={dateFormat}
				  			    		      	   	/>
			    		      	  			)
				    		      	  	}
			    		      	  	</Spin>
			    		      	  </FormItem>
			    		      	</Col>
			    		      </Row>
			    		      */}
			    		      {/*图片上传和日期选择暂时不用
			    		      <Row>
			    		        <Col span={24}>
			    		          <FormItem
			    		            label="主题图片:"
			    		            {...formItemLayout}
			    		          >
			    		          	<Spin spinning={this.props.loading} tip="加载中..."  size="small">
				    		          	{
				    		          		this.props.form.getFieldDecorator('info_img')(
		  			    		               <Upload {...pictureProps}>
		  					                   	 <Button>
		  					                     	<Icon type="upload" /> 点击上传
		  					                   	 </Button>
		  					                   </Upload>
			    		          			)
				    		          	}
			    		          	</Spin>
			    		          </FormItem>
			    		        </Col>
			    		       </Row>*/}
			    		       <Row>
			    		        <Col span={24}>
			    		          <FormItem
			    		            label="文档上传:"
			    		            {...formItemLayout}
			    		          >
			    		          	<Spin spinning={this.props.loading} tip="加载中..."  size="small">
				    		          	{
				    		          		this.props.form.getFieldDecorator('document_url')(
		  			    		               <Upload {...fileProps}>
		  					                   	 <Button>
		  					                     	<Icon type="upload" /> 点击上传
		  					                   	 </Button>
		  					                   </Upload>
			    		          			)
				    		          	}
			    		          	</Spin>
			    		          </FormItem>
			    		        </Col>
					           </Row>
			    		      <Row>
			    		      	<Col span={10} offset={8}>
			    		      		<FormItem>
				        				<Button type="primary" size="large" onClick={this.handleNext}>下一步</Button>
			    	      			</FormItem>
			    		      	</Col>
			    		      </Row>
			    	      	</Form>
					    </div>
		    		) : (
		    			<div style={{paddingBottom:'100px'}}>
	    				  <Row type="flex" justify="left">
							<Col span={24} push={1}>
			    				<Editor ref="editor"
					    	            icons={icons}
					    	            value={this.state.content}
					    	            defaultValue={this.state.content}
					    	            plugins={plugins}
					            />
							</Col>
	    				  </Row>
	        		      <Row type="flex" justify="left" style={{marginTop:'50px'}}>
	    		      	    <Col span={2} push={6}>
		        				<Button type="primary" size="large" onClick={this.handlePrev}>上一步</Button>
	    		      	    </Col>
	    		      	    <Col span={2} push={6}>
		      	    			<Button type="primary" size="large" onClick={this.handleSubmit}>提交</Button>
	    		      	    </Col>
	        		      </Row>
		    			</div>
		    		)
			    }
		    </div>
		  </div>
		);
	}
}

export default Form.create()(NoticeInfo);

