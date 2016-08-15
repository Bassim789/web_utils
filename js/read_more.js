"use strict"

var Read_more =
{
	init(options)
	{
		new this[options.type](
			options.btn_msg_close,
			options.btn_msg_open
		)
	}
}

Read_more.classic = class
{
	constructor(btn_msg_close, btn_msg_open)
	{
		this.btn_msg_close = btn_msg_close
		this.btn_msg_open = btn_msg_open
		this.config_each_article()
	}

	config_each_article()
	{
		var that = this
		$('.read_more').each(function()
		{
			$(this).css('display', 'inline-block').hide()
			that.add_btn_to(this)
		})
	}

	add_btn_to(article)
	{
		var that = this
		$(article).after($('<a>',
		{
			class: 'read_more_btn',
			html: this.btn_msg_open,
			'data-is_hidden': true,
			css: {
				cursor: 'pointer',
				textDecoration: 'underline'
			},
			on: {
				click: function(){
					that.change_state($(this).data('is_hidden'), this)
				}
			}
		}))
	}

	change_state(is_hidden, btn)
	{
		$(btn)
			.data('is_hidden', !is_hidden)
			.html(is_hidden ? this.btn_msg_close : this.btn_msg_open)
			.parent().find('.read_more')
			.css('display', is_hidden ? 'initial' : 'none')
	}
}

Read_more.no_hideback = class extends Read_more.classic
{
	change_state(is_hidden, btn)
	{
		$(btn)
			.hide()
			.parent().find('.read_more')
			.css('display', 'initial')
	}
}
