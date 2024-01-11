---
id: picgo
title: Picgo
description: 利用md文件提高写文档效率
sidebar_label: 利用md文件提高写文档效率
hide_title: true
last_update:
  date: 2023-07-01
  author: Chason
---

## 一、前期准备工作

1. Typora的markdown编辑器
2. PicGo上传图床工具
3. gitee用于搭建外网图床仓库

## 二、gitee创建公共仓库作为图床

### 2.1、创建公共仓库

> gitee和GitHub都可以作为图床的一个仓库，这里选择gitee的原因是：github属于外网，访问较慢，gitee访问就比较快。

![image-20230520182100452](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684639882-2c8662.png)

设置仓库为开源仓库

![image-20230520213844055](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684639894-66e637.png)

![image-20230520213919224](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684639897-002ca2.png)

👋注意： <u>gitee目前只能选择私有仓库，创建成功后需要手动设置为公共仓库。同时gitee仓库存储免费个人用户只有5GB</u>

### 2.2、创建存储私人令牌

![image-20230520213919224](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684639952-3cd7ec.png)

👋注意: <u>私人令牌记得保存好</u>

## 三、配置PicGo

### 3.1、下载PicGo

下载地址：[PciGo下载地址](https://github.com/Molunerfinn/PicGo)

### 3.2、PicGo安装gitee-uploader插件

![image-20230520220551270](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684639964-b1c2ed.png)

### 3.3、设置gitee图床地址

![image-20230520220736609](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684639968-9b049d.png)

参数分析：

repo：设置为`owner/仓库地址`形式，`owner对应仓库空间地址`

![](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684639982-b7a8b2.png)

branch：对应仓库的分支

token：对应gitee的私人令牌

paths：对应仓库的文件路径

👋注意： <u>customPath和customUrl默认不设置</u>

### 3.4、测试上传

在PicGo的上传区`点击上传`进行上传测试

![image-20230520221905333](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684639993-b4124f.png)

当上传成功后在PicGo的`相册区域可以查看上传后的文件`

![image-20230520221905333](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684640001-3ce32b.png)

测试外网图片地址

![image-20230520220736609](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684640005-1a7e10.png)

## 四、配置Typora

![image-20230520220736609](https://gitee.com/szchason/pic_bed/raw/main/blogs/picgo/2023-05-21-1684640011-09fbdb.png)
