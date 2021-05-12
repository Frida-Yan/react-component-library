// import React, { useEffect } from "react";
// import { Scene, PointLayer, LineLayer, PolygonLayer } from "@antv/l7";
// import { GaodeMap } from "@antv/l7-maps";

// var scene = null;

// const Map = () => {
//   const fetchData = async () => {
//     let list = [
//       fetch("../../../dashArea.json", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }).then((res) => res.json()),
//       fetch("../../../bigArea.json", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }).then((res) => res.json()),
//       fetch("../../../smallArea.json", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }).then((res) => res.json()),
//       fetch("../../../point.json", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }).then((res) => res.json()),
//       fetch("../../../text.json", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }).then((res) => res.json()),
//     ];

//     const response = await Promise.all(list);

//     console.log(response[0]);
//     let r = response[0];
//     let i = response[1];
//     let a = response[2];
//     let o = response[3];
//     let s = response[4];

//     const lineLayer1 = new LineLayer({ zIndex: 1 })
//       .source(r)
//       .size(1)
//       .color("#4b60af")
//       .style({ lineType: "dash", dashArray: [2, 2], opacity: 3 });
//     const polygonLayer1 = new PolygonLayer({ zIndex: 1 })
//       .source(i)
//       .shape("fill")
//       .size(1)
//       .color("bg", function (e) {
//         return e;
//       })
//       .active(true)
//       .style({ opacity: 0.5 });
//     const lineLayer2 = new LineLayer({ zIndex: 1 })
//       .source(i)
//       .size(1)
//       .color("#3f6693")
//       .style({ lineType: "dash", dashArray: [2, 2], opacity: 3 });
//     const polygonLayer2 = new PolygonLayer({ zIndex: 5 })
//       .source(a)
//       .shape("fill")
//       .size(1)
//       .color("color", function (e) {
//         return e || "#2f84b3";
//       })
//       .active({ color: "#46e4ff" })
//       .style({ opacity: 1 });
//     const pointLayer1 = new PointLayer({ zIndex: 10 })
//       .source(o)
//       .shape("type", function (e) {
//         return "project" === e ? "zaijian" : "electric";
//       })
//       .size(10);
//     const pointLayer2 = new PointLayer({ zIndex: 666 })
//       .source(s, {})
//       .shape("text", "text")
//       .size("text", function (e) {
//         return "规划建设区域" === e ? 14 : 18;
//       })
//       .color("text", function (e) {
//         return "规划建设区域" === e ? "#fff" : "rgba(120,141,221,0.58)";
//       })
//       .style({
//         textAnchor: "center",
//         textOffset: [0, 0],
//         spacing: 2,
//         padding: [1, 1],
//       });
//     // polygonLayer2.on("mousemove", function (t) {
//     //   var n = JSON.parse(JSON.stringify(t));
//     //   for (var r in e.smallBlockData[n.feature.properties.id])
//     //     n[r] = e.smallBlockData[n.feature.properties.id][r];
//     //   e.focusBlock = n;
//     //   var i = document.getElementById("mapDialog");
//     //   i.style.display = "block";
//     // });
//     scene.addLayer(lineLayer1);

//     // scene.addLayer(polygonLayer1);

//     // scene.addLayer(lineLayer2);

//     // scene.addLayer(polygonLayer2);

//     // scene.addLayer(pointLayer1);

//     // scene.addLayer(pointLayer2);
//   };

//   useEffect(() => {
//     scene = new Scene({
//       id: "map",
//       map: new GaodeMap({
//         center: [120.552776, 31.254006],
//         pitch: 0,
//         zoom: 15,
//         style: "amap://styles/60248a57a90f1d96733c4e7fb9c48cad",
//         token: "02862bc73542ba21ccbd1b0848e451ce",
//       }),
//     });

//     scene.on("loaded", () => {
//       fetchData();

//       //   const pointLayer = new PointLayer({})
//       //     .source([{ lat: 120.550586, lng: 31.259906 }], {
//       //       parser: {
//       //         type: "json",
//       //         y: "lat",
//       //         x: "lng",
//       //       },
//       //     })
//       //     .size(0.5)
//       //     .color("#000000")
//       //     .style({
//       //       opacity: 1,
//       //     });
//       //   scene.addLayer(pointLayer);
//     });
//   }, []);

//   return <div id="map">ddd</div>;
// };
// export default Map;
import {
  AMapScene,
  LayerEvent,
  LineLayer,
  PolygonLayer,
  PointLayer,
  Popup,
  LoadImage,
} from "@antv/l7-react";
import React, { memo, useEffect, useState, useMemo } from "react";
import "./index.less";

