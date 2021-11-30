 
 
 [https://medium.zenika.com/go-1-11-webassembly-for-the-gophers-ae4bb8b1ee03](https://medium.zenika.com/go-1-11-webassembly-for-the-gophers-ae4bb8b1ee03)  
 new package **syscall/js** has made its entry in Go’s standard library

- js.Value.Get() and js.Value.Set() retrieve and set properties on an Object value
- js.Value.Index() and js.Value.SetIndex() retrieve and set values in an Array value
- js.Value.Call() calls a method on an Object value
- js.Value.Invoke() invokes a function value
- js.Value.New() invokes the new operator on a reference representing a JS type 
- Some more methods to retrieve a JavaScript value in its corresponding Go type such as js.Value.Int() or js.Value.Bool()
And finally some interesting functions:
- js.Undefined() gives the js.Value corresponding to JS’s undefined
- js.Null() gives the js.Value corresponding to JS’s null
- js.Global() gives the js.Value giving access to JS’s global scope
- js.ValueOf() which accepts any Go basic type and returns the corresponding js.Value

Instead of sending the message to os.StdOut, let’s display it in an alert dialog using JS’s window.alert().


    //  获取全局的 alert 对象，通过 Invoke 方法调用
    alert := js.Global().Get("alert")
    alert.Invoke("Hello World!")