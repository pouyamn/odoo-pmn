odoo.define('xref.XrefButt', function (require) {
"use strict";

var core = require('web.core');
var Widget = require('web.Widget');


var QWeb = core.qweb;

var Chatter = require('mail.Chatter')

var XrefBox = require('xref.XrefBox')

Chatter.include({
    events:  _.extend({}, Chatter.prototype.events, {
        'click .o_chatter_xref_btn': '_onOpenXref',
    }),

     /**
     * @override
     * @param {widget} parent
     * @param {Object} record
     */
    init: function (parent, record) {
        this._super.apply(this, arguments);
        this.xrefBoxOpen=false;
        this.currentResID = record.res_id;
        this.currentResModel = record.model;
        this.xref_count = 0;
        },

    start: function(){
        var res=this._super.apply(this, arguments)
        if (this.record.data.can_have_xref){//fixme: it should be fixed after fix in mail_thread.py
            this.$('.o_topbar_right_area').append(QWeb.render('xref.Xref.Button',
                {
                count: this.record.data.xref_count || 0,
                }
            ))
            };
        return res
    },

     /**
     Override
     * @param {Object} record
     * @param {integer} [record.res_id=undefined]
     * @param {Object[]} [fieldNames=undefined]
     */
    update: function (record,fieldNames) {
        this._super.apply(this, arguments);
        this._updateXrefCounter()
    },

    _onOpenXref: function () {
     if (this.xrefBoxOpen) {
            this._closeXrefBox();
        } else {
            this._openXrefBox();
        }
    },

     /*
     * @private
     */
    _openXrefBox: function () {
        var self = this;
        this.xrefs = new XrefBox(this, this.record);

        this.xrefs.insertAfter(this.$('.o_chatter_topbar')).then(function () {
        });
        this.xrefBoxOpen = true;
    },
    /**
     * @private
     */
    _closeXrefBox: function () {
        if (this.xrefs) {
            this.xrefs.destroy();
            this.xrefBoxOpen = false;
        }
    },

    _updateXrefCounter: function () {
        var count = this.record.data.xref_count || 0;
        this.$('.xref_button_count').html(' ('+ count +')');
    },
})
});