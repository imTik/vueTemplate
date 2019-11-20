FROM k8s-tools-registry.cn.wal-mart.com:32050/basic-image/tomcat:8.5.29-jre8

ADD tourroadmap-front/ /usr/local/tomcat/webapps/tourroadmap-front/

RUN groupadd -g 1000 appuser && \
    useradd -u 1000 -g appuser appuser && \
    chown -R appuser:appuser /usr/local/tomcat/ 

 
#RUN chmod a+x  /usr/local/tomcat/webapps/survey-front/ 

#WORKDIR /u/app/


USER 1000

### run ###
EXPOSE 8080
CMD ["catalina.sh", "run"]