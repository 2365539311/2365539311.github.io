/*
 * @Description: lodash库
 * @Author: huacong
 * @Date: 2020-04-28 17:15:31
 * @LastEditTime: 2020-05-20 11:26:58
 * @LastEditors: Please set LastEditors
 */ 
var ln2365539311 = {
    
    // 


    isNaN:function(val){
        if(val!=val && Number.isNaN(val)){
            return true;
        }else if(typeof val == 'object'){
            return val.toString()==='NaN';
        }else{
            return false;
        }
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
     * 
     * @param {Array} array 需要被对比的数组
     * @param  {...Array} args 要排除的值
     * @param {Function} fun 根据这个函数按照对应的函数进行排除
     */
    differenceBy:function(array,...args){
        // 最后一个参数
        var lastArg = args.pop();
        var lastArgType = this.judgeType(lastArg);
        if(lastArgType=="String" || lastArgType=="Array"){
            return this.difference(array,args.slice(0,args.length-1))[0];
        }else if(lastArgType=="Function"){
            var valueArr = args.slice(0,args.length).flat();
            valueArr = valueArr.map(val=>val=lastArg(val));
            var res = [];
            array.forEach((val)=>{
                if(!valueArr.includes(lastArg(val))){
                    res.push(val);
                }
            });
            return res;
        }

        /*
            let isFunc = true;
            let f = values[values.length - 1];
            const res = [];
            const v = [];
            if (Array.isArray(f)) {
                // iteratee = _.identity;
                return this.difference(array, ...values);
            } else if (!(typeof f === "function")) {
                isFunc = false;
            }

            for (let value of values.slice(0, values.length - 1)) {
                for (let i of value) {
                    v.push(isFunc ? f(i) : i[f]);
                }
            }

            for (let item of array) {
                let temp = isFunc ? f(item) : item[f];
                if (!v.includes(temp)) res.push(item);
            }

            return res;
        */
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

    

    fill:function(arr,val,start = 0,end=arr.slice().length){
        while(start<end){
            arr.splice(start,1,val);
            start++;
        }
        return arr;
    },
    
    /**
     * @description: 
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

    judgeType:function(predicate){
        // 如果 type 是函数类型
        return Object.prototype.toString.call(predicate).slice(8,-1);
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
            for(var key in target){
                if(target[key]!=predicate[key]){
                    return false;
                }
            }
            return true;
        }else if(this.judgeType(predicate)=="Array"){  // 把数组转为对象之后然后保留属性为真的那个
            // 把 predicate 数组转为对象 然后两个进行对比
            predicate=this.fromPairsOneDemension(predicate);
            // 判断predicate是否在 ary 中
            for(var i=fromIndex; i<ary.length; i++){
                if(this.isSubSet(predicate)){
                    return ary[i];
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

    dropWhile:function(array,predicate){
        predicate=this.typeConvert(predicate);
        return array.filter((val,idx,arr)=>{
            return !predicate(val,idx,arr);
        });
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
                var flatArr = flattenDeep(val);
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
                var flatArr = flattenDepth(val,depth-1);
                res.push(...flatArr);
            }else{
                res.push(val);
            }
        })
        return res;
    },

    /*
        function fattenDepth2(arr,depth=1){
            return Array(depth).fill(0).reduce((val)=>{
                debugger;
                console.log(arr);
                return flatten(arr);
            },arr);
        },
    */
    
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

    
    sortBy:function(){

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
            for(var j=i; j<arrVal.length; j++){
                obj[arrProps[i]]=arrVal[j];
                break;
            }
        }
        return obj;
    },

    zipObjectDeep:function(){

    },

    zipWith:function(){

    },



    //  Collection Model   =>   集合模块

    mapValues:function(obj,mapper){  // 对应 objectValues
		var res = {};
		for(var key in obj){
			var val=obj[key];
			res[key]=mapper(val,key,obj);
		}
		return res;
	},

    countBy:function(){

    },

    every:function(arr,predicate){
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

    filter:function(){
        var test=predicate
		if(typeof predicate == 'string'){
			test=it=>it[test];
		}else if(typeof predicate == 'object'){
			if(Array.isArray(predicate)){
				predicate=this.fromPairs(predicate);
			}
			test=it=>{
				for(var key in predicate){ 
					if(predicate[key] !== it[key]){
						return false;
					}
				}
				return true;
			}
		}
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
        console.log(res);
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
    
    groupBy: function (arr, predicate) {
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
        var f=by;
        if(typeof by == "string"){
            f=item=>item[by];
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
        if(res=='Object' && Object.entries().length!=0){
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

    isBoolean:function(value){
        return this.judgeType(value)=='Boolean';
    },

    isDate:function(value){
        return this.judgeType(value)=='Date';
    },

    lt:function(value, other){
        return value < other
    },
    
    lte:function(value, other){
        return this.eq(value, other) || this.lt(value, other)
    },
    
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

    mean:function(array){
        var sum = array.reduce((acm,val)=>{
            return acm+val;
        });
        return sum/array.length;
        // return array.reduce((acm,val)=>acm+val)/array.length;
    },

    min:function(array){
        if(!array.length){
            return undefined;
        }
        return array.reduce((acm,val)=>acm<val?acm:val); 
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
    
    substract:function(minuend, subtrahend){
        return minuend-subtrahend;
    },
    
    sum:function(array){
        return array.reduce((acm,val)=>acm+val);
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
    
    keys:function(object){
        return Object.keys(object);
    },
    

    mapKeys:function(){

    },

    mapValues:function(){
        
    },

    assign:function(object, ...sources){
        return Object.assign(object,...sources);
    },
    
    omit:function(object,...paths){
        var flatPath = paths.flat();
        for(var val of flatPath){  // a
            delete object[val];
        }
        return object;
    },
    
    pick:function(object,...paths){
        var res = {};
        var flatPath = paths.flat();
        for(var val of flatPath){  // a
            res[val]=object[val];
        }
        return res;
    },
    
    values:function(object){
        return Object.values(object);
    },
    
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
        iteratee=this.iteratee(predicate);
        for(var key in collection){
            res.push(this.iteratee(collection[key]));
        }
        return res;
    },


    //===========================================  Function  Model  =>   函数模块 ===========================================

    bind:function(f,obj,...fixedArgs){
        var newObj=obj;
        // 双指针实现
        return function(newObj,...args){  // [7,8,9]
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
			return f.call(obj,...arr);
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
    
    flip:function(func){
        return function(...args){
            return func(...args.reverse());
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

	unary:function(func){
		return this.ary(func,1);
    },
    
    spread:function(func){
		return function(...args){
			return func(...args);
		}
    },
    
    memoize:function(func){  // 创建一个函数 能记住 调用 func 函数的结果
		var memo  = {};
		return function(args){
			if(args in memo){
				return memo[args]
			}else{
				return memo[args]=func(args);
			}
		}
	},

    reject:function(ary,test){
		return this.filter(ary,this.negate(test));
	},

    //================================================ Util Model  =>    工具模块 ===========================================
    iteratee:function(predicate){
        var type=this.judgeType(predicate);
        // 如果是对象的话 直接返回 其值
        if(type=="String"){
            return this.propety(predicate);
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

}