SET JAVA_HOME=C:\work\kafka_2.12-2.1.0\java\jdk-11.0.5
SET KAFKA_HOME=C:\work\kafka_2.12-2.1.0

%JAVA_HOME%/bin/java -cp "%KAFKA_HOME%/libs/zookeeper-3.4.13.jar;%KAFKA_HOME%/libs/slf4j-api-1.7.25.jar" org.apache.zookeeper.server.auth.DigestAuthenticationProvider admin:1234

%KAFKA_HOME%/bin/windows/zookeeper-shell.bat localhost:2181
addauth digest producer:5IEDxOZRrzWPxpSOXPMUjWoYuGM=

quit


%KAFKA_HOME%/bin/windows/kafka-acls.bat --list --authorizer-properties "zookeeper.connect=localhost:2181" --topic "local-topic"

%KAFKA_HOME%/bin/windows/kafka-topics.bat --create --zookeeper "localhost:2181" --replication-factor 1 --partitions 3 --topic "local-topic"

%KAFKA_HOME%/bin/windows/kafka-acls.bat --add --producer --authorizer-properties "zookeeper.connect=localhost:2181" --allow-principal User:producer --topic "local-topic"
%KAFKA_HOME%/bin/windows/kafka-acls.bat --add --consumer --authorizer-properties "zookeeper.connect=localhost:2181" --allow-principal User:dochi --topic "local-topic" --group "local-group"


"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --enable-logging --v=1 --user-data-dir=C:\work\chrome


cd C:\work\filebeat-7.3.1
filebeat run -e -c ./conf.d/chrome_logstash.yml -d publish
filebeat run -e -c ./conf.d/chrome_kafka.yml -d publish

python C:\work\kafka_2.12-2.1.0\consumer.py



C:\work\kafka_2.12-2.1.0\zookeeper_server_start.bat
C:\work\kafka_2.12-2.1.0\kafka_server_start.bat

