# up-d4te project

<img width="617" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/4f0012e1-7648-46bb-ab9d-3d76b1022b75">

> 새로운 장소, 색다른 곳을 갈망하는 오늘날, 연인과 데이트를 하기 전 매번 데이트 코스를 정하고자 리서치 한다. 식사 장소, 전시회, 카페 등 일일이 찾아봐야 하는 번거로움을 느끼고 있다. 게다가 많은 장소 중 어느 곳을 가야 할지, **데이트**에 적합한 공간인지 단순히 지도 앱 만을 보고 파악할 수 없다. 이런 상황에서 좀 더 나은 데이트를 위해 리뷰를 확인하고 다른 추가적인 SNS를 확인하는 등 복잡한 과정이 추가된다. 이러한 상황에서 이 서비스는 과정을 좀 더 간소화해서 불편함을 해소하고, 커플들에게 사용자 기반 데이트 코스를 좀 더 간편하고 빠르게 제공하자는 측면에서 시작되었다.

> 우리는 단순 데이트 코스를 추천해 주는 서비스가 아닌, 개발자들의 **낭만**을 담은 서비스를 개발하고자 한다. 가장 큰 포인트로 서비스 내부의 요청은 cli 로 보이고, vi 에디터에서 입력하는 것처럼 보이는 것이다. 대부분의 개발자들은 cli 환경에 익숙하다. cli 환경에 노출이 되어있는 개발자들에게 개발을 하던 도중, 데이트 코스를 빠르게 리서치 할 수 있게 도와주고, 리눅스 명령어에 익숙하지 않은 개발자들에게는 쉽게 명령어를 접할 수 있게 함으로써, 개발 능력도 향상시킬 수 있다. 또한 개발자들이 서로 데이트 장소를 등록함으로써, 협업에 익숙해진 그들의 자연스러운 기여도 예상된다. 개발자들뿐만 아니라 비 개발자들에게는 생소하고 이색적인 서비스로 다가가 하나의 서비스에서 다채로운 매력을 느껴 흥미를 이끌어 낼 것이다.

> 이 프로젝트는 [ink](https://github.com/vadimdemedes/ink) 를 이용해서 만들어졌다. 만약 cli 프로젝트를 제작하고 싶다면 이를 이용하면 된다.<br> [레포지토리](https://github.com/gdsc-ssu/up-date-cli)에서 추가적으로 볼 수 있다.

## 기능 소개

### 1. 주변 핫플레이스 검색
<img width="149" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/1cdfbcd1-5057-46d9-830e-8894c5328c65">

### 2.특정 역 주변 데이트 코스 추천
<img width="217" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/07eb658e-618c-4838-afe2-d9f0a97c098e">
<img width="229" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/41c4e059-71d9-447a-aec5-909d6197d000"> <br>

### 3. 새로운 가게 등록
<img width="217" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/74fd8af7-2c7d-4697-9666-286aefdd46e5"> <br>

### 4. 특정 가게 상세 정보 확인 하기 
   <img width="293" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/87494ffc-53a4-422b-96fe-24104a9b539d">

## 기술 소개

<img width="810" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/2f5859e7-0e42-4d63-82e9-c492a64158ec">

## 팀원 소개

| <img width="155" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/a4583445-ddc6-4980-aae5-a4acb58ae473"> | <img width="155" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/60b3cc1d-4c26-4f1f-ae4a-22f2bb0774b2"> | <img width="155" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/638a4d44-68d9-4568-8b74-9ff622f76010"> | <img width="155" alt="image" src="https://github.com/gdsc-ssu/up-date-cli/assets/94737768/302dd6cf-4cef-4fd4-9bf9-62357094989b"> |
| --- | --- | --- | --- |
| 심상현                                                                                                                           | 최호연                                                                                                                           | 장환곤                                                                                                                           | 나세빈                                                                                                                           |
| cli 패키지 개발                                                                                                                  | cli 패키지 개발                                                                                                                  | 백엔드 개발                                                                                                                      | 백엔드 개발                                                                                                                      |
| 반가워요                                                                                                                         | 안아줘요                                                                                                                         | 사랑해요                                                                                                                         | 연락줘요                                                                                                                         |

## How to install?

```bash
$ npm install --global up-d4te
```

## How to run?

```bash
$ up-d4te
```

## For Developer

for install packages and run dev local server

```bash
$ npm ci
$ npm run dev
```

and run in another terminal

```bash
$ npm start
```

You need to make [kakao api key](https://developers.kakao.com/) file in `.env` file to root directory of project.
