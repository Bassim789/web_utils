/*
Article hidder class to open and close article hidden part
Wrap the hidden part in a div with class article_hidder
A btn with class article_hidder_btn is created below the hidden part
Author: Bassim Matar
*/

Article_hidder =
{
	run(type, btn_msg_close, btn_msg_open)
	{
		new this[type](btn_msg_close, btn_msg_open);	
	},

	class: class
	{
		constructor(btn_msg_close, btn_msg_open)
		{
			this.btn_msg_close = btn_msg_close;
			this.btn_msg_open = btn_msg_open;

			this.config_each_article();
			this.bind_event();
		}

		config_each_article()
		{
			var that = this;
			$('.article_hidder').each(function()
			{
				$(this).hide();
				that.add_btn_to(this);
			});
		}

		add_btn_to(article)
		{
			$(article).after($('<a>',
			{
				class: 'article_hidder_btn',
				html: this.btn_msg_open,
				'data-is_hidden': true
			}));
		}

		change_state(is_hidden, btn)
		{
			$(btn)
				.data('is_hidden', !is_hidden)
				.html(is_hidden ? this.btn_msg_close : this.btn_msg_open)
				.parent().find('.article_hidder')
				.css('display', is_hidden ? 'block' : 'none');
		}

		bind_event()
		{
			var that = this;
			$('.article_hidder_btn').on('click', function()
			{
				that.change_state($(this).data('is_hidden'), this);
			});
		}
	},
}

Article_hidder.with_hideback = class extends Article_hidder.class
{
	
}

Article_hidder.without_hideback = class extends Article_hidder.class
{
	change_state(is_hidden, btn)
	{
		$(btn)
			.hide()
			.parent().find('.article_hidder')
			.show();
	}
}

Article_hidder.run(
	type = 'without_hideback',
	btn_msg_close = 'Fermer',
	btn_msg_open = 'En savoir plus...'
);
