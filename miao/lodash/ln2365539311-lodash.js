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

    findIndex:function(){

    },

    head:function(array){
        if(array)
            return array[0];
    },

    flatten:function(){
        
    },

    indexOf:function(){

    },

    /*
    initial
    intersection
    join
    last
    lastIndexOf
    nth
    pull
    pullAll
    pullAt
    remove
    reverse
    slice
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