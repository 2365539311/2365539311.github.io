var ln2365539311 = {
    isNaN:function(val){
        if(val!=val){
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
        var res=arr.filter(function(val){
            return !args[0].includes(val);
        });
        return res;
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
        for(var key=fromIndex; key<arr.length; key++){
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
                if(arrar[key][predicate]){
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
            if(arr[i]==val){
                return i;
            }
        }
        return -1;
    },

    nth:function(arr,n=0){
        if(n>=0 && n<arr.length){
            return arr[n];
        }else{
            if(Math.abs(n)==1)
                return arr.slice(n);
            return arr.slice(n,n+1);
        }
        return -1;
    },

    pull:function(){

    },

    pullAll:function(){

    },

    pullAt:function(){

    },

    remove:function(){

    },

    reverse:function(){

    },

    slice:function(){

    },

    /*
    sortedIndex
    sortedIndexOf
    tail
    take
    takeRight
    union
    uniq
    unzip
    without
    xor
    zip
    zipObject
    includes
    sample
    sampleSize
    shuffle
    size
    eq,gt,gte
    lt,lte
    add,ceil
    divide
    floor
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
    startsWith
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