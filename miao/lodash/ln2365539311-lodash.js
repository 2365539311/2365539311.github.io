var ln2365539311 = {
    isNaN:function(val){
        if(val!=val && Number.isNaN(val)){
            return true;
        }else{
            return false;
        }
    },
    isNull:function(val){
        return val===null?true:false;
    },


    chunk:function(arr,size=1){
        if(arr.length==0) return arr;
        var res = [];
        var temp = [];
        var i=0;
        while(i<arr.length){
            if(size==i){
                break;
            }
            temp.push(arr[i]);
            i++;
        }
        res.push(temp);
        res.push(arr.slice(i));
        return res;
    },

    compact:function(arr){
        return arr.filter(x=>x);
    },


    concat:function(...args){
        var index=1;
        var res = args[0];
        while(index<args.length){
            res=res.concat(args[index]);    
            index++;    
        }
        return res;
    },
    
    difference:function(arr,...args){
        // var t = [];
        // args.forEach(function(val){
        //     return t=t.concat(val);
        // });
        // return arr.filter(val=>!t.includes(val));
        return arr.filter((val)=>{
            return !args.some((val2)=>{
                return val2.includes(val);
            });
        });
    },

    drop:function(arr,n=1){
        return arr.slice(n);
    },

    fill:function fill(arr,val,start=0,end=arr.slice().length){
        while(start<end){
            arr.splice(start,1,val);
            start++;
        }
        return arr;
    },
    
    findIndex:function(array, predicate, fromIndex = 0){
        if(!array) return -1;
        for(var key=fromIndex; key<array.length; key++){
            // predicate 是需要寻找的值 在数组中找到其索引
            if(this.judgeType(predicate) == "Function"){ // 是函数
                if(predicate(array[key])){
                    return key;
                }
            }else if(this.judgeType(predicate) == "Array"){  //  是数组
                for(var i=0; i<predicate.length; i++){
                    if(Object.entries(array[key]).flat().includes(predicate[i])){    
                        if(i==predicate.length-1){
                            return key;
                        }
                    }
                }
            }else if(this.judgeType(predicate) == "Object"){     // 是对象
                var flag = true;
                for(var h in array[key]){
                    if(array[key][h] !== predicate[h]){  // 需要 把 对象中所有的 属性都走完
                        flag = false;
                    }
                }
                if(flag) return key;
            }else if(this.judgeType(predicate) == "String"){     // 是字符串
                if(array[key][predicate]){
                    return key;
                }
            }
        }
        return -1;
    },

    judgeType:function(predicate){
        // 如果 type 是函数类型
        return Object.prototype.toString.call(predicate).slice(8,-1);
    },

    head:function(array){
        if(array)
            return array[0];
    },

    flatten:function(arr){
        if(arr)
            return arr.flat();
    },

    indexOf:function(arr,val,fromIndex=0){
        for(var i=fromIndex; i<arr.length; i++){
            if(Number.isNaN(val) && Number.isNaN(arr[i])){
                return i;
            }
            if(arr[i]==val){
                return i;
            }
        }
        return -1;
    },

    
    initial:function(arr){
        return arr.slice(0,arr.length-1);
    },

    intersection:function(...arrs){
        var res = arrs[0];
        for(var i=0; i<arrs.length; i++){
            res=res.filter(val=>arrs[i].includes(val));
        }        
        return res;
    },

    join:function(arr,separator=','){
        return arr.join(separator);
    },

    last:function(arr){
        return arr[arr.length-1];
    },
    
    lastIndexOf:function(arr,val,fromIndex=arr.length-1){
        for(var i=fromIndex; i>=0; i--){
            if(Number.isNaN(val) && Number.isNaN(arr[i])){
                return i;
            }
            if(arr[i]==val){
                return i;
            }
        }
        return -1;
    },

    nth:function(arr,n=0){
        if(n>=0){
            return arr[n];
        }else{
            return arr[arr.length+n];     
        }
    },

    pull:function(arr,...args){
        return arr.filter((val)=>{
            return !args.includes(val);
        });
    },

    pullAll:function(arr,arrDelete){
        return arr.filter((val)=>{
            return !arrDelete.includes(val);
        });
    },

    pullAt:function(arr,...arrIndex){
        var res = [];
        var tmp = arr;
        tmp = tmp.filter((val,index)=>{
            var flag = true;
            arrIndex.forEach((val2)=>{
                flag=flag&&!val2.includes(index);
                if(flag==false){
                    res.push(tmp[index]);
                }
            });
            return flag;
        });
        arr.filter((val,index)=>{
            if(!tmp.includes(val)){
                arr.splice(index,1);
            };
        });
        return res;
    },

    remove:function(arr,predicate){
        var res = arr.filter(predicate);
        arr.filter((val,index)=>{
            if(res.includes(val)){
                arr.splice(index,1);
            };
        });
		return  res;
    },

    reverse:function(arr){
        var left=0;
        var right = arr.length-1;
        while(left<right){
            var tmp = arr[left];
            arr[left]=arr[right];
            arr[right]=tmp;
            left++;
            right--;
        }
        return arr;
    },

    slice:function(arr,start=0,end=arr.length){
        var res = [];
        for(var i=start; i<end; i++){
            res[res.length] = arr[i];
        }
        return res;
    },

    
    sortedIndex:function(arr,val){
        var left = 0;
        var right = arr.length;
        while(left<right){
            var mid = Math.floor(left+(right-left)/2);
            if(arr[mid] >= val){
                right=mid;
            }else if(arr[mid] < val ){
                left=mid+1;
            }
        }
        return left!=0?left:-1;
    },

    sortedIndexOf:function(arr,val){
        var left = 0;
        var right = arr.length;
        while(left<right){
            var mid = Math.floor(left+(right-left)/2);
            if(arr[mid] >= val){
                right=mid;
            }else if(arr[mid] < val){
                left=mid+1;
            }
        }
        return left!=0?left:-1;
    },

    tail:function(arr){
        return arr.slice(1);
    },

    take:function(arr,n=1){
        return arr.slice(0,n);
    },

    takeRight:function(arr,n=1){
        if(n>=arr.length) return arr;
        return arr.slice(arr.length-n);
    },
    
    /**
     * 从多个数组中返回一个没有重复元素的新数组
     * @param  {[Arrays]} args 多个数组
     */
    union:function(...args){    // Set 入参 iterator  对象、Map、字符串、数组
        var res = [];
        args.forEach((val)=>{
            val.forEach((val2)=>{
                if(!res.includes(val2)){
                    res.push(val2);
                }
            });
        });
        return res;
    },
    
    /**
     * 数组去重，且顺序不发生改变
     * @param {Array} arr 数组
     */
    uniq:function(arr){
        var set = new Set([...arr]);
        return Array.from(set);
    },
    
    /**
     * 还原为原来的数组
     * @param {Array} array 二维数组  
     */
    unzip:function(array){
        var res = new Array(array[0].length);
        array.forEach((arr)=>{
            arr.forEach((val,index)=>{
                res[index].push(val);
            });
        });
        return res;
    },

    /**
     * _.zip(['a', 'b'], [1, 2], [true, false]);
        // => [['a', 1, true], ['b', 2, false]]
     * @param  {Array} args 不定数的数组 
     */
    zip:function(...args){
        var res = [];
        var maxLen = -Infinity;
        args.forEach((val)=>{
            maxLen = Math.max(maxLen,val.length);
        });
        console.log("子数组最大长度为：",maxLen);
        for(var i=0; i<maxLen; i++){
            var tmp = [];
            for(var j=0; j<args.length; j++){
                tmp.push(args[j][i]);
            }
            res.push(tmp);
        }
        return res;
    },
    
    /**
     * 
     * @param {Array} arrProps 属性数组
     * @param {Array} arrVal 值数组
     */
    zipObject:function(arrProps,arrVal){
        var obj = {};
        for(var i=0; i<arrProps.length; i++){
            for(var j=0; j<arrVal.length; j++){
                obj[arrProps[i]]=arrVal[j];
                break;
            }
        }
        return obj;
    },

    /**
     * 创建一个排除给定值的数组
     * @param {Array} arr 数组
     * @param  {Number} args 不定数量的参数
     */
    without:function(arr,...args){
        var connect = [];
        args.forEach((val)=>{
            connect.concat(val);
        });
        var re = this.union(arr,connect);
        return re;
    },
    
    xor:function(...args){
        var res = [];
        args.forEach((valArr)=>{
            valArr.forEach((val)=>{
                if(!res.includes(val)){
                    res.push(val);
                }
            });
        });
        return res;
    },
    
    /**
     * 返回true或false
     * @param {Object、Array、String} collection 集合：对象、数组或字符串
     * @param {*} val  
     * @param {索引} fromIndex 
     */
    includes:function(collection,val,fromIndex=0){
        var type = this.judgeType(collection);
        if(type=="Array"){
            for(var i=fromIndex; i<collection.length; i++){
                if(collection.includes(val)){
                    return true;
                }
            }
        }else if(type=="Object"){
            // 拿到对象 值的数组
            var objValArr = Object.values(collection);
            for(var i=fromIndex; i<objValArr.length; i++){
                if(objValArr.includes(val)){
                    return true;
                }
            }
        }else if(type=="String"){
            return collection.includes(val);
        }
    },
    
    startsWith:function(str='',target,position=0){
        for(var i=position; i<str.length; i++){
            if(str[i]==target){
                return true;
            }
        }
        return false;
    },

    
    sample:function(){

    },

    sampleSize:function(){

    },
    
    shuffle:function(){

    },
    
    size:function(){

    },
    
    eq,gt,gte:function(){

    },
    
    lt,lte:function(){

    },
    
    add,ceil:function(){

    },
    
    divide:function(){

    },
    
    floor:function(){

    },
    
    /*
    max
    mean
    min
    multiply
    round
    substract
    sum
    at
    defaults
    get
    set
    has
    hasIn
    invert
    keys
    assign
    omit
    pick
    values
    camelCase
    capitalize
    deburr
    endsWith
    escape
    kebabCase
    lowerCase
    lowerFirst
    pad
    padEnd
    padStart
    parseInt
    repeat
    replace
    snakeCase
    split
    startCase
    
    trim
    trimEnd
    trimStart
    truncate
    unescape
    upperCase
    upperFirst
    words
    range
    */


}