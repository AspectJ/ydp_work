# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class SchedulemovieItem(scrapy.Item):
    movie_name = scrapy.Field()  #电影名字
    runtime = scrapy.Field()  #放映时间
    run_date = scrapy.Field()  #放映日期
    run_type = scrapy.Field()  #放映版本
    old_price = scrapy.Field()  #电影原价
    new_price = scrapy.Field()  #电影现价
    hall_name = scrapy.Field()  #放映厅
    channal_id = scrapy.Field()  #渠道ID
    cinema_id = scrapy.Field()  #影院ID，每个渠道的影院ID不相同