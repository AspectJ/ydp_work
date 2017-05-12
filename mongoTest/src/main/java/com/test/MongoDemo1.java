package com.test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.bson.Document;
import org.junit.Test;
import org.w3c.dom.stylesheets.DocumentStyle;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

public class MongoDemo1 {
	
	/**
	 * 連接mongodb服務器
	 */
	public static MongoDatabase Connection() {
		MongoClient mongoClient = null;
		MongoDatabase database = null;
		try {
			//連接到mongo服務
			mongoClient = new MongoClient("192.168.1.134", 27017);
			
			//連接到數據庫
			database = mongoClient.getDatabase("test");
			System.out.println("Connect successfully!");
		}catch(Exception e) {
			e.printStackTrace();
		}
		return database;
	}
	
	@Test
	public void fun1() {
		Connection();
	}
	
	/**
	 * 获取集合
	 */
	@Test
	public void fun2() {
		//连接mongo服务
		MongoClient mongoClient = new MongoClient("192.168.1.134", 27017);
		//连接test库
		MongoDatabase database = mongoClient.getDatabase("test");
		//连接test库中的goods表
		MongoCollection<Document> goods = database.getCollection("goods");
		
		
		FindIterable<Document> iterator = goods.find();
//		for (Document document : iterator) {
//			System.out.println(document);
//		}
		MongoCursor<Document> cursor = iterator.iterator();
		while(cursor.hasNext()) {
			System.out.println(cursor.next());
		}
	}
	
	/**
	 * 用户认证(方式一：MongoCredential)
	 */
	@Test
	public void fun3() {
		try {  
            //连接到MongoDB服务 如果是远程连接可以替换“localhost”为服务器所在IP地址  
            //ServerAddress()两个参数分别为 服务器地址 和 端口  
            ServerAddress serverAddress = new ServerAddress("192.168.1.134",27017);  
            List<ServerAddress> addrs = new ArrayList<ServerAddress>();  
            addrs.add(serverAddress);  
              
            //MongoCredential.createScramSha1Credential()三个参数分别为 用户名 数据库名称 密码  
            MongoCredential credential = MongoCredential.createScramSha1Credential("lisi", "test", "123123".toCharArray());  
            List<MongoCredential> credentials = new ArrayList<MongoCredential>();  
            credentials.add(credential);  
              
            //通过连接认证获取MongoDB连接  
            MongoClient mongoClient = new MongoClient(addrs,credentials);  
              
            //连接到数据库  
            MongoDatabase mongoDatabase = mongoClient.getDatabase("test");  
            //获取test库中goods表的所有文档
            MongoCollection<Document> collection = mongoDatabase.getCollection("goods");
            FindIterable<Document> iterator = collection.find();
//            for (Document document : iterator) {
//				System.out.println(document);
//			}
    		MongoCursor<Document> cursor = iterator.iterator();
    		while(cursor.hasNext()) {
    			System.out.println(cursor.next());
    		}
            System.out.println("Connect to database successfully");  
        } catch (Exception e) {  
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );  
        }  
	}
	
	/**
	 * 用户认证(方式二：MongoClientURI)
	 */
	@Test
	public void fun4() {
		try {
			String sURI = String.format("mongodb://%s:%s@%s:%d/%s", "lisi", "123123", "192.168.1.134", 27017, "test"); 
			MongoClientURI uri = new MongoClientURI(sURI); 
			MongoClient mongoClient = new MongoClient(uri); 
			MongoDatabase database = mongoClient.getDatabase("test");
			
			//获取test库中goods表的所有文档
            MongoCollection<Document> collection = database.getCollection("goods");
            FindIterable<Document> iterator = collection.find();
//            for (Document document : iterator) {
//				System.out.println(document);
//			}
    		MongoCursor<Document> cursor = iterator.iterator();
    		while(cursor.hasNext()) {
    			System.out.println(cursor.next());
    		}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 插入文档
	 */
	@Test
	public void fun5() {
		//连接mongo服务
		MongoClient mongoClient = new MongoClient("192.168.1.134", 27017);
		//连接test库
		MongoDatabase database = mongoClient.getDatabase("test");
		//创建users集合 支持隐式创建库和集合
//		database.createCollection("users"); 
		//连接users集合
		MongoCollection<Document> usersCol = database.getCollection("users");
		Document doc = new Document();
		doc.append("name", "Bob")
		.append("age", 18)
		.append("sex", "male");
		
		List<Document> list = new ArrayList<Document>();
		list.add(doc);
		
		usersCol.insertMany(list);
		usersCol.insertOne(doc);
		FindIterable<Document> iterator = usersCol.find();
//		for (Document document : iterator) {
//			System.out.println(document);
//		}
		MongoCursor<Document> cursor = iterator.iterator();
		while(cursor.hasNext()) {
			System.out.println(cursor.next());
		}
	}
	
	
	/**
	 * 查找文档
	 */
	@Test
	public void fun6() {
		//连接mongo服务
		MongoClient mongoClient = new MongoClient("192.168.1.134", 27017);
		//连接test库
		MongoDatabase database = mongoClient.getDatabase("test");
		//连接goods集合
		MongoCollection<Document> goodsCol = database.getCollection("goods");
		MongoCursor<Document> cursor = goodsCol.find(Filters.ne("cat_id", 3)).iterator();
		while(cursor.hasNext()) {
			Document doc = cursor.next();
			System.out.println(doc.get("goods_id"));
		}
	}
	
	
	/**
	 * 更新文档
	 */
	@Test
	public void fun7() {
		try{   
	         // 连接到 mongodb 服务
	         MongoClient mongoClient = new MongoClient( "192.168.1.134" , 27017 );
	         
	         // 连接到数据库
	         MongoDatabase mongoDatabase = mongoClient.getDatabase("test");  
	         
	         MongoCollection<Document> collection = mongoDatabase.getCollection("goods");
	         
	         //更新文档   将文档中goods_id的文档的shop_price修改为3110  
	         collection.updateMany(Filters.eq("goods_id", 32), new Document("$set",new Document("shop_price",3110)));  
	         //检索查看结果  
	         Document document = collection.find(Filters.eq("goods_id", 32)).first();
	         System.out.println(document);
	         System.out.println("goods_id: " + document.get("goods_id"));
	         System.out.println("goods_name: " + document.get("goods_name"));
	         System.out.println("shop_price: " + document.get("shop_price"));
	      }catch(Exception e){
	         e.printStackTrace();
	      }
	}
	
	
	/**
	 * 删除文档
	 */
	@Test
	public void fun8() {
		try{   
	         // 连接到 mongodb 服务
	         MongoClient mongoClient = new MongoClient( "192.168.1.134" , 27017 );

	         // 连接到数据库
	         MongoDatabase mongoDatabase = mongoClient.getDatabase("test");  
	         //选择test库下的goods表
	         MongoCollection<Document> collection = mongoDatabase.getCollection("goods");
	         System.out.println("集合 test 选择成功");

	         //删除符合条件的第一个文档  
	         collection.deleteOne(Filters.eq("goods_id", 32));  
	         //删除所有符合条件的文档  
	         collection.deleteMany (Filters.eq("shop_price", 2000));  
	         //检索查看结果  
	         FindIterable<Document> findIterable = collection.find();  
	         MongoCursor<Document> mongoCursor = findIterable.iterator();  
	         while(mongoCursor.hasNext()){  
	           System.out.println(mongoCursor.next());  
	         }  
	           
	      }catch(Exception e){
	        System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	     }
	}
	
	
}
