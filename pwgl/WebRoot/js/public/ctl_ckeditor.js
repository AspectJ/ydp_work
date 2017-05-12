//默认的工具栏
/**
文档一类工具
{
	name : 'document',
	items : [ 'Source', 'NewPage', 'DocProps', 'Preview' ]
}

复制、粘贴
{
	name : 'clipboard',
	items : [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord',
			'-', 'Undo', 'Redo' ]
}

查找
{
	name : 'editing',
	items : [ 'Find', 'Replace', '-', 'SelectAll' ]
}

表单
{
	name : 'forms',
	items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea',
			'Select', 'Button', 'ImageButton', 'HiddenField' ]
}

全屏
{
	name : 'tools',
	items : [ 'Maximize', 'ShowBlocks' ]
}

图片
{
	name : 'insert',
	items : ['Image','Table','HorizontalRule','Smiley','SpecialChar','PageBreak']
}
 
*/
var defaultToolBar = [
		{
			name : 'basicstyles',
			items : ['Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat']
		},
		{
			name : 'paragraph',
			items : ['NumberedList','BulletedList','Outdent','Indent','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock']
		},
		{
			name : 'insert',
			items : ['Image','Table','HorizontalRule','Smiley','SpecialChar','PageBreak']
		}, 
		{
			name : 'styles',
			items : ['Styles','Format','Font','FontSize']
		}, 
		{
			name : 'colors',
			items : ['TextColor','BGColor']
		}];


/**
 * 初始化ckeditor
 * 
 * @param id
 *            html元素Id
 * @param config
 *            配置json对象
 * @returns
 */
function ctl_initCkEditor(id, config) {
	
	if (id == null) {
		ctl_alert("html元素Id不能为空！");
		return;
	}

	// 检查此id对应的实例是否已经存在，如果存在，则删除此实例然后重建
	var instance = CKEDITOR.instances[id];
	if (instance != null) {
		CKEDITOR.remove(instance);
	}

	// 如果没有给定工具栏配置，则给定默认的工具栏配置
	if (config.toolbar == null) {
		config.toolbar = defaultToolBar;
	}
	// 如果配置了上传图片的服务url，则对其进行处理，使之符合系统的请求方式
	if (config.imageUploadUrl != null && config.imageUploadUrl != "" && config.filebrowserImageUploadUrl == null) {
		config.filebrowserImageUploadUrl = springMvcUrl+ '?type=image&param=serviceId/=/'+ config.imageUploadUrl + '/;/sessionId/=/'+ defaultSessionId + '/;/dataFormat/=/' + defaultDataFormat;
	}
	// 如果配置了浏览服务器图片的服务url，则对其进行处理，使之符合系统的请求方式
	if (config.imageBrowseUrl != null&& config.imageBrowseUrl != "" && config.filebrowserImageBrowseUrl == null) {
		config.filebrowserImageBrowseUrl = springMvcUrl+ '?type=image&param=serviceId/=/'+ config.imageBrowseUrl + '/;/sessionId/=/'+ defaultSessionId + '/;/dataFormat/=/' + defaultDataFormat;
	}

	if (config.image_previewText == null) {
		config.image_previewText = " ";
	}

	CKEDITOR.replace(id, config);
	return CKEDITOR.instances[id];
}

/**
 * 获取ckeditor文本域中的内容
 * 
 * @param id
 *            绑定的html元素id
 * @returns
 */
function ctl_getCkEditorData(id) {
	var instance = CKEDITOR.instances[id];
	if (instance != null)
		return instance.getData();
	return null;
}

/**
 * 设置ckeditor文本域中的内容
 * 
 * @param id
 *            绑定的html元素id
 * @param data
 *            设置的内容
 */
function ctl_setCkEditorData(id, data) {
	var instance = CKEDITOR.instances[id];
	if (instance != null)
		instance.setData(data);
}

/**
 * 摧毁ckeditor实例
 * 
 * @param id
 */
function ctl_destroyCkeditor(id) {
	var instance = CKEDITOR.instances[id];
	if (instance != null) {
		instance.destroy();
	}
}