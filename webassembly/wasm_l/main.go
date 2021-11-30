package main

// https://medium.zenika.com/go-1-11-webassembly-for-the-gophers-ae4bb8b1ee03

import (
	"fmt"
	"syscall/js"
)

func add(this js.Value, args []js.Value) interface{} {
	a, b := args[0].Int(), args[1].Int()
	return a + b
}

func main() {
	fmt.Println("Hello, World")
	//  获取全局的 alert 对象，通过 Invoke 方法调用
	alert := js.Global().Get("alert")
	alert.Invoke("Hello World!")

	js.Global().Set("add", js.FuncOf(add))
	select {}
}
