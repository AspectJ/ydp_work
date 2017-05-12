# _*_ coding:utf-8 _*_

import scrapy

from channalSchedule.items import SchedulemovieItem
from scrapy.spiders import CrawlSpider
from scrapy.http import Request
from scrapy.selector import Selector

from scrapy.crawler import CrawlerProcess

import MySQLdb
import datetime
import time

class DianpingScheduleSpider(CrawlSpider):
	name = "dianping"
	allowed_domains = ["www.dianping.com"]
	# start_urls = [
		# "http://www.dianping.com/ajax/json/shop/movie/showlist?_nr_force=1483062205371&shopId=5488032&date=2016-12-30"
	# ]
	channal_id = 5
	
	def start_requests(self):
		conn= MySQLdb.connect(
			host='192.168.195.5',
			port = 3306,
			user='root',
			passwd='123456',
			db ='channal_schedule',
		)
		cur = conn.cursor()
		cur.execute("SELECT cinema_id FROM cinema WHERE channal_id = %s",(self.channal_id))
		values = cur.fetchall()
		pages=[]
		self.date = datetime.datetime.now().strftime("%Y-%m-%d")
		for i in values:
			cid = bytes(i[0])
			url = "http://www.dianping.com/ajax/json/shop/movie/showlist?_nr_force="+str(int(time.time() * 1000))+"&shopId="+cid+"&date="+self.date
			page=scrapy.Request(url,meta={'cid': cid})
			pages.append(page)
		cur.close()
		conn.close()
		return pages
	
	# 循环遍历影片，获取movieId
	def parse(self, response):
		selector = Selector(response)
		cid = response.meta['cid']
		for sel in selector.xpath('//li[@data-id]'):
			movieId = sel.xpath('@data-id').extract()[0].replace("\\\"","")
			yield Request(url="http://www.dianping.com/ajax/json/shop/movie/showlist?_nr_force="+str(int(time.time() * 1000))+"&shopId="+cid+"&date="+self.date+"&movieId="+movieId, meta={'cid': cid}, callback=self.parseSchedule)
			
	# 获取影片的排期信息
	def parseSchedule(self, response):
		selector = Selector(response)
		cid = response.meta['cid']
		movieName = selector.xpath('//h3/text()').extract()[0].strip()
		for sel in selector.xpath('//tr'):
			item = SchedulemovieItem()
			runtime = sel.xpath('td[1]/text()').extract()[0].replace("\\t","").strip()
			new_price = sel.xpath('td[5]/text()').extract()[0].replace("\\t","").strip()[1:]
			if (runtime and new_price):
				item['runtime'] = self.date + " " + runtime
				item['new_price'] = new_price
				item['run_type'] = sel.xpath('td[3]/text()').extract()[0].replace("\\t","").replace("\\","").strip()
				item['hall_name'] = sel.xpath('td[4]/text()').extract()[0].replace("\\t","").strip()
				item['old_price'] = 0
				item['channal_id'] = self.channal_id
				item['movie_name'] = movieName
				item['cinema_id'] = cid
				yield item
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
	