from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import logging
import time
import argparse
import json

def customCallback(client, userdata, message):
    print("메시지를 수신하였습니다. \n")
    print("사서함 이름: \n")
    print(message.topic)
    print("\n")
    print("사서함 내용: \n")
    print(message.payload)
    print("\n")
    print("--------------\n\n")

host = "aez0ui7qkmx0b.iot.ap-northeast-2.amazonaws.com"
rootCAPath = "root-CA.crt"
certificatePath = "dev01.cert.pem"
privateKeyPath = "dev01.private.key"
useWebsocket = False
clientId = "client2"
topic = "topic_1"

# Configure logging
logger = logging.getLogger("AWSIoTPythonSDK.core")
logger.setLevel(logging.DEBUG)
streamHandler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
streamHandler.setFormatter(formatter)
logger.addHandler(streamHandler)

# Init AWSIoTMQTTClient
myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId)
myAWSIoTMQTTClient.configureEndpoint(host, 8883)
myAWSIoTMQTTClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)

# AWSIoTMQTTClient connection configuration
myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
myAWSIoTMQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)  # 5 sec

# Connect and subscribe to AWS IoT
myAWSIoTMQTTClient.connect()
print("connect\n")
myAWSIoTMQTTClient.subscribe(topic, 1, customCallback)
time.sleep(2)