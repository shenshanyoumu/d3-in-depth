# d3-annotations

该项目针对 D3 的源码中一些比较难懂的部分进行注解，方便大家深入理解 D3 的实现原理。由于个人水平有限，对其中有错误理解的部分欢迎 PR。

# d3.js 简介

D3，即 Data-Driven Documents。开发者关注数据本身，而对 DOM 的操作都由 D3 完成。不过目前前端可视化的做法一般是利用 D3 的数据操作模型进行数据转换，而真实 DOM 操作交给第三方 UI 库比如 React 进行。

# d3.js 设计哲学

D3 的实现深刻理解了 Grammar of Graphics 的精髓，即错综复杂的各类图表可以抽象为一些基础组件和运算过程，而 D3 就是实现了这些基础组件和运算过程，为开发者提供了最大的灵活性和自由度。

# D3 特性

（1）数据结构转换与绘制分离  
数据结构转换即 D3 中大量的 layout，其核心封装大量图表的数据转换算法

（2）链式语言  
D3 采用类似 jQuery 的链式方法调用，D3 被称为数据领域的 jQuery

（3）D3 的大量函数用于操作 DOM  
D3 可以使用 SVG、Canvas 元素来绘制图形/图表

（4）数据绑定 DOM  
D3 根据数据来动态创建/回收 DOM 节点

（5）D3 的核心是数据处理  
D3 本身没有绘图能力，它包含大量的数据转换算法。在真实绘图中使用 SVG/canvas 等元素来绘制数据

（6）D3+VDOM = 高性能渲染  
基于 React 这类 UI 库的 virtual DOM 思想，而 D3 只负责数据转换，则可以实现 DOM 节点的高性能渲染。D3 本质是一套高级的计算框架库

（7）函数式编程  
在D3的几乎所有模块实现中，充分体现了函数式编程思想，即尽量采用函数编排来实现特定能力，而不是通过特化函数来实现对应的能力。这也常常给开发者一种困扰，就是d3很多函数接收另一个函数作为参数，并且返回一个新函数的编程模式

# D3 基础概念

（1）选择集是 D3 最重要的基础  
选择集用于从当前 DOM 树中选择符合要求的 DOM 节点集合，类似 jQuery 提供的节点选择能力。

（2）数据更新三步走  
update 原有 DOM 节点上的数据、enter 新的 DOM 节点并绑定数据，exit 没有数据绑定关系的 DOM 节点

（3）渐变动画  
D3 提供一组过渡/渐变函数，可以控制 DOM 节点发生改变时的动效

（4）事件机制  
D3 的事件机制最终绑定到对应的 DOM 节点，并负责事件的传播和监听

# D3 主要模块简介

（1）Array(难度系数:3,重要性系数:5,内部依赖:<b>独立模块</b></b>)  
D3 中所有数据源都是数组形式，定义了一系列数组的运算函数。并提供了直方图bin分组的经验方程

（2）Color(难度系数:3.5,重要性系数:3,内部依赖:<b>独立模块</b></b>)  
颜色系统非常丰富，事实上颜色的显示和转换等具备庞杂的知识体系。该模块用于处理颜色相关内容，包括颜色格式、颜色的计算、颜色空间转换等

（3）dispatch(难度系数:3,重要性系数:5,内部依赖:<b>独立模块</b></b>)  
基于sub/pub模式来解耦系统，这个模块其实在交互式系统中非常重要。其基本实现与W3C定义的事件分发机制类似，通过分发具名事件来触发相应监听器执行;
在其他业务系统中，可以将该模块直接拷贝使用，该事件分发系统的优点在于可以细分事件类型和事件名称，从而精确控制事件的注册和分发逻辑

（4）Selection(难度系数:4.5,重要性系数:5,内部依赖:<b>独立模块</b>)  
这是 D3 用于 DOM 结构和数据集绑定的工具模块，D3 的数据驱动思想就是通过 Selection 实现，而Selection的能力是由宿主环境比如浏览器DOM提供的，Selection选择器根据数据绑定 DOM。d3-selection对 DOM 节点进行属性修改和事件处理,其底层能力还是基于W3C的DOM规范。

（5）ease(难度系数:3.5,重要性系数:3.5,内部依赖:<b>独立模块</b>)  
 对DOM节点的渐变定义，注意该模块只是定义渐变方程;真正触发渐变效果的还是遵循W3C的CSS规范或DOM规范。

（6）dsv(难度系数:4,重要性系数:3.5,内部依赖:<b>独立模块</b>)  
对导入的包含分隔符的文件进行处理，得到图表所需的数据源。注意CSV和TSV都是dsv的具体形式，其基础处理逻辑不变

