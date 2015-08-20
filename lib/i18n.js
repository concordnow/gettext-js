/*
Domain support for Gettext.js
Copyright (C) 2013 Florian Parain <florian@contract-live.com>, all rights reserved

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU Library General Public License as published
by the Free Software Foundation; either version 2, or (at your option)
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Library General Public License for more details.
*/
var I18n = null,
	i18n = null,
	tr = null,
	trn = null,
	trnc = null,
	trc = null;

(function (Gettext) {
	'use strict';

	var I18n = function (datas) {
		this.gettext = new Gettext({ 'locale_data': datas });
	};

	I18n.prototype.tr = function (msgid) {
		var args = Array.prototype.slice.call(arguments, 1),
			patt = this.gettext.gettext(msgid);
		return this._applyPattern(patt, args);
	};

	I18n.prototype.trn = function (msgid, msgid_plural, number) {
		var args = Array.prototype.slice.call(arguments, 2),
			patt = this.gettext.ngettext(msgid, msgid_plural, number);
		return this._applyPattern(patt, args);
	};

	I18n.prototype.trc = function (msgctxt, msgid) {
		var args = Array.prototype.slice.call(arguments, 2),
			patt = this.gettext.pgettext(msgctxt, msgid);
		return this._applyPattern(patt, args);
	};

	I18n.prototype.trnc = function (msgctxt, msgid, msgid_plural, number) {
		var args = Array.prototype.slice.call(arguments, 3),
			patt = this.gettext.npgettext(msgctxt, msgid, msgid_plural, number);
		return this._applyPattern(patt, args);
	};

	I18n.prototype._applyPattern = function (pattern, elements) {
		pattern = pattern.replace(/\\n/g, "\n");
		return pattern.replace(/\{(\d+)[^\}]*\}/g, function () {
			return elements[arguments[1]];
		});
	};

}(window.Gettext));

(function (i18n_datas) {
	'use strict';
	i18n = new I18n(i18n_datas);
	tr = function () {
		return i18n.tr.apply(i18n, arguments);
	};
	trn = function () {
		return i18n.trn.apply(i18n, arguments);
	};
	trc = function () {
		return i18n.trc.apply(i18n, arguments);
	};
	trnc = function () {
		return i18n.trnc.apply(i18n, arguments);
	};
}(window.i18n_datas));
