## Ready



### **Install**



for npm(using npm3)

``` sh
npm install
```



for pip(I assume you are using  [virtualenv](https://virtualenv.readthedocs.org/en/latest/))

``` sh
pip install -r requirements.txt
```



## Dev



#### For Front-end

create a webpack server (Time-saving synchronised browser testing.)

``` javascript
npm run dev
```



open `localhost:8080` , you will see the front page



#### For Back-end

at the same time,  we need make server by a commad below :

``` 
python run.py 
```



open `localhost:5000/api/1/` , you will see：



![https://www.jianguoyun.com/](https://www.jianguoyun.com/c/tblv2/CMfYGBIg1Zjb7BdJYGu-1vu9f53W-JZfgAWM8XNL-OiW2DGZMcs/C3GtvaH9JHU/l)

## Product



the first one , we run command here

``` sh
npm run build # build.js file created in static dir
```



then we just change the `DEBUG` variable to false which in config.py



## To Do List



- Improve my english





## 中文补充

英文不好，这里做中文补充...



正文:

目前这是一个将 flask 与 [vuejs]('https://github.com/vuejs/vue') 结合的尝试。前端构建使用webpack，喜欢它的 hot-loader 以及很好的

结合 [vue-loader]('https://github.com/vuejs/vue-loader') 。 后端部分提供 Restful API ，其内容上面图片已经展示了，也可以自行clone下来运行。