（7）Path(难度系数:3,重要性系数:5,内部依赖:<b>独立模块</b>)  
D3 的 Path 模块用于处理常见的路径绘制，d3默认基于SVG渲染因此Path模块定义的路径绘制指令与SVG的等价，当然开发者可以自定义插件来实现不同绘制上下文的路径渲染能力[备注: 绘制arcTo和arc曲线的实现比较难以理解]

（8）Polygon(难度系数:3,重要性系数:4.5,内部依赖:<b>独立模块</b>)  
对于二维多边形的各种几何运算，包括求面积、周长和计算凸包等。其中计算多边形凸包基于两个向量的叉积，通过不断迭代多边形顶点，来找到一组顶点使其满足凸包定义

（9）queue(难度系数:4,重要性系数:4,内部依赖:<b>独立模块</b>)  
具有并发执行能力的任务队列，该队列中任务可能终止、异常和正常执行后的回调处理。注意这里所谓的并发能力，其实是一种软性并发，该模块控制任务队列的执行动作，至于任务本身是异步还是同步任务，则不由queue来决定，而是基于JS引擎。

（10）Time(难度系数:3,重要性系数:4,内部依赖:<b>独立模块</b>)  
基于W3C的date对象，来封装包括时分秒和星期年月等，这个d3-time模块主要是绘制时间序列图表时用于计算scale的定义域/值域的映射关系

（11）Timer(难度系数:4.5,重要性系数:4.5,内部依赖:<b>独立模块</b>)  
用于处理并发动画的高效计时队列,注意与上面d3-queue的区别。d3-timer对动画帧的渲染进行计时，超时后触发一组动画任务的执行

