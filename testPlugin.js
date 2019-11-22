class TestPlugin {
  constructor(options) {
    console.log(options);
  }

  // compiler を引数として受け取る apply メソッド
  apply(compiler) {
    // plugin メソッドにイベント名とハンドラー関数を渡す
    compiler.plugin('compile', (params) => {
      console.log(`
************************************************

    compileイベント => コンパイル開始時の処理

************************************************
      `);
    });

    compiler.plugin('compilation', (compilation, params) => {
      // compilation もまた plugin メソッドを持つので、各イベントに処理を追加できる
      compilation.plugin('optimize', () => {
        console.log(`
************************************************

    optimizeイベント => 最適化開始時の処理

************************************************
        `);
      });
    });

    // 非同期に実行されるイベントは callback を引数で受取り、適宜実行する
    compiler.plugin('emit', (compilation, callback) => {
      console.log(`
************************************************

    emitイベント => アセット出力開始時の処理

************************************************
      `);
      callback();
    });
  }
}

export default TestPlugin;
