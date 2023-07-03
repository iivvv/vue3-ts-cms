import type { IModalConfig } from '@/components/page-modal/type'

const modalConfig: IModalConfig = {
  pageName: 'department',
  title: '新建部门',
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      label: '部门名称',
      prop: 'name',
      type: 'input',
      placeholder: '请输入部门名称',
      initialValue: '111'
    },
    {
      label: '部门领导',
      prop: 'leader',
      type: 'input',
      placeholder: '请输入部门领导'
    },
    {
      label: '上级部门',
      prop: 'parentId',
      type: 'select',
      options: [],
      placeholder: '请输入部门领导'
    }
  ]
}

export default modalConfig
