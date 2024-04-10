# package
pkg.go.dev
# parallel concurrent concurrency
https://golangforall.com/en/post/golang-data-handling-concurrent-programs.html
https://github.com/tmrts/go-patterns/tree/master/concurrency

# db
https://github.com/jackc/pgx
https://github.com/lib/pq
# microservice
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

# fsm
https://venilnoronha.io/a-simple-state-machine-framework-in-go
