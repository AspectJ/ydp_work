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

class NuomiScheduleSpider(CrawlSpider):
	name = "nuomi"
	allowed_domains = ["dianying.nuomi.com"]
	# start_urls = [
		# "https://dianying.nuomi.com/cinema/cinemadetail?cinemaId=1210"
	# ]
	channal_id = 2
	
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
			url = "https://dianying.nuomi.com/cinema/cinemadetail?cinemaId=" + cid
			page=scrapy.Request(url,meta={'cid': cid})
			pages.append(page)
		cur.close()
		conn.close()
		return pages
		
		
		
	def parse(self, response):
		selector = Selector(response)
		cid = response.meta['cid']
		for sel in selector.xpath('//div[@class="flex-viewport"]/ul/li'):
			movieId = sel.xpath("@data-movieid").extract()[0]
			movieName = sel.xpath('input[1]/@value').extract()[0]
			if movieId:
				for selx in selector.xpath('//div[@class="widget-cinema-cinemadetail-movielist"]/div[@id="datelist"]/div[@data-movieid='+movieId+']'):
					for timestamp in selx.xpath('div[@class="datelist"]/span/@data-id').extract():
						# 获取十位的时间戳
						timestamp_str = timestamp[:-3]
						# 将时间戳转换为日期格式 yyyy-MM-dd
						x = time.localtime(float(timestamp_str))
						datetime = time.strftime('%Y-%m-%d',x)
						for sel_option in selx.xpath('div[@data-id='+timestamp+']'):
							for sel_movie in sel_option.xpath('ul/li'):
								item = SchedulemovieItem()
								item['runtime'] = datetime + " " + sel_movie.xpath('div[@class="time fl"]/p[1]/text()').extract()[0]
								item['run_type'] = sel_movie.xpath('div[@class="type fl font14"]/text()').extract()[0].replace("\n", "").strip()
								item['hall_name'] = sel_movie.xpath('div[@class="hall fl font14"]/text()').extract()[0].strip()
								item['old_price'] = sel_movie.xpath('div[@class="price fl"]/p/del/text()').extract()[0]
								item['new_price'] = sel_movie.xpath('div[@class="price fl"]/p/span[last()]/text()').extract()[0]
								item['channal_id'] = self.channal_id
								item['cinema_id'] = cid
								item['movie_name'] = movieName
								yield item
					
					

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
	