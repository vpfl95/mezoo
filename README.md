# 실시간 환자 모니터링 
심전도를 측정하는 소형패치 기기에서 보내는 생체 신호를 기반으로 ECG 그래프를 확인하는 모니터링 시스템입니다.

Mezoo의 심전도 측정기기 Hicardi와 모바일앱을 BLE통신으로 연결하여 데이터를 받습니다.
앱과 클라이언트 사이에 서버를 통해 받은 데이터를 사용해 모니터링 시스템을 보여줍니다. 

심전도패치 --> 모바일앱 --> 서버 <--> 클라이언트


목적: 	심전도 데이터를 실시간으로 출력하여 환자의 상태를 파악


내용: 	원격 모니터링을 활용하여 부족한 의료진의 업무에 도움
	코로나 바이러스 와 같은 호흡기 감염질환 으로부터 의료진의 	안전 보장

# 기술스택
<img src="https://img.shields.io/badge/typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/dart-0175C2?style=flat-square&logo=dart&logoColor=white"/>
<img src="https://img.shields.io/badge/angular-0F0F11?style=flat-square&logo=angular&logoColor=white"/>
<img src="https://img.shields.io/badge/FLutter-02569B?style=flat-square&logo=FLutter&logoColor=white"/>
<img src="https://img.shields.io/badge/mongodb-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/nodedotjs-339933?style=flat-square&logo=nodedotjs&logoColor=white"/>



# 주요 기능
### 환자 상태 모니터링
환자의 심전도, 호흡을 그래프로 확인할 수 있습니다. 기타 심박수, 체온, 걷거나 뛰는 동작, 위치 등의 기타 정보도 함꼐 확인합니다.
![모니터링](https://github.com/vpfl95/flutter_ble/assets/68257796/c3f406ce-7200-4646-8b73-5b2a159f0a73)

### 부정맥 탐지
심전도 패치에서 부정맥을 탐지하여 부정맥 데이터가 오면 모니터 화면으로 경고를 해줍니다.
![부정맥](https://github.com/vpfl95/flutter_ble/assets/68257796/dc920392-49f5-4ec4-a984-893aa8429fb5)

### 심전도 기록 확인
히스토리 탭에서 이전에 등록된 기기의 목록과 해당 기기에 저장된 심전도 기록을 확인합니다.
부정맥 기록도 그래프에서 빨간점으로 확인합니다. 
![히스토리](https://github.com/vpfl95/flutter_ble/assets/68257796/58aab274-a947-416e-887a-42d3cbcc882f)
![부정맥히스토리](https://github.com/vpfl95/flutter_ble/assets/68257796/511116aa-fe38-4883-92a4-5fe747933102)
