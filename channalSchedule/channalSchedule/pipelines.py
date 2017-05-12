# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
		
		
import json
import codecs

from scrapy import signals
from twisted.enterprise import adbapi
from datetime import datetime
from hashlib import md5
import MySQLdb
import MySQLdb.cursors
import datetime

class ChannalschedulePipeline(object):
		def __init__(self):
			self.file = codecs.open('schedule.json', 'w', encoding='utf-8')
			
		def process_item(self, item, spider):
			line = json.dumps(dict(item)) + "\n"
			self.file.write(line.decode('unicode_escape'))
			return item
			
			
class MySQLStorePipeline(object):
	def __init__(self, dbpool):
		self.dbpool = dbpool

	@classmethod
	def from_settings(cls, settings):
		dbargs = dict(
			host=settings['MYSQL_HOST'],
			db=settings['MYSQL_DBNAME'],
			user=settings['MYSQL_USER'],
			passwd=settings['MYSQL_PASSWD'],
			charset='utf8',
			cursorclass = MySQLdb.cursors.DictCursor,
			use_unicode= True,
		)
		dbpool = adbapi.ConnectionPool('MySQLdb', **dbargs)
		return cls(dbpool)

	#pipeline默认调用
	def process_item(self, item, spider):
		# self.dbpool.runInteraction(self.deleteData, item, spider)
		d = self.dbpool.runInteraction(self._do_upinsert, item, spider)
		d.addErrback(self._handle_error, item, spider)
		d.addBoth(lambda _: item)
		return d
		
	# def deleteData(self, conn, item, spider):
			# conn.execute("DELETE FROM movie_info")
		
	def _do_upinsert(self, conn, item, spider):
			dt=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
			conn.execute("INSERT INTO movie_info(runtime,movie_name,hall_name,old_price,new_price,run_date,channal_id,run_type,cinema_id) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)", (item['runtime'],item['movie_name'],item['hall_name'],item['old_price'],item['new_price'],dt,item['channal_id'],item['run_type'],item['cinema_id']))

	#异常处理
	def _handle_error(self, failue, item, spider):
		print failue
