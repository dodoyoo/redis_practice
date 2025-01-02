## Redis란?

- Redis는 Remote(원격)에 위치하고 프로세스로 존재하는 In-Memory 기반의 Dictionary(Key-value) 구조 데이터 관리 Server 시스템이다
- 관계형 데이터베이스와 같이 쿼리 연산을 지원하지 않지만, 데이터의 고속 읽기와 쓰기에 최적화 되어 있다
- Redis는 NoSQL로 분류되기도 한다


## Redis의 특징

1. 메모리 기반이라 모든 데이터들을 메모리에 저장하고 조회에 매우 빠르다 (리스트형 데이터 입력과 삭제가 MySQL에 비해 10배정도 빠름)
2. 메모리에 상주하면서 서비스의 상황에 따라 데이터베이스로 사용될 수 있으며, Cache로 사용될 수 있다
3. Remote Data Storage로 여러 서버에서 같은 데이터를 공유하고 보고 싶을 때 사용할 수 있다
4. 메모리 기반이지만 Redis는 영속적인 데이터 보존이 가능하다 (메모리는 원래 휘발성)
5. 스냅샷 기능을 제공해 메모리 내용을 *.rdb 파일로 저장하여 해당 시점으로 복구할 수 있다
6. Redis는 기본적으로 1개의 싱글 쓰레드로 수행되기 때문에, 안정적은 인프라를 구축하기 위해서는 Replication 필수이다.


## Redis 주요 사용 사례
> Redis의 사용 사례를 검색해보면 다양하게 나온다. 그 중 대표적인 사용 사례는 다음과 같다.

- 캐싱(Caching)
- 세션 관리 (Session Management)
- 실시간 분석 및 통계 (Real-time Analystics)
- 메시지 큐 (Message Queue)
- 지리공간 인덱싱 (Geospatial Indexing)
- 속도 제한 (Rate Limiting)
- 실시간 채팅 및 메시징 (Real-time Chat And Messaging)

   
## Cache 란?
> Cache란 한번 조회된 데이터를 미리 특정 공간에 저장해놓고, 똑같은 요청이 발생하게 되면 서버에게 다시 요청하지 말고 저장해놓은 데이터를 제공해서 빠르게 서비스를 제공해주는 것을 의미한다
> 미리 결과를 저장하고 나중에 요청이 오면 그 요청에 대해서 DB 또는 API를 참조하지 않고 Cache를 접근하여 요청을 처리하는 기법이다


## Cache의 구조 패턴

- Look aside Cache 패턴
> 한번 접근하여 데이터가 있는지 판단한 후, 있다면 캐시의 데이터를 사요하고 없으면 실제 DB 또는 API를 호출한다.


- Look aside Cache 쿼리 순서
1. 클라이언트에서 데이터 요청
2. 서버에서 캐시에 데이터 존재 유무 확인
3. 데이터가 있다면 캐시의 데이터 사용(빠른 사용)
4. 데이터가 없다면 실제 DB 데이터에 접근
5. 그리고 DB에서 가져 온 데이터를 캐시에 저장하고 클라이언트에 반환
   <div align="center">
      <img  src="https://github.com/user-attachments/assets/0fc80379-d6ca-4208-8689-0e48d35e55da">
   </div>


- Write Back 패턴
> wrire back은 주로 쓰기 작업이 많아서, INSERT 쿼리를 일일이 날리지 않고 한꺼번에 배치 처리하기 위해 사용한다
> Insert를 1개씩 500번 수행하는 것보다 500개를 한번에 삽입하는 동작이 훨씬 빠르기 때문에 write back 방식은 빠른 속도로 서비스가 가능하다.


- Write back 쿼리 순서
1. 우선 모든 데이터를 캐시에 싹 저장
2. 캐시의 데이터를 일정 주기마다 DB에 한꺼번에 저장 (배치)
3. 그리고나선 DB에 저장했으니 잔존 데이터를 캐시에 제거
   <div align="center">
      <img src="https://github.com/user-attachments/assets/b4f0409b-64fc-44c5-8dfc-16942778d934">
   </div>

