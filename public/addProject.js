$(function(){
    var $registerBox=$("#registerBox");
    var $loginBox = $('#loginBox');
    


  //提交
  $registerBox.find('button').on('click', function(ev) {
    ev.preventDefault();
    //通过ajax提交请求
    $.ajax({
        type: 'post',
        url: '/api/user/register',
        data: {
            username: $registerBox.find('[name="username"]').val(),
            password: $registerBox.find('[name="password"]').val(),
            repassword:  $registerBox.find('[name="repassword"]').val()
        },
        dataType: 'json',
        success: function(result) {
             $registerBox.find('.colWarning').html(result.message)   


             if (!result.code) {
                //注册成功
                setTimeout(function() {
                    $loginBox.show();
                    $registerBox.hide();
                }, 1000);
            }
            
        }
    });
    
});



    //退出
    $('#button1').on('click', function() {
        ev.preventDefault();
          //通过ajax提交请求
          console.log("dsa");
        $.ajax({
            type: 'get',
            url: '/user12/index',
            success: function(result) {
                console.log("success");
                if (!result.code) {
                    window.location.reload();
                }
            }
        });
    })

  


})