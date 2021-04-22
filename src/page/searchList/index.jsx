import React, { useState } from "react";
import { Input } from "antd";
const list = [
  { title: "Tom" },
  { title: "Jerry" },
  { title: "Frida" },
  { title: "Mick" },
  { title: "Nicy" },
  { title: "Joy" },
  { title: "Gray" },
  { title: "Alex" },
  { title: "Lex" },
  { title: "Luke" },
];
var t = null;
const SearchList = ({ names }) => {
  const [defaultList] = useState(list);
  const [curList, setCurList] = useState(names);
  // 搜索  做了防抖，每300毫秒查询一次
  const searchTitle = (e) => {
    clearTimeout(t);
    t = setTimeout(() => {
      const arr = defaultList.filter((item) =>
        item.title.includes(e.target.value)
      );
      console.log(arr);
      setCurList([...arr]);
    }, 300);
  };

  return (
    <div>
      <Input placeholder="search" onChange={searchTitle} />
      <ul>
        {curList.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default SearchList;
