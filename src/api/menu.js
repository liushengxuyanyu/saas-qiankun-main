
import menusInfo from '../mock/menus'
import service from './index'

export const menusRoot = () => {
  return service.get('/defender/api/admin/menu/root', {
      params: {
        "platform": "ROOT",
        "systemId": "10408",
      }
    })
    .then(res=>{
      return res.data
    })
    .catch(err=>{
    })
}
export const menus = () => {
  let navMenus = localStorage.getItem('navMenus')
  if(navMenus){
    try{
      let menus = JSON.parse(navMenus)
      return Promise.resolve(menus)
    }catch{
      console.log('JSON.parse(navMenus)')
    }
  }
  
  return service.get('/defender/api/admin/menu/nav', {
      params: {
        "platform": "ROOT",
        "systemId": "10408",
        "website" :"lingshouyun_pc"
      }
    })
    .then(res=>{
      localStorage.setItem('navMenus', JSON.stringify(res.data))
      return res.data
    })
    .catch(err=>{
    })
}

export const pageVisit = (data) => {
  return service.post('/retail-portal/api/page/visit/statistics', data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
    })
}