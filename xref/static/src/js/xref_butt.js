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
     * @param {Object} mailFields
     * @param {string} [mailFields.mail_activity]
     * @param {string} [mailFields.mail_followers]
     * @param {string} [mailFields.mail_thread]
     * @param {Object} options
     * @param {string} [options.viewType=record.viewType] current viewType in
     *   which the chatter is instantiated
     */
    init: function (parent, record, mailFields , options) {
        this._super.apply(this, arguments);
        this.xrefBoxOpen=false;
        this.currentResID = record.res_id;
        this.currentResModel = record.model;
        this.xref_count = 0;
        },

  /*  willStart: function () {
        var self = this;
        var domain = [
            ['res_id', '=', this.currentResID],
            ['res_model', '=', this.currentResModel],
        ];
        var df1 = this._super.apply(this, arguments);
        var df2 = this._rpc({
            model: 'xref.reference',
            method: 'search',
            args:[domain],
            kwargs: {count: true},
        }).then(function (result) {
            self.xref_count = result;
        });
        return $.when(df1,df2);
    },*/

    start: function(){
        var res=this._super.apply(this, arguments)
        this.$('.o_topbar_right_area').append(QWeb.render('xref.Xref.Button', {
            count: this.record.data.xref_count || 0,
        }));
        return res
        /*.then( function(result){
        console.log(this.$('.o_chatter_button_attachment'))
        console.log(this.xref_count)
        this.$('.o_chatter_button_attachment').prepend(QWeb.render('xref.Xref.Button', {
            count: this.xref_count || 0,
        }))});*/
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
     /**
     * @private
     */
    _openXrefBox: function () {
        var self = this;
        this.xrefs = new XrefBox(this, this.record);

        this.xrefs.insertAfter(this.$('.o_chatter_topbar')).then(function () {
//            self.$el.addClass('o_chatter_composer_active');
//            self.$('.o_chatter_button_attachment').addClass('o_active_attach');
        });
        this.xrefBoxOpen = true;
    },
    /**
     * @private
     * @param {boolean} force
     */
    _closeXrefBox: function () {
        if (this.xrefs) {
//            this.$('.o_chatter_button_attachment').removeClass('o_active_attach');
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