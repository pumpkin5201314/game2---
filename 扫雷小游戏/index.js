// 点击开始游戏--》动态生成100个小格--》100个div
//leftClick  没有雷  -》提示数字（代表以当前小格为中心的八个格的雷数）  扩散（当前格子的周围没有雷）  有雷 ---》游戏结束
//rightClick  有标记--》取消标记     没有数字并且没有标记--》 进行标记   ---》标记是否正确，10个都正确标记--提示成功
//已经出现数字--》无效果


var startBtn=document.getElementById("btn");
var box=document.getElementById("box");
var alertBox=document.getElementById("alertBox");
var flagBox=document.getElementById("flagBox");
var close=document.getElementById("close");
var score=document.getElementById("score");

var alertI=document.getElementById("alertI");

var wrapper=document.getElementsByClassName("wrapper")[0];

var mineNum;//雷的数量
var mineOver;//未被标记雷的数量
var block;
var mineMap=[];
var startGameBool=true;
 bindEvent();

function bindEvent(){
	startBtn.onclick=function(){
		if(startGameBool){
			box.style.display="block";
			startBtn.style.display="none";
			flagBox.style.display="block";
			wrapper.style.backgroundImage="url("+"./img/bg2.jpg"+")";

			init();
         startGameBool=false;

		}
		
	}
	box.oncontextmenu=function(){
		return false;
	}

	box.onmousedown=function(e){
		var event=e.target;
		if(e.which==1){
			leftClick(event);
		}else if(e.which==3){
			rightClick(event);
		}

	}
	close.onclick=function(){
		alertBox.style.display="none";
		flagBox.style.display="none";
		box.style.display="none";
		btn.style.display="block";
		wrapper.style.backgroundImage="url("+"./img/bg.jpg"+")";
		box.innerHTML="";
        startGameBool=true;

	}
}
	
	function leftClick(dom){
		if(dom.classList.contains("flag")){
			return;
		}
		var isLei=document.getElementsByClassName("isLei");
		if(dom&&dom.classList.contains('isLei')){
			// alert("over")
			 for(var i=0;i<isLei.length;i++){
			 	isLei[i].classList.add('show');
			 }
			setTimeout(function(){
				alertBox.style.display="block";
				alertI.style.backgroundImage="url("+"./img/over.jpg"+")";
			},800);

		}else{
			var n=0;
			var posArr=dom&&dom.getAttribute("id").split('-');
			var posX=posArr&&+posArr[0];
			var posY=posArr&&+posArr[1];
			dom&&dom.classList.add('num');
			// i-1,j-1  i-1,j    i-1,j+1
			//  i,j-1    i,j     i,j+1
			//  i+1,j-1  i+1,j   i+1,j+1
			for(var i=posX-1;i<=posX+1;i++){
				for(var j=posY-1;j<=posY+1;j++){
               var aroundBox=document.getElementById(i+"-"+j);
               	if(aroundBox&&aroundBox.classList.contains('isLei')){
               		n++;

               	}
				}
			}
			dom&&(dom.innerHTML=n)
			if(n==0){
				for(var i=posX-1;i<=posX+1;i++){
					for(var j=posY-1;j<=posY+1;j++){
						var nearBox=document.getElementById(i+"-"+j);
						// console.log(nearBox)
						if(nearBox&&nearBox.length!=0){
							if(!nearBox.classList.contains('check')){
								nearBox.classList.add('check');
								leftClick(nearBox);
							}
						}

					}
				}


			}
		}
	}
	function rightClick(dom){
			if(dom.classList.contains("num")){
				return;
			}
			dom.classList.toggle('flag');
			if(dom.classList.contains('isLei')&&dom.classList.contains('flag')){
				mineOver--;
			}
			if(dom.classList.contains('isLei')&&!dom.classList.contains('flag')){
				mineOver++;
			}
			console.log(mineOver)
			score.innerText=" 当前剩余雷数 : "+mineOver;
			console.log(score)

			if(mineOver==0){
				 
				alertBox.style.display="block";
				alertI.style.backgroundImage="url("+"./img/success.png"+")";
			 
			}
	}
function init(){
	//生成100个小格  再随机生成十个雷
	mineNum=10;
	mineOver=10;
	score.innerText=" 当前剩余雷数 : "+mineOver;

	for(var i=0;i<10;i++){
		for(var j=0;j<10;j++){
			var con=document.createElement('div');
			con.classList.add('block');
			con.setAttribute("id",i+"-"+j);
			box.appendChild(con);
			mineMap.push({mine:0});

		}
	}
	block=document.getElementsByClassName("block");
	while(mineNum){
		var mineIndex=Math.floor(Math.random()*100);
		if(mineMap[mineIndex].mine===0){
			block[mineIndex].classList.add('isLei');
	        mineNum--;
	        mineMap[mineIndex].mine=1;

		}
		
	}

}