function getBookmarksStrRootNode(str) {
  // 创立iframe
  let iframe = document.createElement('iframe')
  document.body.appendChild(iframe)
  iframe.style.display = 'none'
  // 增加书签dom字符串
  iframe.contentWindow.document.documentElement.innerHTML = str
  // 获取书签树根节点
  return iframe.contentWindow.document.querySelector('dl')
}

export function analysisBookmarksStr(str) {
  let root = getBookmarksStrRootNode(str)
  let BookmarksTree = walkBookmarksTree(root)
  convertData(BookmarksTree)
  // let BookmarksMenu = generateMenu(BookmarksTree)
  return BookmarksTree
}

function walkBookmarksTree(root) {
  let result = []
  // 深度优先遍历
  let walk = (node, list) => {
    let els = node.children
    if (els && els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        let item = els[i]
        // p标签或h3标签直接跳过
        if (item.tagName === 'P' || item.tagName === 'H3') {
          continue
        }
        // 文件夹不用创建元素
        if (item.tagName === 'DL') {
          walk(els[i], list)
        } else {// DT节点
          let child = null
          // 判断是否是文件夹
          let children = item.children
          let isDir = false
          for (let j = 0; j < children.length; j++) {
            if (children[j].tagName === 'H3' || children[j].tagName === 'DL') {
              isDir = true
            }
          }
          // 文件夹
          if (isDir) {
            child = {
              id: guid(),
              name: item.tagName === 'DT' ? item.querySelector('h3') ? item.querySelector('h3').innerText : '' : '',
              folder: true,
              children: []
            }
            walk(els[i], child.children)
          } else {// 书签
            let _item = item.querySelector('a')
            // console.dir(_item)
            child = {
              id: guid(),
              name: _item.innerText,
              url: _item.href
            }
          }
          list.push(child)
        }
      }
    }
  }
  walk(root, result)
  return result
}

function convertData(walkBookmarksTree) {
  if (walkBookmarksTree.length === 1) return
  let otherArr = {
    id: guid(),
    name: "其他",
    folder: true,
    children: []
  }
  walkBookmarksTree.forEach((v, i, arr) => {
    if (i !== 0) {
      otherArr.children.push(v)
    }
  })
  for (let i = walkBookmarksTree.length - 1; i > 0; i--) {
    walkBookmarksTree.splice(i, 1)
  }
  walkBookmarksTree.push(otherArr)
  // console.log('----:', otherArr, walkBookmarksTree)
}

export function generateMenu(BookmarksTree) {
  let BookmarksTree1 = JSON.parse(JSON.stringify(BookmarksTree))

  for (let j = BookmarksTree1.length - 1; j >= 0; j--) {
    if (BookmarksTree1[j].folder && BookmarksTree1[j].children.length > 0) {
      let walk = (data) => {
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].folder === undefined) {
            data.splice(i, 1)
          } else if (data[i].children.length > 0) {
            walk(data[i].children)
          }
        }
      }
      walk(BookmarksTree1[j].children)
    }
  }

  /*for (let i = BookmarksTree1.length - 1; i >= 0; i--) {
      if (BookmarksTree1[i].folder && BookmarksTree1[i].children.length > 0) {
          const el = BookmarksTree1[i].children
          for (let j = el.length - 1; j >= 0; j--) {
              if (el[j].folder === undefined) {
                  el.splice(j, 1)
              }
          }
      }
  }*/
  console.log(JSON.parse(JSON.stringify(BookmarksTree1)))
  for (let i = 0; i < BookmarksTree1.length; i++) {
    if (BookmarksTree1[i].folder && BookmarksTree1[i].children.length > 0) {
      let walk = (data) => {
        data.forEach((v, i ,arr) => {
          if (v.children.length > 0) {
            walk(v.children)
          } else {
            delete v.children
          }
        })
      }
      walk(BookmarksTree1[i].children)
    }
  }

  return BookmarksTree1
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function findItemById(id, BookmarksTree) {
  let val
  BookmarksTree.find((v, i, arr) => {
    let walk = (data) => {
      let children = data.children
      for (let j = 0; j < children.length; j++) {
        if (children[j].length > 0) {
          walk(children[j])
        } else if (children[j].id === id) {
          val = children[j]
        }
      }
    }
    walk(v)
  })
  console.log('=====:', val)
  return val
}
