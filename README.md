# Sensor Based Positioning App

## Project Goal

- 중앙대학교 소프트웨어학부 **융합 IOT 프로젝트** 과목의 과제를 완료하기 위한 APP 개발

## Assignment Goal

- 중앙대학교 310관 내부에서 모바일 기기의 각종 센서 값을 파악하여 사용자의 위치 파악하는 APP 개발

## Repository Goal

- 본 어플리케이션은 최종 결과물 APP이 아님.
- 최종 결과물 APP에 사용되는 알고리즘 구현을 위한 센서 데이터 값을 수집을 위한 APP
  - [**최종 결과물 APP Repository Link**](https://github.com/selfishAltruism/Sensor-Based-Positioning-App)
- 1000ms 단위로 센서 값 AsyncStorage에 저장, 이후 AsyncStorage 값을 데이터 파일로 저장
- **활용되는 센서값**: Magnetometer, Gyroscope, Accelerometer, Bluetooth

## Project Stack

- react-native
- react-native-async-storage
- react-native-ble-plx
- react-native-wifi-reborn
- react-native-sensors

## Result

### Main Page / Scan On Page / Data Log Modal

![그림1](https://github.com/user-attachments/assets/897c8245-d090-4aec-9d52-0c785f631d0a)

### After Copy Button Click / After Reset Button Click / After Position Save Button Click

![그림2](https://github.com/user-attachments/assets/3a0c0dc0-72c2-428a-89f0-0810cde467c0)

### After Data Save Button Click

![Screenshot_20241130-184137](https://github.com/user-attachments/assets/7ce05827-cf72-4775-a854-bc7822c87cdf)
