import { style } from "https://js.sabae.cc/stdom.js";
import L from "https://code4sabae.github.io/leaflet-mjs/leaflet.mjs";
import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { QRCode } from "https://code4fukui.github.io/qr-code/qr-code.js";
import { fetchImage } from "https://js.sabae.cc/fetchImage.js";
import { InputCheckbox } from "https://code4fukui.github.io/input-checkbox/input-checkbox.js";

const ICON_SIZE = 50;

const getResized = (w, h, min) => {
  if (w > h) {
    return { width: min, height: (min * h) / w };
  } else {
    return { width: (min * w) / h, height: min };
  }
};

const sizecache = {};
const getResizedImage = async (imgurl, iconsize) => {
  const s = sizecache[imgurl];
  if (s) return s;
  const img = await fetchImage(imgurl);
  const size = getResized(img.width, img.height, iconsize);
  sizecache[imgurl] = size;
  return size;
};

const makeTable = (d) => {
  const cr = (tag) => document.createElement(tag);
  const tbl = cr("table");
  for (const name in d) {
    const val = d[name];
    const tr = cr("tr");
    tbl.appendChild(tr);
    const th = cr("th");
    th.textContent = name;
    th.style.whiteSpace = "nowrap";
    tr.appendChild(th);
    const td = cr("td");
    td.style.minWidth = "8em";
    td.style.wordBreak = "break-all";
    const n = val.match(/<a href=(.+)>(.+)<\/a>/);
    if (n) {
      const url = n[1];
      const cap = n[2];
      td.innerHTML = `<a href=${url}>${cap}</a>`;
    } else if (val.startsWith("https://") || val.startsWith("http://")) {
      td.innerHTML = `<a href=${val}>詳細</a>`;
    } else {
      td.textContent = val;
    }
    tr.appendChild(td);
  }
  return tbl;
};

