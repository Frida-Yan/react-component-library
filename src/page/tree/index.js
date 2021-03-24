import React, { useState, useEffect } from "react";
import { Tree, Button, Modal, Input } from "antd";

const initTreeData = [
  {
    title: "0-0",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        value: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", value: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", value: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", value: "0-0-0-2", key: "0-0-0-2" },
        ],
      },
      {
        title: "0-0-1",
        value: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", value: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", value: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", value: "0-0-1-2", key: "0-0-1-2" },
        ],
      },
      {
        title: "0-0-2",
        value: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    value: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", value: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", value: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", value: "0-1-0-2", key: "0-1-0-2" },
    ],
  },
  {
    title: "0-2",
    value: "0-2",
    key: "0-2",
  },
];

const ChangeModal = ({
  visible,
  currentValue,
  closeModal,
  changeTreeValue,
  addFlag,
}) => {
  const { value = "", key } = currentValue;
  const [modalVisible, setModalVisible] = useState(visible);
  const [modalValue, setModalValue] = useState("");
  const changeModalValue = (e) => {
    setModalValue(e.target.value);
  };
  const modalOk = () => {
    closeModal();
    setModalValue("");
    changeTreeValue(modalValue, key);
  };
  useEffect(() => {
    if (!addFlag) setModalValue(value);
  }, [value]);
  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);
  useEffect(() => {
    setModalValue("");
  }, []);
  return (
    <Modal
      visible={modalVisible}
      onCancel={() => {
        setModalValue("");
        closeModal();
      }}
      maskClosable={false}
      onOk={modalOk}
    >
      <Input value={modalValue} onChange={changeModalValue} />
    </Modal>
  );
};

const TreeDom = () => {
  const [treeData, setTreeData] = useState(initTreeData);
  const [visible, setVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState({});
  const [addFlag, setAddFlag] = useState(false);
  const [samePath, setSamePath] = useState(false);

  const renderTreeDom = (node) => {
    node.map((item) => {
      item.title = (
        <div>
          {item.value}
          <Button
            onClick={() => {
              setVisible(true);
              setAddFlag(false);
              setCurrentValue(item);
            }}
          >
            修改
          </Button>
          <Button
            onClick={() => {
              setVisible(true);
              setAddFlag(true);
              setCurrentValue(item);
              setSamePath(false);
            }}
          >
            添加子节点
          </Button>
          <Button
            onClick={() => {
              setVisible(true);
              setAddFlag(true);
              setCurrentValue(item);
              setSamePath(true);
            }}
          >
            添加同级节点
          </Button>
          <Button
            onClick={() => {
              deleteTreeDom(item.key, treeData);
              renderTreeDom(treeData);
              setTreeData([...treeData]);
            }}
          >
            删除
          </Button>
        </div>
      );
      if (item.children) {
        return renderTreeDom(item.children);
      }
      return item;
    });
  };

  const deleteTreeDom = (key, node) => {
    node.map((item, index) => {
      if (item.key === key) {
        node.splice(index, 1);
      } else if (item.children) {
        return deleteTreeDom(key, item.children);
      }
    });
  };

  const editTreeData = (node, value, key) => {
    node.map((item) => {
      if (item.key === key) {
        item.value = value;
        item.title = value;
        return item;
      } else if (item.children) {
        return editTreeData(item.children, value, key);
      }
    });
  };

  // 添加子节点 | 添加同级节点
  const addTreeNode = (node, value, key) => {
    let timeStamp = new Date().getTime();
    node.map((item, index) => {
      let newItem = { value, title: value, key: timeStamp };
      if (item.key === key) {
        if (!samePath) {
          if (item.children) {
            item.children.push(newItem);
          } else {
            item.children = [newItem];
          }
        } else {
          node.splice(index + 1, 0, newItem);
        }
      } else if (item.children) {
        return addTreeNode(item.children, value, key);
      }
    });
  };

  const changeTreeValue = (value, key) => {
    if (!addFlag) {
      editTreeData(treeData, value, key);
    } else {
      addTreeNode(treeData, value, key);
    }
    renderTreeDom(treeData);
    setTreeData([...treeData]);
  };

  useEffect(() => {
    renderTreeDom(initTreeData);
  }, []);
  return (
    <div>
      <h2>完成树节点的增删查改</h2>
      <Tree treeData={treeData}></Tree>
      <ChangeModal
        visible={visible}
        closeModal={() => {
          setVisible(false);
          setCurrentValue({});
        }}
        currentValue={currentValue}
        changeTreeValue={changeTreeValue}
        addTreeNode={addTreeNode}
        addFlag={addFlag}
      />
    </div>
  );
};
export default TreeDom;
