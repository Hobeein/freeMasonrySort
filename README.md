# freeMasonrySort 自由拖动排序插件
原生js插件

## *usage*
```javascript

// sort.js
<head>
  // 在head中引入
  <script src="./sort.js" type="text/javascript"></script>
</head>
...
<script>
  windows.onload = () => {
    $sort.setParentElement(element) // 传入排序元素的父节点
    $sort.setElement(...elements) // 传入需要排序的元素 HtmlElementObject的数组
  }
  
  // 在移动元素时，进行排序
  移动元素的方法(() => {
    $sort.sort()
  })
  
  添加元素的方法(() => {
    $sort.addElement(newElement) // 传入新增的元素
  })
</script>

```
