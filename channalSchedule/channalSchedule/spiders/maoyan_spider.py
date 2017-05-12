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
import json

class MaoyanScheduleSpider(CrawlSpider):
	name = "maoyan"
	allowed_domains = ["m.maoyan.com"]
	# start_urls = [
		# "http://m.maoyan.com/showtime/wrap.json?cinemaid=5841&movieid="
	# ]
	channal_id = 6
	
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
			url = "http://m.maoyan.com/showtime/wrap.json?cinemaid="+cid+"&movieid="
			page=scrapy.Request(url,meta={'cid': cid})
			pages.append(page)
		cur.close()
		conn.close()
		return pages

		
	def parse(self, response):
		cid = response.meta['cid']
		data = json.loads(response.body_as_unicode())
		for movie in data["data"]["movies"]:
			movieId = movie["id"]
			movieName = movie["nm"]
			yield Request(url="http://m.maoyan.com/showtime/wrap.json?cinemaid="+cid+"&movieid="+str(movieId), meta={'movieName': movieName, "cid": cid}, callback=self.parseSchedule)
		
	def parseSchedule(self, response):
		cid = response.meta['cid']
		movieName = response.meta['movieName']
		data = json.loads(response.body_as_unicode())
		for date in data["data"]["Dates"]:
			date = date["slug"]
			for movie in data["data"]["DateShow"][date]:
				item = SchedulemovieItem()
				item['runtime'] = date + " " + movie["tm"]
				item['run_type'] = movie["tp"] + "/" + movie["lang"]
				item['hall_name'] = movie["th"]
				item['old_price'] = 0
				sellPrice = movie["sellPrStr"]
				item['new_price'] = sellPrice[(sellPrice.find("<i>") + 5) : (sellPrice.find("</i>") -1)]
				item['movie_name'] = movieName
				item['channal_id'] = self.channal_id
				item['cinema_id'] = cid
				yield item
				
		
					

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
	