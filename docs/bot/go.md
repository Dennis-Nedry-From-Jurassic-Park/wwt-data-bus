# arkit
https://github.com/Helcaraxan/gomod
# package
pkg.go.dev
go get github.com/pkg/errors
_ 
# parallel concurrent concurrency
https://golangforall.com/en/post/golang-data-handling-concurrent-programs.html
https://github.com/tmrts/go-patterns/tree/master/concurrency

# errors
https://blog.logrocket.com/error-handling-golang-best-practices/
defer/panic/recoverthrow/catch/finally
golang.org/x/xerrors
fail/fail
использование монады Either или Result, 
которая инкапсулирует значение или ошибку, что позволяет более упростить обработку ошибок
https://github.com/facebookarchive/stackerr
https://pkg.go.dev/github.com/facebookgo/stackerr
https://github.com/pingcap/failpoint/tree/master

# net
https://github.com/chipmk/docker-mac-net-connect
https://github.com/deviceplane/deviceplane

# Debug Pprof
go tool pprof http://localhost:8080/debug/pprof/heap
https://www.codereliant.io/memory-leaks-with-pprof/
# log
https://github.com/coder/slog
# db
https://github.com/jackc/pgx
https://github.com/lib/pq
# microservice
https://gokit.io/
https://goenning.net/blog/session-per-request-pattern-go/
https://github.com/h2o/h2o
https://github.com/valyala/fasthttp
https://github.com/valyala/fasthttp/blob/master/prefork/prefork.go
https://github.com/gofiber/fiber
fiber-prefork
префорк по сути создает несколько процессов, между которыми не шарится память 
(чтобы убрать накладные расходы го на шаринг памяти). 
Поэтому не работают никакие глобальные переменные 
(они не могут быть доступны сразу из всех процессов). 
Если у вас есть какой-то кэш в памяти (не Редис, а кэш в памяти самого приложения), 
вам в случае префорка придется создавать по экземпляру кэша на каждый форк
https://github.com/mahmoudahmedd/go-microservices-patterns
# vertx java
https://habr.com/ru/users/darkit/comments/
https://habr.com/ru/companies/rshb/articles/520240/
https://vertx.io/docs/vertx-pg-client/java/
https://vertx.io/get-started/
https://start.vertx.io/
.putHeader(HttpHeaders.CONTENT_TYPE, "text/plain; charset=utf-8")
https://www.techempower.com/benchmarks/#section=data-r15&hw=ph&test=composite&l=cmh5z1
https://habr.com/ru/articles/735666/
https://github.com/pengrad/java-telegram-bot-api
# router
https://github.com/julienschmidt/httprouter
https://pkg.go.dev/github.com/julienschmidt/httprouter
# patterns
https://github.com/design-patterns-for-humans/Russian
https://github.com/shyhirt/go-patterns
https://github.com/topics/golang-patterns
https://github.com/AlexanderGrom/go-patterns/tree/master
https://github.com/tmrts/go-patterns
https://github.com/tmrts/go-patterns/blob/master/creational/object-pool.md
https://github.com/MaksimDzhangirov/go-patterns
https://github.com/tigerbluejay/GOF-Design-Patterns-Generic-Real-World-Examples-by-AI
https://github.com/AlexanderGrom/go-patterns/blob/master/Unsorted/Specification/specification_test.go
https://goenning.net/blog/session-per-request-pattern-go/
https://gist.github.com/AlexanderGrom/586c9aa1f0af7b325ecfcfdc1da360ff

# patterns restore ~ pgboss bullmq
https://pkg.go.dev/github.com/aws/amazon-ecs-agent/agent/statemanager
# fsm
https://venilnoronha.io/a-simple-state-machine-framework-in-go
