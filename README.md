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



create a webpack server

``` 
npm run dev
```



at the same time,  we need make server by a commad below :

``` 
python run.py 
```



maybe there is a server listened on `localhost:5000`, now, edit the vue file, see the result on the page.



## Product



the first one , we run command here

``` sh
npm run build # build.js file created in static dir
```



then we just change the `DEBUG` variable to false which in config.py



## To Do List



- Improve my english