（12）Voronoi/delaunay(难度系数:5,重要性系数:3,内部依赖:<b>独立模块</b>)  
针对给定的点计算维诺图，这是一种复杂的图表结构。目前该模块建议废弃，并使用<b>d3-delaunay</b>模块，d3-delaunay模块基于[Delaunator](https://github.com/mapbox/delaunator)。d3-delaunay模块构建Delaunay三角剖分的速度比d3-voronoi快5-10倍。

（13）collections(难度系数:3.5,重要性系数:4.5,内部依赖:<b>d3-array</b>)  
D3 中除了数组形式的数据结构，还有一类具有 keys 值的层次结构对象，比如 Maps、Sets、Nests 等。针对这些基本的数据结构实现了整套的功能

（14）Contour-轮廓多边形(难度系数:4.5,重要性系数:3,内部依赖:<b>d3-array</b>)  
轮廓多边形在很多场景都有使用，比如可视化热力分布图、等温线、等高线等

（15）Fetch(难度系数:3,重要性系数:4,内部依赖:<b>d3-dsv</b>)  
D3 的数据源大部分来自网络，因此定义 Fetch 模块实现网络请求。响应数据要么是JSON或者DSV格式文件，因此需要对数据进行转换处理才能被D3相应模块接收。注意fetch模块基于W3C的fetch规范，针对旧版浏览器使用XMLHTTPRequest请求

（16）format(难度系数:4,重要性系数:3,内部依赖:<b>d3-queue</b>)
对一些数据格式进行转换，以方便人类理解,实际上不影响d3的工作流程。即<b>FOrmatting numbers for human consumption is the purpose of d3-format</b>

（17）Interpolate(难度系数:4,重要性系数:4,内部依赖:<b>d3-color</b>)  插值器用于对数组、颜色、字符串、数组、对象等任何具有离散的结构进行差值

（18）Quadtree(难度系数:4,重要性系数:3,内部依赖:<b>d3-array</b> 
对二维几何空间进行递归划分的模块,这种多叉树数据结构可以实现快速搜索。在游戏领域经常使用这种数据结构来提高渲染效率、加速碰撞检测，以及空间搜索。注意四叉树中的每个叶子节点是一个矩形区域，由两个坐标点来描述。节点数据保存到data属性，节点的node[]数组保存子节点列表。

（19）Random Numbers(难度系数:3.5,重要性系数:3,内部依赖:<b>d3-array</b>)  
生成符合特定数学分布的随机数数组

（20）Axis(难度系数:3.5,重要性系数:5,内部依赖:<b>d3-scale|d3-selection</b>)  
坐标轴是对内生比例尺的外化，即坐标轴方便人类理解而真正参与图形运算的其实是 scale 比例尺。D3 在处理坐标轴的刻度值方面进行了完备的算法实现，可以很友好地在比例尺缩放操作中美化刻度显示

（21）Chord(难度系数:4,重要性系数:3,内部依赖:<b>d3-array|d3-path</b>)  
D3 的实现哲学中并不会针对每种图表进行设计，而是对一类图表抽取共性的东西，并称之为 layout。布局就是 D3 在连接数据和图表实例的桥梁，开发者最主要的工作就是将数据转换为对应图表的 layout。d3.chord(matrix)返回一个chord数组，每个chord表示两个节点的双向流量。chord是一个对象，具有两个属性source和target，其中每个属性又具有一系列属性

（22）drag(难度系数:3.5,重要性系数:4.5,内部依赖:<b>d3-dispatch|d3-selection</b>)  
在 SVG、HTML 和 Canvas 上实现拖拽行为，拖拽事件基于W3C事件规范，采用d3-dispatch事件分发机制。注意的是，拖拽行为可由鼠标或者touchable的设备触发，而d3-drag屏蔽了底层事件，而是通过自定义"start"、"drag"和"end"三个事件来统一行为监听

（23）Geographies(难度系数:5,重要性系数:3.5,内部依赖:<b>d3-array|d3-format</b>)  
有关地图投影、地图形态和相关数学运算的模块。大量涉及球面、曲面运算

（24）scale-chromatic(难度系数:4,重要性系数:3.5,内部依赖:<b>d3-color|d3-interpolate</b>)
 颜色空间与比例尺scale的映射管理,颜色空间在UI侧，scale在计算侧。

（25）Shape(难度系数:5,重要性系数:5,内部依赖:<b>d3-path|d3-polygon</b>)  
该模块定义了一系列基础图元，包含弧线、曲线、饼图、封闭图、线段、基于贝塞尔曲线实现的 Links 线、Symbols、堆栈图等

（26）Time Format(难度系数:4,重要性系数:3.5,内部依赖:<b>d3-time|d3-queue</b>)  
受到 C 语言 strptime 和 strftime 函数的启发，实现的时间格式模块

（27）Brush(难度系数:4,重要性系数:4.5,内部依赖:<b>d3-dispatch|d3-drag|d3-interpolate|d3-selection|d3-transition</b>)  
刷子的作用是在图表中选取一个区域，用于后续的缩放操作。其原理是基于d3-selection来得到brushing覆盖过的DOM节点集合，并对DOM节点绑定brush事件对象。brush动作三部曲：实时记录刷过的有效区间state.selection、不断调用redraw来重绘刷动覆盖层样式、不断分发brush事件，供监听函数处理(核心是重建scale中定义域和值域的映射关系)

（28）Scale(难度系数:4.5,重要性系数:5,内部依赖:<b>d3-array|d3-collection|d3-format|d3-interpolate|d3-time|d3-time-format|d3-color</b>)  
scale是图表能够正常显示的关键，是具有数学含义的映射关系，如果说format是面向人类的工具，则scale是图表内生的数学尺度。比例尺分为线性、非线性、序列、发散比例尺、量化比例尺等

（29）Transition(难度系数:4,重要性系数:4.5,内部依赖:<b>d3-color|d3-dispatch|d3-ease|d3-interpolate|d3-selector|d3-timer</b>)  
对选择的 DOM 集进行渐变动画的模块

（30）Hierarchies(难度系数:4.5,重要性系数:4.5,内部依赖:<b>d3-array|d3-dsv|d3-queue|d3-random</b>)  
对具有层次结构图表的一种布局算法，现实中 Tree 图、TreeMap、Packing 图等都可以使用这种布局变种,其中计算circle-packing的圆心坐标算法比较复杂，要让所有圆不会相交重叠。treemap在webpack生成模块体积图时使用,注意treeMap与quardtree的差别，quardTree四叉树生成相当而言要简单些

（31）Force(难度系数:4,重要性系数:4,内部依赖:<b>d3-collection|d3-dispatch|d3-quadtree|d3-timer</b>) 
基于速度的 Verlet 积分实现的力导向图，这种布局算法在模拟具有强度信息的关系网很有效。在经典运行学中，只要知道每个时间截面上刚体的位置和速度就能得到刚体的运动学全部信息。在实际应用中，不可能在每个tick采集刚体的位置和速度，因此可以引入时间t变量来模拟。当然对于非匀速运动，时间t的周期越长造成的坐标误差越大。注意alpha表示刚体运动速度在衰减过程中的迭代因子，可以联想机器学习中的learning rate、velocity表示刚体初速度，strength用于表征刚体速度向量的增量。

（32）Zoom(难度系数:4,重要性系数:4.5,内部依赖:<b>d3-dispatch|d3-drag|d3-interpolate|d3-selection|d3-transition</b>)  
对 SVG 图表、HTML 图表或者 canvas 图表进行平移/缩放操作,在形态上同属于d3-brush模块提供的能力，本质上都是动态修改scale的定义域和值域映射关系，从而驱动图表的变化









