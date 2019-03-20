function changeImg() {
    // 图片更改后异步提交表单上传服务器，返回url
    var form = $("#img_form");
    var options = {
      url: domain + '/upload/img', //上传文件的路径
      type:'post',
      success:function(data){
        data = JSON.parse(data);
        if(data.code == 0) {
          imgUrl = data.data.url;
        } else {
            alert('上传图片出错！');
        }
      }
    };
    form.ajaxSubmit(options);
   
    // 在前端显示上传的图片
    var file = $('.photo').find('input')[0].files[0];
    var reader = new FileReader();
    reader.onload = function(e){
    var imgFile = e.target.result;
      $('.photo-img').attr('src',imgFile);
      $('.photo-img').attr('style','display:block');
    }
    reader.readAsDataURL(file);
  }