---
title: Linux
description: Linux
sidebar_label: Linux简介和使用
hide_title: true
last_update:
  date: 2023-04-17
  author: Chason
---

## 一、操作系统简介

### 1、操作系统

管理计算机硬件和软件资源的计算机程序，同时也是计算机系统的内核与基石

### 2、操作系统需要处理那些：

- 管理与配置内存
- 决定系统资源供需的优先次序
- 控制输入设备与输出设备
- 操作网络与管理文件系统等基本事务
- 操作系统也提供一个让用户与系统交互的操作界面

图解：

![](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362096-e1bf1d.png)

### 3、主流的操作系统

3.1、桌面操作系统

- Window系列
- macOS
- Linux

  3.2、服务器操作系统

- Linux（特点：开源，免费）
- Window Server（收费）

  3.3、嵌入式操作系统（微波炉、电子手表）

- Linux

  3.4、 移动设备操作系统

- Unix演变出了 Linux 和 ios
- Linux 又划分了 Android 和 华为鸿蒙

![](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362102-4f4f23.png)

## 二、认识Linux

### 1、Linux的发展历程

![1655480627730](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362104-87ca33.png)

### 2、什么是Linux？

Linux是一套免费使用和自由传播的类Unix操作系统。是一个基于POSIX和Unix的多用户、多线程、多任务、支持多线程和多CPU的操作系统

它能运行主要的Unix工具软件，应用程序和网络协议，它支持32位和64位硬件。

Linux继承了Unix以网络为核心的设计思想，是一个性能稳定的多用户网络操作系统。

### 3、Linux的特点

1. 两个基本思想：

- 一切都是文件

- 每个软件都有确定的用途

2. 完全免费

3. 完全兼容POSIX1.0标准

4. 多用户，多任务

5. 良好的界面

6. 支持多种平台

7. 代码开源

### 4、Linux发行商和常见发行版

![1655481254806](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362108-60a970.png)

## 三、Linux文件类型和目录结构

### 1、Linux文件系统的结构

Linux文件系统的结构层次鲜明，就像一颗倒立的树，最顶层是其根目录(root)

![](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362111-af34e7.png)

<u>注意：</u> 根目录(root)与系统超级管理员root含义不一致，前者代表的是目录的根级，后者只是一个用户目录，管理员root文件夹在根目录(root) 下

### 2、常见目录说明

- /bin：存放二进制可执行文件(ls、cat、mkdir等)，常用命令一般都在这里
- /etc：存放系统管理和配置文件
- /home：存放所有用户文件的根目录，是用户主目录的基点，比如用户user的主目录就是/home/user，可以用~user表示；
- /usr：用于存放系统应用程序
- /opt：额外安装的可选应用程序所放置的位置。一般情况下，我们可以把tomcat等都安装到这里
- /proc： 虚拟文件系统目录，是系统内存的映射。可直接访问这个目录来获取系统信息
- /root：超级用户（系统管理员）的主目录（特权阶级^o^）；
- /sbin： 存放二进制可执行文件，只有root才能访问。这里存放的是系统管理员使用的系统级别的管理命令和程序。如ifconfig等；
- /dev：用于存放设备文件；
- /mnt： 系统管理员安装临时文件系统的安装点，系统提供这个目录是让用户临时挂载其他的文件系统；
- /boot：存放用于系统引导时使用的各种文件；
- /lib：存放着系统运行相关的库文件
- /tmp：用于存放各种临时文件，是公用的临时文件存储点；
- /var：用于存放运行时需要改变数据的文件，也是某些大文件的溢出区，比方说各种服务的日志文件（系统启动日志等）
- /lost+found： 这个目录平时是空的，系统非正常关机而留下“无家可归”的文件（windows下叫什么.chk）就在这里。

## 四、Linux常见命令

### 1、目录切换命令

