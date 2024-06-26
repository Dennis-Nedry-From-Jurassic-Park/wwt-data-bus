docker run -it -v $(pwd):/share trailofbits/eth-security-toolbox:nightly-20240408 slither --help
usage: slither target [flag]

target can be:
- **file.sol** // a Solidity file
- **project_directory** // a project directory. See https://github.com/crytic/crytic-compile/#crytic-compile for the supported platforms
- 0x.. // a contract on mainnet
- NETWORK:0x.. // a contract on a different network. Supported networks: mainet,optim,~~goerli~~,sepolia,tobalaba,bsc,testnet.bsc,arbi,testnet.arbi,poly,mumbai,avax,testnet.avax,ftm,goerli.base,base,gno,polyzk,blast

For usage information, see https://github.com/crytic/slither/wiki/Usage

options:
-h, --help            show this help message and exit
--version             displays the current version
--filter-paths FILTER_PATHS
Regex filter to exclude detector results matching file
path e.g. (mocks/|test/)
--include-paths INCLUDE_PATHS
Regex filter to include detector results matching file
path e.g. (src/|contracts/). Opposite of --filter-
paths

Compile options:
# ??
- [ ] compile-force-framework
--compile-force-framework COMPILE_FORCE_FRAMEWORK
Force the compile to a given framework (foundry,buidle
r,hardhat,truffle,waffle,solc,embark,dapp,etherlime,et
herscan,vyper,brownie,solc-json,standard,archive)
--compile-libraries COMPILE_LIBRARIES
Libraries used for linking. Format: --compile-
libraries "(name1, 0x00),(name2, 0x02)"
--compile-remove-metadata
Remove the metadata from the bytecodes
--compile-custom-build COMPILE_CUSTOM_BUILD
Replace platform specific build command
--ignore-compile      Do not run compile of any platform
--skip-clean          Do not attempt to clean before compiling with a
platform

Solc options:
--solc SOLC           solc path
--solc-remaps SOLC_REMAPS
Add remapping
--solc-args SOLC_ARGS
Add custom solc arguments. Example: --solc-args "--
allow-path /tmp --evm-version byzantium".
--solc-disable-warnings
Disable solc warnings
--solc-working-dir SOLC_WORKING_DIR
Change the default working directory
--solc-solcs-select SOLC_SOLCS_SELECT
Specify different solc version to try (env config).
Depends on solc-select
--solc-solcs-bin SOLC_SOLCS_BIN
Specify different solc version to try (path config).
Example: --solc-solcs-bin solc-0.4.24,solc-0.5.3
--solc-standard-json  Compile all specified targets in a single compilation
using solc standard json
--solc-force-legacy-json
Force the solc compiler to use the legacy json ast
format over the compact json ast format

Truffle options:
--truffle-ignore-compile
Do not run truffle compile
--truffle-build-directory TRUFFLE_BUILD_DIRECTORY
Use an alternative truffle build directory
--truffle-version TRUFFLE_VERSION
Use a local Truffle version (with npx)
--truffle-overwrite-config
Use a simplified version of truffle-config.js for
compilation
--truffle-overwrite-version TRUFFLE_OVERWRITE_VERSION
Overwrite solc version in truffle-config.js (only if
--truffle-overwrite-config)

Embark options:
--embark-ignore-compile
Do not run embark build
--embark-overwrite-config
Install @trailofbits/embark-contract-export and add it
to embark.json

Brownie options:
--brownie-ignore-compile
Do not run brownie compile

Dapp options:
--dapp-ignore-compile
Do not run dapp build

Etherlime options:
--etherlime-ignore-compile
Do not run etherlime compile
--etherlime-compile-arguments
Add arbitrary arguments to etherlime compile (note:
[dir] is the the directory provided to crytic-compile)

