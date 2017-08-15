let prodTools={};
let store=window.localStorage;
let prods=JSON.parse(localStorage.getItem('prods') || '{}');
prodTools.addOrUpdate=function(p){  
    if(prods[p.id]){
        prods[p.id]=prods[p.id]+p.num;
    }else{
        prods[p.id]=p.num;
    }
    this.saveProds(prods);
};
prodTools.delete=function(id){  
    delete prods[id];
    this.saveProds(prods);
};
prodTools.getprods=function(){  
    return JSON.parse(store.getItem('prods')||'{}');
};
prodTools.getTotalCount=function(){
    let sum=0;
    for(let id in prods){
        sum=sum+prods[id];
    }
    return sum;
};
prodTools.saveProds=function(prods){
    store.setItem('prods',JSON.stringify(prods));
};
export default prodTools;




