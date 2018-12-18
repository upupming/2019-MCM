# 2014 MCM Problem A

- [2014 MCM Problem A](#2014-mcm-problem-a)
  - [UMAP P111 - P137 | Keep Right to Keep "Right"](#umap-p111---p137--keep-right-to-keep-%22right%22)
    - [Abstract](#abstract)
    - [Introduction](#introduction)
      - [Restatement of the Problem](#restatement-of-the-problem)
      - [Literature Review](#literature-review)
    - [Assumptions and Justifications](#assumptions-and-justifications)
    - [Model Overview](#model-overview)
    - [The Keep-Right-Except-To-Pass Model](#the-keep-right-except-to-pass-model)
      - [The Basic Lane-changing Model](#the-basic-lane-changing-model)
        - [Changing to the Left Lane](#changing-to-the-left-lane)
        - [Changing Back to the Right Lane](#changing-back-to-the-right-lane)
      - [The Extended "Ring Road" Model](#the-extended-%22ring-road%22-model)
        - [Assumptions of the Model](#assumptions-of-the-model)
        - [Characteristics of Vehicles](#characteristics-of-vehicles)
        - [Laws Governing the Cellular Automaton](#laws-governing-the-cellular-automaton)
          - [速度](#%E9%80%9F%E5%BA%A6)
          - [位置](#%E4%BD%8D%E7%BD%AE)
          - [变道](#%E5%8F%98%E9%81%93)
        - [Modeling Using Periodic Boundry Conditions](#modeling-using-periodic-boundry-conditions)
      - [The Refined Model with Ramps](#the-refined-model-with-ramps)
        - [Additional Assumptions in the Refined Model](#additional-assumptions-in-the-refined-model)
        - [Additional Laws](#additional-laws)
        - [Modeling Using Open Boundary Conditions](#modeling-using-open-boundary-conditions)

KRETP(Keep-Right-Except-To-Pass) Rule

See https://www.comap.com/undergraduate/contests/mcm/contests/2014/problems/

大多数国家车辆（美国、中国等）靠右行驶，除了英国、澳大利亚以及前英国殖民地以外。

多车道高速公路通常采用要求司机开最右侧的车道，除非他们在超车。超车的时候司机会行驶到被超车的车道左边一个车道，超车之后，回到原来的车道。

建模并分析：

1. 这条规则在轻型和重型交通中的性能
2. 在交通流量和安全性之间权衡，比如速度限制太低或者太高等等其它因素需要考虑
3. 这条规则能否促进交通量？ - 若没有，分析替代方案，促进流量或者安全性

4. 左边行驶的国家，你的解决方案能否直接稍作转变使用，还是需要更多要求？

5. 如果同一道路上的车辆运输完全在智能系统的控制之下——无论是公路网的一部分，还是所有车辆，这会在多大程度上改变之前的分析结果？

## UMAP P111 - P137 | Keep Right to Keep "Right"

> 读着读着，发现好多交通规则方面的知识不知道，先到 [extras.md](./extras.md) 补补吧。

### Abstract

1. fuzzy syntheic evaluation(FSE) - 评判性能
2. cellular automaton-based approach - 按概率转变车道

### Introduction

介绍高速路及所给规则，本文所做的努力。

#### Restatement of the Problem

提出两个主要任务：建模模拟和数学评判。

#### Literature Review

按照时间先后顺序，同时研究的深度也在递进，思路十分清晰。

1. N-S model, simple cellular automaton model, one dimensional line
2. Rickert et al., cellular automaton, two parallel lanes
3. Chowdhury et al., different kinds of vehicles with different maximum speeds
4. K-S, slow cars might have been overestimated

### Assumptions and Justifications

简洁明了：

- **假定条件** 这样做的好处

### Model Overview

1. 微观方法建模
2. 左右变道认为是不同的行为
3. 元胞自动机模拟车辆行为
4. 利用周期边界条件，将高速路视为 Ring Road

### The Keep-Right-Except-To-Pass Model

#### The Basic Lane-changing Model

超车行为中的 5 种动作：

1. 至少发出三秒信号，参见 https://www.drivingtests.co.nz/roadcode-questions/car/core/how-long-should-you-signal-for-before-pa/
2. 变道
3. 加速
4. 发信号
5. 返回之前的车道

主要研究 2 和 5 两个变道过程。

##### Changing to the Left Lane

![20181218112837.png](https://i.loli.net/2018/12/18/5c18697f3db74.png)

> TODO, 这个图片里面的一些元素（箭头，方块），找到在 GeoGebra 中的实现。

1. 触发条件 `v[expect] > v[s]`
2. 安全性
   1. 不被后面撞上 `D[l,b,gap] > (v[lb] - v[s])t`
   2. 不撞上前面的 `D[l,f,gap] > (v[s] - v[lf])t`

##### Changing Back to the Right Lane

![20181218133349.png](https://i.loli.net/2018/12/18/5c1886d0e9fe3.png)

KRETP 规则下，司机超车之后将返回原车道。条件是：

1. 不用再次超车
2. 可以安全换回原来的车道，不被后面的车撞上 `D[r,b,gap] > (v[rb] - v[s])t`，不撞上前面的车 `D[r,f,gap] > (v[s] - v[rf])t`
3. 换回原来的车道之后，可以以相对高速前行
4. 如果想超越更多的车，需要满足 `D[r,b,gap] > (v[s] - v[rf])t`，**这个式子没看懂**

#### The Extended "Ring Road" Model

将车辆**随着时间变化的行为**看做是随机过程。使用元胞自动机模拟车辆行为。

元胞自动机中，时间是离散的，需要初始配置和一系列规则决定系统的发展规律。随着时间推移，元胞自动机逐渐推进，并且遵守相应的定律。

##### Assumptions of the Model

- `p[left]` 和 `p[right]` 表示满足变道条件时变道的概率
- as fast as possible when safe
- myopic, 只关注周围
- 只关注自己的利益，看不到全局

另外，为了实现元胞自动机，还需要假定：

- 变道不花费多的时间
- 每个单元大小为 `4m x 6m`（宽 x 长），路长 `2000` 个单元。道宽 `1` 个单元
- 时间步长为 1 秒
- 运行 2 万个时间步长（应该就是迭代次数），取最后 1000 步，取得的是稳定状态条件。
- 整体趋于最大速度，个体以 `p[slow]` 减速
- 加速平稳（节能），减速只需一个时间步长（避免撞车）

##### Characteristics of Vehicles

将车按速度从高到低划分为三类：Cars(60%), Buses(30%), Trucks(10%)，速度分别为：6单元/时间步长、5单元/时间步长、3单元每时间步长。这个设计应该是要考虑到实际的 km/h 的，换算关系如下：

```py
1cells/time step = 1cells * (6m/cells) / [1time step * 1s/time step] = 6m/s = 6 * 3.6 km/h = 21.6km/h
```

换算之后，三种车的速度分别为：130,108,65km/h，最初设计时应该是根据实际的 km/h 逆向推导 cells/time step

一般车长为 3.6m - 4.6m，将其放在单元（长 6m）中央，认为前后的空间为『安全距离』。这里可以倒推出前面单元大小的设计应该就是在车长基础上加上一些空间得来的。

##### Laws Governing the Cellular Automaton

`vehicle[i][j]`(vehicle^i_j): 第 i 个车道的第 j 辆车

> 以后编程时，约定上标为第一维索引

一些符号：

![20181218210632.png](https://i.loli.net/2018/12/18/5c18f0eda7795.png)

元胞自动机流程：

![20181218210819.png](https://i.loli.net/2018/12/18/5c18f14636926.png)

更清晰的伪代码如下：

```js
init();
for (let timeStep = 0; timeStep++; timeStep < maxSteps) {
  for (let vehicle of allVehicles) {

    let { speed, location } = getSpeedAndLocation(vehicle);

    if (canChangeToTheLeftLane(vehicle) && getRandom() < p['left']) {
      changeToTheLeftLane(vehicle);
    }
    else if (canChangeToTheRightLane(vehicle) && getRandom() < p['right']) {
      changeToTheRightLane(vehicle);
    }
  }
}
output();
```

`getSpeedAndLocation` 需要仔细考虑。

> 文章里面多次出现 `gap[i][j][t]` 与 `v[i][j][t]` 进行比较，这个含义不是太理解。应该查阅元胞自动机的相关资料。

###### 速度

用 t+1/3, t+2/3 表示 t 和 t+1 之间的时间。

> 我的感觉是这样，将每一步分为三个模拟环节，t -> t+1/3 模拟加速，t + 1/3 -> t + 2/3 模拟随机减速，t+2/3 -> t+1 模拟刹车

1. 加速，小于期望速度，速度加 1
2. 随机 `p[slow]` 减速，速度减 1
3. 刹车，防止两个车在同一个单元中（防止撞车~）
   If v[i][j][t+2/3] > gap[i][j][t], then v[i][j][t+1] = gap[i][j][t]

###### 位置

由速度得到位置：

```py
x[i][j][t+1] = x[i][j][t] + v[i][j][t+1], 前一步的位置加上一个时间步长走的距离
gap[i][j] = x[i+1][j] - x[i][j] - 1, 减 1 的意思应该这样理解：单元 4 和单元 5 之间 gap 为 0
```

###### 变道

a. 向左变道

1. 前面的车开的太慢，我无法达到自己期望的速度：`gap[i][j][t] < v[i][j][expect]`
2. 加速要求：`gap[i][j][t] < lfgap[i][j]`，左边车道的前面的车要更快一些
3. 安全性：`lbgap[i][j] > lbv[i][j]`，左车道后边的车的距离大于其速度

b. 向右变道

1. 在向左变道条件不满足的情况之下，考虑向右变道
2. 安全性：`rfgap[i][j] > v[i][j]`，右前方车辆速度较大，可以与上面的 a.2 对比一下，这里由于到右边车道不是为了加速，无需满足条件 a.2
3. 安全性：`rbgap[i][j] > rbv[i][j]`，右车道后边的车的距离大于其速度

##### Modeling Using Periodic Boundry Conditions

元胞自动机需要：

1. 边界条件

   车辆如何进出系统
2. 初始条件

   车辆的初始分布和初速度

**周期边界条件**：离开一个车辆的同时在开始处增加一个车辆，保证车辆数恒定不变。由此就可以定义**常数系统密度**，得到不同密度下规则的性能。

周期边界条件让模型中的道路看起来像是封闭系统，就像所有车辆都在一个圆周上一样。因此得名『Ring Road』模型。

#### The Refined Model with Ramps

Ramp 参见 [terms.pdf](./terms.pdf)。

增加入口斜坡和出口斜坡，应用开放边界条件。

1. 入口斜坡：给车辆机会加速到指定速度。但是一般斜坡太短，加不到 100km/h。

    > 不太理解这里所说的两种困境：As a result, vehicles in the right-most lane might have to slow down to let vehicles enter, or incoming vehicles might have a hard time entering.

2. 出口斜坡：进入前需要减速，有相同的困境。

然后为了引入斜坡，需要再加一些假设。

##### Additional Assumptions in the Refined Model

- 出口斜坡：850th - 900th 单元，50单元 * 6m/单元 = 300m
- 入口斜坡：1100th - 1500th 单元，也是 300m
  > 感觉这里要么范围错了，要么 300m 错了

##### Additional Laws

- 下坡定律：离开高速路的时候，如果已经到达 700th 单元，不允许向左变道，减速为 3cells/second。车辆在最右侧车道，850th - 900th 单元之间时，下个时间步长可以选择进入斜坡
- 上坡定律：原文的 entrance lamp 应该是 entrance ramp，在入口斜坡的车，如果向左变道的定律满足的话就进入高速路，否则继续向前（**斜坡走完了怎么继续向前？**）

##### Modeling Using Open Boundary Conditions

使用斜坡的系统不再是封闭的，需要使用**开放边界条件**决定车辆如何进入。来的车随机、系统输入离散的情况下，用**泊松分布**来模拟车辆的到达最好不过了。文中假设在任意 t 时间区间，到达车辆数符合均值为 lambda * t 的泊松分布。

补一下泊松分布的公式，在单位时间间隔发生 k 次的概率为（概率质量函数）：

![possion](https://wikimedia.org/api/rest_v1/media/math/render/svg/df3b6a7648b33ca3a987b970e4e8a719f888edb5)

定义 `p[exit]` 为通过出口斜坡出高速路的概率。尽量让出入斜坡车数均衡，将车辆上坡/下坡失败看做系统的问题。