```bash
cd usr :切换到该目录下的usr目录
cd ../ 或 cd .. :切换到上一层目录
cd / :切换到系统根目录
cd ~ :切换到用户主目录
cd - :切换到上一个所在目录
```

### 2、目录的操作命令(增删改查)

1. 创建目录

```bash
mkdir 目录名称
```

2. 查看目录

```bash
ls [-a -l -al]
```

3. 修改目录名称

```bash
mv 目录名称 新目录名称
```

<u>注意：</u> mv的语法不仅可以对目录进行重命名而且也可以对各种文件，压缩包等进行 重命名的操作。mv命令用来对文件或目录重新命名，或者将文件从一个目录移到另一个目录中。后面会介绍到mv命令的另一个用法。

4. 移动目录名称(剪切)

```bash
mv 目录名称 目录的新位置
```

<u>注意：</u> mv语法不仅可以对目录进行剪切操作，对文件和压缩包等都可执行剪切操作。另外mv与cp的结果不同，mv好像文件“搬家”，文件个数并未增加。而cp对文件进行复制，文件个数增加了。

5. 拷贝目录

```bash
cp -r 目录名称 目录拷贝的目标位置   -r代表递归拷贝
```

<u>注意：</u> cp命令不仅可以拷贝目录还可以拷贝文件，压缩包等，拷贝文件和压缩包时不用写 -r 递归

6. 删除目录

```bash
rm [-rf] 目录
```

<u>注意：</u> rm不仅可以删除目录，也可以删除其他文件或压缩包，为了增强记忆，无论删除任何目录或文件，都直接使用

rm -rf 目录/文件/压缩包

