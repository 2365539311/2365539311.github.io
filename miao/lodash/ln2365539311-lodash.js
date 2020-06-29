/*
 * @Description: lodash库
 * @Author: huacong
 * @Date: 2020-04-28 17:15:31
 * @LastEditTime: 2020-05-20 11:26:58
 * @LastEditors: Please set LastEditors
 * 
 * @ 搜索关键词： 数组模块  集合模块  函数模块 语言模块  数学模块   对象模块   字符串模块   工具模块...
 */ 
var ln2365539311 = {
    
//=========================================================Array - 数组模块=========================================================


    isNaN:function(val){
        if(val!=val && Number.isNaN(val)){
            return true;
        }else if(typeof val == 'object'){
            return val.toString()==='NaN';
        }else{
            return false;
        }
            // if (v === undefined || v.constructor.name !== "Number") return false;
            // let n = Number(v);
            // return n !== n;

            // if (typeof val === "object") {
            //     return val.__proto__.constructor === Number;
            // }
            // return val !== val;
    },

    isNull:function(val){
        return val===null?true:false;
    },


    /**
     * 根据传入的size值将给定数组切分
     * @param {Array} arr 入参数组
     * @param {切分成多少个子数组} size 多少个子数组
     * @returns {返回切分后的数组}
     */
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

    /**
     * 移除数组中false的元素
     * @param {Array} arr 
     */
    compact:function(arr){
        return arr.filter(x=>x);
    },

    /**
     * 连接数组
     * @param  {...any} args 
     */
    concat:function(...args){
        var index=1;
        var res = args[0];
        while(index<args.length){
            res=res.concat(args[index]);    
            index++;    
        }
        return res;
    },
    
    /**
     * 对比给定数组，返回给定数组中不被包含在对比数组中的元素
     * @param {Array} arr 给定数组
     * @param  {...Array} args 对比数组
     */
    difference:function(arr,...args){
        var t = [];
        args.forEach(function(val){
            return t=t.concat(val);
        });
        return arr.filter(val=>!t.includes(val));
        // return arr.filter((val)=>{
        //     return !args.some((val2)=>{
        //         return val2.includes(val);
        //     });
        // });
    },

    /**
     * 把后面集合中有第一个数组中的元素全部删除
     * @param {Array} array 需要被对比的数组
     * @param  {...Array} args 要排除的值
     * @param {Function} fun 根据这个函数按照对应的函数进行排除
     */
    differenceBy:function(array,...args){
        
        // 转成数组
        args = Array.from(args);

        // 如果没有 iteratee  只有数组
        if(this.judgeType(args[args.length-1])=='Array'){
            var propArr = args.slice();
            return this.difference(array,...propArr);
        }
    
         // 后面的数组
        var arr = args.slice(0,args.length-1);

        // 函数
        var f = args.pop();

        // 转换后的 映射器
        var iterator = this.typeConvertVal(f);

        // 返回值
        var res=array.slice();

        // array 的映射数组
        var mapArray = array.map((val)=>iterator(val));

        // 从 mapArray 中删除对应的元素
        for(var i=0; i<arr.length; i++){
            for(var j=0; j<arr[i].length; j++){
                var val=iterator(arr[i][j]);
                // 如果映射数组中也包含 同样经过转换后的 val 则代表重复 ，跳过
                if(mapArray.includes(val)){
                    var index = mapArray.indexOf(val);
                    res.splice(index,1);

                    // 索引的问题
                    mapArray=res.slice();
                }
            }
        }
        return res;

    },

    /**
     * 用传入的函数进行对比
     * @param {*Array} array 需要被对比的数组
     * @param  {...Array} args args最后一个参数可能为比较器
     * @param {*func} 比较函数
     */
    differenceWith:function(array,args,func){
        var newFun = this.negate(func);
        var res;
        args.forEach(valArg=>{
            res=array.filter(valAry=>newFun(valArg,valAry));  
        });
        return res;
    },

    drop:function(arr,ny = 1){
        return arr.slice(ny);
    },

    dropRight:function(array,n=1){
        if(n>=array.length){
            return [];
        }
        if(n==0){
            return array.slice();
        }
        /*
        array=array.reverse();
        return array.slice(n).reverse();
        */
       var res=[];
       for(var i=0;i<=(array.length-1-n); i++){
           res.push(array[i]);
       }
       return res;
    },

    dropRightWhile:function(array,predicate){
        predicate=this.typeConvert(predicate);
        return array.filter((val,idx,arr)=>{
            return !predicate(val,idx,arr);
        });
    },

    dropWhile:function(array,predicate){
        predicate=this.typeConvert(predicate);
        var res=array.slice();
        for(var i=0; i<array.length; i++){
            if(predicate(array[i])){
                res.splice(array[i],1);
            }else{
                return res;
            }
        }
    },

    fill:function(arr,val,start = 0,end=arr.slice().length){
        while(start<end){
            arr.splice(start,1,val);
            start++;
        }
        return arr;
    },
    
    /**
     * @description: 返回第一个为真的元素的索引
     * @param {type} 
     * @return: 
     */
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


    
    findLastIndex:function(array,predicate,fromIndex=array.length-1){
        if(!array) return -1;
        for(var key=fromIndex; key>=0; key--){
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

    
    head:function(array){
        if(array)
            return array[0];
    },


    flatten:function(arr){  //  只展平一阶
        /*
        if(arr)
            return arr.flat();
        */

        /*
            return [].concat(...arr);
        */

        var res = [];
        for(var item of arr){
            if(Array.isArray(item)){
                res.push(...item);
            }else{
                res.push(item);
            }
        }
        return res;
    },

    // 递归降维
    // flattenDeep:function(arr,res=[]){
    //     arr.forEach(val=>{
    //         if(Array.isArray(val)){
    //             flattenDeep(val,res);
    //         }else{
    //             res.push(val);
    //         }
    //     })
    //     return res;
    // },
    flattenDeep:function(arr){
        var res = [];
        arr.forEach(val=>{
            if(Array.isArray(val)){
                var flatArr = ln2365539311.flattenDeep(val);
                res.push(...flatArr);
            }else{
                res.push(val);
            }
        })
        return res;
    },

    flattenDepth:function(arr,depth=1){
        var res = [];
        if(depth==0){
            return arr.slice();
        }
        arr.forEach(val=>{
            if(Array.isArray(val)){
                var flatArr = ln2365539311.flattenDepth(val,depth-1);
                res.push(...flatArr);
            }else{
                res.push(val);
            }
        })
        return res;

        /*
            return Array(depth).fill(0).reduce((val)=>{
                return flatten(arr);
            },arr);
        */ 
    },

    /**
     * 将数组以 key-values 的对象形式返回
     * @param {Array} ary 二维数组
     * @returns {Object} 返回一组对象
     */
    fromPairs:function(ary){
        var obj = {};
        for(var key of ary){
            obj[key[0]]=key[1];
        }
        return obj;
    },

    /**
     * 
     * @param {Array} ary 一维数组
     */
    fromPairsOneDemension(ary){
        var res = {};
        res[ary[0]]=ary[1];
        return res;
    },

    /**
     * 
     * @param {*} arr 
     * @param {*} val 
     * @param {*} fromIndex 
     */
    indexOf:function(arr,val,fromIndex = 0){
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

    /**
     * 通过函数的值来达到相交
     * @param  {...Array} args 
     * @param {Function} iteratee 
     * @returns {Array} 返回一个相交的新数组
     */
    intersectionBy:function(...args){
        var ary=Array.from(args);
        var f=ary.slice(ary.length-1,ary.length)[0];
        var filterArr=ary.slice(0,ary.length-1);
        iteratee=this.typeConvert(f);
        var res = filterArr[0];
        var ret;
        for(var i=1; i<filterArr.length; i++){
            ret=res.filter(val=>{
                return filterArr[i].map(val=>interseval=iteratee(val)).includes(iteratee(val));
            });
        }        
        return ret;
    },


    intersectionWith:function(...args){  //  ...args
        var ary=Array.from(args);
        var f=ary.slice(ary.length-1,ary.length)[0];
        var filterArr=ary.slice(0,ary.length-1);
        var iterator=this.typeConvert(f);

        //  一维数组 里面包含的是 需要被删除对象
        var firstArr = filterArr[0];  
        var resArr=[];
        for(var i=1; i<filterArr.length; i++){
            for(var j=0; j<firstArr.length; j++){ 
                if(iterator(firstArr[j],filterArr[i][j])){
                    resArr.push(firstArr[j]);
                }
            }
        }
        return resArr;
    },


    join:function(arr,separator = ","){
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

    /**
     * 
     * @param {Array} array 需要被修改的数组
     * @param {Array} values 要被删除的值
     * @param {Function} iteratee 调用的函数
     */
    pullAllBy:function(array,values,iteratee){
        iterator=this.typeConvertVal(iteratee);
        // 把values中的对象映射成值
        var valArr=values.map(valM=>iterator(valM));
        var res = array.slice();
        return res.filter((valF)=>{  //  val=>{}
            var val=iterator(valF);
            return !valArr.includes(val);
        });
    },

    /**
     * 
     * @param {Array} array 被修改的元素
     * @param {Array} values 要被移除的值
     * @param {Function} compator 调用元素移除的值
     */
    pullAllWith:function(array,values,compator){
        for(let kR in array){
            for(let kV in values){
                if(compator(array[kR],values[kV])){  // 需要被剔除
                    array.splice(kR,1,array[kR]);
                }
            }

        }
        return array;
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

    /**
     * 返回values在数组中的下标
     * @param {Array} array 需要被排序的数组
     * @param {*} value 
     * @param {Function} iteratee 
     */
    sortedIndexBy:function(array,value,iteratee){
        var iterator=this.typeConvertVal(iteratee);
        // 把 value 映射 成 数组的值
        var valArr=iterator(value);
        for(var key=0; key<array.length; key++){
            var val=iterator(array[key]);
            if(valArr==val){
                return key;
            }
        }
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

    sortedLastIndex:function(array,value){
        for (var i = 0; i < array.length; i++) {
            if (array[i] <= value && value < array[i + 1]) {
                return i + 1
            }
        }
    },

    /**
     * 最后出现的位置
     * @param {Array} array 
     * @param {*} value 
     * @param {Function} iteratee 
     */
    sortedLastIndexBy:function(array,value,iteratee){
        var iterator=this.typeConvertVal(iteratee);
        // 把 value 映射 成 数组的值
        var valArr=iterator(value);
        for(var key=0; key<array.length; key++){
            if (iterator(array[key]) <= valArr && valArr < iterator(array[key + 1])) {
                return key + 1;
            }
        }
    },

    sortedLastIndexOf:function(array,value){
        for(var i=array.length; i>=0; i--){
            if(array[i]==value){
                return i;
            }
        }
        return -1;
    },

    // 去重
    sortedUniq:function(array){
        var obj = {};
        for(var i=0; i<array.length; i++){
            if(obj[array[i]]){
                array.splice(array,1); 
            }else{
                obj[array[i]]=1;
            }
        }
        return array;
    },

    sortedUniqBy:function(array,iteratee){
        // 把数组映射一下，然后调用上面的 sortedUniq去重即可
        var iterator = this.typeConvertVal(iteratee);
        var res=[];
        var tmp=[];
        // 只保留第一个
        for(var i=0; i<array.length; i++){
            if(!tmp.includes(iterator(array[i]))){
                tmp.push(iterator(array[i]));
                res.push(array[i]);
            }
        }
        return res;
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
    
    takeRightWhile:function(array,predicate){
        var iterator = this.typeConvertVal(predicate);
        var res = [];
        for(var i=array.length-1; i>=0; i--){
            if(iterator(array[i])){
                res.push(array[i]);
            }else{
                return res.reverse();
            }
        }
        return res.reverse();
    },

    takeWhile:function(array,predicate){
        var iterator = this.typeConvertVal(predicate);
        var res = [];
        for(var i=0; i<array.length; i++){
            if(iterator(array[i])){
                res.push(array[i]);
            }else{
                return res;
            }
        }
        return res;
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
     * 通过传入的参数转出对应的东西`
     * @param  {...any} args 
     */
    unionBy:function(...args){   //  这个逻辑应该会是对的，如果不对去修改 equals
        // 转成数组
        var arr = Array.from(args);
        // 拿到函数
        var f = arr[arr.length-1];
        var iterator=this.typeConvertVal(f);
        // 剩下的数组
        var restArr = arr.slice(0,arr.length-1);
        var res = restArr[0];
        // 先把res映射成一个想要的
        var tmp = res.map((val)=>iterator(val));
        for(var i=1; i<restArr.length; i++){
            for(var j=0; j<restArr[i].length; j++){
                var val = iterator(restArr[i][j]);
                if(!tmp.includes(val)){
                    res.push(restArr[i][j]);
                }
            }
        }
        return res;

        /*
        
        for(let kR in array){
            for(let kV in values){
                if(compator(array[kR],values[kV])){  // 需要被剔除
                    array.splice(kR,1,array[kR]);
                }
            }

        }
        return array;
        
        */
    },


    unionWith:function(...args){
        // 转成数组
        var arr = Array.from(args);
        // 拿到函数
        var f = arr[arr.length-1];
        var iterator=this.typeConvertVal(f);
        // 剩下的数组
        var restArr = arr.slice(0,arr.length-1);  // 二维数组
        var res = [];
        var tmp = res.map((val)=>iterator(val));
        for(var i=0; i<restArr.length; i++){
            for(var j=0; j<restArr[i].length; j++){
                var val=iterator(restArr[i][j]);
                if(!tmp.includes(val)){
                    res.push(restArr[i][j]);
                }
            }
        }
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
    
    uniqBy:function(array,iteratee){  //  
        var iterator = this.typeConvertVal(iteratee);
        var res=[];
        var tmp=[];
        // 只保留第一个
        for(var i=0; i<array.length; i++){
            if(!tmp.includes(iterator(array[i]))){
                tmp.push(iterator(array[i]));
                res.push(array[i]);
            }
        }
        return res;
    },

    /**
     * 
     * @param {Array} array 数组中包含着多个对象
     * @param {Function} comparator 比较器
     */
    uniqWith:function(array,comparator){
        var res=[array[0]];
        for(var i=1; i<array.length; i++){
            if(comparator(array[0],array[i])){  //  comparator(obj1,obj2)
                res.push(array[i]);
            }
        }
        return res;
    },

    /**
     * 还原为原来的数组
     * @param {Array} array 二维数组  
     */
    unzip:function(array){
        var res = [];
        for(var i=0; i<array[0].length; i++){
			res.push([]);
		}
        array.forEach((arr)=>{
            arr.forEach((val,index)=>{
                res[index].push(val);
            });
        });
        return res;
    },

    unzipWith:function(array,iteratee){
        // 遍历数组拿到最大长度
        // var maxLen = Math.max(array.map(val=>val.length));
        var iterator=this.typeConvertVal(iteratee);
        var res=[];
        for(var i=0; i<array.length-1; i++){
            for(var j=0; j<array[i].length; j++){
                var num=iterator(array[i][j],array[i+1][j]);
                res.push(num);
                continue;
            }
        }
        return res;
    },


    without:function(array,...args){
        var res=[];
        var argArr = Array.from(args);
        for(var val of argArr){
            if(!array.includes(val)){
                res.push(val);
            }
        }
        return res;
    },

    /**
     * 求各数组中的差集
     * @param  {...Array} args 
     */
    xor:function(...args){
        var argsArr = Array.from(args);
        var res=[];
        for(var val of argsArr){
            if(!res.includes(val)){
                res.push(val);
            }
        }
        return res;
    },

    /**
     * 把同样的元素去掉
     * @param  {...Array} args 未知个数组 
     * @param  {Function} 函数转换
     * 
     */
    xorBy:function(...args){   
        // 转成数组
        var arr = Array.from(args);
        // 拿到函数
        var f = arr[arr.length-1];
        var iterator=this.typeConvertVal(f);
        // 剩下的数组
        var restArr = arr.slice(0,arr.length-1);  // 二维数组
        var res = restArr[0];
        var tmp = restArr[0].map((val)=>iterator(val));
        for(var i=1; i<restArr.length; i++){
            for(var j=0; j<restArr[i].length; j++){
                var val=iterator(restArr[i][j]);
                if(!tmp.includes(val)){
                    res.push(restArr[i][j]);
                }else{  // 如果包括的话就需要把包括的删除
                    var index = tmp.indexOf(val);  // 没有考虑NaN的情况
                    res.splice(index,1);
                }
            }
        }
        return res;
    },


    xorWith:function(...args){
        // 转成数组
        var arr = Array.from(args);
        // 拿到函数
        var f = arr[arr.length-1];
        var iterator=this.typeConvertVal(f);
        // 剩下的数组
        var restArr = arr.slice(0,arr.length-1);  // 二维数组
        var res = [];
        var tmp = res.map((val)=>iterator(val));
        for(var i=0; i<restArr.length; i++){
            for(var j=0; j<restArr[i].length; j++){
                var val=iterator(restArr[i][j]);
                if(!tmp.includes(val)){
                    res.push(restArr[i][j]);
                }
            }
        }
        return res;
        // if(!comparator(arr1,arr2)){
        //     res.push();
        // }
    },


    /**
     * 创建一个排除给定值的数组
     * @param {Array} arr 数组
     * @param  {Number} args 不定数量的参数
     */
    without:function(arr,...args){
        return arr.filter(item=>!args.includes(item));
    },
    
    xor:function(...args){
        var res = [];
        args.forEach((valArr)=>{
            res=res.concat(valArr);
        });
        // console.log(res);
        var obj = {};
        res.forEach((val)=>{
            if(obj[val]){
				obj[val]++;
			}else{
				obj[val]=1;
			}
        })
        var r = [];
        for(var i in obj){
            if(obj[i]==1){
                r.push(Number(i));
            }
        }
        return r;
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
            for(var j=i; j<arrVal.length; j++){
                obj[arrProps[i]]=arrVal[j];
                break;
            }
        }
        return obj;
    },

    zipObjectDeep:function(props=[],values=[]){   //  【用对象的深拷贝】
        var res={};
        for(var i=0; i<props.length; i++){
            var tmp=res;
            var arr=props[i].split(/[^\w]+/g);
            var valArr=arr[arr.length-1]!=undefined?arr[arr.length-1]:arr[arr.length-2];
            // 遍历 arr 中 对象的属性
            var j=0;
            while(j<arr.length){
                var p=arr[j];  //  数组中的各个元素 //  a b 0 等
                if(tmp[p]){
                    tmp=tmp[p];
                }else{
                    if(!isNaN(arr[j+1])){
                         tmp[p]=[];
                    }else{
                        if(j==arr.length-1){
                            break;
                        }else{
                            tmp[p]={};
                        }
                    }    
                    // 最后把最后一次赋值的传给tmp
                    tmp=tmp[p];
                }
                j++;
            }
            tmp[valArr]=values[i];
        }
        return res;
        
        /*
        var res={};
        for(let i=0; i<props.length; i++){
            var tmp=res;
            var arr=props[i].split(/[^\w]+/g);
            // 遍历 arr 中 对象的属性
            for(let j=0; j<arr.length-1; j++){
                if(tmp[arr[j]]){
                    tmp=tmp[arr[j]];
                }else{
                    if(!isNaN(arr[j+1])){
                        tmp[arr[j]]=[];
                    }else{
                        tmp[arr[j]]={};
                    }
                    tmp=tmp[arr[j]];
                }
            }
            tmp[arr[arr.length-1]]=values[i];
        }
        return res;
        */    
    },

    zipWith:function(...args){
        var arr=Array.from(args);
        var f=this.typeConvert(arr.slice(arr.length-1)[0]);
        arr=arr.slice(0,arr.length-1);
        var tmp=this.zip(...arr);
        var res=[];
        tmp.forEach(subArr=>{
            var num=0;
            subArr.forEach(val=>{
                num+=f(val,0,0);
            });
            res.push(num);
        })
        return res;
    },


//=======================================================Collection - 集合模块==========================================================

    /**
     * 对数组或对象中每一项进行predicate求值，统计key的值有多少个
     * @param {Array|Object} collection 
     * @param {Function} predicate 
     * @returns {Object} 
     */
    countBy:function(collection,predicate){
        
        var res={};
        for(var key in collection){
            var str = collection[key];
            if(this.judgeType(predicate)=="String"){
                var calVal=str[predicate];
            }else{
                var calVal=predicate(str);
            }
            if(res[calVal]){
                res[calVal]++;
            }else{
                res[calVal]=1;
            }
        }
        return res;
    },

    every:function(arr,predicate){
        predicate=this.typeConvert(predicate);
        return arr.reduce((acm,value,idx,arr)=>{
            return acm && predicate(value,idx,arr);
        },true);

        /*
        for(var i=0; i<arr.length; i++){
            if(!predicate(arr[i])){
                return false;
            }
        }
        return true;
        */
    },
    

    /**
     * 返回集合中条件为真的元素
     * @param {Array|Object} collection 
     * @param {Function} predicate 
     */
    filter:function(collection,predicate){
        var predicator = this.typeConvertValForFilter(predicate);
        var res=[];
        for(var key in collection){
            if(predicator(collection[key])){
                res.push(collection[key]);
            }
        }
        return res;
    },
    

    /**
     * 找到集合中第一个符合条件的元素
     * @param {Array|Object} collection 
     * @param {Function} predicate 
     * @param {Number} fromIndex 
     * @returns {*} Returns the matched element, else undefined.
     */
    find:function(collection,predicate,fromIndex = 0){
        if(this.judgeType(predicate)=="String"){
            for(var key in collection){
                if(collection[key]){
                    return collection[key];
                }
            }
        }else if(this.judgeType(predicate)=="Object"){
            // 是对象就对比两个对象
            for(var val of collection){
                var flag=true;
                for(var key in predicate){
                    if(val[key]!==predicate[key]){
                        flag=!flag;
                        break;
                    }
                }
                if(flag){
                    return val;
                }
            }
        }else if(this.judgeType(predicate)=="Array"){  // 把数组转为对象之后然后保留属性为真的那个
            // 把 predicate 数组转为对象 然后两个进行对比
            predicate=this.fromPairsOneDemension(predicate);
            // 判断predicate是否在 ary 中
            for(var i=fromIndex; i<collection.length; i++){
                if(this.isSubSet(predicate,collection[i])){
                    return collection[i];
                }
            }
        }else if(this.judgeType(predicate)=="Function"){
            for(var key in collection){
                if(predicate(collection[key])){
                    return collection[key];
                }
            }
        }
        return undefined;
    },

    /**
     * 从右向左寻找元素
     * @param {Array|Object} collection 
     * @param {Function} predicate 
     * @param {Number} fromIndex 
     */
    findLast:function(collection,predicate,fromIndex=collection.length-1){
        // var keyArr = Object.keys(collection);
        var predicator = this.typeConvert(predicate);
        for(var i=fromIndex; i>=0; i--){
            if(predicator(collection[i],i,collection)){
                return collection[i];
            }
        }
    },

    flatMap:function(collection,iteratee){
        var iterator=this.typeConvert(iteratee);
        var res=[];
        for(var key in collection){
            res.push(iterator(collection[key],key,collection));
        }
        return res.flat();
    },

    flatMapDeep:function(collection,iteratee){
        var iterator=this.typeConvert(iteratee);
        var ret=[];
        for(var key in collection){
            ret.push(iterator(collection[key],key,collection));
        }
        return ln2365539311.flattenDeep(ret);
    },

    flatMapDepth:function(collection,iteratee,depth=1){
        var iterator=this.typeConvert(iteratee);
        var ret=[];
        for(var key in collection){
            ret.push(iterator(collection[key],key,collection));
        }
        return ln2365539311.flattenDepth(ret,depth);
    },

    forEach:function(collection,iteratee){
        for(var key in collection){
            var res= iteratee(collection[key],key,collection);
            if(res==false){
                break;
            }
        }
        return collection;
    },

    forEachRight:function(collection,iteratee){
        var keyArr = Object.keys(collection);
        for(var i=keyArr.length-1; i>=0; i--){
            var res= iteratee(collection[i],i,collection);
            if(res==false){
                break;
            }
        }
        return collection;
    },

    // 分组
    groupBy: function (ary, predicate) {
        /*
        var res = {};
        for (var i = 0; i < arr.length; i++) {
            var groupKey = predicate(arr[i], i, arr);
            if (groupKey in res) {
                res[groupKey].push(arr[i]);
            } else {
                res[groupKey] = [arr[i]];
            }
        }
        return res;
        */
        var res={};
        // 将by转换为函数
        var f=predicate;
        if(typeof predicate == "string"){
            f=item=>item[predicate];
        }
        ary.forEach(val=>{
            var key=f(val);
            if(key in res){
                res[key].push(val);
            }else{
                res[key]=[val];
            }
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
                if(collection[i]==val){
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
        return false;
    },

    /**
     * 调用path（路径）上的方法处理 collection(集合)中的每个元素，返回一个数组，包含每次调用方法得到的结果。任何附加的参数提供给每个被调用的方法。如果methodName（方法名）是一个函数，每次调用函数时，内部的 this 指向集合中的每个元素。
     * @param {Array|Object} collection 用来迭代的集合
     * @param {Array|Funciton|String} path 用来调用方法的路径或者每次迭代调用的函数
     * @param {...*} predicate 调用每个方法的参数
     */
    invokeMap:function(collection,path,...args){
        let re = [];
        if (typeof collection == "object") {
            for (let key in collection) {
                if (typeof path == "function") {
                    let temp = path.call(collection[key], ...args);
                    re.push(temp);
                } else {
                    let temp = this.judgeFunc(path)(collection[key]).call(collection[key],...args);
                    re.push(temp);
                }
            }
        }
        return re;
    },

    
    keyBy:function(array,key){
        if(typeof key == 'string'){
            return array.reduce((val,item)=>{
                val[item[key]]=item;
                return val;
            },{});
        }else if(typeof key == 'function'){
            return array.reduce((val,item)=>{
                val[key(item)]=item;
                return val;
            },{});
        }
    },


    /**
     * 通过迭代函数 对传入的集合进行转换
     * @param {Array|Object} collection 集合
     * @param {迭代器} iteratee 迭代函数
     * @param {Array} 返回一个新数组
     */
    map:function(collection,predicate){   //  可以 调用 _.iteratee 
        var res=[];
        iterator=this.typeConvertVal(predicate);
        for(var key in collection){
            res.push(iterator(collection[key]));
        }
        return res;
    },

    /**
     * 对不同字段进行不同的排序
     * @param {Array|Object} collection 被迭代的集合
     * @param {Array[] | Function[] | Object[] | String[]} iteratees 迭代的顺序  
     * @param {Strings[]} orders  
     */
    orderBy:function(collection,iteratees,orders){
        
    },

    partition:function(collection,predicate){
        var predicator=this.typeConvertValForFilter(predicate);
        var res=[];
        var firstArr = [];
        var secArr = [];
        // 对 collection key排序
        for(var key in collection){
            if(predicator(collection[key])){
                firstArr.push(collection[key]);
            }else{
                secArr.push(collection[key]);
            }
        }
        res.push(firstArr,secArr);
        return res;
    },

    /**
     * 
     * @param {Array|Object} collection 
     * @param {Function} iteratee 
     * @param {*} accumulator 
     */
    reduce:function(collection,iteratee,accumulator){
        // 叠加器
        var reducer = this.typeConvertValForFilter(iteratee);
        // 先默认为数组的长度
        if(Array.isArray(collection))
            keyArr = collection.length;
        // 如果是对象，把数组的长度覆盖，走对象的
        if(this.judgeType(collection) == "Object"){
            objKeys = Object.keys(collection);
            keyArr=objKeys.length;
        }
        // 默认 索引为0
        var index = 0;
        // 如果参数只有两个，更改叠加器为集合的第一个元素
        if(arguments.length==2){
            if(Array.isArray(collection))
                accumulator=collection[0];
            if(this.judgeType(collection)=="Object"){
                accumulator=keyArr[0];
            }
            index=1;
        }
        while(index<keyArr){
            if(Array.isArray(collection))
                accumulator=reducer(accumulator,collection[index],index);
            if(this.judgeType(collection)=="Object"){
                accumulator=reducer(accumulator,collection[objKeys[index]],objKeys[index]);
            }
            index++;
        }
        return accumulator;
    },

    /**
     * 
     * @param {Array|Object} collection 
     * @param {Function} iteratee 
     * @param {*} accumulator 
     */
    reduceRight:function(collection,iteratee,accumulator){
        // 叠加器
        var reducer = this.typeConvertValForFilter(iteratee);
        // 先默认为数组的长度
        if(Array.isArray(collection))
            keyArr = collection.length;
        // 如果是对象，把数组的长度覆盖，走对象的
        if(this.judgeType(collection) == "Object"){
            objKeys = Object.keys(collection);
            keyArr=objKeys.length;
        }
        // 默认 索引为0
        var index = keyArr-1;
        // 如果参数只有两个，更改叠加器为集合的第一个元素
        if(arguments.length==2){
            if(Array.isArray(collection))
                accumulator=collection[index];
            if(this.judgeType(collection)=="Object"){
                accumulator=keyArr[index];
            }
            index=collection.length-1;
        }
        while(index>=0){
            if(Array.isArray(collection))
                accumulator=reducer(accumulator,collection[index],index);
            if(this.judgeType(collection)=="Object"){
                accumulator=reducer(accumulator,collection[objKeys[index]],objKeys[index]);
            }
            index--;
        }
        return accumulator;
    },

    /**
     * 返回不为真的元素
     * @param {Array|Object} ary 
     * @param {Function} test 
     */
    reject:function(ary,test){
        var testor = this.typeConvertValForFilter(test);
		return ln2365539311.filter(ary,ln2365539311.negate(testor));
	},

    sample:function(collection){
        var type = this.judgeType(collection);
        if(type=="Array"){
            var num = Math.floor(Math.random()*(type.length));
            return collection[num];
        }else if(type=="Object"){
            var num = Math.random()*(Object.values(type).length);
            return collection[num];
        }
    },

    sampleSize:function(collection,n=1){
        var n = Math.floor(Math.random()*(collection.length));
        var len = collection.length;
        var res = [];
        for(var i=n%len; i<len; i++){
            res.push(collection[i]);
        }
        for(var i=0; i<collection.length; i++){
            if(res.length<n && !res.includes(collection[i])){
                res.push(collection[i]);
            }
        }
        return res;
    },
    
    shuffle:function(collection){  // 洗牌算法 - 打乱数组
        var n = collection.length;
        for(var i=0; i<n; i++){
            var randNum = i+Math.floor(Math.random()*(n-i));
            var tmp = collection[i];
            collection[i] = collection[randNum];
            collection[randNum]=tmp;
        }
        return collection;
    },

    size:function(collection){
        return Object.values(collection).length;
    },

    some:function(collection,iteratee){
        var iterator = this.typeConvertValForFilter(iteratee);
        for(var key in collection){
            if(iterator(collection[key])){
                return true;
            }
        }
        return false;
    },


    /**
     * 
     * @param {Array|Object} collection 被迭带的集合
     * @param {...(Function|Function[]} iteratees 迭代器顺序
     */
    sortBy:function(collection,iteratees){
        iteratees=this.typeConvert(iteratees);
        var res=[];

    },
    



//=============================================Function - 函数模块============================================

    after:function(n,func){
		var times = 0;
		return function(...args){
			times++;
			if(times<n){
				// do nothing
				return;
			}else{
				return func(...args);
			}
		}
	},

    ary:function(func,n=f.length){
		return function(...args){
			return func(...args.slice(0,n));
		}
    },
    
    

    before:function(n,func){
		var times = 0;
		var lastCall;
		return function(...args){
			times++;
			if(times<n){
				return lastCall = func(...args);
			}else{
				return lastCall;
			}
		}
	},


    bind:function(f,obj,...fixedArgs){
        // 双指针实现
        /*return function(newObj,...args){  // [7,8,9]
            newObj=obj;
			// 简单来讲就是把args的参数补充到null的地方去
			var arr = fixedArgs.slice();
			for(var i=0,j=0; i<arr.length; i++){
				if(arr[i]==null){
					arr[i]=args[j];
					j++;
				}
			}
			// 如果 下面要赛入的数据没传完
			while(j<args.length){
				arr.push(args[j++]);
			}
			return f.call(newObj,...arr);
        }*/
        return function(...args){
            return f.call(obj,...fixedArgs,...args);
        }
    },

    /**
     * 
     * @param {*} func 
     * @param {*} args 
     */
    defer:function(func){
        return function(...reArg){
            return func(...reArg);
        }
    },

    delay:function(func,wait){
        return function(...args){
            setTimeout(func(...args),wait);
        }
    },

    /**
     * 对函数取反
     * @param {Function} f 入参函数
     */
    negate:function(f){
        return function(...args){
            return !f(...args);
        }
    },
    
    once:function(func){
        var count = 0;
        var res = null;
        return function(...args){
            if(count>1){
                return res;
            }
            res=func.call(null,...args);
            return res;
        }
    },

    flip:function(func){
        return function(...args){
            return func(...args.reverse());
        }
    },

	unary:function(func){
		return this.ary(func,1);
    },
    
    spread:function(func){
		return function(args){
			return func(...args);
		}
    },
    
    memoize:function(func){  // 创建一个函数 能记住 调用 func 函数的结果
		var memo  = {};
		return function(...args){
			if(args in memo){
				return memo[args]
			}else{
				return memo[args]=func(args);
			}
		}
	},



// =============================================Lang - 语言模块 ==============================================



    castArray:function(value){
        return Array.of(value);
    },


    clone:function(value){
        var res = value;
        return res;
    },

    cloneDeep:function(value){
        var res = {};
        for(var key in value){
            if(this.judgeType(value[key])!=="Object"){
                res[key] = value[key];
            }else{
                res[key]=ln2365539311.cloneDeep(value[key]);
            }
        }
        return res;
    },

    /**
     * 
     * @param {Object} object 
     * @param {Object} source
     * @param {Boolean} (boolean): Returns true if object conforms, else false. 
     */
    conformsTo:function(object,source){
        for(var key in object){
            var iterator = this.typeConvertValForFilter(source[key]);
            if(iterator!=undefined){
                if(iterator(object[key])){
                    return true;
                }
            }
        }
        return false;
    },


    
    eq:function(value, other){
        if(value!==value && other!==other){
            return true;
        }else{
            return value===other;
        }
    },

    gt:function(value, other){
        return value > other
    },
    
    gte:function(value, other){
        return this.eq(value, other) || this.gt(value, other)
    },
    
    isArguments:function(value){
        var res = this.judgeType(value);
        if(res=='Object' && Object.entries(value).length!=0){
            return true;
        }
        return false;
    },

    isArray:function(arr) {
        if (Array.isArray(arr)) {
            return true
        }
        return false
    },

    isArrayBuffer:function(value){
        return this.judgeType(value)=="ArrayBuffer";
    },

    isArrayLike:function(value){
        if(this.judgeType(value)!=="Function"){
            if(value.length && value.length>=0 && value.length<=Math.pow(2,31)-1){
                return true;
            }
        }
        return false;
    },

    isArrayLikeObject:function(value){
        return typeof value=="object";
    },


    isBoolean:function(value){
        return this.judgeType(value)=='Boolean';
    },

    isDate:function(value){
        return this.judgeType(value)=='Date';
    },


    isElement:function(value){
        return typeof value == "object";
    },

    isEmpty:function(value){
        return value!=null?true:false;
    },


    // 需要多斟酌
    isEqual:function(value,other){   //  深拷贝
        if(typeof value=="object"){
            if(Object.keys(value).length != Object.keys(other).length){
                return false;
            }
            for(var key in value){
                if(typeof value[key]=='object' && typeof other[key]=='object' && ln2365539311.isEmpty(value[key]) && ln2365539311.isEmpty(other[key])){
                    return true;
                }else if(value[key]!=other[key]){
                    return false;
                }else if(typeof value[key]=="object" && typeof other[key]!="object"){  
                    return false;
                }else if(typeof value[key]=='object' && typeof other[key]=='object'){//  如果 键 仍然为 对象或其它 递归进行
                    ln2365539311.isEqual(value[key],other[key]);
                }
            }
        }else if(this.judgeType(value)!=this.judgeType(other)){
            return false;
        }else if(value != other){
            return false;
        }
        return true;
    },
    
    isEqualWith: function (value, other, customizer) {
        if (value instanceof Array && other instanceof Array) {
            if (value.length !== other.length) return false;
            var result = true;
            result = result && this.isEqualWith(value[0], other[0], customizer);
            // if(result===false)break;
            return result;
        } else if (typeof value === 'object' && typeof other === 'object') {
            var count1 = 0;
            var count2 = 0;
            for (var key in value) {
                count1++;
            }
            for (var key in other) {
                count2++;
            }
            if (count2 !== count1) return false;

            for (var key in value) {
                if (!this.isEqualWith(value[key], other[key], customizer)) {
                    return false;
                }
            }
            return true;
        } else {
            if (customizer(value, other)) {
                return true;
            } else {
                return false;
            }
        }
    },

    isError: function (value) {
        return value instanceof Error;
    },

    isFinite: function (value) {
        return typeof value === 'number' && isFinite(value);
    },

    isFunction: function (value) {
        return typeof value === 'function';
    },

    isInteger: function (value) {
        return typeof value === 'number' && isFinite(value) && parseInt(value) === value;
    },

    isLength: function (value) {
        return this.isInteger(value) && (value >= 0);
    },

    isMap: function (value) {
        return value instanceof Map;
    },

    isMatch: function (object, source) {
        for (var key in source) {
            if (typeof source[key] !== 'object') {
                if (source[key] !== object[key]) {
                    return false;
                }
            } else {
                if (!this.isMatch(source[key], object[key])) {
                    return false;
                }
            }
        }
        return true;
    },

    isMatchWith: function (object, source, customizer) {
        for (var key in source) {
            if (!customizer(source[key], object[key])) {
                return false;
            }
        }
        return true;
    },

    isNaN: function (value) {
        if (value === null || value === undefined) return false;
        return value.constructor === Number && !(value === value);
    },
    
    isNative: function (value) {

    },

    isNil: function (value) {
        return value === null || value === undefined;
    },

    isNull: function (value) {
        return value === null;
    },

    isNumber: function (value) {
        return typeof value === 'number';
    },

    isObject: function (value) {
        return (typeof value === 'object' || typeof value === 'function') && value !== null;
    },

    isObjectLike: function (value) {
        return typeof value === 'object' && value !== null;
    },

    isPlainObject: function (value) {
        return value.constructor === Object;
    },

    isRegExp: function (value) {
        return value instanceof RegExp;
    },

    isSafeInteger: function (value) {
        return this.isInteger(value) && Number.isSafeInteger(value);
    },

    isSet: function (value) {
        return value instanceof Set;
    },

    isString: function (value) {
        return typeof value === 'string';
    },

    isSymbol: function (value) {
        return typeof value === "symbol";
    },

    isTypedArray: function (value) {
        return value instanceof Uint16Array || value instanceof Uint32Array || value instanceof Uint8Array || value instanceof Uint8ClampedArray;
    },

    isUndefined: function (value) {
        return value === undefined;
    },

    isWeakMap: function (value) {
        return value instanceof WeakMap;
    },

    isWeakSet: function (value) {
        return value instanceof WeakSet;
    },

    lt:function(value, other){
        return value < other
    },
    
    lte:function(value, other){
        return this.eq(value, other) || this.lt(value, other)
    },
    
    toArray:function(value){
        if(value==null) return [];
        var res=[];
        for(var val in value){
            res.push(value[val]);
        }
        return res;
    },

    toFinite:function(value){
        if (this.isFinite(Number(value))) return Number(value);
        else return Number(value) > Number.MAX_VALUE ? Number.MAX_VALUE : Number.MIN_VALUE;
    },
    
    toInteger:function(value){
        if(value==Infinity){
            return Number.MAX_VALUE;
        }
        if(value==-Infinity){
            return Number.MIN_VALUE;
        }
        
        return value==null?null:Math.floor(value);
    },

    toLength:function(value){
        value = this.toFinite(value);
        if (value > 0xFFFFFFFF) return 0xFFFFFFFF;
        else return this.floor(value);
    },

    toNumber:function(value){
        value=this.toFinite(value);
        return Number(value);
    },

    toSafeInteger:function(value){
        value = this.toFinite(value);

        if (value > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
        if (value < Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER;
        return value == null ? null : this.floor(value);
    },

    toString:function(value){
        return value.toString();
    },



//=============================================  Math - 数学模块  ======================================================== 


    add:function(augend, addend){
        return augend + addend;
    },
    
    ceil:function(val,p=0){
        if (p > 0) {
            return Math.ceil(val * 10 ** p) / 10 ** p;
        } else if (p < 0) {
            return Math.ceil(val / 10 ** (-p)) * 10 ** (-p);
        } else {
            return Math.ceil(val);
        }
    },
    
    divide:function(dividend, divisor){
        return dividend / divisor;
    },
    
    floor:function(val, p=0){
        if (p > 0) {
            return Math.floor(val * 10 ** p) / 10 ** p;
        } else if (p < 0) {
            return Math.floor(val / 10 ** (-p)) * 10 ** (-p);
        } else {
            return Math.floor(val);
        }
    },
    
    
    max:function(array){
        if(array.length==0){
            return undefined;
        }else{
            return Math.max(...array);
        }
    },

    maxBy:function(value,iteratee){
        var max = -Infinity;
        var res = null;
        var iterator = this.typeConvertValForFilter(iteratee);// 转换
        for(var key in value){
            if(iterator(value[key],key,value)>max){
                max=iterator(value[key],key,value);
                res=value[key];
            }
        }
        return res;
    },

    // 求平均数
    mean:function(array){
        var sum = array.reduce((acm,val)=>{
            return acm+val;
        });
        return sum/array.length;
        // return array.reduce((acm,val)=>acm+val)/array.length;
    },

    meanBy:function(array,iteratee){
        var iterator=this.typeConvertValForFilter(iteratee);
        var sum=0;
        for(var val of array){
            sum+=iterator(val);
        }
        return sum/array.length;
    },

    min:function(array){
        if(!array.length){
            return undefined;
        }
        return array.reduce((acm,val)=>acm<val?acm:val); 
    },
    
    minBy:function(array,iteratee){
        if(!array.length){
            return undefined;
        }
        var iterator = this.typeConvertValForFilter(iteratee);
        var min = Infinity;
        for(var val of array){
            if(iterator(val)<min){
                min=val;
            }
        }
        return min;
    },

    multiply:function(multiplier, multiplicand){
        return multiplier*multiplicand;
    },
    
    round:function(number,precision=0){
        if(precision<0){
            precision=-precision;
            number=number/(10 ** precision);
            number=Math.ceil(number);
            return number*10**precision;
        }
        return Number(number.toFixed(precision));
    },
    
    subtract:function(minuend, subtrahend){
        return minuend-subtrahend;
    },
    
    sum:function(array){
        return array.reduce((acm,val)=>acm+val);
    },
    
    sumBy:function(array,iteratee){
        var iterator = this.typeConvertValForFilter(iteratee);
        var sum=0;
        for(var val of array){
            sum+=iterator(val);
        }
        return sum;
    },



//============================================== Number - 数字模块 =======================================================
    clamp:function(number,lower,upper){
        if (number > upper) return upper;
        if (number < lower) return lower;
        return number;
    },

    inRange:function(number,start=0,end){
        if (arguments.length == 2) {
            start = 0,
                end = arguments[1];
        }
        if (end < start) {
            var temp = end;
            end = start;
            start = temp;
        }
        return number >= start && number < end;
    },

    random:function(lower=0,upper=1,floating){

    },
    
    
//============================================== Object - 对象模块 =======================================================
    
    assign:function(object, ...sources){
        return Object.assign(object,...sources);
    },

    assignIn:function(...objects){
        let ans = {};
        for (let i in objects) {
            for (let j in objects[i]) {
                ans[j] = objects[i][j];
            }
        }
        return ans;
    },

    at:function(object, ...paths){
        var res = [];
        paths.flat().forEach((val)=>{
            console.log(eval('object.'+val));  // 点 之前的必须是一个对象
            val=eval('object.'+val);
            res.push(val);
        });
        return res;
    },
    
    defaults:function(target,...objs){  // 后面的会把前面的覆盖
        var obj = objs.flat();
        for(let sourceObj of obj){
            console.log(sourceObj);  // 对象
            for(var s in sourceObj){
                if(!target[s]){
                    target[s]=sourceObj[s];
                }
            }
        }
        return target;
    },
    
    defaultsDeep:function(target,...source){  //  { 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }
        var res = {};
        for(var i in source){
            for(var j in source[i]){ //  {'b':1,'c':3}
                var jVal = source[i][j];
                var type = this.judgeType(jVal);
                if(type == "Object"){
                    this.defaultsDeep(jVal);
                }else if(!target[i]){
                    target[i]=source[i][j];
                }
            }
        }
        return res;
    },


    findKey:function(object,predicate){
        var predicator = this.typeConvertValForFilter(predicate);
        for(var key in object){
            if(predicator(object[key],key,object)){
                return key;
            }
        }
    },

    findLastKey:function(object,predicate){
        var predicator = this.typeConvertValForFilter(predicate);
        var keyArr = Object.keys(object);
        var index = keyArr.length-1;
        while(index<keyArr.length){
            if(predicator(object[keyArr[index]],keyArr[index],object)){
                return keyArr[index];
            }
            index--;
        }
    },

    forIn:function(object,iteratee){
        var iterator = this.typeConvertValForFilter(iteratee);
        for(var i in object){
            iterator(object[i],i,object);
        }
        return object;
    },

    forInRight:function(object,iteratee){
        var iterator = this.typeConvertValForFilter(iteratee);
        var keyArr = [];
        for(var key in object){
            keyArr.push(key);
        }
        var index = keyArr.length-1;
        while(index>=0){
            iterator(object[keyArr[index]],keyArr[index],object);
            index--;
        }
        return object;
    },

        
    forOwn:function(obj,action){
        var hasOwn=Object.prototype.hasOwnProperty;
        for(var key in obj){
            if(hasOwn.call(obj,key)){
                action(obj[key],key,obj);
            }
        }
        return obj;
    },

    // 从后往前
    forOwnRight:function(object,iteratee){
        var iterator = this.typeConvertValForFilter(iteratee);
        var keyArr = [];
        for(var key in object){
            keyArr.push(key);
        }
        var hasOwn=Object.prototype.hasOwnProperty;
        var index = keyArr.length-1;
        while(index>=0){
            if(hasOwn.call(object,keyArr[index])){
                iterator(object[keyArr[index]],keyArr[index],object);
            }
            index--;
        }
        return object;
    },

    functions:function(obj){
        var hasOwn=Object.prototype.hasOwnProperty;
        var res = [];
        for(var key in obj){
            if(hasOwn.call(obj,key)){
                res.push(key); 
            }
        }
        return res;
    },

    functionsIn:function(object){
        var res = [];
        for(var key in object){
            res.push(key);
        }
        return res;
    },

    



    /**
     * 根据路径返回值，如果为undefined则返回默认值
     * @param {Object} object 传入的对象
     * @param {Array|String} path 路径
     * @param {*} defaultValue 默认值
     */
    /*get:function(object,path,defaultValue){
        if(typeof path == "string"){
            var arr = path.split('.');
            var str = 'object';
            for(var i=0; i<arr.length; i++){
                str+='.'+arr[i];
                if(eval(str)==undefined){
                    return defaultValue;
                }
            }
            return eval(str);
        }else if(typeof path == "object"){
            var s = '';
            for(var key=0; key<path.length; key++){
                if(/\d+/.test(path[key])){
                    path[key]='['+path[key]+']';
                }
                if(/\d+/.test(path[key+1])){
                    s=s+path[key];
                }else{    
                    s=s+path[key]+'.';
                }
            }
            s=s.substring(0,s.length-1);
            return eval('object.'+s);
        }
    },  */
    get: function(object, path, defaultValue) {
        if (path.length == 0) return object
        var p = null
        if (typeof path == 'string') {
            // 'a[0].b.c'
            // ".a[0].b.c".split(/[^\w]+/) -> ['', 'a', '0', 'b', 'c'] 注意首位会有个''
            p = path.split(/[^\w]+/g)
        }

        if (!p) p = Array.from(path)
        var ret = object
        while (ret !== undefined && p.length > 0) {
            ret = ret[p.shift()]
        } 
        if (ret === undefined) return defaultValue
        else return ret
    },
    
    // 检验属性是否存在的递归函数,没有的话递归创建

    
    


    /**
     * 
     * @param {Object} object 对象
     * @param {Array|String} path 路径
     */
    has:function(object, path){
        if(typeof path == "string"){
            var tmp = path.split('.');
            for(var i in tmp){
                if(object.hasOwnProperty(tmp[i])){
                    object=object[tmp[i]];  // 把object拿到对应的属性重新赋值给该对象
                    // console.log("重新赋值后的object为：",object);
                }else{
                    return false;
                }
            }
        }else if(typeof path == "object"){  // 数组
            for(var j in path){
                if(object.hasOwnProperty(path[j])){
                    object=object[path[j]];
                }else{
                    return false;
                }
            }
        }
        return true;
    },
    
    hasIn:function(object, path){
        if(typeof path == "string"){
            var tmp = path.split('.');
            for(var i in tmp){
                if(object.hasOwnProperty(tmp[i])){
                    object=object[tmp[i]];  // 把object拿到对应的属性重新赋值给该对象
                    // console.log("重新赋值后的object为：",object);
                }else{
                    return false;
                }
            }
        }else if(typeof path == "object"){  // 数组
            for(var j in path){
                if(object.hasOwnProperty(tmp[i])){
                    object=object[tmp[i]];  // 把object拿到对应的属性重新赋值给该对象
                    // console.log("重新赋值后的object为：",object);
                }else{
                    return false;
                }
            }
        }
        return true;
    },
    
    invert:function(object){
        var res = {};
        for(var key in object){
            res[object[key]]=key;
        }
        return res;
    },
    
    invertBy:function(object,iteratee){
        /*
        var iterator = this.typeConvertValForFilter(iteratee);
        var res = {};
        var keyArr = [];
        for(var key in object){
            var valArr = [];
            if(valArr.includes(object[key])){
                keyArr.push(key);
            }else{

            }
        }
        */
    },


    invoke:function(){

    },




    keys:function(object){
        return Object.keys(object);
    },
    

    keysIn:function(object){
        var res = [];
        for(var key in object){
            res.push(key);
        }
        return res;
    },





    /**
     * 此方法创建一个具有与object和key相同值的对象，该对象和key是通过iteratee运行对象自己的每个可枚举的字符串键属性而生成的
     * @param {Object} obj 
     * @param {Function} predicate 
     */
    mapKeys:function(obj,predicate){
        var res = {};
		for(var key in obj){
			var val=obj[key];
			res[predicate(val,key,obj)]=val;
		}
		return res;
    },

    mapValues:function(obj,mapper){  // 对应 objectValues
        var iterator = this.typeConvertValForFilter(mapper);
		var res = {};
		for(var key in obj){
			var val=obj[key];
			res[key]=iterator(val,key,obj);
		}
		return res;
	},
    
    merge:function(){

    },

    mergeWith:function(){

    },

    
    omit:function(object,...paths){
        var flatPath = paths.flat();
        for(var val of flatPath){  // a
            delete object[val];
        }
        return object;
    },
    
    omitBy:function(object,predicate){
        var res = {};
        var predicator = this.typeConvertValForFilter(predicate);
        for(var key in object){  // a
            if(!predicator(object[key],key,object)){
                res[key]=object[key];
            }
        }
        return res;
    },


    pick:function(object,...paths){
        var res = {};
        var flatPath = paths.flat();
        for(var val of flatPath){  // a
            res[val]=object[val];
        }
        return res;
    },
    

    pickBy:function(object,predicate){
        var predicator = this.typeConvertValForFilter(predicate);
        var res = {};
        for(var key in object){  // a
            if(predicator(object[key],key,object)){
                res[key]=object[key];
            }
        }
        return res;
    },


    result:function(object,path,defaultValue=undefined){
        if (path.length == 0) return object
        var p = null
        if (typeof path == 'string') {
            // 'a[0].b.c'
            // ".a[0].b.c".split(/[^\w]+/) -> ['', 'a', '0', 'b', 'c'] 注意首位会有个''
            p = path.split(/[^\w]+/g)
        }

        if (!p) p = Array.from(path)
        var ret = object
        while (ret !== undefined && p.length > 0) {
            ret = ret[p.shift()]
        } 
        if (ret === undefined){
            if(this.judgeType(defaultValue)=="Function"){
                return defaultValue();
            }else{
                return defaultValue;
            }
        }else{
            if(this.judgeType(ret)=="Function"){
                return ret();
            }else{
                return ret;
            }
        }
    },

    /**
     * 设置对象路径的值。如果路径的一部分不存在，则会创建它。 为缺少的索引属性创建数组，而为所有其他缺少的属性创建对象。 使用_.setWith自定义路径创建。
     * @param {Object} object 入参对象
     * @param {String|Array} path 路径
     * @param {*} value 设置路径的值
     */
    set:function(object, path, value){
        if(typeof path == "string"){
            var arr = path.split('.');
            var str = 'object';
            for(var i=0; i<arr.length; i++){
                str+='.'+arr[i];
                if(eval(str) && i==arr.length-1){
                    eval(str+"="+value);
                }
            }
            return object;
        }else if(typeof path == "object"){
            var s = 'object.';
            for(var key=0; key<path.length; key++){
                var tmp = s;
                if(!/\d+/.test(path[key])){  // 如果当前元素存在数字的话 期望不进行编辑
                    tmp=tmp.substring(0,tmp.length-1);
                }
                if(key>0 && eval(tmp)==undefined){
                    // 判断 path[key] 是什么 然后设置相应的类型
                    if(/\d+/.test(path[key])){  // 当前元素的下一个元素是 数字 代表 为数组
                        // 设置数组
                        eval(tmp+'=[]');
                        eval(tmp+'['+path[key]+']={}');
                    }else{
                        eval(tmp+'={}');
                        eval(tmp+'.'+path[key]+'={}');   // 前一个y都没有就直接设置后面的z会直接报错
                    }
                }
                if(/\d+/.test(path[key])){
                    path[key]='['+path[key]+']';
                }
                if(/\d+/.test(path[key+1])){
                    s=s+path[key];
                }else{    
                    s=s+path[key]+'.';
                }
            }
            s=s.substring(0,s.length-1);
            eval(s+"="+value);
            return object;
        }
    },
    

    
    setWith:function(object,path,value,customizer){
        
    },


    toPairs:function(object){
        var res = [];
        var hasOwn = Object.prototype.hasOwnProperty;
        for(var key in object){
            if(hasOwn.call(object,key)){
                var tmp = [];
                tmp.push(key,object[key]);
                res.push(tmp);
            }
        }
        return res;
    },



    toPairsIn:function(object){
        var res = [];
        for(var key in object){
            var tmp = [];
            tmp.push(key,object[key]);
            res.push(tmp);
        }
        return res;
    },


    transform:function(object,iteratee,accumulator){
        
    },  


    unset:function(){

    },


    update:function(){

    },


    updateWith:function(){

    },

    values:function(object){
        return Object.values(object);
    },

    valuesIn:function(object){
        var res = [];
        for(var key in object){
            res.push(object[key]);
        }
        return res;
    },

//============================================ String - 字符串模块 =================================================

    /**
     * 实现将字符转换为驼峰写法
     * @param {String} s 入参字符串
     */
    camelCase:function(s=''){  //  使用正则求解
        s+=' ';
        var resArr = [];
        var resStr = '';
        var tmp='';
        for(var i=0; i<s.length; i++){
            if(this.wordInArea(s[i])){
                tmp+=s[i];	
            }else{
                if(tmp.length!=0)
                    resArr.push(tmp);
                tmp = '';
            }
        }
        resArr.forEach((val,index)=>{
            val=val.toLowerCase();
            if(index>0){
                val=val[0].toUpperCase()+val.substring(1);
            }
            resStr+=val;
        });
        return resStr;
    },

    capitalize:function(s){
        s=s.toLowerCase();
        return s[0].toUpperCase()+s.substring(1);
    },

    deburr:function(){

    },
    
    endsWith:function(string='',target,position=string.length){
        if(string[position-1]==target){
            return true;
        }
        return false;
    },
    
    escape:function(string=''){
        let reg = /[&<>"']/g
        let map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }
        return string.replace(reg, e => map[e]);
    },
    
    kebabCase:function(string=''){
        string=string.toLowerCase();
        return string.match(/[a-z]{3}/gmi).join('-');
    },
    
    lowerCase:function(string=''){
        var arr = string.match(/[A-Z][a-z]+|[A-Z]+|[a-z]+/g);
        return arr.map(val=>val.toLowerCase()).join(' ');
    },
    
    lowerFirst:function(string=''){
        return string[0].toLowerCase()+string.substring(1);
    },
    
    pad:function(str='', n=0, val=' '){  //  *
        let len = str.length;
        if (len < n) {
            str = str.padStart(Math.floor((n - len) / 2) + len, val)
            str = str.padEnd(n, val);
        }
        return str
    },
    
    padEnd:function(str, length, repeat = " "){
        while (true) {
            if (str.length >= length) {
                break;
            }
            str += repeat;
        }
        return str.substr(0, length);
    },
    
    padStart:function(str, length, repeat = " "){
        var result = "";
        while (true) {
            if (str.length + result.length >= length) {
                break;
            }
            result = repeat + result;
        }
        if (str.length + result.length > length) {
            result = result.substr(0, length - str.length);
        }
        return result + str;
    },
    
    parseInt:function(string,radix=10){
        return parseInt(string,radix);
    },
    
    repeat:function(string='',n=1){
        var res = '';
        for(var i=0; i<n; i++){
            res+=string;
        }
        return res;
    },
    
    replace:function(string='', pattern, replacement){
        return string.replace(pattern,replacement);
    },
    
    snakeCase:function(string=''){
        var arr = string.match(/[A-Z][a-z]+|[A-Z]+|[a-z]+/gm);
        return arr.map(val=>val.toLowerCase()).join('_');
    },
    
    split:function(string='',separator,limit){
        return string.split(separator).slice(0,limit);
    },
    
    startCase:function(string){
        var arr = string.match(/[a-z]+[A-Z]+/gm);
        return arr.map(val=>val[0].toUpperCase()).join(' ');
    },
    
        
    startsWith:function(str='',target,position=0){
        for(var i=position; i<str.length; i++){
            if(str[i]==target){
                return true;
            }
            if(i==0){
                return false;
            }
        }
        return false;
    },
    
    toLower:function(string=""){
        return string.toLocaleLowerCase();
    },

    toUpper:function(string=""){
        return string.toLocaleUpperCase();
    },

    trim:function(string='',chars='\\s'){
        var res = string;
		var charArr = chars.split('');
		for(var i=0; i<charArr.length; i++){
			var reg = new RegExp(`[${chars}]`,"g");   //   // ${变量}  就相当于 取到 大括号内 该变量的值
			res=res.replace(reg,'');
		}
        return res;
    },
    
    trimEnd:function(string='',chars=' '){
        // var res = string;
		// var charArr = chars.split('');
		// for(var i=0; i<charArr.length; i++){
		// 	var reg = new RegExp("(?<=[a-z]{3}).*"+charArr[i],"gmi");
		// 	res=res.replace(reg,'');
		// }
        // return res;
        return string.replace(/(?<=[a-z]{3}).*/gmi,"");
    },
    
    trimStart:function(string='',chars=' '){
        return string.replace(/.*(?<=[a-z]{3})/gmi,"");
    },
    
    truncate:function(string='',options={}){
        var obj = {
            length:30,
            omission:"...",
            separator:""
        };
        // 通过obj里面的属性依次对字符串进行操作
        var newObj=Object.assign(obj,options);  // 源对象,目标对象
        var reg = new RegExp(newObj.separator,"g");
        var match;
        var res='';
        var lastIndex=0;
        // 如果字符串能够一直匹配到东西就一直循环
        while(match=reg.exec(string)){
            console.log(match.index);
            res+=string.slice(lastIndex,match.index);
            if(reg.lastIndex==(newObj.length-newObj.omission.length)){
                break;
            }
            lastIndex=reg.lastIndex;
            if(match[0]==''){
                reg.lastIndex=reg.lastIndex+1;
            }
        }
        res+=newObj.omission;
        // 把剩余的部分加上
        return res;
    },
    
    unescape:function(string=''){
        let map = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            "&#39;": "'"
        }
		for(var key in map){
            if(string.includes(key)){
				string=string.replace(key,map[key]);
            }
        }
		return string;
    },
    
    upperCase:function(string=''){
        var arr = string.match(/[A-Z][a-z]+|[A-Z]+|[a-z]+/gm);
        return arr.map(val=>val.toUpperCase()).join(" ");
    },
    
    upperFirst:function(string=''){
        return string.replace(/^.{1}/gmi,e => e.toUpperCase());
    },
    
    words:function(string='',pattern=/\w+/g){
        // if(typeof pattern == 'string'){
        //    pattern ='\\w+';
        //    var reg = new RegExp(pattern,"g");
        //    return string.match(reg);
        // }
        return string.match(pattern);        
    },
    
    range:function(start=0,end,step=1){
        var res = [];
        if(arguments.length==1){
            if(arguments[0]>0){
                for(var i=0; i<start; i+=1){
                    res.push(i);
                }
                return res;
            }else if(arguments[0]<0){
                for(var i=0; res.length<Math.abs(start); i-=1){
                    res.push(i);
                }
                return res;
            }else if(arguments[0]==0){
                return res;
            }
        }
        // 两个或三个参数
        if(step==0){
            for(var i=start; res.length<end-1; i+=step){
                res.push(i);
            }
            return res;
        }
        if(end>0){
            for(var i=start; i<end; i+=step){
                res.push(i);
            }
            return res;
        }else if(end<0){
            if(step<0){
                for(var i=start; i>end; i+=step){
                    res.push(i);
                }
                return res;
            }else{
                for(var i=start; i>end; i-=step){
                    res.push(i);
                }
                return res;
            }
        }
    },
    
    rangeRight:function(start=0,end,step=1){
        var res = [];
        if(arguments.length==1){
            if(arguments[0]>0){
                for(var i=start-1; i>=0; i-=1){
                    res.push(i);
                }
                return res;
            }else if(arguments[0]<0){
                for(var i=start+1; res.length<Math.abs(start); i+=1){
                    res.push(i);
                }
                return res;
            }else if(arguments[0]==0){
                return res;
            }
        }
        // 两个或三个参数
        if(step==0){
            for(var i=start; res.length<end-1; i-=step){
                res.push(i);
            }
            return res;
        }
        if(end>0){
            if(step!=1){
                for(var i=end-step; i>=0; i-=step){
                    res.push(i);
                }
            }else{
                for(var i=end-step; i>0; i-=step){
                    res.push(i);
                }
            }
            return res;
        }else if(end<0){
            if(step<0){
                for(var i=end+1; i<=start; i-=step){
                    res.push(i);
                }
                return res;
            }else{
                for(var i=end; i>end; i+=step){
                    res.push(i);
                }
                return res;
            }
        }
    },

    //================================================ Util Model  =>    工具模块 ===========================================
    
    isFloat:function(n){
        return /^-?\d*\.\d+$/.test(n)
    },

    /**
     * 检测该单个字符是否为字母
     * @param {Character} c 单个字符
     */
    wordInArea:function(c){ 
        if(c.toLowerCase().charCodeAt()<=122 && c.toLowerCase().charCodeAt()>=97){  // 转成小写  在97和122之间
            return true;
        }
        return false;
    },

    judgeType:function(predicate){
        // 如果 type 是函数类型
        return Object.prototype.toString.call(predicate).slice(8,-1);
    },
    
    // 抽象循环
    // forFun:function(f){
    //     return funtion(){

    //     }
    // },

    /**
     * 看obj2是否是obj1的自集
     * @param {Object} obj1 原本的对象
     * @param {Object} obj2 被对比的对下昂
     * @returns {Boolean} res 返回真假
     */
    isSubSet:function(obj1,obj2){
        var arr1=Object.keys(obj1);
        var arr2=Object.keys(obj2);
        var val1=Object.values(obj1);
        var val2=Object.values(obj2);
        // 看 arr1 中是否包含 arr2 中的全部
        var flag1=true;
        arr2.forEach(val=>{
            if(!arr1.includes(val)){
                // 如果有一次 是 false 就表明已经有元素不存在了 跳出
                flag1=!flag1;
                return;
            }
        })
        var flag2=true;
        // 如果 flag1 仍为真 则表示 arr1 中包含全部 arr2
        if(flag1){
            val2.forEach(val=>{
                if(!val1.includes(val)){
                    flag2=!flag2;
                    return; 
                }
            })
        }
        if(flag1 && flag2){
            return true;
        }
        return false;;
    },

    /**
     *
     * @param {Array|Function|Object|String} para 传入的元素
     * @returns 根据传入的元素判断函数
     */
    judgeFunc:function (para) {
        let re = null;
        if (typeof para == "object") {
            if (Array.isArray(para)) {
                para = this.matchesProperty(para);
            }
            re = this.matches(para);
        } else if (typeof para == "function") {
            re = para;
        } else if (typeof para == "string") {
            re = (it) => it[para];
        }
        return re;
    },

    /**
    *
    * @param {Array} arr 原始数组
    * @returns 返回一个包含数组中信息的对象
    */
    matchesProperty: function (arr) {
        let re = {};
        for (let i = 0; i < arr.length; i++) {
            re[arr[i++]] = arr[i];
        }
        return re;
    },

    /**
    *
    * @param {Object} obj 根据对象返回一个判断函数
    */
    matches: function (obj) {
        return function (para) {
            for (let prop in obj) {
                if (para[prop] != obj[prop]) {
                    return false;
                }
            }
            return true;
        };
    },



    /**
     * 类型转换的函数，最后将返回一个函数
     * @param {Array|String|Object|Function} predicate 不同类型的入参
     */
    typeConvert:function(predicate){
        if(this.judgeType(predicate)=="String"){
            return function(obj){
                return obj[predicate]!='undefined'?false:true;
            }
        }else if(this.judgeType(predicate)=="Object"){
            // 是对象就对比两个对象
            return function(target){
                for(var key in target){
                    if(target[key]!=predicate[key]){
                        return false;
                    }
                }
                return true;
            }
        }else if(this.judgeType(predicate)=="Array"){  // 把数组转为对象之后然后保留属性为真的那个
            return function(ary){
                // 把 predicate 数组转为对象 然后两个进行对比
                var predicateRes=ln2365539311.fromPairsOneDemension(predicate);  //  这里用 bind 来实现
                // 判断predicate是否在 ary 中
                var res=ln2365539311.isSubSet(ary,predicateRes);
                return res;
            }
        }
        return predicate;
    },

    // 转成带值的
    typeConvertVal:function(predicate){
        if(this.judgeType(predicate)=="String"){
            return function(obj){
                return obj[predicate];
            }
        }else if(this.judgeType(predicate)=="Object"){
            // 是对象就对比两个对象
            return function(target){
                for(var key in target){
                    if(target[key]!=predicate[key]){
                        return false;
                    }
                }
                return true;
            }
        }else if(this.judgeType(predicate)=="Array"){  // 把数组转为对象之后然后保留属性为真的那个
            return function(ary){
                // 把 predicate 数组转为对象 然后两个进行对比
                var predicateRes=ln2365539311.fromPairsOneDemension(predicate);  //  这里用 bind 来实现
                // 判断predicate是否在 ary 中
                var res=ln2365539311.isSubSet(ary,predicateRes);
                return res;
            }
        }
        return predicate;
    },

    typeConvertValForFilter:function(predicate){
        if(this.judgeType(predicate)=="String"){
            return function(obj){
                return obj[predicate];
            }
        }else if(this.judgeType(predicate)=="Object" || this.judgeType(predicate)=="RegExp"){
            // 是对象就对比两个对象
            return function(target){
                for(var key in predicate){
                    if(target[key]!=predicate[key]){
                        return false;
                    }
                }
                return true;
            }
        }else if(this.judgeType(predicate)=="Array"){  // 把数组转为对象之后然后保留属性为真的那个
            return function(ary){
                // 把 predicate 数组转为对象 然后两个进行对比
                var predicateRes=ln2365539311.fromPairsOneDemension(predicate);  //  这里用 bind 来实现
                // 判断predicate是否在 ary 中
                var res=ln2365539311.isSubSet(ary,predicateRes);
                return res;
            }
        }else if(this.judgeType(predicate)=="Undefined"){
            return predicate;
        }
        return predicate;
    },

    iteratee:function(predicate){
        var type=this.judgeType(predicate);
        // 如果是对象的话 直接返回 其值
        if(type=="String"){
            return this.property(predicate);
        }else if(type=="Array"){
            return this.match(predicate);
        }else if(type=="Object"){
            return this.matchPrpoerty(predicate);
        }
        return predicate;
    },

    property:function(predicate){
        return function(obj){
            return obj[predicate];
        }
    },

    match:function(target){  // 匹配两个对象是否相等
        return function(obj){
            for(var key of obj){
                if(obj[key]!=target[key]){
                    return false;
                }
            }
            return true;
        }
    },

    matchPrpoerty:function(ary){
        return this.match(this.fromPairs(this.chunk(ary)));
    },

    // 用 bind 绑定一下函数试试


    conforms:function(source){
        return function(predicate){
            var predicator = this.typeConvertValForFilter(predicate);
            for(var key in source){
                if(predicator(source[key],key,source)){
                    return true;
                }
            }
            return false;
        }
    },


    constant:function(value){
        return function(){
            return value;
        }
    },

    defaultTo:function(value,defaultValue){
        // 判断是不是NaN
        if(value!=value && Number.isNaN(value)){
            return defaultValue;
        }
        if(value==null || value == undefined){
            return defaultValue;
        }
        return value;
    },

    flow:function(...funcs){
        return function(...args){
            var funcArr = Array.from(funcs).flat();
            while(funcArr.length){
                var lastArg = funcArr.shift()(...args);
                args=Array.of(lastArg);
            }
            return lastArg;
        }
    },

    idenity:function(value){
        return value;
    },

    method:function(path,...args){
        if(this.judgeType(path)=="String"){
            path=path.match(/\w+/g);
        }
        var argsArr = Array.from(args).flat();
        return function(obj){
            for(var i=0; i<path.length; i++){
                obj=obj[path[i]];
            }
            return obj(...argsArr);
        }
    },

    methodOf:function(obj,...args){
        var argsArr = Array.from(args).flat();
        var str = null;
        return function(value){
            var tmp = null;
            str = value;
            if(ln2365539311.judgeType(value)=="String"){
                str = str.match(/\w+/g);
            }
            var res = ln2365539311.cloneDeep(obj);
            for(var i=0; i<str.length; i++){
                if(i==str.length-1){
                    res = tmp[str[i]];
                    break;
                }
                tmp=res[str[i]];
            }
            return res(...argsArr);
        }
    },

    nthArg:function(n=1){
        return function(...args){
            var argsArr = Array.from(args);
            if(n>0){
                return argsArr[n];
            }else{
                return argsArr[argsArr.length+n];
            }
        }
    },

    propertyOf:function(path){
        var str = null;
        return function(value){
            var tmp = null;
            str = value;
            if(ln2365539311.judgeType(value)=="String"){
                str = str.match(/\w+/g);
            }
            var res = ln2365539311.cloneDeep(path);
            for(var i=0; i<str.length; i++){
                if(i==str.length-1){
                    res = tmp[str[i]];
                    break;
                }
                tmp=res[str[i]];
            }
            return res;
        }
    },

    parseJson:function(json){
        return JSON.parse(json);
    },

    stringifyJson:function(obj){
        return JSON.stringify(obj);
    },

    times:function(n,iteratee){
        var iterator = this.typeConvertValForFilter(iteratee);
        var res = [];
        for(var i=0; i<n; i++){
            res.push(iterator(i));
        }
        return res;
    },

    toPath:function(value){
        return value.match(/\w+/g);
    },

    uniqueId:function(prefix=""){
        var uuid = this.generateUUID();
        return prefix+uuid;
    },
    generateUUID:function(){
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

}