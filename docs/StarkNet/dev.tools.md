# devtools
# https://starkware.co/resource/7-devtools-starknet-devs/

https://hub.docker.com/r/shardlabs/starknet-devnet-rs/tags

1) docker pull shardlabs/starknet-devnet-rs:a147b4cd72f9ce9d1fa665d871231370db0f51c7-amd
2) docker run -e RUST_LOG=TRACE -p 127.0.0.1:5050:5050 shardlabs/starknet-devnet-rs:a147b4cd72f9ce9d1fa665d871231370db0f51c7-amd --seed 0

https://book.starknet.io/ch02-11-starknet-py.html
https://starknetpy.readthedocs.io/en/latest/quickstart.html
pip install starknet-devnet==0.3.3
starknet get_block <block_number> --gateway_url http://127.0.0.1:5050 --feeder_gateway_url http://127.0.0.1:5050
https://book.starknet.io/ch02-09-starknet-js.html

Starkli
Starknet-devnet
Katana
Scarb
Starknet Foundry
Hardhat
Starknet Remix Plugin

https://github.com/0xSpaceShard/starknet-devnet
https://0xspaceshard.github.io/starknet-devnet/


https://www.starknet.io/en/developers/tools-and-resources
https://github.com/0xSpaceShard/starknet-devnet-rs
https://docs.starknet.io/documentation/tools/devtools/#tools_per_stage_of_development
