---
id: devopsblog
title: blog
description: DevOps部署个人自动化博客
sidebar_label: DevOps部署个人自动化博客
hide_title: true
last_update:
  date: 2023-2-22
  author: Chason
---

## 一、前期准备工作

1. 一台云服务器(配置：1核2G，系统CentOS7.9)
1. Github.com(作为git仓库存储代码)
1. 远程连接工具(SSH)：MobaXterm
1. 代码编辑器：WebStorm

## 二、自动化构建流程

### 2.1、绘制自动化流程图

![1676296311135](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676296311135.png)

### 2.2、构建过程讲解

1. 在github仓库创建一个项目，项目拥有main、dev两个分支。项目中创建脚本触发jenkins进行远程构建，脚本填写分支参数控制jenkins需要构建的分支
2. jenkins构建成功后，Version Number的插件以 `分支__时间__今日构建版本`格式作为版本号，同时docker构建的镜像格式：`任务名称:版本`进行构建
3. jenkins构建镜像成功后，删除历史版本并且运行当前最新镜像

## 三、安装docker和docker-compose

### 3.1、首先使用SSH远程连接服务器

![1676551671271](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676551671271.png)

### 3.2、安装docker

> 详细可以参考[Docker官方网址](https://docs.docker.com/engine/install/centos/)

1. 先查看是否安装过docker可以进行先删除

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

执行结果如下图:

![1676551752902](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676551752902.png)

2. 安装yum-utils和设置yum源

```bash
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

3. 开始安装docker

```bash
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

4. 启动和开机自启docker

```bash
sudo systemctl start docker
```

5. 测试是否安装成功

```bash
docker --version
```

运行结果：

![1676552187204](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676552187204.png)

### 3.3、安装docker-compose

> 以在GitHub.com下载文件手动通过SSH连接工具上传至服务器进行安装
>
> [docker-compose下载地址](https://github.com/docker/compose/tags)

1. 进入docker的github的下载地址，自由选择版本，这里以v2.15.0版本安装

![1676552615423](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676552615423.png)

点击某一个版本选择对应系统下载

![1676552695029](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676552695029.png)

2. 上传至云服务器

> 上传的服务器路径: /usr/local/bin

![1676553225718](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676553225718.png)

3. 上传完成之后, 更改文件名称、添加执行权限、添加软件连接

```bash
# 更改名称
mv docker-compose-linux-x86_64 docker-compose
# 添加执行权限
sudo chmod +x /usr/local/bin/docker-compose
# 添加软连接
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

执行如下图：

![1676553650137](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676553650137.png)

## 四、docker安装Jenkins

1. 选择LTS版本的docker安装

![1676555639562](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676555639562.png)

选择复制推荐命令

![1676555737810](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676555737810.png)

查看docker下载的Jenkins镜像

```bash
docker module_img
```

运行如下图：

![1676555954087](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676555954087.png)

2. 在 `/home` 路径下建立docker_jenkins目录,该目录下创建docker-compose.yml文件

![1676556047542](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676556047542.png)

docker-compose.yml的内容如下

```yml
version: '3'
services:
  docker_jenkins:
    image: jenkins/jenkins:lts-jdk11 # 镜像
    restart: always
    container_name: docker_jenkins # 容器名称
    ports:
      - 8080:8080 # Jenkins开放的端口,可自行设置,端口映射
      - 50000:50000
    volumes:
      - ./jenkins_home:/var/jenkins_home # 容器卷映射
```

执行docker-compose up -d命令, 运行Jenkins

```bash
docker-compose up -d
```

👋注意：<u>这里会经常遇到的问题是Jenkins容器一直在启动中, 可以使用 `docker ps` 查看容器状态</u>

```bash
docker ps # 查看Jenkins容器状态
```

![1676556732551](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676556732551.png)

可以使用 `docker logs 容器id` 查看容器内的日志

```bash
docker logs 20271d19be72
```

执行如下图：

![1676556894830](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676556894830.png)

具体原因是: 从容器映射当前文件夹下的 jenkins_home 没有执行权限, `解决方案很多`

```bash
chown -R 1000:1000 jenkins_home
```

再次执行 `docker ps` 查看, 发现可以运行

![1676557451331](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676557451331.png)

在浏览器输入ip地址查看

![1676557717117](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676557717117.png)

以上就是docker安装Jenkins的全部过程，详细可以参考[Jenkins官网](https://www.jenkins.io/zh/download/)

## 五、配置Jenkins基础插件安装

### 5.1、Jenkins安装过程配置

1. 查看管理员密码进行登录, 并且重新设置管理员

![1676557990331](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676557990331.png)

2. 选择插件安装

![1676558030613](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676558030613.png)

3. 插件安装我这边选择了 `无` 只先安装中文插件

![1676558135294](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676558135294.png)

4. 选择创建管理员用户, 自行设置

![1676558285245](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676558285245.png)

### 5.2、Jenkins基础插件配置

1. 配置中文插件翻译不完全问题

> 系统管理 → 插件管理 → Available plugins → 搜索locale安装

安装`Locale`，重启Jenkins即可

2. 修改Jenkins插件安装地址

> 由于Jenkins安装插件地址在国外源，下载速度慢，所以切换到国内地址

进入插件管理 → 选择高级设置 → 升级站点

![1676638844588](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676638844588.png)

将URL的输入的地址替换`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/dynamic-stable-2.361.4/update-center.json`(清华大学站点)，点击提交

![1676638946226](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676638946226.png)

进入/home/docker_jenkins/jenkins_home/updates目录下，修改default.json

![1676639157816](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676639157816.png)

将 www.google.com 修改为 www.baidu.com， 将updates.jenkins.io/download 替换为mirrors.tuna.tsinghua.edu.cn/jenkins，之后进行`重启`

![1676639574453](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676639574453.png)

😨踩坑记录：

<u>切换国内源可能会导致部分插件不能正常使用，因为可能清华网的插件更新比较慢甚至跟不上Jenkins的更新版本。</u>

<u>当前的Jenkins版本：2.375.3，如果是清华地址源，此版本安装NodeJS不起作用，无法选择node的版本。</u>

例如：NodeJS

正常情况如下：

![1676953164310](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676953164310.png)

3. Jenkins启用代理

Jenkins使用时会经常出现以下错误(很是烦躁)

![1676640391506](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676640391506.png)

解决方案：

![1676640538305](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676640538305.png)

## 六、安装Jenkins所需插件和凭证配置

### 6.1、安装Git

> 由于是Jenkins是docker安装运行的镜像，这里不使用服务器安装git，使用Git plugin默认进行拉取代码

![1676691941241](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676691941241.png)

配置Git plugin默认用户，应用保存即可

![1676719152935](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676719152935.png)

### 6.2、安装Node

![1676719220264](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676719220264.png)

配置自动安装node

![1676953164310](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676953164310.png)

👋注意：<u>第一次打包是比较慢，因为jenkins需要安装Node，版本就是上诉图片选择的版本，这里选择Node版本是16.18.1</u>

### 6.3、安装Generic Webhook Trigger插件实现远程构建

![1676723527068](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676723527068.png)

### 6.4、安装Version Number构建自定编号

![1676723709915](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676723709915.png)

### 6.5、安装Timestamper 控制输出中显示时间

![1676724121056](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676724121056.png)

配置Timestamper插件的系统设置

![1676724593019](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676724593019.png)

### 6.6、安装SSH Agent代理（后期使用pipeline进行打Tag）

![1676723238213](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676723238213.png)

### 6.7、安装钉钉插件进行通知

1. Jenkins安装DingTalk插件

![1676895117734](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676895117734.png)

2. 配置钉钉通知信息

创建钉钉群聊，这里不做详细阐述，可以参考以下地址：https://blog.51cto.com/yangxingzhen/5980547

进入系统管理，最下方进入钉钉配置

![1676895117734](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676978010790.png)

### 6.8、安装pipeline插件

> 安装成功，新建任务就会多出pipeline的项目类型

![1676900489599](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676900489599.png)

## 七、添加凭证

> 由于项目代码保存至GitHub上，拉取代码使用https的形式经常拉取代码失败(外网)，所以这里使用ssh形式拉取代码

### 7.1、生成ssh公钥

生成ssh不做阐述，可自行参考其他

### 7.2、GitHub上创建SSH keys

![1676894719536](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676894719536.png)

创建成功

![1676894792895](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676894792895.png)

### 7.3、Jenkins上添加凭证

![1676895031978](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676895031978.png)

### 7.4、验证凭证是否有效

1. 创建一个自由风格项目test

![1676898045187](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676898045187.png)

进行项目配置

![1676953711230](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676953711230.png)

2. 构建测试任务

![1676900138130](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676900138130.png)

3. 查看git和node的版本

![1676953604251](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676953604251.png)

👋注意：<u>第一次构建可能会出现`Host key verification failed`原因拉取失败，这里推荐现在第一个`Accept first connection`进行第一次构建，构建成功后还原默认设置</u>

错误输出：

![1676906911163](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676906911163.png)

解决方案：

![1676900257812](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676900257812.png)

## 八、jenkins使用宿主机的docker

> 在构建自动化项目之前，因为流程图中体现采用思路是jenkins构建镜像，属于docker来运行该制作的镜像。这里需要jenkins使用宿主机的docker（容器卷映射docker文件至jenkins容器内），不推荐在jenkins容器里面在安装docker

### 8.1、在映射docker文件之前，需要修改docker文件使用权限

使用`cd /var/run`命令进入到/var/run目录下

![1676954946900](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676954946900.png)

执行以下命令：

```bash
chown root:root docker.sock
chmod o+rw docker.sock
```

权限修改成功如下：

![1676955083990](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676955083990.png)

### 8.2、将宿主机的docker文件映射到jenkins容器内

> 修改/home/docker_jenkins/docke-compose.yml文件即可

修改后的文件内容：

```yml
version: '3'
services:
  docker_jenkins:
    image: jenkins/jenkins:lts-jdk11
    restart: always
    container_name: docker_jenkins
    ports:
      - 8080:8080
      - 50000:50000
    volumes:
      - ./jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock #docker映射文件
      - /usr/bin/docker:/usr/bin/docker #docker映射文件
      - /etc/docker/daemon.json:/etc/docker/daemon.json #docker映射文件
```

执行`docker-compose up -d`进行重启jenkins

### 8.3、再次使用test项目执行shell脚本使用docker命令是否成功

![1676955784561](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676955784561.png)

构建test项目，查看打印的日志

![1676956281834](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676956281834.png)

或者进入容器，验证docker是否有效

```bash
docker exec -it 容器id /bin/bash # 进入容器
docker --version # 验证docker命令
```

执行如下图：

![1676956462554](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676956462554.png)

## 九、创建Jenkins的pipeline任务

> pipeline使用项目Jenkinsfile进行构建，可以进行灵活修改。

### 9.1、新建pipeline任务

![1676976220550](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676976220550.png)

### 9.2、配置blog任务

1. 添加机器人

![1676978452356](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676978452356.png)

2. 配置触发器

选择 Generic Webhook Trigger 远程构建

![1676978501482](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676978501482.png)

配置远程构建参数

![1676978668039](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676978668039.png)

![1676979024896](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676979024896.png)

配置token

![1676978766857](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676978766857.png)

配置打印配置

![1676978788249](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676978788249.png)

![1676978997839](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/1676978997839.png)

配置流水线

![1676978788249](https://gitee.com/szchason/pic_bed/raw/blogs/images/devops/pipeline.png)

## 十、github项目配置

> 在项目中创建docker文件目录，Linux的sh脚本、dockerfile、Jenkinsfile都放在此目录下

### 10.1、配置Jenkinsfile

```bash
pipeline {
    agent any
    environment {
    	  # 构建版本
        BUILD_VERSION = VersionNumber([
            versionNumberString: '${branch}_${BUILD_DATE_FORMATTED, "yyyyMMdd"}_${BUILDS_TODAY}',
        ])
    }

    triggers {
        # 远程构建，接收branch、username参数
        GenericTrigger(
            genericVariables: [
              [key: 'branch', value: '$.branch'],
              [key: 'username', value: '$.username']
            ],
            token: 'blog',
            printContributedVariables: true,
            printPostContent: true
        )
    }

    options {
        timestamps()
    }

    tools {
        git 'Default'
    }

    stages {
        # 拉取代码
        stage('pull code') {
            steps {
                git branch: '${branch}', credentialsId: '066f42b8-5d76-4e72-9e0f-0c167d191bfb', url: 'git@github.com:szchason/blog.git'
            }
        }
        # 安装npm包
        stage('install npm packages') {
            steps {
                nodejs('Node16.18.1') {
                    sh "npm i"
                    sh "npm run build"
                }
            }
        }
        # 运行脚本，构建镜像
        stage("build docker image") {
            steps {
                sh '/bin/bash ./docker/docker.sh'
            }
        }
    }

    post {
        success {
           # 构建成功后，Jenkins后台输出版本号
            script {
                currentBuild.displayName = env.BUILD_VERSION
            }
            # 构建成功打tag
            git branch: '${branch}', credentialsId: '066f42b8-5d76-4e72-9e0f-0c167d191bfb', url: 'git@github.com:szchason/blog.git'
            sshagent(['066f42b8-5d76-4e72-9e0f-0c167d191bfb']) {
                sh "git tag -a -f ${env.BUILD_VERSION} -m 'Jenkins Git plugin tagging with ${env.BUILD_VERSION}'"
                sh "git push origin ${env.BUILD_VERSION}"
            }
        }
    }
}

```

👋注意：<u>credentialsId需要使用Jenkins生成的凭证id</u>

### 10.2、配置docker.sh脚本

```bash
#!/bin/bash

# Use jenkins job name as image name
image_name=$JOB_NAME
version="${BUILD_VERSION}"
echo $version

full_name="${image_name}:${version}"

echo $full_name

echo "---------------------"
echo "copy project files to docker folder"
cp -r ./dist ./docker
cd ./docker

echo "---------------------"
echo "stop container"
containerId=`docker ps -a | grep ${image_name} | awk '{print $1}'`
if [ "$containerId" != "" ] ; then
  docker stop $containerId
  docker rm $containerId
fi

echo "---------------------"
echo "start to build images"
docker build . -t $full_name

echo "---------------------"
echo "Delete images of other versions and run the latest one"
for tag in `docker module_img | grep ${image_name} | awk '{print $2}'`
do
  if [ "${tag}" != "${version}" ] ; then
     docker rmi -f "${image_name}:${tag}"
  fi
done

echo "docker run"
docker run --restart=always -dp 80:80 $full_name
echo "部署成功"

```

### 10.3、配置Dockerfile

```bash
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf  # docker目录下的nginx.conf映射到制作的容器中
COPY dist/ /usr/share/nginx/html/
```

## 十一、配置远程脚本

> 在根目录下创建bin目录，bin目录下创建index.mjs

### 11.1、配置index.mjs

```js
import fetch from 'node-fetch';
import { execSync } from 'child_process';

let username = 'Anonymous';
let branch = 'dev';
let jobName = 'blog';
let jenkins_url = '';

try {
  username = execSync('git config --get user.name'); // 获取用户名
  branch = execSync('git rev-parse --abbrev-ref HEAD'); // 获取当前分支
  jenkins_url = execSync('npm config get jenkins_url'); // 从npm获取远程构建的地址
} catch (e) {}

if (!jenkins_url) {
  throw Error('缺少远程构建地址');
}

fetch(`${jenkins_url.toString().trim()}/generic-webhook-trigger/invoke?token=${jobName}`, {
  method: 'post',
  body: JSON.stringify({
    username: username.toString().trim(),
    branch: branch.toString().trim(),
  }),
  headers: { 'Content-Type': 'application/json' },
})
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err, '<---err');
  });
```

👋注意：<u>jobName必须和Jenkinsfile的generic-webhook-trigger插件配置token保持一致</u>

### 10.2、package.json创建scripts脚本

```json
  "scripts": {
    "deploy": "node bin/index.mjs"
  },
```
