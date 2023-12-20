---
id: react-hooks
title: React Hooks
description: React Hooks使用
sidebar_label: React Hooks使用
hide_title: true
last_update:
  date: 2023-03-05
  author: Chason
---

## 一、React17常见Hooks使用

### 1、useState

#### 1.1、存储基本数据类型时

```typescript jsx
function App() {
  const [num, setNum] = useState(0)

  return (
    <div className="App">
      <div className="box">
        <p>useState基本数据类型</p>
        <p>{num}</p>
        <div onClick={()=>{
          setNum(num+1)
        }}>点击num++</div>
      </div>
    </div>
  );
}
```

进行click时，触发setNum函数num就会进行++。setNum函数可以接收一个实际值类型，也可以接收一个函数，该函数的参数就是未更新时的num值

setNum的另一种方式

```typescript jsx
<div onClick={()=>{
	setNum((val)=>{
         console.log(val, '<---val')
		return val + 1;
	})
}}>点击num++</div>
```

执行结果：

![1677306604779](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369100-d403ff.png)

#### 1.2、存储复杂数据类型时

```typescript jsx
function App() {
  const [num, setNum] = useState(0)
  const [complexData, setComplexData] = useState({ name: '张三', score: 44 })
  console.log(complexData,"<___complexData")
  return (
    <div className="App">
      {/*<div className="box">*/}
      {/*  <p>useState基本数据类型</p>*/}
      {/*  <p>{num}</p>*/}
      {/*  <div onClick={()=>{*/}
      {/*    setNum((val)=>{*/}
      {/*      console.log(val, '<---val')*/}
      {/*      return val + 1;*/}
      {/*    })*/}
      {/*  }}>点击num++</div>*/}
      {/*</div>*/}

      <div className="box">
        <p>useState复杂数据类型</p>
        <p>name: {complexData.name};score: {complexData.score}</p>
        <div onClick={()=>{
          setComplexData({score: 99})
        }}>点击更新complexData.score</div>
      </div>
    </div>
  );
}
```

点击更新complexData数据时，发现name属性丢失了。在setComplexData函数传递是一个新的对象，不存在name属性

![1677307193185](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369105-2084e1.png)

如果需要保留name属性只更改score的属性，如下：

```typescript jsx
 <div onClick={()=>{
      setComplexData({...complexData,score: 99})
}}>点击更新complexData.score</div>
```

执行结果：

![1677307511104](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369108-6fc3ad.png)

或者

```typescript jsx
<div onClick={()=>{
// setComplexData({...complexData,score: 99})
	setComplexData((val)=> {
		return {...val, score: val.score+1}
	})
}}>点击更新complexData.score</div>
```

执行结果：

![1677307674430](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369112-28f798.png)

### 2、useEffect

useEffect存在两个参数：

1. 执行函数
2. deps依赖（浅比较）

#### 2.1、当前deps为空数组时

> 相当于react类组件生命周期的 componentDidMount 只运行一次

```typescript jsx
function App() {
  const [num, setNum] = useState(0)
  console.log(num,'<---num')
  useEffect(()=>{
    console.log('只执行一次')
  },[])
  return (
    <div className="App">
      useEffect
      <div onClick={()=>{
        setNum(num + 1)
      }}>点击更新触发渲染</div>
    </div>
  );
}
```

执行结果：

![1677308303526](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369116-3f39d8.png)

#### 2.2、当基本数据类型作为依赖时

> 依赖发生改变时触发useEffect

```typescript jsx
function App() {
  const [num, setNum] = useState(0)
  useEffect(() => {
    console.log('只执行一次')
  },[])

  useEffect(()=>{
    console.log(`执行了${num}次`)
  },[num])

  return (
    <div className="App">
      useEffect
      <div onClick={()=>{
        setNum(num + 1)
      }}>点击更新触发渲染</div>
    </div>
  );
}
```

执行结果：

![1677312938792](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369120-5bcb3e.png)

#### 2.3、当引用数据类型作为依赖时

> 当引用数据类型地址发生变化时

