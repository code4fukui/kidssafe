# KidsSafe

KidsSafeは、地域の安全マップを作成・共有するためのシンプルなツールです。複雑なデータベースやサーバーの構築は不要で、CSVファイルを編集するだけで簡単に更新できるように設計されています。

マップはモバイルフレンドリーで、Leafletを使用して構築されており、GitHub Pagesを使って無料で公開（デプロイ）できます。

![カスタムアイコンが配置されたマップ、エリア名を示すヘッダー、メニューボタンを表示しているKidsSafeのユーザーインターフェース。](https://user-images.githubusercontent.com/155338/235282459-71701331-5079-408c-80a5-f938032738d2.png)

## デモ

- [越前市国高地区](https://code4fukui.github.io/kunitaka)
- [福井市棗地区](https://code4fukui.github.io/kidssafe-natsume)
- [越前市岡本地区](https://code4fukui.github.io/kidssafe-okamoto)

## 機能

- **インタラクティブなマップ:** モバイルフレンドリーなマップ上に、カスタムアイコンで安全に関する場所を表示します。
- **CSVベースのデータ管理:** Excel、Numbers、テキストエディタなどで編集できるシンプルなCSVファイルで、すべてのマップデータを管理します。
- **レイヤー機能:** 目的の場所（POI）を「AED」「110番の家」など、個別のレイヤーに分けて整理できます。
- **簡単な公開（デプロイ）:** GitHub Pagesを使用して、マップを無料で公開できます。
- **手軽な共有:** メニュー内にQRコードが自動生成されるため、簡単に共有できます。

## 動作原理

マップは2層構造のCSVファイルから構築されます。

1.  **`index.csv`:** メインの設定ファイルです。マップに表示する*レイヤー*を定義し、各レイヤー名をデータファイルおよびアイコンと紐付けます。
2.  **データファイル（例: `house110.csv`、`aed.csv`）:** 各レイヤーの実際の位置データを含むファイルです。座標（`lat`/`lng` または `Geo3x3`）やその他の詳細情報が記載されます。

## 使い方

1.  **リポジトリの作成:** [kidssafe-template](https://github.com/code4fukui/kidssafe-template/) から新しいリポジトリを作成します。リポジトリ名は `kidssafe-` の後にエリア名を付けたものにします。
2.  **設定のカスタマイズ:**
    - `index.html` 内の `city`、`area`、`githublink` の値を更新します。
3.  **レイヤーとデータの定義:**
    - `index.csv` を編集してマップのレイヤーを定義します。
    - 対応するデータCSVファイル（例: `aed.csv`）を作成または更新し、位置データを入力します。
4.  **デプロイ:**
    - 新しいリポジトリで `Settings` > `Pages` に移動します。
    - `Build and deployment` のソースとして `GitHub Actions` を選択します。これにより、マップが自動的に公開されます。

データの更新に関する詳細は、[kidssafe-template](https://github.com/code4fukui/kidssafe-template/) のドキュメントを参照してください。

## データ形式

### `index.csv` （レイヤー設定）

このファイルでは、マップ上で利用可能なレイヤーを定義します。

| name | fn | icon |
| :--- | :--- | :--- |
| レイヤー表示名 | データファイル名 | アイコンファイル名 |

**例:**
```csv
name,fn,icon
110番の家,house110.csv,house110_icon.png
AED,aed.csv,aed.png
交通事故発生箇所,accident.csv,aioi_8.png
```

### 位置データCSV（例: `house110.csv`）

これらのファイルには、特定のレイヤーのポイントデータが含まれます。各行がマップ上の1つのポイントを表します。座標列（`lat` と `lng`、または `Geo3x3`）を必ず含める必要があります。それ以外のすべての列は、ポップアップの情報ボックスに表示されます。

**例:**
```csv
name,address,lat,lng
"こども110番の家（田中商店）","福井県鯖江市新横江1-1-1",35.943,136.188
"こども110番の家（鈴木理容所）","福井県鯖江市桜町2-2-2",35.945,136.189
```

## 開発

ローカル開発サーバーを実行するには、[Deno](https://deno.land/) が必要です。

```sh
# プロジェクトディレクトリをローカルで配信
deno run -A --watch --allow-net --allow-read https://deno.land/std/http/file_server.ts
```

## 謝辞

- マップタイル: [国土地理院](https://maps.gsi.go.jp/development/ichiran.html)

## ライセンス

[MIT](LICENSE)
