$(document).ready(function () {
	function ensureMailLoader($form) {
		var $wrap = $form.closest(".contact");
		if (!$wrap.length) {
			$wrap = $form.parent();
		}
		if (!$wrap.find(".mail-loader").length) {
			$wrap.append(
				'<div class="mail-loader" id="loader" aria-live="polite" aria-busy="false">' +
					'<div class="mail-loader-box">' +
						'<div class="mail-spinner"></div>' +
						"<p>Sending your message...</p>" +
					"</div>" +
				"</div>"
			);
		}
		return $wrap.find(".mail-loader");
	}

	function setSending($form, $button, sending) {
		var $loader = ensureMailLoader($form);
		if (sending) {
			$loader.addClass("is-visible").attr("aria-busy", "true");
			$button.prop("disabled", true).addClass("is-sending").data("label", $button.text()).text("Sending...");
			$form.find("input, textarea, button").prop("disabled", true);
		} else {
			$loader.removeClass("is-visible").attr("aria-busy", "false");
			$form.find("input, textarea").prop("disabled", false);
			$button.prop("disabled", false).removeClass("is-sending").text($button.data("label") || "Send Message");
		}
	}

	$("form#contact-form").submit(function (event) {
		event.preventDefault();
		$("form#contact-form .error").remove();
		$(".contact .success, .contact .form-status").remove();
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
		var $button = $form.find("#submitButton");
		var payload = {
			name: $form.find('[name="name"]').val(),
			email: $form.find('[name="email"]').val(),
			subject: $form.find('[name="subject"]').val(),
			message: $form.find('[name="message"]').val()
		};

		setSending($form, $button, true);
		$.ajax({
			url: "/api/contact",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(payload),
			success: function () {
				setSending($form, $button, false);
				$form.slideUp("fast", function () {
					$(this).before('<div class="success form-status">Thank you. Your email was sent successfully. We will contact you soon.</div>');
				});
			},
			error: function (xhr) {
				var message = "We could not send your message. Please email admin@online-business-erp.com or call +91 78983 56505.";
				if (xhr.responseJSON && xhr.responseJSON.message) {
					message = xhr.responseJSON.message;
				}
				setSending($form, $button, false);
				$form.before('<div class="error form-status">' + message + "</div>");
			}
		});
		return false;
	});
});
