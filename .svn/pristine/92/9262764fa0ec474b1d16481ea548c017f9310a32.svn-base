# API接口 文档说明

<div align='cneter'><font color='red'>（部分接口）</font></div>

## 服务器API地址

前缀：
`http://xxx/api.php?type=`

完整的API地址为：`前缀`+`类型`

比如，验证登录的接口为：
`http://115.29.173.126:21084/api.php?type=` + `loginUser`

## 调用接口说明

-   如果参数格式是==JSON==的话：提交request请求时必须添加header头：==Content-Type:application/json==
-   所有的接口的返回形式都是统一为：
    -   正常返回

```
{
  "status": 1,
  "message": "OK",
  "data": 某种类型的数据，比如字符串，数字，字典等等
}
```

    - 错误返回

```
{
  "status": 0,
  "message": "错误信息",
  "data": 为null或[]
}
```

**返回解析**

```
{
  "status":状态码：0错误，1成功,
  "message": 返回消息,
  "data": 返回数据
}
```

### 登录

#### Reuqest

-   Method: **POST**
-   type: `register`
-   Body:

```
{
    username: admin
    password: admin
}
```

#### Response

-   Body

```
{
	"msg": "OK",
	"status": 1,
	"data": {
		"id": "3",
		"user_id": "8408725",
		"nickname": "徐然",
		"username": "admin",
		"password": "admin",
		"login_time": "2024-06-28 09:08:05",
		"group": "0",
		"token": "nqzTLNdDIBeDIZ/6hMGdvU9rkbCTy7ajbrd2fOrdi2r6Kec/C5NXLc/taVIK2+MeRUU4cjlDTCtVNHEwampoNjdFMGhrZ0NwK0RGN3Y2MGk5OGhRbDlrcUJFbz0="
	}
}

```

### 注册

#### Reuqest

-   Method: **POST**
-   type: `addUser`
-   Body:

```
{
    username: xiaoming
    password: 123456
    repassword: 123456
    code: t0cv
    is_admin: false
}
```

#### Response

-   Body

```
{
    "msg":"OK",
    "status":1,
    "data":true
}
```

### 获取用户

#### Reuqest

-   Method: **POST**
-   type: `getUser`
-   Body:

```
{
    username: admin
    token: nqzTLNdDIBeDIZ/6hMGdvU9rkbCTy7ajbrd2fOrdi2r6Kec/C5NXLc/taVIK2+MeRUU4cjlDTCtVNHEwampoNjdFMGhrZ0NwK0RGN3Y2MGk5OGhRbDlrcUJFbz0=
}
```

#### Response

-   Body

```
{
	"msg": "OK",
	"status": 1,
	"data": {
		"id": "3",
		"user_id": "8408725",
		"nickname": "徐然",
		"username": "admin",
		"password": "admin",
		"login_time": "2024-06-28 09:08:05",
		"group": "0",
		"token": "nqzTLNdDIBeDIZ/6hMGdvU9rkbCTy7ajbrd2fOrdi2r6Kec/C5NXLc/taVIK2+MeRUU4cjlDTCtVNHEwampoNjdFMGhrZ0NwK0RGN3Y2MGk5OGhRbDlrcUJFbz0="
	}
}
```

### 获取文章列表

#### Reuqest

-   Method: **POST**
-   type: `getArticleList`
-   Body:

```
{
   group: 分类ID，可不填（显示全部）
}
```

#### Response

-   Body

```
{
	"msg": "OK",
	"status": 1,
	"data": [
		{
			"id": "1",
			"article_id": "681182",
			"article_class": "2",
			"article_title": "asdsadsad",
			"article_content": "asdasdasdasdasdasdasdasd",
			"article_see": "15",
			"article_time": "2024-06-20 21:53:05",
			"author_id": "8130019",
			"article_tags": "组织|前端|后端",
			"$user": {
				"id": "1",
				"user_id": "8130019",
				"nickname": "小明",
				"username": "xuran",
				"password": "xuranyyds",
				"login_time": "2024-06-27 16:38:53",
				"group": "1",
				"token": "Fc9YOZSOinwrRMZNkcIYwpGw4d5RQ4qRg4dOIElSxcWc17s09QRWUoxKUxYOq7kISTJHUHBlbWVGcEEyZGJBellRMFpPbFN1c2QrbU9nVDEzR3MzTnR1YzNIUT0="
			},
			"$class": {
				"id": "2",
				"class_id": "2",
				"class_name": "技术",
				"class_desc": "了解技术，了解前端、了解编程世界"
			}
		}
	]
}
```

### 获取标签列表

#### Reuqest

-   Method: **POST**
-   type: `getTags`
-   Body:

```
{
}
```

#### Response

-   Body

```
{
	"msg": "OK",
	"status": 1,
	"data": {
		"0": "组织",
		"1": "前端",
		"2": "后端",
		"3": "",
		"4": "HTML5",
		"5": "VUE",
		"6": "业务处理",
		"8": "Redis",
		"9": "C++",
		"11": "JAVA",
		"12": "ElementUI",
		"14": "技术架构",
		"15": "项目管理",
		"16": "后端技术",
		"17": "开发规范",
		"18": "徐然",
		"19": "数据提取",
		"20": "数据采样"
	}
}

```

