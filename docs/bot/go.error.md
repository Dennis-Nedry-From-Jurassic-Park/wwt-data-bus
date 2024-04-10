```go
package main

import (
	"fmt"
	"os"
)

// Check is a generic function that takes a result and an error, and applies error handlers if an error occurs.
func Check[Result any](handlers ...func(error) error) func(res Result, err error) Result {
	return func(res Result, err error) Result {
		if err != nil {
			for _, handler := range handlers {
				err = handler(err)
				if err == nil {
					var zero Result
					return zero
				}
			}
			panic(err)
		}
		return res
	}
}

// Decorate is an error handler that decorates the error with additional information.
func Decorate(format string) func(err error) error {
	return func(err error) error {
		if err != nil {
			return fmt.Errorf(format, err)
		}
		return err
	}
}

// Print is an error handler that prints the error to standard error.
func Print() func(err error) error {
	return func(err error) error {
		if err != nil {
			fmt.Fprintf(os.Stderr, "%s\n", err)
		}
		return err
	}
}

func main() {
	// Example usage of Check with Decorate and Print as error handlers.
	result := Check[int](Decorate("main: error: %w"), Print())(div(12, 3))
	fmt.Println(result)
}

// div is a simple function that returns a result and an error.
func div(a, b int) (int, error) {
	if b == 0 {
		return 0, fmt.Errorf("division by zero: %d / %d", a, b)
	}
	return a / b, nil
}

```