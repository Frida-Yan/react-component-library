import React, { useState, useEffect } from "react"
import ReactDom from "react-dom"
import { Button } from "antd"
import "./index.less"

const Modal = (props) => {
  // 遮罩 wrap container
  // container: title content foot close-btn

  // <Modal {...props}></Modal>
  // Modal.confirm({...props})

  // ...other
  const {
    title,
    children,
    visible,
    width = 360,
    onOk = () => {},
    onCancel = () => {},
    footer,
    name,
  } = props

  const [modalVisible, setModalVisible] = useState(visible)
  useEffect(() => {
    setModalVisible(visible)
    console.log(visible, "visible")
  }, [visible])

  const _onCancel = () => {
    setModalVisible(false)
    onCancel()
  }

  const _onOk = () => {
    setModalVisible(false)
    onOk()
    onCancel()
  }

  const renderFooter = () => {
    if (name === "confirm") {
      return (
        <div>
          <Button type="primary" onClick={_onOk}>
            ok
          </Button>
        </div>
      )
    } else if (footer) {
      return footer
    }
    return (
      <div>
        <Button type="primary" onClick={_onOk}>
          ok
        </Button>
        <Button type="cancel" onClick={_onCancel}>
          cancel
        </Button>
      </div>
    )
  }

  const renderModalContent = () => (
    <div className="modal" style={{ display: modalVisible ? "block" : "none" }}>
      <div className="modal-mask"></div>
      <div className="modal-warp" style={{ width }}>
        <div className="modal-close" onClick={_onCancel}>
          <span>+</span>
        </div>
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-foot">{renderFooter()}</div>
        </div>
      </div>
    </div>
  )
  return ReactDom.createPortal(
    renderModalContent(),
    document.querySelector("#app")
  )
}

// const HocModal = (Component) => {
//   return ({
//     visible,
//     footer,
//     closable,
//     okText = "ok",
//     okType = "primary",
//     onOk = () => {},
//     onCancel = () => {},
//     maskClosable = false,
//     content = "content",
//     name,
//     ...props
//   }) => {
//     const _onOk = () => {
//       onOk()
//     }
//     const _onCancel = () => {
//       onCancel()
//     }
//     const Footer = () =>
//       name === "confirm" ? undefined : (
//         <Button type={okType} onClick={_onOk}>
//           {okText}
//         </Button>
//       )
//     return (
//       <Component
//         okText={okText}
//         closable={false}
//         maskClosable={maskClosable}
//         onOk={_onOk}
//         onCancel={_onCancel}
//         children={content}
//         okType={okType}
//         visible
//         footer={Footer()}
//         name={name}
//         {...props}
//       />
//     )
//   }
// }
// ["confirm", "info", "success", "error", "warning"].forEach((item) => {
//   Modal[item] = (props) => {
//     let div = document.createElement("div")
//     let currentConfig = Object.assign({}, props)
//     document.body.appendChild(div)
//     const FunModal = HocModal(Modal)
//     const destroy = () => {
//       const unmountResult = ReactDom.unmountComponentAtNode(div)
//       if (unmountResult && div.parentNode) {
//         div.parentNode.removeChild(div)
//       }
//     }
//     const render = (config) => {
//       ReactDom.render(
//         <FunModal destroy={destroy} name={item} {...config} />,
//         div
//       )
//     }
//     const update = (newConfig) => {
//       currentConfig = Object.assign({}, currentConfig, newConfig)
//       render(currentConfig)
//     }
//     render(currentConfig)
//     return {
//       destroy,
//       update,
//     }
//   }
// })
const Father = (props) => {
  const [visible, setVisible] = useState(false)

  const onConfirm = () => {
    Modal.confirm({
      title: "这是confirm弹窗",
    })
  }
  console.log(visible, "visible")
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        手写一个modal,点击打开弹窗
      </Button>
      <Button onClick={onConfirm}>confirm弹窗</Button>
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <div>这是要展示的内容啦</div>
      </Modal>
    </>
  )
}

export default Father