### 获取分类列表

#### Reuqest

-   Method: **POST**
-   type: `getClassList`
-   Body:

```
{
    username: admin
    token: nqzTLNdDIBeDIZ/6hMGdvU9rkbCTy7ajbrd2fOrdi2r6Kec/C5NXLc/taVIK2+MeRUU4cjlDTCtVNHEwampoNjdFMGhrZ0NwK0RGN3Y2MGk5OGhRbDlrcUJFbz0=
}
```

#### Response

-   Body

```
{
	"msg": "OK",
	"status": 1,
	"data": [
		{
			"id": "1",
			"class_id": "1",
			"class_name": "默认分类",
			"class_desc": "这是一个默认分类"
		},
		{
			"id": "2",
			"class_id": "2",
			"class_name": "技术",
			"class_desc": "了解技术，了解前端、了解编程世界"
		},
		{
			"id": "3",
			"class_id": "3",
			"class_name": "聊天",
			"class_desc": "聊天板块"
		},
		{
			"id": "4",
			"class_id": "4",
			"class_name": "其他",
			"class_desc": "其他板块"
		},
		{
			"id": "5",
			"class_id": "5",
			"class_name": "公告",
			"class_desc": "公告板块"
		}
	]
}

```

### 搜索文章

#### Reuqest

-   Method: **POST**
-   type: `submitSearch`
-   Body:

```
{
    title: asd
}
```

#### Response

-   Body

```
{
	"msg": "OK",
	"status": 1,
	"data": [
		{
			"id": "1",
			"article_id": "681182",
			"article_class": "2",
			"article_title": "asdsadsad",
			"article_content": "asdasdasdasdasdasdasdasd",
			"article_see": "15",
			"article_time": "2024-06-20 21:53:05",
			"author_id": "8130019",
			"article_tags": "组织|前端|后端",
			"$user": {
				"id": "1",
				"user_id": "8130019",
				"nickname": "小明",
				"username": "xuran",
				"password": "xuranyyds",
				"login_time": "2024-06-27 16:38:53",
				"group": "1",
				"token": "Fc9YOZSOinwrRMZNkcIYwpGw4d5RQ4qRg4dOIElSxcWc17s09QRWUoxKUxYOq7kISTJHUHBlbWVGcEEyZGJBellRMFpPbFN1c2QrbU9nVDEzR3MzTnR1YzNIUT0="
			},
			"$class": {
				"id": "2",
				"class_id": "2",
				"class_name": "技术",
				"class_desc": "了解技术，了解前端、了解编程世界"
			}
		}
	]
}

```

### 获取聊天列表

#### Reuqest

-   Method: **POST**
-   type: `getChatList`
-   Body:

```
{
}
```

#### Response

-   Body

```
{
	"msg": "ok",
	"status": 1,
	"data": [
		{
			"user_id": "8408725",
			"msg": "我",
			"time": "2024-06-27 16:36:49",
			"$user": {
				"id": "3",
				"user_id": "8408725",
				"nickname": "徐然",
				"username": "admin",
				"password": "admin",
				"login_time": "2024-06-28 09:08:05",
				"group": "0",
				"token": "nqzTLNdDIBeDIZ/6hMGdvU9rkbCTy7ajbrd2fOrdi2r6Kec/C5NXLc/taVIK2+MeRUU4cjlDTCtVNHEwampoNjdFMGhrZ0NwK0RGN3Y2MGk5OGhRbDlrcUJFbz0="
			}
		}
	]
}

```

### 我的文章

#### Reuqest

-   Method: **POST**
-   type: `getMyArticle`
-   Body:

```
{
    token: nqzTLNdDIBeDIZ/6hMGdvU9rkbCTy7ajbrd2fOrdi2r6Kec/C5NXLc/taVIK2+MeRUU4cjlDTCtVNHEwampoNjdFMGhrZ0NwK0RGN3Y2MGk5OGhRbDlrcUJFbz0=
    username: admin
    id: 8408725
}
```

#### Response

-   Body

```
{
	"msg": "ok",
	"status": 1,
	"data": [
		{
			"user_id": "8408725",
			"msg": "我",
			"time": "2024-06-27 16:36:49",
			"$user": {
				"id": "3",
				"user_id": "8408725",
				"nickname": "徐然",
				"username": "admin",
				"password": "admin",
				"login_time": "2024-06-28 09:08:05",
				"group": "0",
				"token": "nqzTLNdDIBeDIZ/6hMGdvU9rkbCTy7ajbrd2fOrdi2r6Kec/C5NXLc/taVIK2+MeRUU4cjlDTCtVNHEwampoNjdFMGhrZ0NwK0RGN3Y2MGk5OGhRbDlrcUJFbz0="
			}
		}
	]
}

```
