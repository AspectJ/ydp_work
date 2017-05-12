package com.cx.util;

import java.io.File;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongo.KafkaTool;
import com.mongo.MyMongo;

public class Config
{
	private static Logger logger = LoggerFactory.getLogger(Config.class);
	
//	public static String SERVICEURL = "http://localhost:8080";
	public static String SERVICEURL = "http://cp.yidepiao.net:8080";
	
	public static String PROVINCE = "360000,410000,420000,430000,440000,640000";
	
	public static String FILE_PATH;
	
	/**
	 * 解析配置文件
	 */
	public static void parseConfig(String configFile) {

		try
		{
			SAXReader read = new SAXReader();
			Document document = read.read(configFile);
			Node rootNode = document.selectSingleNode("config");
			
			SERVICEURL = rootNode.selectSingleNode("service").valueOf("@url");
			
			PROVINCE = rootNode.selectSingleNode("province").valueOf("@province");
			
			FILE_PATH = rootNode.selectSingleNode("path").valueOf("@file");
	        File fileDir = new File(FILE_PATH);
	        if (!fileDir.exists())
			{
	        	fileDir.mkdirs();
			}
	        
	        /*
			 * ***********************************************
			 * ******************* mongDB配置 *************** 
			 * ***********************************************
			 */
	        // *********************** kafka消息队列配置 **********************
	        Node kafkaNode = rootNode.selectSingleNode("kafka");
	        KafkaTool.TOPIC = kafkaNode.valueOf("@topic");
	        KafkaTool.ZOOKEEPER_CONNECT = kafkaNode.valueOf("@zookeeper");
	        KafkaTool.BROKER_LIST = kafkaNode.valueOf("@broker");
	        
		} catch (DocumentException e)
		{
			logger.error("[config][解析配置文件失败][eMess:{}]", e.getMessage(), e);
		}
	}
}
