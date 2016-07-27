"use strict";

/*
Article hidder class to open and close article hidden part
Wrap the hidden part in a div with class article_hidder
A btn with class article_hidder_btn is created below the hidden part
Author: Bassim Matar
*/

var Article_hidder = {};

Article_hidder.run = function(type, btn_msg_close, btn_msg_open)
{
	new this[type](btn_msg_close, btn_msg_open);	
}

Article_hidder.classic = class
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
}

Article_hidder.no_hideback = class extends Article_hidder.classic
{
	change_state(is_hidden, btn)
	{
		$(btn)
			.hide()
			.parent().find('.article_hidder')
			.show();
	}
}

Article_hidder.run('classic', 'Fermer', 'En savoir plus...');
