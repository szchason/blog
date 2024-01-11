---
title: Docker
description: Docker
sidebar_label: Docker简介和使用
hide_title: true
last_update:
  date: 2023-04-17
  author: Chason
---

## 一、Docker简介

Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从Apache2.0协议开源。 Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

## 二、Docker的安装

> 详细参考[https://docs.docker.com/engine/install/centos/](https://docs.docker.com/engine/install/centos/)： 本次以cenos系统进行安装

### 2.1、先卸载旧的docker

```bash
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

执行结果如下图：

![1669216531976](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361673-0fbba4.png)

### 2.2、设置yum的repo

```bash
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

执行结果如下图：

![1669216564964](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361684-641f00.png)

### 2.3、安装Docker Engine

```bash
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

执行结果如下图：

![1669216689717](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361690-f22367.png)

### 2.4、启动docker

```bash
sudo systemctl start docker
```

查看docker是否安装成功和使用docker

```bash
docker version
docker info
```

执行结果如下图：

![1669216731413](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361696-b43c53.png)

```bash
sudo docker run hello-world
```

执行结果如下图：

![1669216803789](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361701-fe5046.png)

### 2.5、卸载docker

> 依次输入命令即可，不做展示

```bash
sudo yum remove docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

## 三、Docker的基本概念

### 3.1、镜像

Docker 镜像就是一个只读的模板。 Docker 提供了一个很简单的机制来创建镜像或者更新现有的镜像，用户甚至可以直接从其他人那里下载一个已经做好的镜像来直接使用。

### 3.2、容器

Docker 利用容器来运行应用， 容器是从镜像创建的运行实例。它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台。

### 3.3、仓库

仓库是集中存放镜像文件的场所。有时候会把仓库和仓库注册服务器（Registry）混为一谈，并不严格区分。实际上，仓库注册服务器上往往存放着多个仓库，每个仓库中又包含了多个镜像，每个镜像有不同的标签（tag）。

仓库分为公开仓库（Public）和私有仓库（Private）两种形式。

最大的公开仓库是 [Docker Hub](https://hub.docker.com/)，存放了数量庞大的镜像供用户下载。 国内的公开仓库包括 [Docker Pool](https://promotion.aliyun.com/ntms/act/kubernetes.html) 等，可以提供大陆用户更稳定快速的访问。

用户也可以在本地网络内创建一个私有仓库， 当用户创建了自己的镜像之后就可以使用 `push` 命令将它上传到公有或者私有仓库，这样下次在另外一台机器上使用这个镜像时候，只需要从仓库上 `pull` 下来就可以了。

## 四、Docker的生命周期详解

![1680591890981](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361712-75351f.png)

## 五、Docker的镜像

> 镜像是 Docker 的三大组件之一， Docker 运行容器前需要本地存在对应的镜像，如果镜像不存在本地，Docker 会从镜像仓库下载（默认是 Docker Hub 公共注册服务器中的仓库

### 5.1、获取镜像

获取镜像的命令：`docker pull `

```bash
docker pull ubuntu:12.04

// 相当于 docker pull registry.hub.docker.com/ubuntu:12.04
```

下载centos镜像，例如：

![1669296855884](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361718-b4ab33.png)

🔨命令解析： <u>docker pull registry.hub.docker.com/ubuntu:12.04 即从服务器registry.hub.docker.com中的ubuntu仓库来下载标记12.04的镜像</u>

### 5.2、列出镜像

列出镜像命令：`docker images`

![1669295789331](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361723-b200bb.png)

在列出信息中，可以看到几个字段信息

- REPOSITORY：来自于哪个仓库，比如 ubuntu
- TAG：镜像的标记，比如14.04、latest
- IMAGE ID：它的 ID 号（唯一）
- CREATED：创建时间
- SIZE：镜像大小

### 5.3、存出和载入镜像

#### 5.3.1、 导出镜像

如果要导出镜像到本地文件，可以使用`docker save`命令

```bash
docker save -o centos.tar centos:latest
```

执行结果如下图：

![1669297020933](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361730-0d4773.png)

#### 5.3.2、载入镜像

可以使用`docker load` 从导出的本地文件中再导入到本地镜像库，例如

```bash
docker load --input ubuntu_14.04.tar
```

Or

```bash
docker load < ubuntu_14.04.tar
```

### 5.4、移除镜像

移除镜像命令：`docker rmi`

```bash
docker rmi -f 镜像id 		# 删除指定的镜像
docker rmi -f 镜像id 镜像id 镜像id 		# 移除多个镜像id
docker rmi -f $(docker images -aq)  # 删除全部镜像
```

👋注意： <u>docker rm命令是移除容器，在删除镜像之前先用docker rm删掉依赖于这个镜像的所有容器</u>

### 5.5、Docker镜像的实现原理

Docker 使用 [Union FS](http://en.wikipedia.org/wiki/UnionFS) 将这些不同的层结合到一个镜像中去。通常 Union FS 有两个用途, 一方面可以实现不借助 LVM、RAID 将多个 disk 挂到同一个目录下,另一个更常用的就是将一个只读的分支和一个可写的分支联合在一起，Live CD 正是基于此方法可以允许在镜像不变的基础上允许用户在其上进行一些写操作。 Docker 在 AUFS 上构建的容器也是利用了类似的原理。

## 六、Docker的容器

> 容器是独立运行的一个或一组应用，以及它们的运行态环境。对应的，虚拟机可以理解为模拟运行的一整套操作系统（提供了运行态环境和其他系统环境）和跑在上面的应用

### 6.1、启动容器

```bash
docker run [可选参数] images
# 参数说明
--name='Name' 容器名字
-d  				 后台方式运行
-it  				 使用交互方式运行，进入容器查看内容
-p					 指定容器的端口 -p 8080:8080(主机端口:容器端口)	或 容器端口
```

启动容器

![1669552565872](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361736-3ea4b0.png)

或者，启动容器并进入容器，例如：

```bash
docker run -it centos /bin/bash
```

执行结果如下图：

![1669537989179](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361739-359078.png)

### 6.2、进入容器

> 一般是指容器已经运行，需要进入到容器

使用`docker exec`进入容器

```bash
docker exec -it 容器id /bin/bash
```

执行结果如下图：

![1669553086221](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361745-9c7907.png)

### 6.3、删除容器

> 删除容器使用：docker rm

```bash
docker rm 容器id  	# 删除指定容器，不能删除正在运行的容器，如果要强制删除	rm -f
docker rm -f $(docker ps -aq)  		# 删除所有容器
```

👋注意： <u>删除指定容器，不能删除正在运行的容器，如果要强制删除 docker rm -f</u>

### 6.4、终止容器

> 1. 使用docker stop 来终止一个运行中的容器，可以通过 docker start 命令来重新启动
> 2. 使用exit或者Ctrl+d退出容器，且是直接容器停止并退出容器
> 3. 使用快捷键Ctrl+P+Q，容器不停止退出容器

![1669538034832](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361750-44e9b9.png)

使用Ctrl+P+Q退出容器

![1669553267892](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361753-c92fc0.png)

### 6.5、查看正在运行的容器

```bash
docker ps   # 查看正在运行的容器
docker ps -a # 查看容器的运行记录
docker ps -a -n=1 # 显示一条记录
docker ps -aq  # 只显示容器id
```

查看运行的容器

![1669552659111](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361757-0ab9aa.png)

其中：

CONTAINER ID：容器id

IMAGE：镜像名称

COMMAND NAMES

CREATED：创建时间

STATUS

PORTS ：端口映射

## 七、Docker的仓库

### 7.1、Docker Hub

> 目前 Docker 官方维护了一个公共仓库 [Docker Hub](https://hub.docker.com/)，其中已经包括了超过 15,000 的镜像。大部分需求，都可以通过在 Docker Hub 中直接下载镜像来实现。

登录：可以通过执行 docker login 命令来输入用户名、密码和邮箱来完成注册和登录。 注册成功后，本地用户目录的 .dockercfg 中将保存用户的认证信息。

基本操作：用户无需登录即可通过 docker search 命令来查找官方仓库中的镜像，并利用 docker pull 命令来将它下载到本地。

用户也可以在登录后通过 docker push 命令来将镜像推送到 Docker Hub。

### 7.2、Docker私有仓库搭建

> 有时候使用 Docker Hub 这样的公共仓库可能不方便，用户可以创建一个本地仓库供私人使用。
>
> 而Docker推荐的是docker-registry，这里使用Harbor：https://goharbor.io/

上传tar.gz文件至linux的/harbor目录下，并且进行解压

![1669556998856](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361762-2c6847.png)

解压操作

![1669557102049](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361765-dc7bf8.png)

复制一份harbor.yml.tmpl，install.sh执行的是harbor.yml

![1669557374810](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361769-bdc685.png)

更改harbor.yml配置文件

> ip：192.168.1.120
>
> 端口：9527
>
> 管理员用户名：admin
>
> 密码：Harbor12345

![1669557601036](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361773-76c8ee.png)

运行./install.sh文件

![1669557705995](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361777-a40ede.png)

访问地址

![1669557871044](https://gitee.com/szchason/pic_bed/raw/main/devops/docker/2023-05-29-1685361780-b578ca.png)
