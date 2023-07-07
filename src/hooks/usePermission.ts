import useLoginStore from '@/store/login/login'

function usePermission(pageName: string, handleName: string) {
  const queryPermission = `${pageName}:${handleName}`
  console.log(queryPermission)
  const permissions = useLoginStore().permissions
  console.log(permissions)

  // console.log(queryPermission, permissions)
  //为了让 ts 返回值类型转成 boolean类型 ，用！！
  return !!permissions.find((item) => item.includes(queryPermission))
}

export default usePermission
