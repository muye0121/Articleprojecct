export const delay=(successRate:number,ms:number=1000)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const num=Math.random()*100
            if(num<successRate){
                resolve(true)
            }else{
                reject(new Error('Promise失败了'))
            }
        },ms)
    })
}