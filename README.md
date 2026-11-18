# Veer Flip Clock

一款运行在 **HP Veer（webOS 2.1.2）** 上的全屏翻页时钟应用，采用经典 Fliqlo 风格设计。

## 项目介绍

Veer Flip Clock 是一个面向 HP Veer 手机的极简翻页时钟应用。

项目使用 webOS Mojo 框架开发，采用 HTML、CSS 和 JavaScript 实现数字卡片及翻页动画，适配 HP Veer 的小尺寸屏幕，同时支持横屏和竖屏显示。

### 设计目标

- 全屏显示时间，隐藏多余界面元素。
- 黑色背景，经典 Fliqlo 深灰色数字卡片。
- 小时和分钟分别使用独立卡片组。
- 每个数字独立翻页，两个数字共用一个外框。
- 支持横屏和竖屏布局。
- 尽可能保持轻量，适配 webOS 2.1.2。

## 效果特点

- **经典视觉风格**：黑色背景、深灰色卡片、柔和白色数字。
- **双数字卡片组**：HH 和 MM 分别共用一个完整外框。
- **独立数字动画**：每一位数字都可以单独执行翻页动画。
- **3D 翻页效果**：使用 CSS3 `rotateX()` 和 `transform-origin` 实现。
- **分阶段动画**：先翻转旧数字上半部分，再显示新数字下半部分。

## 技术栈

| 技术 | 用途 |
|---|---|
| HTML | 时钟界面结构 |
| CSS | 卡片样式、布局和 3D 翻页动画 |
| JavaScript | 时间更新、动画状态管理 |
| webOS Mojo | 应用生命周期和场景管理 |
| webOS 2.1.2 | 目标运行平台 |

## 运行环境

开发环境：

- macOS
- webOS SDK
- HP Veer 真机
- webOS 2.1.2

项目使用的 SDK 目录：

```text
webos-sdk-redux/
```

## 项目结构

```text
veer-flip-clock/
├── app/
│   ├── assistants/
│   │   ├── main-assistant.js
│   │   └── stage-assistant.js
│   └── views/
│       └── main/
│           └── main-scene.html
├── images/
├── stylesheets/
│   └── veerflipclock.css
├── appinfo.json
├── framework_config.json
├── icon.png
├── index.html
└── sources.json
```

### 核心文件

| 文件 | 说明 |
|---|---|
| `main-scene.html` | 时钟界面 HTML 结构 |
| `main-assistant.js` | 时间更新和数字翻页逻辑 |
| `stage-assistant.js` | Stage 场景初始化 |
| `veerflipclock.css` | 页面布局、数字卡片和动画样式 |
| `appinfo.json` | 应用基本信息和启动配置 |
| `framework_config.json` | Mojo 框架配置 |

## 界面结构

时钟由两个数字卡片组和一个冒号组成：

```text
┌────────────┐     ┌────────────┐
│     HH     │  :  │     MM     │
│            │     │            │
└────────────┘     └────────────┘
```

其中：

- 左侧卡片组显示小时。
- 右侧卡片组显示分钟。
- 每组包含两个独立数字卡片。
- 两个数字共用一个外框。
- 每个数字卡片内部包含四个显示层。

### 数字卡片的四个图层

| 图层 | 用途 |
|---|---|
| `digit-top` | 静态上半部分 |
| `digit-bottom` | 静态下半部分 |
| `flip-front` | 旧数字上半部分翻转层 |
| `flip-back` | 新数字下半部分翻转层 |

## 翻页动画原理

每次数字发生变化时，执行以下流程：

1. 获取当前数字和目标数字。
2. 准备旧数字和新数字的动画图层。
3. 旧数字上半部分向下翻转。
4. 第一阶段动画结束后，启动第二阶段。
5. 新数字下半部分向上展开。
6. 更新静态数字层，完成动画状态恢复。

动画使用 CSS3 变换：

```css
-webkit-transform: rotateX(-90deg);
```

以及：

```css
-webkit-transform-origin: bottom;
```

通过 `webkitTransitionEnd` 监听动画结束事件，控制两个动画阶段的衔接。

## 构建与部署

当前开发环境使用自定义部署脚本。

在 SDK 根目录执行：

```bash
./deploy-clock.sh
```

部署完成后，可以在 HP Veer 上启动应用。

### 查看应用日志

```bash
palm-log -f com.veer.flipclock
```

### 查看连接设备

```bash
novacom -l
```

## 截图与调试

通过 Luna 服务在设备上生成截图：

```bash
luna-send -n 1 \
palm://com.palm.systemmanager/takeScreenShot \
'{"file":"/media/internal/screenshot.png"}'
```

将截图下载到开发电脑：

```bash
novacom -d DEVICE_ID \
get file:///media/internal/screenshot.png > ./screenshot.png
```

查看截图：

```bash
open ./screenshot.png
```

HP Veer 屏幕分辨率为：

```text
320 × 400
```

## 当前开发状态

- [x] Mojo 应用初始化
- [x] 全屏显示
- [x] 横屏和竖屏适配
- [x] HH:MM 时间显示
- [x] 双数字卡片组结构
- [x] 独立数字翻页动画
- [x] 两阶段 3D 翻页效果
- [x] CSS 样式整理
- [x] 经典 Fliqlo 风格基础视觉
- [x] HP Veer 真机运行验证

## 后续规划

以下功能暂不属于当前稳定版本：

- [ ] 完善数字卡片的光影质感
- [ ] 优化字体和数字排版
- [ ] 增加屏幕亮度调节
- [ ] 优化全屏显示和状态栏处理
- [ ] 增加屏幕常亮控制
- [ ] 增加用户自定义设置

## 开发原则

1. 优先保证 HP Veer 真机兼容性。
2. 尽量使用 webOS 2.1.2 支持的旧版 WebKit 特性。
3. 每次只修改少量功能，修改后立即真机验证。
4. 动画逻辑和视觉样式尽量解耦。
5. 已经验证稳定的功能不随意重构。

## 项目信息

- Project: Veer Flip Clock
- App ID: `com.veer.flipclock`
- Platform: HP Veer
- OS: webOS 2.1.2
- UI Framework: Mojo
