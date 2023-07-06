const modalConfig = {
  pageName: 'role',
  title: '新建角色',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      label: '角色权限',
      prop: 'intro',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      slotName: 'menulist'
    }
  ]
}

export default modalConfig
