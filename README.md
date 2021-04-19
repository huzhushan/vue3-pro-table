# vue3-pro-table

> 之前有一个[vue-pro-table](https://github.com/huzhushan/vue-pro-table)是基于 vue2 开发的
> vue3-pro-table 是基于 vue3 开发

一个基于 ElementPlus 封装的 table 列表页组件，将包含搜索、列表、分页等功能的页面封装成一个组件

## 特性

- 将搜索、列表、分页三者的交互逻辑封装到组件中，节省开发者代码量
- 配置化的请求函数，自动发送请求，自动获取请求参数，自动显示 loading 效果
- 配置化的表格项，跟 el-table-column 的配置属性类似
- 配置化的搜索表单，支持大部分表单元素
- 配置化的分页，跟 el-pagination 的配置属性类似
- 自定义是否显示搜索和分页
- 自定义标题栏和工具栏
- 丰富的插槽提供功能扩展

## 使用

### 安装和引入

安装

```js
// npm
npm install vue3-pro-table
// yarn
yarn add vue3-pro-table
```

引入

> 该组件依赖 element-plus，需要自行引入
>
> ```js
> // 引入element-plus
> import ElementPlus from "element-plus";
> import "element-plus/lib/theme-chalk/index.css";
> // 引入中文语言包
> import "dayjs/locale/zh-cn";
> import locale from "element-plus/lib/locale/lang/zh-cn";
> app.use(ElementPlus, { locale });
> ```

```js
// 引入vue-pro-table
import Vue3ProTable from "vue3-pro-table";
app.use(Vue3ProTable);
```

### 快速使用

```vue
<template>
  <vue3-pro-table title="列表" :request="getList" :columns="columns">
    <template #operate="scope">
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="danger">删除</el-button>
    </template>
  </vue3-pro-table>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "vue";
import { getUserList } from "src/api/xxx";
export default defineComponent({
  setup() {
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { label: "序号", type: "index" },
        { label: "名称", prop: "nickName", width: 180 },
        { label: "邮箱", prop: "userEmail" },
        {
          label: "操作",
          fixed: "right",
          width: 180,
          align: "center",
          tdSlot: "operate", // 自定义单元格内容的插槽名称
        },
      ],
    });

    // 请求函数
    const getList = async (params) => {
      // params是从组件接收的，包含分页和搜索字段。
      const { data } = await getUserList(params);

      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: data.list,
        total: +data.total,
      };
    };

    return {
      ...toRefs(state),
      getList,
    };
  },
});
</script>
```

预览效果

> 默认不包含搜索表单

![列表页](https://raw.githubusercontent.com/huzhushan/pics/master/vue-pro-table/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210226101705.png)

### 请求函数配置

- request，请求列表数据的函数

  > 组件加载的时候会自动执行 request 函数，并在加载过程中显示 loading 效果

  - 函数接收参数：包含搜索表单的所有字段和分页的 pageNum 和 pageSize

  - 函数必须返回一个对象，包含:
    - data: 列表数据的数组
    - total：总数，用于分页

### 表格配置

- border 表格是否有边框。布尔值，默认为 false

- columns 属性的配置，是一个数组

| 参数      | 说明                                                                                        | 类型                   | 可选值                 | 默认值 |
| --------- | ------------------------------------------------------------------------------------------- | ---------------------- | ---------------------- | ------ |
| label     | 对应 el-table-column 的 label                                                               | string                 | -                      | -      |
| type      | 对应 el-table-column 的 type                                                                | string                 | selection/index/expand | -      |
| prop      | 对应 el-table-column 的 prop                                                                | string                 | -                      | -      |
| width     | 对应 el-table-column 的 width                                                               | string,number          | -                      | -      |
| minWidth  | 对应 el-table-column 的 min-width                                                           | string,number          | -                      | -      |
| align     | 对应 el-table-column 的 align                                                               | string                 | left/center/right      | left   |
| fixed     | 对应 el-table-column 的 fixed                                                               | string, boolean        | true, left, right      | -      |
| sortable  | 对应 el-table-column 的 sortable                                                            | boolean                | false/true             | false  |
| filters   | 对应 el-table-column 的 filters                                                             | Array[{ text, value }] | -                      | -      |
| tdSlot    | 单元格要自定义内容时，可以通过此属性配置一个插槽名称，并且是作用域插槽，可以接收 scope 数据 | string                 | -                      | -      |
| labelSlot | 表头要自定义内容时，可以通过此属性配置一个插槽名称，并且是作用域插槽，可以接收 scope 数据   | string                 | -                      | -      |

- row-key 属性配置

  对应 el-table 的 row-key，默认值是'id'

### 搜索配置

- search 属性的配置，是一个对象

  > 如果不想显示搜索表单，可以不配置 search 或者 search 设置为 false

| 参数       | 说明                                                                                      | 类型              | 可选值 | 默认值 |
| ---------- | ----------------------------------------------------------------------------------------- | ----------------- | ------ | ------ |
| labelWidth | label 文字长度                                                                            | string            | -      | -      |
| inputWidth | 表单项长度                                                                                | string            | -      | -      |
| fields     | 表单字段列表，包含 text，select，radio，checkbox，datetime 等类型，所有字段类型配置见下表 | Array[{字段类型}] | -      | -      |

- fields 列表的字段类型配置

| 参数         | 说明                                                                                                                                                                                                                                                      | 类型                 | 可选值                                                                                                        | 默认值 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------- | ------ |
| type         | 字段类型                                                                                                                                                                                                                                                  | string               | text,textarea,select,radio,radio-button,checkbox,checkbox-button,number,date,daterange,datetime,datetimerange | text   |
| label        | label 文本                                                                                                                                                                                                                                                | string               | -                                                                                                             | -      |
| name         | 搜索时的提交的参数名称                                                                                                                                                                                                                                    | string               | -                                                                                                             | -      |
| style        | 额外的样式                                                                                                                                                                                                                                                | object               | -                                                                                                             | -      |
| defaultValue | 默认值                                                                                                                                                                                                                                                    | -                    | -                                                                                                             |        |
| options      | 当 type 是 select,radio,radio-button,checkbox,checkbox-button 时的枚举选项                                                                                                                                                                                | Array[{name, value}] | -                                                                                                             | -      |
| filterable   | 当 type 是 select 时，下拉框是否支持模糊搜索                                                                                                                                                                                                              | boolean              | true, false                                                                                                   | false  |
| multiple     | 当 type 是 select 时，下拉框是否支持多选                                                                                                                                                                                                                  | boolean              | true, false                                                                                                   | false  |
| transform    | 搜索前对表单数据进行转换，比如表单数据是数组，但是搜索的时候需要传递字符串。它是一个函数，默认参数是字段的 value，需要返回转换后的结果                                                                                                                    | function(value)      | -                                                                                                             | -      |
| trueNames    | 当 type 是 daterange,datetimerange 时，开始时间和结束时间是在一个数组里面，但是搜索时可能需要两个字段，这时就需要把开始时间和结束时间分别赋值给两个字段，这两个字段的名称就是通过 trueNames 配置，它是一个数组，例如：trueNames: ['startTime', 'endTime'] | Array[string]        |                                                                                                               |        |
| min          | 当 type 是 number 时的最小值                                                                                                                                                                                                                              | number               | -                                                                                                             | -      |
| max          | 当 type 是 number 时的最大值                                                                                                                                                                                                                              | number               | -                                                                                                             | -      |

### 分页配置

- pagination 属性的配置，是一个对象

  > 如果不想显示分页，将 pagination 设置为 false

| 参数      | 说明                         | 类型          | 可选值                                  | 默认值                                  |
| --------- | ---------------------------- | ------------- | --------------------------------------- | --------------------------------------- |
| layout    | 组件布局                     | string        | total, sizes, prev, pager, next, jumper | total, sizes, prev, pager, next, jumper |
| pageSize  | 每页显示条目个数             | number        | -                                       | 10                                      |
| pageSizes | 每页显示个数选择器的选项设置 | Array[number] | -                                       | [10, 20, 30, 40, 50, 100]               |

### 标题栏配置

> 表格上方有一个标题栏，标题栏左侧显示一个标题，右侧是一个可自定义的工具栏

- hide-title-bar

  是否隐藏标题栏，布尔值

- title

  表格标题

- 自定义表格标题

  提供一个具名插槽 title，来自定义标题的内容

- 工具栏

  工具栏默认是空的，提供一个具名插槽 toolbar，来自定义工具栏的内容

### 事件

- selectionChange

  如果 columns 中配置了 type 为 selection 的列，可以通过该事件得到已选择的行，参数是一个数组

### 组件内部方法

- refresh

  配置 ref 属性，可以通过 ref 获取组件后调用组件内部的**refresh**方法刷新列表

### 完整用法

```vue
<template>
  <vue3-pro-table
    ref="proTable"
    title="用户列表"
    :request="getList"
    :columns="columns"
    :search="searchConfig"
    :pagination="paginationConfig"
    @selectionChange="handleSelectionChange"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push({ name: 'userAdd' })"
        >创建账号</el-button
      >
      <el-button type="danger" icon="el-icon-refresh" @click="refresh"
        >刷新</el-button
      >
    </template>

    <!-- 展开行 -->
    <template #expand="{ row }">
      {{ row.userEmail }}
    </template>

    <!-- 状态 -->
    <template #status="{ row }">
      <el-tag :type="+row.status === 1 ? 'success' : 'info'">{{
        +row.status === 1 ? "启用" : "停用"
      }}</el-tag>
    </template>

    <!-- 表格操作栏 -->
    <template #page-operate="{ row }">
      <el-button
        type="text"
        @click="
          $router.push({
            name: 'userEdit',
            params: {
              id: row.id,
            },
          })
        "
        >编辑</el-button
      >

      <el-button
        v-if="+row.status === 1"
        type="text"
        @click="setUserStatus(row, 0)"
        >停用</el-button
      >

      <el-button v-else type="text" @click="setUserStatus(row, 1)"
        >启用</el-button
      >
    </template>

    <!-- 操作栏头部 -->
    <template #th-operate>
      <el-input />
    </template>
  </vue3-pro-table>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "vue";
import { getUserList } from "src/api/xxx";
export default defineComponent({
  setup() {
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { label: "", type: "expand", tdSlot: "expand" },
        { label: "全选", type: "selection" },
        { label: "序号", type: "index" },
        { label: "账户名称", prop: "nickName", sortable: true },
        { label: "账号", prop: "userEmail", width: 80 },
        {
          label: "状态",
          prop: "status",
          tdSlot: "status",
          filters: [
            { text: "启用", value: 1 },
            { text: "禁用", value: 0 },
          ],
        },
        { label: "创建时间", prop: "createTime", align: "right" },
        { label: "最后修改时间", prop: "updateTime" },
        {
          label: "操作",
          labelSlot: "th-operate",
          fixed: "right",
          width: 180,
          align: "center",
          tdSlot: "page-operate",
        },
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: "90px",
        inputWidth: "360px",
        fields: [
          {
            type: "text",
            label: "账户名称",
            name: "nickName",
            defaultValue: "abc",
          },
          {
            type: "textarea",
            label: "描述",
            name: "description",
          },
          {
            label: "状态",
            name: "status",
            type: "select",
            defaultValue: 1,
            options: [
              {
                name: "已发布",
                value: 1,
              },
              {
                name: "未发布",
                value: 0,
              },
            ],
          },
          {
            label: "性别",
            name: "sex",
            type: "radio",
            options: [
              {
                name: "男",
                value: 1,
              },
              {
                name: "女",
                value: 0,
              },
            ],
          },
          {
            label: "城市",
            name: "city",
            type: "radio-button",
            options: [
              {
                name: "北京",
                value: "bj",
              },
              {
                name: "上海",
                value: "sh",
              },
              {
                name: "广州",
                value: "gz",
              },
              {
                name: "深圳",
                value: "sz",
              },
            ],
          },
          {
            label: "爱好",
            name: "hobby",
            type: "checkbox",
            defaultValue: ["吃饭"],
            options: [
              {
                name: "吃饭",
                value: "吃饭",
              },
              {
                name: "睡觉",
                value: "睡觉",
              },
              {
                name: "打豆豆",
                value: "打豆豆",
              },
            ],
            transform: (val) => val.join(","),
          },
          {
            label: "水果",
            name: "fruit",
            type: "checkbox-button",
            options: [
              {
                name: "苹果",
                value: "苹果",
              },
              {
                name: "香蕉",
                value: "香蕉",
              },
              {
                name: "橘子",
                value: "橘子",
              },
              {
                name: "葡萄",
                value: "葡萄",
              },
            ],
            transform: (val) => val.join(","),
          },
          {
            label: "日期",
            name: "date",
            type: "date",
          },
          {
            label: "时间",
            name: "datetime",
            type: "datetime",
            defaultValue: "2020-10-10 8:00:00",
          },
          {
            label: "日期范围",
            name: "daterange",
            type: "daterange",
            trueNames: ["startDate", "endDate"],
            style: { width: "360px" },
          },
          {
            label: "时间范围",
            name: "datetimerange",
            type: "datetimerange",
            trueNames: ["startTime", "endTime"],
            style: { width: "360px" },
            defaultValue: ["2020-10-10 9:00:00", "2020-10-11 18:30:00"],
          },
          {
            label: "数量",
            name: "num",
            type: "number",
            min: 0,
            max: 10,
          },
        ],
      },
      // 分页配置
      paginationConfig: {
        layout: "total, prev, pager, next, sizes", // 分页组件显示哪些功能
        pageSize: 5, // 每页条数
        pageSizes: [5, 10, 20, 50],
      },
    });

    // 请求函数
    const getList = async (params) => {
      // params是从组件接收的，包含分页和搜索字段。
      const { data } = await getUserList(params);

      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: data.list,
        total: +data.total,
      };
    };

    // 选择
    const handleSelectionChange = (arr) => {
      console.log(arr);
    };

    const proTable = ref(null);

    // 刷新
    const refresh = () => {
      proTable.value.refresh();
    };

    return {
      ...toRefs(state),
      getList,
      handleSelectionChange,
      proTable,
      refresh,
    };
  },
});
</script>
```

效果：

![完整用法](https://raw.githubusercontent.com/huzhushan/pics/master/vue-pro-table/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210302144535.png)
