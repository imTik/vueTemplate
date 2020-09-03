FROM k8s-tools-registry.cn.wal-mart.com:32050/basic-image/tomcat:8.5.41-jre8-alpine

ENV TZ=Asia/Shanghai

ADD you_project_name/ /usr/local/tomcat/webapps/you_project_name/

RUN addgroup -g 1000 appuser && \
    adduser -u 1000 -G appuser appuser -D && \
    chown -R appuser:appuser /usr/local/tomcat/ && \
	  chmod a+x 	/usr/local/tomcat/webapps/you_project_name/

# 请全局搜索 you_project_name 字段, 然后一一替换成你的项目名.
 
#RUN chmod a+x  /usr/local/tomcat/webapps/survey-front/ 

#WORKDIR /u/app/


USER 1000

### run ###
EXPOSE 8080
CMD ["catalina.sh", "run"]