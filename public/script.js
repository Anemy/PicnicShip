$('input').on('input', function() {
	$.ajax({
		method: 'post',
		url: '/query',
		contentType: 'application/json',
		data: JSON.stringify({
			query: $(this).val()
		})
	})
		.success(function(results) {
			$('.results').empty();

			results.forEach(function(result) {
				var li = $('<li>').text(result);
				$('.results').append(li);
			});
		});
});