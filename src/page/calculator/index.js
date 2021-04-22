import React, { useState, useEffect, useMemo } from "react";
import { Input } from "antd";
import "./index.less";
const MAX_LENGTH = 13;
const POINT_MANLENGTH = 2;
const UNIT_MAP = {
  3: "百",
  4: "千",
  5: "万",
  6: "十万",
  7: "百万",
  8: "千万",
  9: "亿",
  10: "十亿",
  11: "百亿",
  12: "千亿",
  13: "万亿",
};

const Calculator = () => {
  const [number, setNumber] = useState("");

  const changeValue = (value) => {
    let str = number + value;
    if (value === "." && str.includes(".")) return;
    if (str.length > MAX_LENGTH) return;

    // if (str.includes(".") && str[0] !== ".") {
    //   let pointIndex = str.indexOf(".");
    //   let pointStr = str.substring(pointIndex, str.length - 1);
    //   console.log(pointStr, "pointStr");
    //   if (pointStr.length > POINT_MANLENGTH) return;
    // }
    // if (str.length > MAX_LENGTH) return;
    // setNumber(str);
  };

  const clearNumber = () => {
    setNumber("");
  };

  const deleteNum = () => {
    let str = number.substring(0, number.length - 1);
    setNumber(str);
  };

  const unit = useMemo(() => {
    if ("0.".includes(number[0]) || !number) return;
    let roundNumber = parseInt(number).toString();
    let unitStr = roundNumber.length > 2 ? UNIT_MAP[roundNumber.length] : "";
    return unitStr;
  }, [number]);

  const message = useMemo(() => {
    // if()
  }, [number]);

  return (
    <div className="calculator-wrap">
      <div className="show-wrap">
        <div className="title">提现金额</div>
        <div className="unit">{unit}</div>
        <div className="money">
          <span>￥</span>
          <Input value={number} />
          <span className="clear" onClick={clearNumber}>
            X
          </span>
        </div>
        <div className="message">提现金额巴拉啦</div>
      </div>
      <div className="key-board">
        <div className="arrow">隐藏</div>
        <div className="key-wrap">
          {["1", "2", "3"].map((item) => (
            <div className="item" key={item} onClick={() => changeValue(item)}>
              {item}
            </div>
          ))}
          <div className="item" onClick={deleteNum}>
            删除
          </div>
          {["4", "5", "6"].map((item) => (
            <div className="item" key={item} onClick={() => changeValue(item)}>
              {item}
            </div>
          ))}
          <div className="item cash">提现</div>
          <div className="item" onClick={() => changeValue("7")}>
            7
          </div>
          <div className="item" onClick={() => changeValue("8")}>
            8
          </div>
          <div className="item" onClick={() => changeValue("9")}>
            9
          </div>
          <div className="item zero" onClick={() => changeValue("0")}>
            0
          </div>
          <div className="item" onClick={() => changeValue(".")}>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