7. 寻找目录(查）

```bash
find 目录 参数

示例：
1. 列出当前目录及子目录所有文件和文件夹： find .
2. 在/home目录下查找以.txt结尾的文件名:  find /home -name "*.txt"
3. 同上，当忽略大小写： find /home -iname "*.txt"
4. 当前目录及子目录下查找所有以.txt和.pdf结尾的文件： find . -name "*.txt" -o -name "*.pdf"
```

### 3、文件的操作命令

1. 创建文件

```bash
touch 文件名称
```

2. 文件查看

```bash
cat 文件名称
```

3. 修改文件内容

```bash
vim 文件
```

<u>注意：</u> vim编辑器是Linux中的强大组件，是vi编辑器的加强版，vim编辑器的命令和快捷方式有很多

步骤：

vim 文件------>进入文件----->命令模式------>按i进入编辑模式----->编辑文件 ------->按Esc进入底行模式----->输入:wq/q! （输入wq代表写入内容并退出，即保存；输入q!代表强制退出不保存。）

4. 删除文件

`同目录删除`

### 4、压缩文件的操作命令

1. 打包压缩文件

   说明：Linux的打包文件一般是以.tar结尾的，压缩的命令一般是以.gz结尾的。而一般情况下打包和压缩是一起进行的，打包并压缩后的文件的后缀名一般.tar.gz

   命令：

   ```bash
   tar -zcvf 打包压缩后的文件名 要打包压缩的文件
   ```

   其中：

   z：调用gzip压缩命令进行压缩

   c：打包文件

   v：显示运行过程

   f：指定文件名

2. 解压压缩文件

   命令：

   ```bash
   tar [-xvf] 压缩文件
   ```

   其中：

   x：代表解压

   v：显示运行过过程

   f：指定文件名

### 5、Linux权限命令

操作系统中每个文件都有特定的权限，所属用户和所属组。权限是操作系统用来限制资源访问的机制，在Linux中权限一般分为读(readable)、写(writable)和执行(excutable)，分为三组。分别对应文件的属主(owner)，属组(group)和其他用户(other)，通过这样的机制来限制那些用户、那些组可以对特定的文件进行什么样的操作

命令：

```bash
ls -al  // 查看某个目录下的文件或目录权限
```

![1677936006871](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362116-3235e5.png)

第一列信息解释如下：

![](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362119-a26453.png)

**文件类型：**

- d：代表目录
- -：代表文件
- l：代表链接

**Linux中的权限划分：**

- r：代表权限可读，r也可以用数字4表示
- w：代表权限是可写，w也可以用数字2表示
- x：代表权限是可执行，x也可以用数字1表示

**文件和目录权限的区别**

对文件和目录而言，读写执行代表不同的意义。

对于文件：

| 权限名称 |        可执行操作        |
| :------: | :----------------------: |
|    r     | 可以使用cat查看文件内容  |
|    w     |    可以修改文件的内容    |
|    x     | 可以将其运行为二进制文件 |

对于目录：

| 权限名称 |        可执行操作        |
| :------: | :----------------------: |
|    r     |   可以查看目录下的列表   |
|    w     | 可以创建和删除目录下文件 |
|    x     | 可以使用cd 命令 进入目录 |

**Linux的用户和组：**

在linux中的每个用户必须属于一个组，不能独立于组外。在linux中每个文件有所有者、所在组、其它组的概念

- **所有者**

  一般为文件的创建者，谁创建了该文件，就天然的成为该文件的所有者，用ls ‐ahl命令可以看到文件的所有者 也可以使用

  ```bash
  chown 用户名 文件名 :修改文件的所有者
  ```

- **文件所在组**

  当某个用户创建了一个文件后，这个文件的所在组就是该用户所在的组 用ls ‐ahl命令可以看到文件的所有组 也可以使用

  ```bash
  chgrp 组名 文件名 :修改文件所在的组
  ```

- **其他组**

  除开文件的所有者和所在组的用户外，系统的其它用户都是文件的其它组

修改文件/目录的权限

命令：

```bash
chmod u=rwx,g=rw,o=r aaa.txt
```

其中:

u：代表属主

g：代表属组

o：代表其他用户

### 6、 Linux用户管理

- 添加用户账号

```bash
useradd 选项 用户名
```

- 删除用户账户

```bash
userdel 选项 用户名
```

- 修改账户

```bash
usermod 选项 用户名
```

- 更改或创建用户密码

```bash
passwd 用户名
```

- 显示用户账户密码信息

```bash
passwd -S 用户名
```

- 清除用户密码

```bash
passwd -d 用户名
```

<u>注意：</u> useradd命令用于Linux中创建的新的系统用户。useradd可用来建立用户帐号。帐号建好之后，再用passwd设定帐号的密码．而可用userdel删除帐号。使用useradd指令所建立的帐号，实际上是保存在/etc/passwd文本文件中。

passwd命令用于设置用户的认证信息，包括用户密码、密码过期时间等。系统管理者则能用它管理系统用户的密码。只有管理者可以指定用户名称，一般用户只能变更自己的密码。

### 7、Linux系统用户组的管理

### 8、其他常用命令

- 显示当前位置

```bash
pwd
```

### 9、网络管理命令

- 查看当前系统的网卡信息

```bash
ifconfig
```

- 查看与某台机器的连接情况

```bash
ping
```

- 查看当前系统的端口使用

```bash
netstat -an
```

- 关机

```bash
shutdown -h now  //指定现在立即关机
shutdown +5 "System will shutdown after 5 minutes"  //指定5分钟后关机
```

- 重开机

```bash
reboot
```

## 五、linux防火墙

1. 关闭防火墙

   ```bash
   systemctl stop firewalld.service
   ```

2. 禁止防火墙开机启动

   ```bash
   systemctl disable firewalld.service
   ```

3. 放行端口

   允许访问80端口

   ```bash
   firewall-cmd --zone=public --add-port=80/tcp --permanent
   ```

4. 重启防火墙

   ```bash
   firewall-cmd --reload
   ```

## 六、yum基本使用

> 在window系统当中，查找、安装、下载、或者卸载软件可以通过某个助手或者某个管家进行下载
>
> 在liunx当中，如果我们想要查找、安装、下载或者卸载另外的软件，就需要通过yum来进行操作。
>
> 英文全称是：Yellow dog Updater，Modified

### 1、yum的作用

基于rpm包管理，能够从指定的服务器(yum源）自动下载RPM包并且安装，可以自动处理依赖性关

系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。

### 2、yum常用命令

1. 列出所有可更新的软件清单命令：yum check-update
1. 更新所有软件命令：yum update
1. 仅安装指定的软件命令：yum install <package_name>
1. 仅更新指定的软件命令：yum update <package_name>
1. 列出所有可安装的软件清单命令：yum list
1. 删除软件包命令：yum remove <package_name>
1. 查找软件包命令：yum search
1. 清除缓存命令：

- yum clean packages：清除缓存目录下的软件包
- yum clean headers：清除缓存目录下的headers
- yum clean oldheaders：清除缓存目录下的旧得headers
- yum clean，yum clean all（=yum clean packages, yum clean oldheaders）:清除缓存目录下的软件包和旧的headers

### 3、更改yum源

> 因为yum源默认是国外的，经常无法访问或者访问缓慢。
>
> 这时需要将yum源地址换成国内的

先安装wget

```bash
yum -y install wget
```

进入yum源文件夹

```bash
cd /etc/yum.repos.d/
```

![1668441088058](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362128-d9443f.png)

备份Cent-OS-Base.repo文件

```bash
mv CentOS-Base.repo CentOS-Base.repo.back
```

![1668441205643](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362132-f0e9e3.png)

利用wget下载阿里云的repo替换CentOS-Base.repo

```bash
wget -O CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
```

下载完成

![1668441639148](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362137-bec5bd.png)

查看CentOS-Base.repo

```bash
cat CentOS-Base.repo
```

![1668441740171](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362140-eaf23f.png)

清除原先的缓存文件

```bash
yum clean all
```

加载新镜像

```bash
yum makecache
```

## 七、liunx安装软件的方式

### 1、rpm安装（ 基本已被yum取代 ）

> rpm也就是red hat package manager，是红帽公司出品的软件包管理工具，能进行软件包的安装，卸载，升级，查询。rpm 是centos/redhat系统里软件安装管理的命令，比yum要底层，yum底层就是调用rpm去安装软件。
>
> .rpm包的一般格式:软件名-版本号-发布次数.系统版本.硬件平台.rpm
>
> rpm包管理机制的系统：centos，redhat，opensuse，oracle linux ，fedora等红帽系
>
> deb包管理机制的系统：debian，Ubuntu

1. rpm安装命令

- rpm -q jdk：查看jdk是否安装

- rpm -qa：查看所有rpm安装包

- rpm -ql jdk：查看jdk路径

- rpm -ivh jdk.rpm安装jdk，并显示安装进度

  ![img](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362146-651eef.jpg)

- rpm -e jdk：卸载已经安装的jdk

- rpm -e mysql - -nodeps：卸载已经安装的mysql，- -nodeps忽略相关的依赖卸载

2. 下面以安装nginx为例，其他软件安装方式也是如此

   镜像源地址：http://nginx.org/packages/centos/7/x86_64/RPMS/nginx-1.20.1-1.el7.ngx.x86_64.rpm

- 首先，从镜像源地址下载rpm文件，将rpm文件上传到服务器中

  ![1668434541783](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362151-02def2.png)

- 安装

  ```bash
  rpm -ivh nginx-1.20.1-1.el7.ngx.x86_64.rpm
  ```

  ![1668434570991](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362155-279ec0.png)

- 查看nginx版本

  ```bash
  nginx -v
  ```

  ![1668434624453](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362159-68c245.png)

- 开启nginx并且查看nginx运行状态

  ```bash
  systemctl start nginx  // 开启nginx
  ```

  ```bash
   ps -df |grep nginx // 查看运行状态
  ```

  ![1668434810696](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362162-751a97.png)

- 查找nginx的安装目录

  ```bash
  find / -name nginx
  ```

  ![1668434960926](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362165-9499f5.png)

- 关闭防火墙访问nginx页面

  ![](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362815-9f70d4.png)

### 2、yum指令安装

> 使用yum之前必须保证能够访问外网

以yum下载wget为例：

```bash
yum install -y wget
```

![1668440836148](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362170-69c561.png)

其它使用详情见七

### 3、wget下载

> wget 是一个从网络上自动下载文件的自由工具，支持通过 HTTP、HTTPS、FTP 三个最常见的 TCP/IP协议 下载，并可以使用 HTTP 代理。“wget” 这个名称来源于 “World Wide Web” 与 “get” 的结合。
> 所谓自动下载，是指 wget 可以在用户退出系统的之后在继续后台执行，直到下载任务完成。

1. 安装wget

首先liunx并没有wget，需要使用yum进行下载

![1668440803704](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362174-6f9caf.png)

使用yum安装wget

```bash
yum install -y wget
```

wget的常用命令

```bash
GNU Wget 1.12，非交互式的网络文件下载工具。
用法： wget [选项]... [URL]...

长选项所必须的参数在使用短选项时也是必须的。

开始:
  -V,  --version           显示 Wget 的版本信息并退出。
  -h,  --help              打印此帮助。
  -b,  --background        启动后转入后台。
  -e,  --execute=COMMAND   运行一个‘.wgetrc’风格的命令。

登入并输入文件:
  -o,  --output-file=FILE    将信息写入 FILE。
  -a,  --append-output=FILE  将信息添加至 FILE。
  -d,  --debug               打印大量调试信息。
  -q,  --quiet               安静模式(无信息输出)。
  -v,  --verbose             详尽的输出(此为默认值)。
  -nv, --no-verbose          关闭详尽输出，但不进入安静模式。
  -i,  --input-file=FILE     下载本地或外部 FILE 中的 URLs。
  -F,  --force-html          把输入文件当成 HTML 文件。
  -B,  --base=URL            解析与 URL 相关的
                             HTML 输入文件（由 -i -F 选项指定）。

下载:
  -t,  --tries=NUMBER           设置重试次数为 NUMBER (0 代表无限制)。
        --retry-connrefused       即使拒绝连接也是重试。
  -O,  --output-document=FILE    将文档写入 FILE。
  -nc, --no-clobber              不要重复下载已存在的文件。

  -c,  --continue                继续下载部分下载的文件。
       --progress=TYPE           选择进度条类型。
  -N,  --timestamping            只获取比本地文件新的文件。

  -S,  --server-response         打印服务器响应。
       --spider                   不下载任何文件。
  -T,  --timeout=SECONDS         将所有超时设为 SECONDS 秒。
       --dns-timeout=SECS        设置 DNS 查寻超时为 SECS 秒。
       --connect-timeout=SECS    设置连接超时为 SECS 秒。
       --read-timeout=SECS       设置读取超时为 SECS 秒。
  -w,  --wait=SECONDS            等待间隔为 SECONDS 秒。
       --waitretry=SECONDS       在取回文件的重试期间等待 1..SECONDS 秒。
       --random-wait             取回时等待 0...2*WAIT 秒。
       --no-proxy                关闭代理。
  -Q,  --quota=NUMBER            设置取回配额为 NUMBER 字节。
       --bind-address=ADDRESS    绑定至本地主机上的 ADDRESS (主机名或是 IP)。
       --limit-rate=RATE         限制下载速率为 RATE。
       --no-dns-cache            关闭 DNS 查寻缓存。
       --restrict-file-names=OS  限定文件名中的字符为 OS 允许的字符。
       --ignore-case             匹配文件/目录时忽略大小写。
  -4,  --inet4-only              仅连接至 IPv4 地址。
  -6,  --inet6-only              仅连接至 IPv6 地址。
       --prefer-family=FAMILY    首先连接至指定协议的地址
                                 FAMILY 为 IPv6，IPv4 或是 none。
       --user=USER               将 ftp 和 http 的用户名均设置为 USER。
       --password=PASS           将 ftp 和 http 的密码均设置为 PASS。
       --ask-password           提示输入密码。
       --no-iri                关闭 IRI 支持。
       --local-encoding=ENC      IRI 使用 ENC 作为本地编码。
       --remote-encoding=ENC     使用 ENC 作为默认远程编码。

目录:
  -nd, --no-directories           不创建目录。
  -x,  --force-directories        强制创建目录。
  -nH, --no-host-directories      不要创建主目录。
       --protocol-directories     在目录中使用协议名称。
  -P,  --directory-prefix=PREFIX  以 PREFIX/... 保存文件
       --cut-dirs=NUMBER          忽略 NUMBER 个远程目录路径。

HTTP 选项:
       --http-user=USER        设置 http 用户名为 USER。
       --http-password=PASS    设置 http 密码为 PASS。
       --no-cache              不在服务器上缓存数据。
       --default-page=NAME     改变默认页
                               （默认页通常是“index.html”）。
  -E,  --adjust-extension      以合适的扩展名保存 HTML/CSS 文档。
       --ignore-length         忽略头部的‘Content-Length’区域。
       --header=STRING         在头部插入 STRING。
       --max-redirect          每页所允许的最大重定向。
       --proxy-user=USER       使用 USER 作为代理用户名。
       --proxy-password=PASS   使用 PASS 作为代理密码。
       --referer=URL           在 HTTP 请求头包含‘Referer: URL’。
       --save-headers          将 HTTP 头保存至文件。
  -U,  --user-agent=AGENT      标识为 AGENT 而不是 Wget/VERSION。
       --no-http-keep-alive    禁用 HTTP keep-alive(永久连接)。
       --no-cookies            不使用 cookies。
       --load-cookies=FILE     会话开始前从 FILE 中载入 cookies。
       --save-cookies=FILE     会话结束后保存 cookies 至 FILE。
       --keep-session-cookies  载入并保存会话(非永久) cookies。
       --post-data=STRING      使用 POST 方式；把 STRING 作为数据发送。
       --post-file=FILE        使用 POST 方式；发送 FILE 内容。
       --content-disposition   当选中本地文件名时
                               允许 Content-Disposition 头部(尚在实验)。
       --auth-no-challenge     send Basic HTTP authentication information
                               without first waiting for the server's
                               challenge.

HTTPS (SSL/TLS) 选项:
       --secure-protocol=PR     选择安全协议，可以是 auto、SSLv2、
                                SSLv3 或是 TLSv1 中的一个。
       --no-check-certificate   不要验证服务器的证书。
       --certificate=FILE       客户端证书文件。
       --certificate-type=TYPE  客户端证书类型， PEM 或 DER。
       --private-key=FILE       私钥文件。
       --private-key-type=TYPE  私钥文件类型， PEM 或 DER。
       --ca-certificate=FILE    带有一组 CA 认证的文件。
       --ca-directory=DIR       保存 CA 认证的哈希列表的目录。
       --random-file=FILE       带有生成 SSL PRNG 的随机数据的文件。
       --egd-file=FILE          用于命名带有随机数据的 EGD 套接字的文件。

FTP 选项:
       --ftp-user=USER         设置 ftp 用户名为 USER。
       --ftp-password=PASS     设置 ftp 密码为 PASS。
       --no-remove-listing     不要删除‘.listing’文件。
       --no-glob               不在 FTP 文件名中使用通配符展开。
       --no-passive-ftp        禁用“passive”传输模式。
       --retr-symlinks         递归目录时，获取链接的文件(而非目录)。

递归下载:
  -r,  --recursive          指定递归下载。
  -l,  --level=NUMBER       最大递归深度( inf 或 0 代表无限制，即全部下载)。
       --delete-after       下载完成后删除本地文件。
  -k,  --convert-links      让下载得到的 HTML 或 CSS 中的链接指向本地文件。
  -K,  --backup-converted   在转换文件 X 前先将它备份为 X.orig。
  -m,  --mirror             -N -r -l inf --no-remove-listing 的缩写形式。
  -p,  --page-requisites    下载所有用于显示 HTML 页面的图片之类的元素。
       --strict-comments    开启 HTML 注释的精确处理(SGML)。

递归接受/拒绝:
  -A,  --accept=LIST               逗号分隔的可接受的扩展名列表。
  -R,  --reject=LIST               逗号分隔的要拒绝的扩展名列表。
  -D,  --domains=LIST              逗号分隔的可接受的域列表。
       --exclude-domains=LIST      逗号分隔的要拒绝的域列表。
       --follow-ftp                跟踪 HTML 文档中的 FTP 链接。
       --follow-tags=LIST          逗号分隔的跟踪的 HTML 标识列表。
       --ignore-tags=LIST          逗号分隔的忽略的 HTML 标识列表。
  -H,  --span-hosts                递归时转向外部主机。
  -L,  --relative                  只跟踪有关系的链接。
  -I,  --include-directories=LIST  允许目录的列表。
  -X,  --exclude-directories=LIST  排除目录的列表。
  -np, --no-parent                 不追溯至父目录。
```

2. 我们以安装gitlab服务为例

在gitlab官网获取rpm信息：
![1668605902703](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362178-7696a8.png)

创建gitlab的目录/local/gitlab：

![1668605974964](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362183-5b355f.png)

用wget将gitlab下载到/local/gitlab下：

```bash
wget --content-disposition https://packages.gitlab.com/gitlab/gitlab-ce/packages/el/7/gitlab-ce-15.4.5-ce.0.el7.x86_64.rpm/download.rpm
```

![1668606660383](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362187-8586e9.png)

使用ls查看当前文件夹下多出gitlab的rpm文件：

![1668606757250](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362190-5fe99a.png)

<u>注释：</u> 下载好的rpm文件之后就是上述rpm的形式进行安装了，当然也可以通过手动下载rpm文件上传到linux上

rpm进行安装：

```bash
rpm -ivh gitlab-ce-15.4.5-ce.0.el7.x86_64.rpm
```

如发现安装失败：

![1668607335341](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362194-65ff0b.png)

参考官网来进行安装，这里统一使用yum进行安装：

![1668607465943](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362197-d27ea9.png)

依次执行命令：

```bash
yum install -y curl policycoreutils-python openssh-server perl
# Enable OpenSSH server daemon if not enabled: sudo systemctl status sshd
systemctl enable sshd
systemctl start sshd
# Check if opening the firewall is needed with: sudo systemctl status firewalld
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
systemctl reload firewalld
```

![1668607609051](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362202-fab51f.png)

再次使用`rpm -ivh gitlab-ce-15.4.5-ce.0.el7.x86_64.rpm`进行安装：

![1668607716882](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362206-075690.png)

初始化Gitlab命令（保存配置或重新载入配置）：

```bash
gitlab-ctl reconfigure
```

到这里就是保存配置完成：

![1668608055429](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362210-d8af8c.png)

gitlab服务启停管理：

启动服务： gitlab-ctl start
停止服务： gitlab-ctl stop
重启服务： gitlab-ctl restart
查看状态： gitlab-ctl status

查看gitlab的初始账户：

gitlab初始账户为`root`

```bash
cat /etc/gitlab/initial_root_password
```

![1668608671962](https://gitee.com/szchason/pic_bed/raw/devops/images/linux/2023-05-29-1685362216-e7f760.png)
