# AWS IoT 파이썬 라이브러리 및 관련 라이브러리 로딩 
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTShadowClient
import logging
import time
import argparse
import json
import led_api as led
# shadow 명령 실행 후, 호출될 함수 정의
# AWS IoT 디바이스 SDK - Python - github - 페이지 하단 "API Documentation" 클릭 - 페이지에서 아규먼트 타입 확인
# shadow 값을 변경 후 실행되는 함수
def updateCallback(payload, responseStatus, token):
    print("update 명령 수행 후 실행되었다.")
    print(payload)
    print(responseStatus)
    print(token)
    print("------------------------------")
# shadow 값을 가져온 후 실행되는 함수
def getCallback(payload, responseStatus, token):
    print("get 명령 수행 후 실행되었다.")
    # AWSIoT 서버에서 받은 JSON 문자열을 객체로 변환
    dict = json.loads(payload) # payload 는 str 객체이다.
    if responseStatus == "rejected" and dict['code'] == 404 :
        print("새도우가 존재하지 않습니다.")
        # shadow 기본값 설정하기
        # AWS IoT SDK - github "/samples/basicShadow/basicShadowUpdater.py" 참고
        myJSONPayload = '{"state":{"desired":{"led":"on"}}}'
        myDeviceShadow.shadowUpdate(myJSONPayload, updateCallback, 5)
    else :
        print("현재 새도우 값이다.")
        print(dict['state']['desired']['led'])
        print(token)
        if dict['state']['desired']['led'] == "on" :
            led.onLed(True)
        else :
            led.onLed(False)
    print("------------------------------")
# AWS IoT의 Thing에 접속할 때 사용할 정보 준비
# AWS에 등록한 Thing을 가리키는 URL. 
# AWS IoT 사물 관리 페이지에서 "상호작용" 메뉴에서 
# HTTPS의 RestAPI를 요청할 때 사용할 Thing의 URL이다.
host = "aez0ui7qkmx0b.iot.ap-northeast-2.amazonaws.com"
# 사물에 대해 발행한 인증서를 검증해 줄 
# "인증서를 발행한 회사(인증기관)"의 인증서 파일
rootCAPath = "root-CA.crt"
# AWS 서버에 Thing을 생성한 후 만든 인증서의 사물인증서 파일
certificatePath = "dev01.cert.pem"
# AWS 서버에 Thing을 생성한 후 만든 인증서의 개인키 파일 
privateKeyPath = "dev01.private.key"
# web 소켓 사용 여부 
useWebsocket = False
# 다른 클라이언트와 구분하기 위한 임의의 ID
clientId = "client2"
# 실행하면서 로그를 남기기 위한 설정
logger = logging.getLogger("AWSIoTPythonSDK.core")
logger.setLevel(logging.DEBUG)
streamHandler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
streamHandler.setFormatter(formatter)
logger.addHandler(streamHandler)
# AWSIoTShadowClient 초기화
myShadowClient  = AWSIoTMQTTShadowClient(clientId)
myShadowClient.configureEndpoint(host, 8883)
myShadowClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)
# AWSIoTMQTTClient 연결에 대한 제어 정보 설정
myShadowClient.configureAutoReconnectBackoffTime(1, 32, 20)
#myShadowClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
#myShadowClient.configureDrainingFrequency(2)  # Draining: 2 Hz
myShadowClient.configureConnectDisconnectTimeout(10)  # 10 sec
myShadowClient.configureMQTTOperationTimeout(5)  # 5 sec
# AWS IoT에 등록된 Thing과 연결
myShadowClient.connect()
print("shadow connect\n")
# thing shadow 객체 생성
myDeviceShadow = myShadowClient.createShadowHandlerWithName("dev01", True)
# shadow 값 가져오기
# AWS IoT SDK - github "/samples/basicShadow/basicShadowUpdater.py" 참고
myDeviceShadow.shadowGet(getCallback, 5)