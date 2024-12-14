# Sensor Based Positioning App

## Project Goal

- 중앙대학교 소프트웨어학부 **융합 IOT 프로젝트** 과목의 과제를 완료하기 위한 App 개발

## Assignment Goal

- 중앙대학교 310관 내부에서 모바일 기기의 센서 값을 파악하고 Server와 소통하여 사용자의 실시간 위치 및 방향을 파악하는 App 개발

## Repository Goal

- Assignment Goal 달성을 위한 최종 결과물
- 현재 App 개발 및 위치 파악 기술 개발을 위한 각종 센서 데이터 값을 수집을 위한 App 개발이 선행되었음
  - [**Data Collector App Repository Link**](https://github.com/selfishAltruism/Mobile-Sensor-Data-Collector-App)
- **활용되는 센서값**: Bluetooth
- - 두 가지 버전으로 개발을 진행하였고, 더 좋은 결과를 만드는 App을 선택
    1. Magnetometer / Gyroscope / Accelerometer / Bluetooth 측정 버전 **(main branch)**
    2. Bluetooth 측정 & 방향 조율 기능 추가 버전 **(v2 branch)**
        - Magnetometer / Gyroscope / Accelerometer 추가적인 App을 활용
- 최종적으로 서버 간의 지연 시간을 고려하여 후자를 선택
- App 이름과 로고는 본 프로젝트와 무관

## App Flow

1. Server에게 1000ms 단위로 정보 업데이트를 Request
2. 계산된 좌표와 방향, 현재 위치, Bluetooth 필요 여부를 Response 받아 화면 상에서 정보 업데이트
3. Bluetooth 필요 여부가 확인 된 경우, 5초간 Bluetooth 센서 값를 수집하여 Request
4. 사용자가 설정된 방향이 맞지 않다고 판단 시 현재 방향을 선택하여 조정

## Project Stack

- react-native
- react-native-ble-plx

## Result

### Main Page / Scan On Page / Direction adjustment

![1](https://github.com/user-attachments/assets/808154ad-fcb5-4513-b7e2-204074c779f4)

### Main Screen when actually in operation / Label when location specific completion

![2](https://github.com/user-attachments/assets/6f66071c-34e5-4201-b80e-93da37820340)