const World = memo(function Map() {
  const [popupInfo, setPopInfo] = useState();
  const [response, setResponse] = useState([]);
  const [labelData, setLabelData] = useState([
    {
      id: 31,
      desc: "可用地块3-1",
      type: "可用地块",
      val: "72.3",
      name: "",
    },
    {
      id: 1,
      desc: "现状地块0-1",
      type: "现状地块",
      val: "80.9",
      name: "粮油市场",
    },
    {
      id: 32,
      desc: "可用地块3-2",
      type: "可用地块",
      val: "11.3",
      name: "净地",
    },
    {
      id: 33,
      desc: "可用地块3-3",
      type: "可用地块",
      val: "57",
      name: "净地",
    },
    {
      id: 34,
      desc: "可用地块3-4",
      type: "可用地块",
      val: "50.5",
      name: "净地",
    },
    {
      id: 35,
      desc: "可用地块3-5",
      type: "可用地块",
      val: "55.6",
      name: "净地",
    },
    {
      id: 36,
      desc: "可用地块3-6",
      type: "可用地块",
      val: "15.4",
      name: "厂房未回购",
    },
    {
      id: 37,
      desc: "可用地块3-7",
      type: "可用地块",
      val: "15.5",
      name: "厂房未回购",
    },
    {
      id: 38,
      desc: "可用地块3-8",
      type: "可用地块",
      val: "53.7",
      name: "净地",
    },
    {
      id: 39,
      desc: "可用地块3-9",
      type: "可用地块",
      val: "41",
      name: "驾校未搬",
    },
    {
      id: 310,
      desc: "可用地块3-10",
      type: "可用地块",
      val: "10.9",
      name: "净地",
    },
    {
      id: 311,
      desc: "可用地块3-11",
      type: "可用地块",
      val: "53.6",
      name: "长三角市场",
    },
    {
      id: 312,
      desc: "可用地块3-12",
      type: "可用地块",
      val: "80.3",
      name: "净地",
    },
    {
      id: 313,
      desc: "可用地块3-13",
      type: "可用地块",
      val: "91.8",
      name: "综合执法局未拆",
    },
    {
      id: 314,
      desc: "可用地块3-14",
      type: "可用地块",
      val: "41.3",
      name: "净地",
    },
    {
      id: 315,
      desc: "可用地块3-15",
      type: "可用地块",
      val: "25.3",
      name: "净地",
    },
  ]);

  const hoverHandle = (e) => {
    console.log(e);
    setPopInfo(e);
  };
  const hoverOutHandle = () => {
    setPopInfo(undefined);
  };
  const fetchData = async () => {
    let list = [
      fetch("../../../dashArea.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json()),
      fetch("../../../bigArea.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json()),
      fetch("../../../smallArea.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json()),
      fetch("../../../point.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json()),
      fetch("../../../text.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json()),
    ];
    const response = await Promise.all(list);

    setResponse(response);
  };

  const t = useMemo(() => {
    let t = {};
    labelData.forEach((e) => {
      t[e.id] = e;
    });
    return t;
  }, []);
  console.log(t, 998);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AMapScene
      map={{
        center: [120.552776, 31.254006],
        pitch: 0,
        zoom: 15,
        style: "amap://styles/60248a57a90f1d96733c4e7fb9c48cad",
        token: "02862bc73542ba21ccbd1b0848e451ce",
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {response.length && [
        // 大致区域
        <PolygonLayer
          key={"2"}
          source={{
            data: response[1],
          }}
          color={{
            field: "bg",
            values: (e) => e,
          }}
          shape={{
            values: "fill",
          }}
          style={{
            opacity: 0.5,
            zIndex: 1,
          }}
          active={{
            option: true,
          }}
        ></PolygonLayer>,
        // 虚线
        <LineLayer
          key={"21"}
          source={{
            data: response[0],
          }}
          color={{
            values: "#2E8AE6",
          }}
          shape={{
            values: "line",
          }}
          style={{
            opacity: 1,
            lineType: "dash",
            dashArray: [2, 2],
            zIndex: 1,
          }}
        />,
        <LineLayer
          key={"22"}
          source={{
            data: response[1],
          }}
          color={{
            values: "#3f6693",
          }}
          shape={{
            values: "line",
          }}
          style={{
            opacity: 1,
            lineType: "dash",
            dashArray: [2, 2],
            zIndex: 1,
          }}
        />,

        // 标识地区
        <PolygonLayer
          key={"23"}
          source={{
            data: response[2],
          }}
          color={{
            field: "color",
            values: (e) => {
              return e || "#2f84b3";
            },
          }}
          shape={{
            values: "fill",
          }}
          style={{
            zIndex: 5,
          }}
          active={{
            option: {
              color: "#46e4ff",
            },
          }}
        >
          <LayerEvent type="mousemove" handler={hoverHandle} />
          <LayerEvent type="mouseout" handler={hoverOutHandle} />
        </PolygonLayer>,

        // 标注图片
        <LoadImage key={"25"} name="00" url="../../../dian.png" />,
        <LoadImage key={"26"} name="01" url="../../../zaijian.png" />,
        <PointLayer
          key={"24"}
          source={{
            data: response[3],
          }}
          style={{
            zIndex: 10,
          }}
          shape={{
            field: "type",
            values: (e) => {
              console.log(e, "ee");
              return "project" === e ? "01" : "00";
            },
          }}
          size={{
            values: 10,
          }}
        ></PointLayer>,
        // 区块文字
        <PointLayer
          key={"27"}
          source={{
            data: response[4],
          }}
          style={{
            zIndex: 666,
            textAnchor: "center",
            textOffset: [0, 0],
            spacing: 2,
            padding: [1, 1],
          }}
          shape={{
            field: "text",
            values: "text",
          }}
          color={{
            field: "text",
            values: (e) => {
              return "规划建设区域" === e ? "#fff" : "rgba(120,141,221,0.58)";
            },
          }}
          size={{
            field: "text",
            values: (e) => {
              console.log(e, 99);
              return "规划建设区域" === e ? 14 : 18;
            },
          }}
        ></PointLayer>,
      ]}
      {popupInfo && (
        <Popup
          key="popup"
          lnglat={popupInfo.lngLat}
          option={{
            closeButton: false,
            offsets: [0, 10],
            className: "map-pop-modal",
          }}
        >
          <div className="map-title">现状地块</div>
        </Popup>
      )}
    </AMapScene>
  );
});
export default World;
