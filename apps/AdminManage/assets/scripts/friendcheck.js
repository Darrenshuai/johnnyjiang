$(function(){
	App.init(); 

	//选择切换
	$('.checkbox.main input[type="checkbox"]').on('change',function(){
		if($(this).is(':checked'))
		{
			$('.checkbox.friend input[type="checkbox"').attr('checked','checked');
			$('.checkbox.friend span').addClass('checked');
		}
		else
		{
			$('.checkbox.friend input[type="checkbox"').attr('checked',false);
			$('.checkbox.friend span').removeClass('checked');
		}
	});

	//通过所有请求
	$('.checkAll').on('click',function(){
		var l=$('#applylist tr').find('input:checked').length;
		if(l>0)
		{	
			//具体的处理逻辑
			$('#applylist tr').each(function(){
				//代码区域
			});
		}
		else
		{
			alert('至少选择一条记录！');
		}
	})
	
	//拒绝所有请求
	$('.rejectAll').on('click',function(){
		var l=$('#applylist tr').find('input:checked').length;
		if(l>0)
		{	
			//具体的处理逻辑
			$('#applylist tr').each(function(){
				//代码区域
			});
		}
		else
		{
			alert('至少选择一条记录！');
		}
	})
});