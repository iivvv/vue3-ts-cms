export interface IModalConfig {
  pageName: string
  title: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

export interface IModalProps {
  modalConfig: IModalConfig
  otherInfo?: any
}
