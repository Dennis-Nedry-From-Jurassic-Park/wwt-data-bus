you will need manually create new db 
- by starting erigon with new flags in new data dir.



# err="mdbx_env_open: The paging file is too small
# 7367
https://github.com/ledgerwatch/erigon/issues/7367

EROR[04-22|06:58:15.358] Erigon startup  
err="mdbx_env_open: The paging file is too small for this operation to complete., 
label: chaindata, trace: [kv_mdbx.go:356 node.go:367 node.go:370 backend.go:241 node.go:124 main.go:65 make_app.go:54 command.go:279 app.go:337 app.go:311 main.go:34 proc.go:271 asm_amd64.s:1695]"
mdbx_env_open: The paging file is too small for this operation to complete., 
label: chaindata, trace: [kv_mdbx.go:356 node.go:367 node.go:370 backend.go:241 node.go:124 main.go:65 make_app.go:54 command.go:279 app.go:337 app.go:311 main.go:34 proc.go:271 asm_amd64.s:1695]

