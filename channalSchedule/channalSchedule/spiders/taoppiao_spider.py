# _*_ coding:utf-8 _*_

import scrapy

from channalSchedule.items import SchedulemovieItem
from scrapy.spiders import CrawlSpider
from scrapy.http import Request
from scrapy.selector import Selector

from scrapy.crawler import CrawlerProcess

import MySQLdb
import datetime

class TaoppScheduleSpider(CrawlSpider):
	name = "taoppiao"
	allowed_domains = ["dianying.taobao.com"]
	# start_urls = [
		# "http://dianying.taobao.com/cinemaDetail.htm?spm=a1z21.6646277.w2.16.YP2Eeb&cinemaId=6187&n_s=new"
	# ]
	channal_id = 3
	
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
			url = "http://dianying.taobao.com/cinemaDetail.htm?spm=a1z21.6646277.w2.16.YP2Eeb&cinemaId="+bytes(i[0])+"&n_s=new"
			page=scrapy.Request(url)
			pages.append(page)
		cur.close()
		conn.close()
		return pages
	
	#获取href1，href2,拼接网址
	def parse(self, response):
		selector = Selector(response)
		for sel in selector.xpath('//div[@class="center-wrap M-seat"]'):
			# /cinemaDetailSchedule.htm
			href1 = sel.xpath("div[1]/@data-ajax").extract()[0]
			# showId=&cinemaId=6187&ts=1483430952426&n_s=new
			href2 = sel.xpath("div[1]/@data-param").extract()[0]
			yield Request("http://dianying.taobao.com" + href1 + "?" + href2, callback=self.parseMovie)
	
	# 遍历获取电影参数
	def parseMovie(self, response):
		selector = Selector(response)
		# cinemaId=6187&activityId=&fCode=&showId=178874&showDate=2017-01-03&ts=1483431807154&n_s=new
		for sel in selector.xpath('//ul[@class="filter-select"]/li[1]/div/a/@data-param').extract():
			yield Request("http://dianying.taobao.com/cinemaDetailSchedule.htm" + "?" + sel, callback=self.parseDate)
	
	# 获取带有日期的参数
	def parseDate(self, response):
		selector = Selector(response)
		for sel in selector.xpath('//ul[@class="filter-select"]/li[last()]/div/a/@data-param').extract():
			date = sel[(sel.find("showDate=")+9):sel.find("&ts=")]
			# yield Request("http://dianying.taobao.com/cinemaDetailSchedule.htm" + "?" + sel, callback=self.parseSchedule)
			yield Request(url="http://dianying.taobao.com/cinemaDetailSchedule.htm" + "?" + sel, meta={'date': date}, callback=self.parseSchedule)
	
	# 解析排期
	def parseSchedule(self, response):
		selector = Selector(response)
		date = response.meta['date']
		params = selector.xpath('//ul[@class="filter-select"]/li[1]/div/a[1]/@data-param').extract()[0].encode()
		movie_name = selector.xpath('//h4/a/text()').extract()[0]
		for sel in selector.xpath('//tbody/tr'):
			item = SchedulemovieItem()
			runtime = date + " " + sel.xpath('td[@class="hall-time"]/em/text()').extract()[0]
			run_type = sel.xpath('td[@class="hall-type"]/text()').extract()[0]
			hall_name = sel.xpath('td[@class="hall-name"]/text()').extract()[0]
			old_price = sel.xpath('td[@class="hall-price"]/del/text()').extract()[0]
			new_price = sel.xpath('td[@class="hall-price"]/em/text()').extract()[0]
			item['runtime'] = runtime
			item['run_type'] = run_type.replace("\n","").replace("\t","")
			item['hall_name'] = hall_name.replace("\n","").replace("\t","")
			item['old_price'] = old_price
			item['new_price'] = new_price
			item['movie_name'] = movie_name
			item['channal_id'] = self.channal_id
			item['cinema_id'] = params[(params.find("=")+1):params.find("&")]
			yield item
			
			