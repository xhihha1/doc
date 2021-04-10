# tf 1.0 對照 2.0  

https://docs.google.com/spreadsheets/d/1FLFJLzg7WNP6JHODX5q8BDgptKafq_slHpnHVbJIteQ/edit#gid=0

# hello world

tensorflow 1.0 `hello world`  

    import tensorflow as tf
    hello = tf.constant(‘Hello, TensorFlow!’)
    sess = tf.Session()
    print(sess.run(hello))

轉換 tensorflow 2.0 `hello world`  

    import tensorflow as tf
    tf.compat.v1.disable_eager_execution()
    hello = tf.constant('hello world!!')
    sess = tf.compat.v1.Session()
    print(sess.run(hello))


# keras 在tensorflow 2.0版本以上，直接import  

    import tensorflow.keras as keras