export const showKidsSafe = (city, area, githublink) => {
  const comp = document.body;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://code4sabae.github.io/leaflet-mjs/leaflet-grayscale.css";
  //link.href = "https://code4sabae.github.io/leaflet-mjs/leaflet.css";
  comp.appendChild(link);
  link.onload = () => init(city, area, githublink);
};
const init = async (city, area, githublink) => {
  const comp = document.body;

  document.body.style.margin = "0";
  document.body.style.textAlign = "center";
  comp.style.backgroundColor = "#D74938";
  comp.style.color = "white";
  
  document.title = `${city} ${area} 地域安全マップ「キッズセーフ」`;

  const header = document.createElement("header");
  header.style.height = "56px";
  header.style.margin = "0";
  header.style.display = "grid";
  header.style.gridTemplate =`
    "left-button subtitle right-button" 16px
    "left-button title rigth-button" 24px
    / 56px 1fr 56px
  `;
  header.style.gap = "8px";
  header.style.placeContent = "center";
  comp.appendChild(header);

  const menuButton = document.createElement("div");
  menuButton.style.gridArea = "left-button";
  menuButton.style.display = "grid";
  menuButton.style.placeContent = "center";
  menuButton.style.cursor = "pointer";
  menuButton.onclick = () => {
    drawer.style.display = "block";
  };
  header.appendChild(menuButton);

  const menuIconImage = document.createElement("img");
  menuIconImage.setAttribute("src", "./images/icon_menu.svg");
  menuIconImage.style.height = "40px";
  menuIconImage.style.width = "40px";
  menuButton.appendChild(menuIconImage);

  const subtitle = document.createElement("span");
  subtitle.textContent = `${city} ${area} 地域安全マップ`;
  subtitle.style.fontSize = "16px";
  subtitle.style.lineHeight = "1";
  subtitle.style.gridArea = "subtitle";
  header.appendChild(subtitle);

  const title = document.createElement("span");
  title.textContent = "キッズセーフ";
  title.style.fontSize = "24px";
  title.style.lineHeight = "1";
  title.style.fontWeight = "bold";
  title.style.gridArea = "title";
  header.appendChild(title);

  const div = document.createElement("div");
  comp.appendChild(div);
  div.className = "divmap";
  style({
    ".divmap": {
      width: "100%",
      height: "calc(100vh - 56px)",
    },
    "@media print": {
      // 印刷用CSS
      ".divmap": {
        width: "100%",
        height: "calc(100vh - 2em - 300px)",
        "background-color": "red",
      },
    },
  });

  const drawer = document.createElement("div");
  drawer.style.display = "none"; // 最初は非表示にする/表示するときはblock
  drawer.style.height = "100%";
  drawer.style.width = "300px";
  drawer.style.position = "absolute";
  drawer.style.top = "0";
  drawer.style.left = "0";
  drawer.style.zIndex = "1000"; // leafletの上に表示できる最小のz-indexがこれ
  drawer.style.backgroundColor = "white";
  drawer.style.color = "black";
  drawer.style.overflow = "hidden";
  comp.appendChild(drawer);

  const closeMenuButton = document.createElement("div");
  closeMenuButton.style.height = "56px";
  closeMenuButton.style.width = "56px";
  closeMenuButton.style.padding = "8px";
  closeMenuButton.style.display = "grid";
  closeMenuButton.style.placeContent = "center";
  closeMenuButton.onclick = () => {
    drawer.style.display = "none";
  };
  drawer.appendChild(closeMenuButton)

  const closeMenuIconImage = document.createElement("img");
  closeMenuIconImage.setAttribute("src", "./images/icon_close.svg");
  closeMenuIconImage.style.height = "40px";
  closeMenuIconImage.style.width = "40px";
  closeMenuButton.appendChild(closeMenuIconImage);

  const drawerItems = document.createElement("div");
  drawerItems.style.height = "calc(100% - 56px)";
  drawerItems.style.width = "100%";
  drawerItems.style.padding = "0 8px 16px";
  drawerItems.style.overflowY = "scroll";
  drawerItems.style.display = "flex";
  drawerItems.style.flexDirection = "column";
  drawerItems.style.gap = "8px";
  drawerItems.style.alignItems = "flex-start";
  drawer.appendChild(drawerItems);

  //
  const map = L.map(div);
  // set 国土地理院地図 https://maps.gsi.go.jp/development/ichiran.html
  L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
    attribution:
      '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>"',
    maxZoom: 21,
    maxNativeZoom: 18,
  }).addTo(map);

  const lls = [];
  const showIcons = async (list, icon0, addlayer = true) => {
    const iconlayer = L.layerGroup();
    if (addlayer) {
      iconlayer.addTo(map);
    }
    for (const d of list) {
      const getPos = () => {
        const pos = Geo3x3.decode(d.Geo3x3 || d.geo3x3);
        if (pos) {
          return [pos.lat, pos.lng];
        }
        return [d.lat, d.lng];
      };
      const ll = getPos();
      if (!ll[0]) return;

      const makeIcon = async () => {
        const opt = {};
        try {
          const icon = "./icon/" + (d.icon || icon0);
          const size = await getResizedImage(icon, ICON_SIZE);
          const iconw = size.width;
          const iconh = size.height;
          opt.icon = L.icon({
            iconUrl: icon,
            iconRetilaUrl: icon,
            iconSize: [iconw, iconh],
            iconAnchor: [iconw / 2, iconh / 2],
            popupAnchor: [0, -iconh / 2],
          });
        } catch (e) {
          console.log("can't load: " + e);
        }
        return opt;
      };
      const opt = await makeIcon();
      const marker = L.marker(ll, opt);
      const tbl = makeTable(d);
      tbl.className = "mapinfo";
      marker.bindPopup(tbl.outerHTML); // `<img width="300px" src=${path}>`);
      iconlayer.addLayer(marker);
      lls.push(ll);
    }
    return iconlayer;
  };
  const showPoints = async (list, color) => {
    const iconlayer = L.layerGroup();
    iconlayer.addTo(map);
    for (const d of list) {
      //const pos = Geo3x3.decode(d.Geo3x3 || d.geo3x3);
      //const ll = [pos.lat, pos.lng];
      const ll = [d.lat, d.lng];
      const marker = L.circle(ll, {
        radius: 2,
        color,
        fillColor: color,
        fillOpacity: 1,
      });
      const tbl = makeTable(d);
      tbl.className = "mapinfo";
      marker.bindPopup(tbl.outerHTML); // `<img width="300px" src=${path}>`);
      iconlayer.addLayer(marker);
      lls.push(ll);
    }
    return iconlayer;
  };
  style({
    ".mapinfo": {
      color: "black",
    },
    ".mapinfo td": {
      "text-align": "left",
      "white-space": "pre-wrap",
    },
  });

  //
  const layers = [];

  // 危険箇所
  const url = "./index.csv";
  const data = CSV.toJSON(await CSV.fetch(url));
  for (const d of data) {
    const list = [];
    const d2 = CSV.toJSON(await CSV.fetch(d.fn));
    d2.forEach((n) => {
      //n["町名"] = d.name;
      list.push(n);
    });
    console.log(list);
    layers.push([d.name, await showIcons(list, d.icon)]);
  }

  if (lls.length) {
    map.fitBounds(lls);
  }

  // for (const point of accidents){
  //     const marker = L.icon([parseFloat(point.緯度), parseFloat(point.経度)],
  //     { icon: L.spriteIcon(point.color) });
  // }
  //     marker.addTo(map);

  // レイヤー選択
  {
    for (const layer of layers) {
      const chk = new InputCheckbox(layer[0]);
      drawerItems.appendChild(chk);
      chk.checked = true;
      if (!chk.checked) {
        map.removeLayer(layer[1]);
      }
      chk.onchange = () => {
        if (chk.checked) {
          map.addLayer(layer[1]);
        } else {
          map.removeLayer(layer[1]);
        }
      };
    }
  }

  // 現在地を監視してピン/マップを動かす
  const watchGPS = new InputCheckbox("現在地追従モード")
  let watchPosition;
  watchGPS.checked = false;
  let currentPositionMarker = null;
  watchGPS.onchange = () => {
    if (watchGPS.checked) {
      // 現在地を取得してピンを打つ
      navigator.geolocation.getCurrentPosition((position) => {
        if (currentPositionMarker) {
          currentPositionMarker.removeFrom(map);
        }
        const currentLoc = [position.coords.latitude, position.coords.longitude];
        currentPositionMarker = L.marker(currentLoc, { title: "現在地" }).addTo(map).bindPopup("現在地");
      });
      watchPosition = navigator.geolocation.watchPosition((position) => {
        const currentLoc = [position.coords.latitude, position.coords.longitude];
        currentPositionMarker.setLatLng(currentLoc);
        //map.setView(currentLoc, 16);
        map.setView(currentLoc);
      });
    } else {
      navigator.geolocation.clearWatch(watchPosition);
      if (currentPositionMarker) {
        currentPositionMarker.removeFrom(map);
      }
    }
  };
  drawerItems.appendChild(watchGPS);

  // footer
  const links = [
    { text: "データ編集や閲覧はGitHubで", url: githublink },
    { text: "アイコン CC BY okiku.graphic", url: "https://www.instagram.com/okame.graphic/" },
    { text: "アイコン by いらすとや", url: "https://www.irasutoya.com/" },
    //{ text: "下記データは、オープンデータライセンスでご利用いただけます", url: "https://github.com/code4fukui/opendata-license/" },
    //{} text: "テレマティクスオープンデータ by あいおいニッセイ同和損保", url: "https://www.aioinissaydowa.co.jp/" },
    //{ text: "地域安全オープンデータ by 越前市岡本地区", url: "https://www.city.echizen.lg.jp/office/010/130030/kunitaka.html" },
    //{ text: "街灯オープンデータ by 越前市", url: "http://www.city.echizen.lg.jp/index.html" },
  ];
  for (const link of links) {
    const a = document.createElement("a");
    a.style.display = "block";
    a.style.textAlign = "left";
    a.textContent = link.text;
    a.href = link.url;
    drawerItems.appendChild(a);
  }

  const qr = new QRCode();
  qr.style.width = "100%";
  qr.style.display = "grid";
  qr.style.placeContent = "center";
  drawerItems.appendChild(qr);
};
