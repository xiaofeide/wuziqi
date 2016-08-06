$(function(){
/*计时器*/
    var b=0;
    var a = 00;
    function xie () {
        a=parseInt(a);
        a+=1;
        a=(a<10)?'0'+a:a;
        $('.time').html(a);
        if(a>59){
            a=0;

            $('.time').html('0'+a);
            b+=1;
            $('.fen').html(b);
        }
    }

  /*背景乐*/
    audio.src="mv/If You.mp3";
    audio.play();

    $('.kai').on('click',function(){
        $('.moshi').animate({
            opacity:1
        })
    })
    /*游戏介绍*/
    $('.jieshao').on('click',function(){
        $('.wenzi').slideToggle(800);
    })

    /*模式选择*/
    $('.moshi').on('click',function(){
        $('.moshi').animate({
            opacity:0,
            left:-800
        },900)
        $('.renji').animate({
            opacity:1
        })
        $('.renren').animate({
            opacity:1
        })
    })
    $('.renji').on('click',function(){
       qiju();
        t=setInterval(xie,1000);
        $('.qipan').animate({
            opacity:1
        })
        $('.qipan1').animate({
            opacity:1
        })
        $('.kaichang').css({
            display:'none'
        })

        $('.renji').animate({
            opacity:0,
            left:800

        })
        $('.renren').animate({
            left:800,
            opacity:0
        })
        $('.kai').animate({
            opacity:0,
            left:-300
        })
        $('.jieshao').animate({
            opacity:0,
            left:-300

        })
    })
    var isAi=true;
    $('.renren').on('click',function(){
        isAi=false;
        qiju();
        t=setInterval(xie,1000);
        $('.qipan').animate({
            opacity:1
        })
        $('.qipan1').animate({
            opacity:1
        })
        $('.kaichang').animate({
            opacity:0
        })

        $('.renji').animate({
            opacity:0,
            left:800

        })
        $('.renren').animate({
            left:800,
            opacity:0
        })
        $('.kai').animate({
            opacity:0,
            left:-300
        })
        $('.jieshao').animate({
            opacity:0,
            left:-300

        })
    })

    /*再来一局*/
    $('.zailai').on('click',function(){
        $('.cang').removeClass('xian');
        $('.zailai').animate({
            opacity:0
        })
        $('.qizi').removeClass('hei');
        $('.qizi').removeClass('bai');
        $('.time').html('0'+'0')
        qiju();
         b=0;
         a = 00;
        t=setInterval(xie,1000);
    })

    qiju = function(){
        var kongbai={};
        for(var i=0;i<15;i++){
        $('<b>').addClass('hang').appendTo('.qipan')
        $('<i>').addClass('lie').appendTo('.qipan')
        for(var j=0;j<15;j++){
            kongbai[i+'-'+j]={x:i,y:j};
            $('<div>')
                .addClass('qizi')
                .attr('id',i+'-'+j)
                .data('pos',{x:i,y:j})
                .appendTo('.qipan')
        }
    }
    var hei={};
    var bai={};

    var kaiguan=true;
    var panduan=function(pos,biao){
        var h= 1,s= 1,zx= 1,yx=1;
        var tx, ty;


        //横向
        tx=pos.x;ty=pos.y;
        while(biao[tx + '-' + (ty-1)]){
            h++;ty--;
        }
        tx=pos.x;ty=pos.y;
        while(biao[tx + '-' + (ty+1)]){
            h++;ty++;
        }


        //纵向
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1) + '-' + ty]){
            s++;tx--;
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1)+ '-' + ty]){
            s++;tx++;
        }


        //左斜
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1) + '-' + (ty-1)]){
            zx++;tx++;ty--
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1)+ '-' + (ty+1)]){
            zx++;tx--;ty++
        }


        //右斜
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1) + '-' + (ty+1)]){
            yx++;tx++;ty++;
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1)+ '-' + (ty-1)]){
            yx++;tx--;ty--;
        }

        return Math.max(h,s,zx,yx)
    }
    var ai=function(){
        var max1=-Infinity;
        var zuobiao1;
        for( var i in kongbai){
            var weixie=panduan(kongbai[i],hei);
            if(weixie>max1){
                max1=weixie;
                zuobiao1=kongbai[i];
            }
        }
        var max2=-Infinity;
        var zuobiao2;
        for( var i in kongbai){
            var weixie=panduan(kongbai[i],bai);
            if(weixie>max2){
                max2=weixie;
                zuobiao2=kongbai[i];
            }
        }
        return (max1>max2)?zuobiao1:zuobiao2;
    }

    $('.qizi').on('click',function(){
        audio.src="mv/yin.wav";
        audio.play();
        var pos=$(this).data('pos');

        if($(this).hasClass('hei')||$(this).hasClass('bai')){
            return;
        }
        if(kaiguan) {

            $(this).addClass('hei');
            hei[pos.x + '-' + pos.y] = true;
            delete kongbai[pos.x + '-' + pos.y]
            if (panduan(pos, hei)>=5) {
                $('.cang1').addClass('xian');
                $('.zailai').addClass('xian');
                $('.qipan .qizi').off('click');

                return;
            }
            if(isAi){
                var pos=ai();
                console.log(isAi)
                $('#'+ pos.x + '-' + pos.y).addClass('bai');
               audio.src="mv/yin.wav"
                audio.play();
                bai[pos.x + '-' + pos.y] = true;
                delete kongbai[pos.x + '-' + pos.y];
                if (panduan(pos, bai)>=5) {

                    clearInterval(t);
                    $('.cang').addClass('xian');
                    $('.zailai').animate({
                        opacity:1
                    })
                    $('.qipan .qizi').off('click');
                }
                return;
            }
        }else {
            $(this).addClass('bai');
            bai[pos.x + '-' + pos.y] = true;
            if (panduan(pos, bai)>=5) {
                clearInterval(t);
                $('.cang').addClass('xian');
                $('.zailai').animate({
                    opacity:1
                })
                $('.qipan .qizi').off('click');
            }
        }
        kaiguan = !kaiguan;
    })

    }





})