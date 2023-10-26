# キッズセーフ / KidsSafe

- 地域安全マップを作成して、スマホやパソコンで見られる形で共有するツールです
- ExcelやNumbersを使ってCSVデータを編集しアップロードすることで更新できます

## 活用例

- [越前市国高地区](https://code4fukui.github.io/kunitaka)
- [福井市棗地区](https://code4fukui.github.io/kidssafe-natsume)
- [越前市岡本地区](https://code4fukui.github.io/kidssafe-okamoto)

## ソースコード

- [index.html](index.html) - アプリ設定（都市名、地域名、ソースコード）を設定する
- [index.csv](index.csv) - 地図に表示するCSVデータを設定する
- [kidssafe.js](kidsafe.js) - JavaScriptによるソースコード

## 横展開の仕方

1. リポジトリ [kidssafe-template](https://github.com/code4fukui/kidssafe-template/) で、「Use this template」「Create a new repository」する
2. [アプリ設定](index.html)や[データ](index.csv)を地区に合わせて変更する
3. GitHub Pages(SettingsのPages)を設定し公開する

## 危険箇所編集方法

下記アプリ「緯度経度地図」から該当場所に動かして、Geo3x3をコピーする
- https://fukuno.jig.jp/app/map/latlng/#%E8%B6%8A%E5%89%8D%E5%B8%82

<img width="511" alt="image" src="https://user-images.githubusercontent.com/1715217/219602296-2d3b72ce-581a-4ba8-8c69-edbe1b95ee76.png">

## 開発貢献の仕方

### cloneする

1. [GitHub Desktop](https://desktop.github.com/)をインストール
2. 緑色のボタン「Code」を押し「Open with GitHub Desktop」を選ぶ
3. [Deno](https://deno.land/)をインストール
4. kidssafeのディレクトリ内で下記を実行する
```sh
deno run --allow-net --allow-read https://taisukef.github.io/liveserver/liveserver.js
```
5. 表示されたリンクをブラウザ開く (例、 [http://[::]:7001/](http://[::]:7001/))
6. [index.html](index.html) などを、編集する （自動的に変更がブラウザに反映される）
7. GitHub Desktopで、ブランチを作り、プルリクする
