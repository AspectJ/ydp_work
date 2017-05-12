package com.test;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.junit.Test;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

public class MongoDemo2 {
	/**
	 * 获取数组类型数据
	 */
	@Test
	public void fun1() {
		MongoClient mongoClient = null;
		MongoDatabase database = null;
		try {
			// 连接mongo服务
			mongoClient = new MongoClient("192.168.1.134", 27017);
			// 连接test库
			database = mongoClient.getDatabase("test");
			// 连接douban表
			MongoCollection<Document> doubanCol = database.getCollection("douban");
			// 遍历表中的数据
			FindIterable<Document> findIterable = doubanCol.find();
			MongoCursor<Document> cursor = findIterable.iterator();
			while(cursor.hasNext()) {
				Document doc = cursor.next();
				System.out.println(doc);
				List list = (ArrayList)doc.get("title");
				System.out.println(list.toString());
				for (Object object : list) {
					System.out.print(object);
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			mongoClient.close();
		}
	}
}
