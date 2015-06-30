var Login = function() {

	var handleLogin = function() {
		$('.login-form').validate({
			errorElement: 'label', //default input error message container
			errorClass: 'help-inline', // default input error message class
			focusInvalid: false, // do not focus the last invalid input
			rules: {
				username: {
					required: true
				},
				password: {
					required: true
				},
				remember: {
					required: false
				}
			},

			messages: {
				username: {
					required: "输入用户名"
				},
				password: {
					required: "输入密码"
				}
			},

			invalidHandler: function(event, validator) { //display error alert on form submit   
				$('.alert-error', $('.login-form')).show();
			},

			highlight: function(element) { // hightlight error inputs
				$(element)
					.closest('.control-group').addClass('error'); // set error class to the control group
			},

			success: function(label) {
				label.closest('.control-group').removeClass('error');
				label.remove();
			},

			errorPlacement: function(error, element) {
				error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
			},
			submitHandler: function(form) {
				$.ajax({
						url: 'http://115.29.102.106/juzi/web/login',
						type: 'post',
						dataType: 'jsonp',
						jsonp: '_jsonp',
						data: {
							"userName": $('#username').val(),
							"userPwd": $.md5($('#password').val())
						},
					})
					.done(function(msg) {})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});
			}
		});
	}

	$('.login-form input').keypress(function(e) {
		if (e.which == 13) {
			if ($('.login-form').validate().form()) {
				$('.login-form').submit();
			}
			return false;
		}
	});

	return {
		//main function to initiate the module
		init: function() {
			$.ajax({
					url: 'http://115.29.102.106/juzi/web/getAdminPermission',
					type: 'get',
					dataType: 'jsonp',
					jsonp: '_jsonp'
				})
				.done(function(data) {
					localStorage.setItem('jzlist', data.)
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
			handleLogin();
			$.backstretch([
				"assets/img/bg/1.jpg",
				"assets/img/bg/2.jpg",
				"assets/img/bg/3.jpg",
				"assets/img/bg/4.jpg"
			], {
				fade: 1000,
				duration: 8000
			});

		}

	};

}();