```typescript jsx
function App() {
  const [num, setNum] = useState(0)
  const [complexData, setComplexData] = useState({ name: '张三', score: 44 })
  useEffect(() => {
    console.log('只执行一次')
  },[])

  useEffect(()=>{
    console.log(`执行了${num}次`)
  },[num])

  useEffect(()=>{
    console.log(complexData,'<---复杂数据类型')
  },[complexData])

  return (
    <div className="App">
      <div>
        score: {complexData.score}
      </div>
      <div onClick={()=>{
        // setNum(num + 1)
        /* set函数传递值形式更新 第一种 */
        // setComplexData({ ...complexData, score: complexData.score + 1 })
        /* set函数传递函数更新 第二种 */
        setComplexData((val)=>{
          val.score += 1
          return {...val}
        })
      }}>点击更新触发渲染</div>
    </div>
  );
}
```

执行结果：

![1677314316219](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369124-38de9a.png)

<u >注意：</u> 解构进行了浅拷贝，引用数据地址发生了变化

当不进行score+1时，解构改变了引用数据类型的地址变化，依旧会触发useEffect

```typescript jsx
<div onClick={()=>{
// setNum(num + 1)
/* set函数传递值形式更新 第一种 */
// setComplexData({ ...complexData, score: complexData.score + 1 })
/* set函数传递函数更新 第二种 */
setComplexData((val)=>{
  return {...val}
})
```

执行结果：

![1677314777117](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369128-fa355e.png)

#### 2.4、useEffect的依赖浅比较

> useEffect的依赖是一个数组，[value1，value2]可以类比成{0:value1,1:value2}，当value1和value2的值或者引用类型的地址不变时，不会触发useEffect。当值或引用类型改变时，会触发useEffect

```typescript jsx
// App组件
function App() {
  const [complexData, setComplexData] = useState({ name: '张三', score: 44, subject: ['语文','数学'] })
  return (
    <div className="App">
      <About data={complexData.subject}/> {/* 引用的About子组件 */}
      <div>
        {
          complexData.subject.map((k,i)=>{
            return <li key={i}>{k}</li>
          })
        }
      </div>
      <div onClick={()=>{
        complexData.subject.push('英语') // 使用push添加元素，地址不会发生变化
        setComplexData({ ...complexData })
      }}>点击触发子组件的useEffect</div>
    </div>
  );
}

// About组件
function About (props) {
  console.log(props,'<___props')
  const [num,setNum] = useState(-1)
  useEffect(()=>{
    console.log("触发了")
    setNum((val)=>{
      return val + 1
    })
  },[props.data])
  return <div>
    <span>About组件:</span> <span>触发了{num}次</span>
  </div>
}
```

由于数组的地址未发生变化，不会触发子组件

![1677324286375](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369132-02d9b4.png)
使用解构更新数组

```typescript jsx
<div onClick={()=>{
      setComplexData({ ...complexData, subject: [...complexData.subject,'英文'] })
}}>点击触发子组件的useEffect</div>
```

执行结果：

![1677324676957](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369135-38c30d.png)

### 3、useMemo

> 当需要缓存一些内容，以避免在需要渲染过程中因大量不必要的耗时计算而导致性能问题

useMemo存在两个参数：

1. 被返回的数据
1. deps依赖（浅比较，参考useEffect）

```typescript jsx
import {useCallback, useState, useMemo} from 'react'
import './App.css';

function App() {
  const [num, setNum] = useState(0)

  const clickHandler = useCallback(() => {
    console.log("useCallback返回的函数", num)
  },[num])

  const cacheValue = useMemo(()=>{
    return num * 100
  },[num])

  return (
    <div className="App">
      <div>
        <div>num: { num }</div>
        <div>cacheValue: {cacheValue}</div>
        <div onClick={()=>{
          console.log('点击num++')
          setNum(num + 1)
        }}>点击num++</div>
      </div>
      <div onClick={()=>{
        clickHandler()
      }}>点击触发Handler</div>
    </div>
  );
}

export default App;
```

### 4、useCallback

> 函数组件内定一个其他函数，当组件重新更新时函数组件重新执行，组件内的定义的函数会被重新生成。这个操作在react官方里性能时忽略不计的，如果不希望函数被重新生成，使用useCallback包裹。
>
> useCallback的依赖被更新时，就会重新返回生成的函数

useCallback存在两个参数：

1. 被返回的函数
1. deps依赖（浅比较，参考useEffect）

#### 1.1、当useCallback的依赖为空数组时

