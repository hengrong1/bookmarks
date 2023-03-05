<template>
  <n-tree
      class="treeStyle"
      block-line
      :data="data"
      key-field="id"
      label-field="name"
      selectable
      draggable
      accordion
      :default-selected-keys="defaultSelectedKeys"
      :on-update:expanded-keys="updatePrefixWithExpaned"
      :node-props="nodeProps"
      :render-switcher-icon="renderSwitcherIconWithExpaned"
      :cancelable="false"
      @drop="handleDrop"
      :on-update:selected-keys="selectedKeysHandle"
  />
</template>

<script setup>
import {h, ref} from "vue";
import {NEllipsis, NIcon, NTree} from "naive-ui";
import {
  Folder24Filled as Folder,
  Folder24Regular as FolderOpenOutline,
  CaretRight24Filled as CloseIcon,
  CaretRight24Regular as OpenIcon,
} from "@vicons/fluent";
import {useBookmarkStore} from '@/stores/counter'
import {generateMenu} from '@/utils/bookmark'
import {storeToRefs} from "pinia";

const BookmarkStore = useBookmarkStore()
// console.log(BookmarkStore.bookmark)

const data = ref()
const defaultSelectedKeys = ref()
const {bookmark, menuSelected} = storeToRefs(BookmarkStore)
console.log(bookmark, menuSelected)
const re = generateMenu(bookmark.value)
console.log(re);
if (re.length > 0) {
  let walk = (data) => {
    data.forEach(v => {
      v['prefix'] = () => h(NIcon, null, {
        default: () => h(Folder)
      })
      // v.name = () => h(NEllipsis, null,  { default: () => v.name })
      if (v.children)
        walk(v.children)
    })
  }
  walk(re)
  data.value = re
  console.log(defaultSelectedKeys.value, menuSelected.value, re[0].id)
  defaultSelectedKeys.value = menuSelected.value.length === 0? [re[0].id] : menuSelected.value
  console.log(defaultSelectedKeys.value)
}
const updatePrefixWithExpaned = (_keys, _option, meta) => {
  console.log(meta)
  if (!meta.node)
    return;
  switch (meta.action) {
    case "expand":
      meta.node.prefix = () => h(NIcon, null, {
        default: () => h(FolderOpenOutline)
      });
      break;
    case "collapse":
      meta.node.prefix = () => h(NIcon, null, {
        default: () => h(Folder)
      });
      break;
  }
}
const renderSwitcherIconWithExpaned = ({ expanded }) => h(NIcon, null, {
  default: () => h(CloseIcon)
})
function findSiblingsAndIndex(node, nodes) {
  if (!nodes)
    return [null, null];
  for (let i = 0; i < nodes.length; ++i) {
    const siblingNode = nodes[i];
    if (siblingNode.key === node.key)
      return [nodes, i];
    const [siblings, index] = findSiblingsAndIndex(node, siblingNode.children);
    if (siblings && index !== null)
      return [siblings, index];
  }
  return [null, null];
}
const handleDrop = ({ node, dragNode, dropPosition }) => {
  /*const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
      dragNode,
      dataRef.value
  );
  if (dragNodeSiblings === null || dragNodeIndex === null)
    return;
  dragNodeSiblings.splice(dragNodeIndex, 1);
  if (dropPosition === "inside") {
    if (node.children) {
      node.children.unshift(dragNode);
    } else {
      node.children = [dragNode];
    }
  } else if (dropPosition === "before") {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
        node,
        dataRef.value
    );
    if (nodeSiblings === null || nodeIndex === null)
      return;
    nodeSiblings.splice(nodeIndex, 0, dragNode);
  } else if (dropPosition === "after") {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
        node,
        dataRef.value
    );
    if (nodeSiblings === null || nodeIndex === null)
      return;
    nodeSiblings.splice(nodeIndex + 1, 0, dragNode);
  }
  dataRef.value = Array.from(dataRef.value);*/
  console.log(node, dragNode, dropPosition)
}

const nodeProps = ({ option }) => {
  return {
    onClick(e) {
      // message.info("[Click] " + option.label);
      // console.log(option, e)
    },
    onContextmenu(e) {
      console.log(e)
      // optionsRef.value = [option];
      // showDropdownRef.value = true;
      // xRef.value = e.clientX;
      // yRef.value = e.clientY;
      // console.log(e.clientX, e.clientY);
      e.preventDefault();
    }
  };
}

const selectedKeysHandle = (keys, option, meta) => {
  BookmarkStore.menuSelected = keys
  console.log(keys, option, meta)
}

</script>

<style scoped>
.treeStyle :deep(.n-tree-node) {
  height: 40px;
}
.treeStyle :deep(.n-tree-node-content__prefix) {
  font-size: 24px;
}
.treeStyle :deep(.n-tree-node-switcher) {
  margin: 7px 0;
}
.treeStyle :deep(.n-tree-node-switcher__icon) {
  width: 20px;
  height: 20px;
  font-size: 20px;
}
.treeStyle :deep(.n-tree-node--selected .n-tree-node-content) {
  color: #18a058
}
.treeStyle :deep(.n-tree-node-content__text) {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>
