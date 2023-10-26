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

## 利用方法

1. リポジトリ [kidssafe-template](https://github.com/code4fukui/kidssafe-template/) で、「Use this template」「Create a new repository」し、「kidssafe-」に続けて地区名などを英数名で設定する （例、kidssafe-okamoto)
2. [README.md](README.md)、[アプリ設定](index.html)、[データ](index.csv)を地区に合わせて変更する
3. GitHub Pages(SettingsのPages)を設定し公開する
4. データの更新方法などは、[kidssafe-template](https://github.com/code4fukui/kidssafe-template/) をご参照ください

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