Etherscan options:
--etherscan-only-source-code
Only compile if the source code is available.
--etherscan-only-bytecode
Only looks for bytecode.
--etherscan-apikey ETHERSCAN_API_KEY
Etherscan API key.
--arbiscan-apikey ARBISCAN_API_KEY
Etherscan API key.
--polygonscan-apikey POLYGONSCAN_API_KEY
Etherscan API key.
--test-polygonscan-apikey TEST_POLYGONSCAN_API_KEY
Etherscan API key.
--avax-apikey AVAX_API_KEY
Etherscan API key.
--ftmscan-apikey FTMSCAN_API_KEY
Etherscan API key.
--bscan-apikey BSCAN_API_KEY
Etherscan API key.
--optim-apikey OPTIM_API_KEY
Optimistic API key.
--base-apikey BASE_API_KEY
Basescan API key.
--gno-apikey GNO_API_KEY
Gnosisscan API key.
--polyzk-apikey POLYZK_API_KEY
zkEVM Polygonscan API key.
--blast-apikey BLAST_API_KEY
Blastscan API key.
--etherscan-export-directory ETHERSCAN_EXPORT_DIR
Directory in which to save the analyzed contracts.

Waffle options:
--waffle-ignore-compile
Do not run waffle compile
--waffle-config-file WAFFLE_CONFIG_FILE
Provide a waffle config file

NPX options:
--npx-disable         Do not use npx

