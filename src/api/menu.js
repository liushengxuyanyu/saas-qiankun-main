
import menusInfo from '../mock/menus'

export const menus = () => {
  return new Promise((resolve)=>{
    resolve(menusInfo)
  })
}