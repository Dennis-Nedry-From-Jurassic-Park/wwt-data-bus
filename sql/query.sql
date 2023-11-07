select * from rmq.event;

SELECT name, last_error_time , last_error_message　FROM system.errors　order by last_error_time desc;

set stream_like_engine_allow_direct_select=1;

SELECT *
FROM system.errors
WHERE value > 0
ORDER BY code ASC
LIMIT 1;

SELECT (JSONExtract(payload, 'Tuple(UInt32, UInt32, UInt32, UInt32, String, UInt32, UInt32, Int64, Int64, String)') AS parsed_json),
generateUUIDv4() AS uuid,
parsed_json.1 AS user_id,
parsed_json.2 AS car_id,
parsed_json.3 AS auction_id,
parsed_json.4 AS branch_id,
parsed_json.5 AS name,
parsed_json.6 AS appointment_id,
parsed_json.7 AS appointment_status_id,
parsed_json.8 AS datetime,
parsed_json.9 AS duration,
JSONExtractKeysAndValuesRaw(parsed_json.10) AS labels;

create or replace table rmq.test (ts DateTime64(3) DEFAULT now(), a Int8) Engine = Memory;

insert into rmq.test (* EXCEPT(ts)) values (1);

