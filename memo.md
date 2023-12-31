- Reactでは原則`useState`を使用しないでステートの値を書き換えない
- 配列ステートを直接触らない
- 型エイリアスの名前は大文字 -> 値ではなく、型であることを明示するため

## なぜReactではイミュータブルな操作が必要なのか？？

- コンポーネントの変化をオブジェクトの同一性（差分）チェックで検知
<p>ミュータブルな操作をするとコピー元の情報も変更されるため変更前と変更後の差分を検知できない</p>

## 更新後のステートが更新前のステートの値に依存している場合には、useStateメソッドには値ではなく関数を渡す

```
const [state, setState] = useState(0);

// ❌ No! ステートから作った値を直接渡す
setState(state + 1);

// 🟢 OK! 「更新前」 のステートの値を元に新ステートを生成
setState((state) => state + 1);
```

## Enterキー打鍵でページのリロードを防ぐ

`e.preventDefault();`

```
<form
  onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}
>
```

## Array.map()

- 与えられた関数を配列の全ての要素に対して呼び出し、その結果からなる新しい配列を生成する

```
// 例:
const items = [0, 1, 2];
const newItems = items.map((item) => item * 2); // --> [0, 2, 4]

/** for 文で同義を書いた場合 */
const newItems = [];
for (let i = 0; i < items.length; i++) {
  newItems.push(items[i] * 2);
}
```

## リストをレンダーするときのkeyの重要性

- リストの各項目にkeyプロパティが必要になる
- 変更・追加・削除・並び替えを検知するためには、リストの各項目を特定する一意な識別子が必要
- 各項目を特定できないため、リストに変更が加えられても正しく再レンダーできない可能性がある

```
// ❌ No Good
list.map((item, index) => <li key={index}>{item}</li>)
```

- アイテムが挿入されたり削除されたり並びが替わると、レンダーするアイテムの順序も変わる
- インデックスをキーとして利用するとバグの原因になる

## シャロー（浅い）コピー

- Array.map()スプレッド構文によるコピーがシャローコピー
<p>シャローコピーでは、1段落目の要素のみがコピーされる
オブジェクト内で入れ子になった2段目以降のプロパティはコピー元配列のそれを変わらず参照する
これを変更するコピー元配列のプロパティも変更してしまう</p>
https://developer.mozilla.org/ja/docs/Glossary/Shallow_copy

## 入れ子になったプロパティを書き換える

<p>元の値をイミュータブルに保ちつつ、オブジェクト内で入れ子になったプロパティを書き換えるには、
そのオブジェクトの階層までたどって複製しなければならない</p>
```
return { ...todo, value };
/**
* 以下と同義:
* return { ...todo, value: value }
*/
```
