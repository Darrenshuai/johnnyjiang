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
		$(".form_datetime").datetimepicker({
			isRTL: App.isRTL(),
			language: 'zh-CN',
			format: "yyyy-mm-dd",
			minView: 2,
			autoclose: true,
			pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
		});
	});

	//新增头像
	$('#userlist').on('click', '.addnew', function() {
		var tr = $(this).closest('label').clone();
		tr.find('a.addnew').remove();
		tr.append('<a class="btn red icn-only deletnew"><i class="fa fa-minus white"></i></a>');
		var td = $(this).closest('td');
		tr.appendTo(td);
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
			photoList:{

			},
			imageLists:[]
		};
		$('#userlist tr').each(function() {
			var phone = $(this).find('input[name="phone"]').val(),
				pass = $(this).find('input[name="password"]').val(),
				nick = $(this).find('input[name="username"]').val(),
				signs = $(this).find('input[name="signs"]').val(),
				birthday = $(this).find('input[name="birthday"]').val(),
				genderList=$(this).find('select[name="gender"] option:checked').val()
			udata.phoneNumberList.push(phone);
			udata.passWordList.push(pass);
			udata.nickNameList.push(nick);
			udata.descriptionList.push(signs);
			udata.birthdayList.push(birthday);
			udata.genderList.push(genderList);
		});
		console.log(udata);
	});
});