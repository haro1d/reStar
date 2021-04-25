let obj = {
    
    getDate(){
        
            var yy = new Date().getFullYear();
            var mm = new Date().getMonth()+1;
            var dd = new Date().getDate();
            var hh = new Date().getHours();
            var min = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
           // let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
          //  that.time = yy+'年 '+mm+'月'+dd+'日 '+hh+':'+mf+':'+ss;
          
            var nowTime = yy+'-'+mm+'-'+dd+' '+hh+':'+min;
            return nowTime
          
       
    }
}
export default obj;