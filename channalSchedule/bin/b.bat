::flush_all table movie_info
set errorlevel=0
set path_home_mysql="D:\Program Files (x86)\MySQL\MySQL Server 5.5\"
set path_bin_mysql=%path_home_mysql%bin\
set user_mysql=root
set password_mysql=123456
set host_name=192.168.195.5
%path_bin_mysql%mysql -u%user_mysql% -p%password_mysql% -h%host_name% < G:\flush_movieInfo.sql


::start crawl spider
F:
cd channalSchedule
scrapy crawlall