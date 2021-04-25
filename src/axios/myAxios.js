import axios from 'axios'
// import { Loading } from 'element-ui';
// import vue from 'vue'

var address = "http://120.77.245.87:3000"

export default (method, path, data, callback) => {
    // Loading.service({ fullscreen: true });
  //  console.log(method,path,data);
    var req = {
        method: method,
        url: address + path,
    }
    if (method == 'get')
        req.params = data
    else req.data = data
    axios(req).then(r=>{
        callback(r.data)
    }).catch(err=>{
        //console.log('请求出错：',err)
        callback(false)
    }).finally(()=>{

    })
}

