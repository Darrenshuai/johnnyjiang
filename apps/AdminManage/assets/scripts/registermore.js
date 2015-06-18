$(function() {
	App.init();
	$(".form_datetime").datetimepicker({
		isRTL: App.isRTL(),
		language: 'zh-CN',
		format: "yyyy-mm-dd",
		minView: 2,
		autoclose: true,
		pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
	});

	//添加操作
	$('#userlist').on('click', '.btn.add', function() {
		var m = $('#usertd').html();
		$(m).appendTo('#userlist');
		$('.add').hide();
		$('.deletes').show();
		$('.add:last').show();
		$('.deletes:last').hide();
		$(".form_datetime").datetimepicker({
			isRTL: App.isRTL(),
			language: 'zh-CN',
			format: "yyyy-mm-dd",
			minView: 2,
			autoclose: true,
			pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
		});
	});

	//移除一行
	$('#userlist').on('click','.btn.deletes',function(){
		$(this).closest('tr').remove();
	});	

	//新增头像
	$('#userlist').on('click', '.addnew', function() {
		var plist=$(this).parent().next('.photoimg');
		var tr = $('#imgtmp').html();
		for (var i = 0; i <7; i++) {
			if(plist.find('div').length<7)
			{
				$(tr).appendTo(plist);	
			}
		}
		(function(s){
			$(s).find('.deletnew').on('click',function(){
				$(this).parents().eq(1).remove();
			})
		})(plist);
	});

	//删除头像
	$('#userlist').on('click', '.deletnew', function() {
		var tr = $(this).closest('label');
		tr.remove();
	});

	//批量注册的按钮事件
	$('.submit-more').on('click', function() {
		var udata = {
			phoneNumberList:[],
			passWordList:[],
			nickNameList:[],
			descriptionList:[],
			birthdayList:[],
			genderList:[],
			photoList:[]
		};
		$('#userlist tr').each(function() {
			var phone = $(this).find('input[name="phone"]').val(),
				pass = $(this).find('input[name="password"]').val(),
				nick = $(this).find('input[name="username"]').val(),
				signs = $(this).find('input[name="signs"]').val(),
				birthday = $(this).find('input[name="birthday"]').val(),
				genderList=$(this).find('select[name="gender"] option:checked').val()
			var imgs={};
			imgs.imgurl=$(this).find('input[name="imgurl"]').val();
			imgs.photolist=[];
			$(this).find('.photoimg input[name="imgphoto"]').each(function(){
				imgs.photolist.push($(this).val());
			});
			udata.phoneNumberList.push(phone);
			udata.passWordList.push(pass);
			udata.nickNameList.push(nick);
			udata.descriptionList.push(signs);
			udata.birthdayList.push(birthday);
			udata.genderList.push(genderList);
			udata.photoList.push(imgs);
		});
		console.log(udata);
	});
});