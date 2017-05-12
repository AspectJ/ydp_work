楚湘项目需要在tomcat的server.xml的<Host>标签里面加入
					<Context docBase="/cx/web/view" path="" reloadable="true"/> 
					
					
					
					
需要修改/cx/src/main/webapp/web/view/js/public.js里49行主机域名



网站入口   http://localhost:8080/cx/login   
					用户名 test123	 
					密码   123456
					
					
后台入口   http://localhost:8080/cx/web/view/index.html
					用户名 123@qq.com
					密码   123456