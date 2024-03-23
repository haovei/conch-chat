# Conch AI Chat

![GitHub license](https://img.shields.io/github/license/haovei/conch-chat.svg)
![GitHub issues](https://img.shields.io/github/issues/haovei/conch-chat.svg)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/haovei/conch-chat/docker.yml)
![Docker Pulls](https://img.shields.io/docker/pulls/qutea/conch-chat)

海螺 AI 聊天机器人。通过配置人设，实现不同角色的聊天。

## 功能

-   [x] 聊天

## 支持模型：

-   [x] OpenAI
-   [x] 文心一言

## 使用

```bash
docker run -it -p 3000:3000 qutea/conch-chat
```

## 配置

通过环境变量配置

```bash
SYSTEM_PROMPTS= # 系统人设配置
CURRENT_API=OPENAI # 当前使用的 API

# OpenAI
OPENAI_API_KEY= # OpenAI API Key
OPENAI_BASE_URL= # OpenAI Base URL
OPENAI_API_MODEL=gpt-4-turbo-preview # OpenAI API Model

# 千帆（文心一言）
QIANFAN_ACCESS_KEY= # 千帆 Access Key
QIANFAN_SECRET_KEY= # 千帆 Secret Key
QIANFAN_API_MODEL=ERNIE-Bot-turbo # 千帆 API Model
```
