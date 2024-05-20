// @ts-nocheck

const json = require('./wwt.4byte.eventsignatures.json')
//let json_prepared = json.map(e => ({...e, _id: uuidv4() }) )
const json_prepared = json.map(({ _id, __v, ...it }) => it);
console.log(json_prepared.slice(0,2));

const result = await wwt.clickhouse_beta.insert({
    table: 'wwt.4byte_eventsignatures',
    values: json_prepared,
    format: 'JSONEachRow',
    // Allows to insert serialized JS Dates (such as '2023-12-06T10:54:48.000Z')
    clickhouse_settings: {
        date_time_input_format: 'best_effort',
    }
})

const written_rows = result.summary.written_rows
const result_rows = result.summary.result_rows
const elapsed_ns = result.summary.elapsed_ns

console.log({
    json_prepared_rows: json_prepared.length,
    written_rows: written_rows,
    result_rows: result_rows,
    elapsed_ns: elapsed_ns,
}); // 1779987 ns for two rows | 1597382239 ns for 1347418rows


