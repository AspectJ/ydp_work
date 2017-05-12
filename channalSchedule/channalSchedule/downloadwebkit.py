import spynner
import pyquery
import time
from bs4 import BeautifulSoup

from scrapy.http import HtmlResponse

class WebkitDownloaderTest( object ):
	def process_request( self, request, spider ):
			if request.url.find("nuomi") != -1:
				browser = spynner.Browser()
				browser.create_webview()
				browser.set_html_parser(pyquery.PyQuery)
				# browser.load(request.url, 20)
				browser.load(url=request.url, load_timeout=120, tries=1)
				try:
						browser.wait_load(1)
				except:
						pass
				html =  str(browser.webframe.toHtml().toUtf8())  
				renderedBody = str(html)
				return HtmlResponse( request.url, body=renderedBody )