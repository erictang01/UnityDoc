function suggest_form() {
	function el4id (id) {return document.getElementById(id);}
	if(location.href.indexOf('docs.unity3d.com') == -1 && location.href.indexOf('docs.hq.unity3d.com') == -1){
	   $('.suggest').hide();
	   return;
	}
	$('.suggestform_background').click(function (e) {
		if (e.target === this)
			$('.suggestform_background').hide();
	});
	$('.suggest').click(function() {
		$('.suggestform_background').show();
	});
	$('#suggest_cancel').click(function() {
		$('.suggestform_background').hide();
	});
	$('#suggest_submit').click(function() {			
		var json = JSON.stringify({
			name: $(el4id('suggest_username')).val(),
			email: $(el4id('suggest_useremail')).val(),
			url: document.URL,
			body: $(el4id('suggest_body')).val()
		});
		$.ajax({
			dataType: 'json',
			url: '/suggest/',
			method: 'post',
			data: json,
			success: function(res) {
				alert("Suggestion has been sent");
				$('.suggestform_background').hide();
			},
			error: function(res) {			
				var json = null;
				try {
					json = JSON.parse(res.responseText);
				}
				catch (er) {return alert ("Invalid server response");}
				alert("fail: "+json.res);
			}
		});
	});
}