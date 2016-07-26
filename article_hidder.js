/*
Article hidder class to open and close article hidden part
Wrap the hidden part in a div with class article_hidder
A btn with class article_hidder_btn is created below the hidden part
Author: Bassim Matar
*/

Article_hidder =
{
	action:
	{
		open:
		{
			action: 'close',
			html: 'Fermer',
			display: 'block'
		},
		close:
		{
			action: 'open',
			html: 'En savoir plus...',
			display: 'none'
		}
	},

	config_btn()
	{
		var that = this;

		$('.article_hidder').each(function()
		{
			that.add_btn(this);
		});
	},

	add_btn(article)
	{
		var btn = $('<a>', {class: 'article_hidder_btn'});
		$(article).after(btn);
		this.change_state('close', btn);
	},

	change_state(action, btn)
	{
		var new_state = this.action[action];

		$(btn)
			.data('action', new_state.action)
			.html(new_state.html)
			.parent().find('.article_hidder')
			.css('display', new_state.display);
	},

	event()
	{
		var that = this;

		$('.article_hidder_btn').on('click', function()
		{
			that.change_state($(this).data('action'), this);
		});
	},

	init()
	{
		this.config_btn();
		this.event();
	}
}

Article_hidder.init();
