import React, { useState, useEffect, useMemo } from "react";
import cx from "classnames";
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
  const [cashFlag, setCashFlag] = useState(true);
  const [freeCount, setFreeCount] = useState(3000);
  const [quotaCount, setQuotaCount] = useState(1000);

  const changeValue = (value) => {
    let str = number + value;
    if (str.length > MAX_LENGTH) return;
    if (str.includes(".")) {
      if (str[0] !== ".") {
        let pointIndex = str.indexOf(".");
        let pointStr = str.substring(pointIndex, str.length - 1);
        if (pointStr.length > POINT_MANLENGTH) return;
      }
    }
    setNumber(str);
  };
  const clearNumber = () => {
    setNumber("");
  };

  const deleteNum = () => {
    let str = number.substring(0, number.length - 1);
    setNumber(str);
  };

  const getMoney = () => {
    if (!cashFlag) return;
    let flag = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/.test(
      number
    );
    if (!flag) {
      alert("金额格式不正确");
      return;
    }
    alert(number);
    setFreeCount(freeCount - number);
    setQuotaCount(number > quotaCount ? 0 : quotaCount - number);
    setNumber("");
  };

  const unit = useMemo(() => {
    let unitStr = "";
    let flag = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/.test(
      number
    );
    if (flag) {
      let roundNumber = parseInt(number).toString();
      unitStr = roundNumber.length > 2 ? UNIT_MAP[roundNumber.length] : "";
    }
    return unitStr;
  }, [number]);

  const message = useMemo(() => {
    let messageStr = `免费额度还剩${quotaCount}元，超出部分收取0.1%手续费`;
    if (parseFloat(number) > quotaCount && parseFloat(number) < freeCount) {
      messageStr = `预计收取手续费￥${(number - quotaCount) * 0.001}元`;
    }
    if (parseFloat(number) > freeCount) {
      messageStr = "超出可用金额";
      setCashFlag(false);
    } else {
      setCashFlag(true);
    }
    return messageStr;
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
        <div
          className={cx("message", { wrong: parseFloat(number) > freeCount })}
        >
          {message}
        </div>
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
          <div className="item cash" onClick={getMoney}>
            提现
          </div>
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
