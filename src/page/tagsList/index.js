import React, { useState, useEffect } from "react"
import { Input, Tag } from "antd"
const MAX_LENGTH = 100

const TagsList = ({ value, onChange = () => {} }) => {
  const [list, setList] = useState([])
  useEffect(() => {
    if (!value) return
    if (list.length > MAX_LENGTH) return
    let res = []
    let str = value.replace(/，/g, ",")
    res = str.split(",").filter((item) => item)
    res =
      list.length + res.length > MAX_LENGTH
        ? res.slice(0, MAX_LENGTH - list.length)
        : res
    setList([...list, ...res])
    onChange()
  }, [value])
  return list.map((item, index) => <Tag key={index}>{item}</Tag>)
}

const Page = () => {
  const [tagStr, setTagStr] = useState("")
  return (
    <div>
      <h1>实现tagsList组件</h1>
      <ul>
        <li>组件接受value onChange</li>
        <li>可以根据英文中文逗号分隔</li>
        <li>tag长度不超过500</li>
      </ul>
      <p>Demo:</p>
      <Input
        style={{ width: 300 }}
        onPressEnter={(e) => {
          console.log(e.target.value)
          setTagStr(e.target.value)
        }}
      />
      <TagsList value={tagStr} onChange={() => {}} />
    </div>
  )
}
export default Page
