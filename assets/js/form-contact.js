$(document).ready(function () {
	$("form#contact-form").submit(function (event) {
		event.preventDefault();
		$("form#contact-form .error").remove();
		var hasError = false;
		$(".requiredField").each(function () {
			if (jQuery.trim($(this).val()) === "") {
				var labelText = $(this).attr("placeholder") || "this field";
				$(this).parent().append('<span class="error">Please enter ' + labelText + "</span>");
				$(this).addClass("inputError");
				hasError = true;
			} else if ($(this).hasClass("email")) {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})$/;
				if (!emailReg.test(jQuery.trim($(this).val()))) {
					$(this).parent().append('<span class="error">Please enter a valid email</span>');
					$(this).addClass("inputError");
					hasError = true;
				}
			}
		});
		if (hasError) {
			return false;
		}

		var $form = $(this);
		var payload = {
			name: $form.find('[name="name"]').val(),
			email: $form.find('[name="email"]').val(),
			subject: $form.find('[name="subject"]').val(),
			message: $form.find('[name="message"]').val()
		};

		$("#loader").show();
		$.ajax({
			url: "/api/contact",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(payload),
			success: function () {
				$form.slideUp("fast", function () {
					$(this).before('<div class="success">Thank you. Your email was sent successfully. We will contact you soon.</div>');
					$("#loader").hide();
				});
			},
			error: function (xhr) {
				var message = "We could not send your message. Please email admin@online-business-erp.com or call +91 78983 56505.";
				if (xhr.responseJSON && xhr.responseJSON.message) {
					message = xhr.responseJSON.message;
				}
				$form.before('<div class="error">' + message + "</div>");
				$("#loader").hide();
			}
		});
		return false;
	});
});
