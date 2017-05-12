# _*_ coding:utf-8 _*_

import scrapy

from channalSchedule.items import SchedulemovieItem
from scrapy.spiders import CrawlSpider
from scrapy.http import Request
from scrapy.selector import Selector

from scrapy.crawler import CrawlerProcess

import MySQLdb
import datetime

class GewaraScheduleSpider(CrawlSpider):
	name = "gewara"
	allowed_domains = ["www.gewara.com"]
	# start_urls = [
		# "http://www.gewara.com/cinema/ajax/getOpiItemPage.xhtml?cid=136378877&mid=&fyrq=2016-12-26"
	# ]
	channal_id = 4
	
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
		# self.date = datetime.datetime.now().strftime("%Y-%m-%d")
		for i in values:
			cid = bytes(i[0])
			url = "http://www.gewara.com/cinema/" + cid
			page=scrapy.Request(url,meta={'cid': cid})
			pages.append(page)
		cur.close()
		conn.close()
		return pages
	
	# 遍历获取日期
	def parse(self, response):
		selector = Selector(response)
		cid = response.meta['cid']
		for sel in selector.xpath('//dd[@class="ui_text ticket_choose_day"]/a'):
			date = sel.xpath('@id').extract()[0]
			yield Request(url="http://www.gewara.com/cinema/ajax/getOpiItemPage.xhtml?cid="+cid+"&mid=&fyrq="+date, meta={'date': date, 'cid': cid}, callback=self.parseMovie)
			
	
	# 遍历电影获取movieId
	def parseMovie(self, response):
		selector = Selector(response)
		date = response.meta['date']
		cid = response.meta['cid']
		for sel in selector.xpath('//ul/li'):
			movieId = sel.xpath("span/@data-id").extract()[0]
			movieName = sel.xpath("a/img/@alt").extract()[0]
			yield Request(url="http://www.gewara.com/movie/ajax/getOpiItemNew.xhtml?movieid="+movieId+"&fyrq="+date+"&cid="+cid, meta={'date': date,'movieName': movieName}, callback=self.parseSchedule)
			
	# 解析电影排期
	def parseSchedule(self, response):
		selector = Selector(response)
		date = response.meta['date']
		movieName = response.meta['movieName']
		cinemaId = selector.xpath('//div[@class="chooseOpi opend"]/@cinema').extract()[0]
		for sel in selector.xpath('//ul[@class="clear"]/li'):
			self.item = SchedulemovieItem()
			newPrice = sel.xpath('span[@class="opiPrice"]/b/text()').extract()[0].strip()
			if newPrice == "":
				continue
			self.item['new_price'] = newPrice
			self.item['runtime'] = date + " " + sel.xpath('span[@class="opitime"]/b/text()').extract()[0]
			self.item['run_type'] = sel.xpath('span[@class="opiEdition"]/em/text()').extract()[0]
			self.item['hall_name'] = sel.xpath('span[@class="opiRoom ui_roomType"]/label/text()').extract()[0]
			self.item['old_price'] = sel.xpath('span[@class="opiPrice"]/em/text()').extract()[0]
			self.item['channal_id'] = self.channal_id
			self.item['cinema_id'] = cinemaId
			self.item['movie_name'] = movieName
			yield self.item
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
	