```typescript jsx
function App() {
  const [num, setNum] = useState(0)

  const clickHandler = useCallback(() => {
    console.log("useCallback返回的函数", num)
  },[])

  return (
    <div className="App">
      <div>
        { num }
        <div onClick={()=>{
          console.log('点击num++')
          setNum(num + 1)
        }}>点击num++</div>
      </div>
      <div onClick={()=>{
        clickHandler()
      }}>点击触发Handler</div>
    </div>
  );
}
```

当依赖为空数组时，获取不到最新的状态值。先点击Handler，在点击几次num++，再点击Handler发现打印的num依旧是0。原因就是组件更新时，函数不会重新生成形成的一种`“闭包”`。

![1677328517370](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369139-4c4d56.png)

#### 1.2、useCallback添加依赖获取最新的state状态值

```typescript jsx
function App() {
  const [num, setNum] = useState(0)

  const clickHandler = useCallback(() => {
    console.log("useCallback返回的函数", num)
  },[num]) // 添加了num做依赖

  return (
    <div className="App">
      <div>
        { num }
        <div onClick={()=>{
          console.log('点击num++')
          setNum(num + 1)
        }}>点击num++</div>
      </div>
      <div onClick={()=>{
        clickHandler()
      }}>点击触发Handler</div>
    </div>
  );
}
```

重复上述的操作

![1677328703987](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369143-0e4181.png)

#### 1.3、useCallback缓存函数导致“击穿”组件属性

> 当父组件将一个函数作为一个属性传递给子组件，子组件使用React.memo对属性进行包裹。当父组件进行更新数据渲染时，会触发子组件刷新，React.memo失去作用

```typescript jsx
// 父组件
function App() {
  const [num, setNum] = useState(0)

  const clickHandler = function () {
    console.log("useCallback返回的函数", num)
  }

  return (
    <div className="App">
      <div>
        <div>num: { num }</div>
        <div onClick={()=>{
          console.log('点击num++')
          setNum(num + 1)
        }}>点击num++</div>
      </div>
      <div onClick={()=>{
        clickHandler()
      }}>点击触发Handler</div>

      <hr/>
      <About/>
    </div>
  );
}

// 子组件
function About (props) {
  console.log(props,'<___子组件渲染了')
  return <div>
    <span>About组件:</span><span>触发了</span>
  </div>
}

export default React.memo(About)
```

当函数不做属性传递时

![1678010866343](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369147-802075.png)

当函数作为属性传递时

```typescript jsx
// 子组件进行函数传参
<About fun={clickHandler} />
```

![1678010946973](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369150-da80b3.png)

当将传递的行数被useCallBack包裹时，函数不会被重新生成，地址不会改变，子组件就不会被重新渲染

```typescript jsx
const clickHandler = useCallback(function () {
  console.log('useCallback返回的函数', num);
}, []);
```

![1678011058182](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369153-f92011.png)

<u >注意：</u>如果使用useCallBack进行缓存时，无法获取state最新值，需要对获取state进行依赖。

## 二、React17的渲染

1、调用相同的set函数

```typescript jsx
function App() {
  const [num, setNum] = useState(0)

  console.log('数据更新了')

  return (
    <div className="App">
      <div>
        <div>num: { num }</div>
        <hr/>
        <div onClick={()=>{
          console.log('点击了')
          setNum(num + 1)
          setNum(num + 1)
        }}>点击num++</div>
      </div>

    </div>
  );
}
```

打印结果：
![1678011933987](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369158-0f972b.png)

<u>结果：</u> 发现更新同一个数据，调用多次set只会更新一次

```typescript jsx
function App() {
  const [num, setNum] = useState(0)
  const [data,setData] = useState('1')

  console.log('数据更新了')

  return (
    <div className="App">
      <div>
        <div>num: { num }---data: {data}</div>
        <hr/>
        <div onClick={()=>{
          console.log('点击了')
          setTimeout(()=>{ // 添加setTimeout
            setNum(num + 1)
            setData(data + 1)
          })
        }}>点击num++</div>
      </div>

    </div>
  );
}
```

打印结果：
![1678012955085](https://gitee.com/szchason/pic_bed/raw/notes/images/react/react17/2023-05-29-1685369162-882e92.png)
