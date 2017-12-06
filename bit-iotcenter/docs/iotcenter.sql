-- iotcenter.sql
create table iot_user(
  uno int not null,
  email varchar(50),
  name varchar(50),
  pwd varchar(200),
  fbuid varchar(50)
);
-- primary key 설정
alter table iot_user add primary key (uno);
-- primary key "no" 컬럼을 자동 증가 컬럼으로 설정
alter table iot_user modify column uno int not null auto_increment;