Buidler options:
--buidler-ignore-compile
Do not run buidler compile
--buidler-cache-directory BUIDLER_CACHE_DIRECTORY
Use an alternative buidler cache directory (default
./cache)
--buidler-skip-directory-name-fix
Disable directory name fix (see
https://github.com/crytic/crytic-compile/issues/116)

Hardhat options:
--hardhat-ignore-compile
Do not run hardhat compile
--hardhat-cache-directory HARDHAT_CACHE_DIRECTORY
Use an alternative hardhat cache directory (default
./cache)
--hardhat-artifacts-directory HARDHAT_ARTIFACTS_DIRECTORY
Use an alternative hardhat artifacts directory
(default ./artifacts)

Foundry options:
--foundry-ignore-compile
Do not run foundry compile
--foundry-out-directory FOUNDRY_OUT_DIRECTORY
Use an alternative out directory (default: out)
--foundry-compile-all
Don't skip compiling test and script

Detectors:
--detect DETECTORS_TO_RUN
Comma-separated list of detectors, defaults to all,
available detectors: abiencoderv2-array, arbitrary-
send-erc20, arbitrary-send-erc20-permit, arbitrary-
send-eth, array-by-reference, controlled-array-length,
assembly, assert-state-change, backdoor, weak-prng,
boolean-cst, boolean-equal, shadowing-builtin, cache-
array-length, codex, constant-function-asm, constant-
function-state, pragma, controlled-delegatecall,
costly-loop, constable-states, immutable-states,
cyclomatic-complexity, dead-code, delegatecall-loop,
deprecated-standards, divide-before-multiply, domain-
separator-collision, encode-packed-collision, enum-
conversion, external-function, function-init-state,
erc20-interface, erc721-interface, incorrect-exp,
incorrect-return, solc-version, incorrect-equality,
incorrect-unary, incorrect-using-for, shadowing-local,
locked-ether, low-level-calls, mapping-deletion,
events-access, events-maths, missing-inheritance,
missing-zero-check, incorrect-modifier, msg-value-
loop, calls-loop, multiple-constructors, name-reused,
naming-convention, out-of-order-retryable, variable-
scope, protected-vars, public-mappings-nested,
redundant-statements, reentrancy-benign, reentrancy-
eth, reentrancy-events, reentrancy-unlimited-gas,
reentrancy-no-eth, return-bomb, return-leave, reused-
constructor, rtlo, shadowing-abstract, incorrect-
shift, similar-names, shadowing-state, storage-array,
suicidal, tautological-compare, timestamp, too-many-
digits, tx-origin, tautology, unchecked-lowlevel,
unchecked-send, unchecked-transfer, unimplemented-
functions, erc20-indexed, uninitialized-fptr-cst,
uninitialized-local, uninitialized-state,
uninitialized-storage, unprotected-upgrade, unused-
return, unused-state, var-read-using-this, void-cst,
write-after-write
--list-detectors      List available detectors
--exclude DETECTORS_TO_EXCLUDE
Comma-separated list of detectors that should be
excluded
--exclude-dependencies
Exclude results that are only related to dependencies
--exclude-optimization
Exclude optimization analyses
--exclude-informational
Exclude informational impact analyses
--exclude-low         Exclude low impact analyses
--exclude-medium      Exclude medium impact analyses
--exclude-high        Exclude high impact analyses
--fail-pedantic       Fail if any findings are detected
--fail-low            Fail if any low or greater impact findings are
detected
--fail-medium         Fail if any medium or greater impact findings are
detected
--fail-high           Fail if any high impact findings are detected
--fail-none, --no-fail-pedantic
Do not return the number of findings in the exit code
--show-ignored-findings
Show all the findings

Printers:
--print PRINTERS_TO_RUN
Comma-separated list of contract information printers,
available printers: cfg, ck, constructor-calls,
contract-summary, data-dependency, declaration,
dominator, echidna, function-id, function-summary,
halstead, loc, martin, modifiers, call-graph, evm,
human-summary, inheritance, inheritance-graph,
slithir, slithir-ssa, not-pausable, vars-and-auth,
require, variable-order
--list-printers       List available printers

Checklist (consider using https://github.com/crytic/slither-action):
--checklist           Generate a markdown page with the detector results
--checklist-limit CHECKLIST_LIMIT
Limit the number of results per detector in the
markdown file
--markdown-root MARKDOWN_ROOT
URL for markdown generation

Additional options:
--json JSON           Export the results as a JSON file ("--json -" to
export to stdout)
--sarif SARIF         Export the results as a SARIF JSON file ("--sarif -"
to export to stdout)
--sarif-input SARIF_INPUT
Sarif input (beta)
--sarif-triage SARIF_TRIAGE
Sarif triage (beta)
--json-types JSON_TYPES
Comma-separated list of result types to output to
JSON, defaults to detectors,printers. Available types:
compilations,console,detectors,printers,list-
detectors,list-printers
--zip ZIP             Export the results as a zipped JSON file
--zip-type ZIP_TYPE   Zip compression type. One of
lzma,stored,deflated,bzip2. Default lzma
--disable-color       Disable output colorization
--triage-mode         Run triage mode (save results in triage database)
--triage-database TRIAGE_DATABASE
File path to the triage database (default:
slither.db.json)
--config-file CONFIG_FILE
Provide a config file (default: slither.config.json)
--change-line-prefix CHANGE_LINE_PREFIX
Change the line prefix (default #) for the displayed
source codes (i.e. file.sol#1).
--solc-ast            Provide the contract as a json AST
--generate-patches    Generate patches (json output only)
--no-fail             Do not fail in case of parsing (echidna mode only)

Codex (https://beta.openai.com/docs/guides/code):
--codex               Enable codex (require an OpenAI API Key)
--codex-log           Log codex queries (in crytic_export/codex/)
--codex-contracts CODEX_CONTRACTS
Comma separated list of contracts to submit to OpenAI
Codex
--codex-model CODEX_MODEL
Name of the Codex model to use (affects pricing).
Defaults to 'text-davinci-003'
--codex-temperature CODEX_TEMPERATURE
Temperature to use with Codex. Lower number indicates
a more precise answer while higher numbers return more
creative answers. Defaults to 0
--codex-max-tokens CODEX_MAX_TOKENS
Maximum amount of tokens to use on the response. This
number plus the size of the prompt can be no larger
than the limit (4097 for text-davinci-003)
--codex-organization CODEX_ORGANIZATION
Codex organization