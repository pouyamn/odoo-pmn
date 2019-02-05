odoo.define('xref.XrefBox', function (require) {
"use strict";

var core = require('web.core');
var Widget = require('web.Widget');


var QWeb = core.qweb;

var XrefBox = Widget.extend({
    template: 'xref.XrefBox',
    events: {
        "click .o_xref_item": "_onXrefOpen",
        "click .o_xref_add": "_onXrefAdd",
    },
    /**
     * @override
     * @param {string} record.model
     * @param {Number} record.res_id
     */
    init: function (parent, record) {
        this._super.apply(this, arguments);
        this.currentResID = record.res_id;
        this.currentResModel = record.model;
        this.xrefIDs = {};
    },
    /**
     * @override
     */
    willStart: function () {
        var self = this;
        var domain = [
            ['res_id', '=', this.currentResID],
            ['res_model', '=', this.currentResModel],
        ];
        return $.when(this._super.apply(this, arguments), this._rpc({
            model: 'xref.reference',
            method: 'search_read',
            domain: domain,
        }).then(function (result) {
            self.xrefIDs = result;
        }));
    },
    start: function(){
        $(".o_xref_box").slideDown()
        return this._super.apply(this, arguments)
    },


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
    * @param {Object} record
    */
    update: function (record) {
        this.currentResID = record.res_id;
        this.currentResModel = record.model;
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onXrefOpen: function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var XrefID = $(ev.currentTarget).data('id');
        var XrefModel= $(ev.currentTarget).data('model');
        if (XrefID) {
             ev.stopPropagation();
        ev.preventDefault();
        var action = {
                type: 'ir.actions.act_window',
                name: 'Edit Cross Reference',
                target: 'new',
                res_model: XrefModel,
                res_id: XrefID,
                view_id: 'xref.reference_form',
                view_type: 'form',
                views: [[false,'form']],
                context: {
                    default_res_model: this.currentResModel,
                    default_res_id: this.currentResID,
                         },
                 flags:{mode:'readonly'}
            };
        this.do_action(action);
        }
    },
    _onXrefAdd: function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var action = {
                type: 'ir.actions.act_window',
                name: 'Add Cross Reference',
                target:'new',
                res_model:'xref.reference',
                view_id:'xref.reference_form',
                view_type:'form',
                views: [[false,'form']],
                context:{
                    default_res_model: this.currentResModel,
                    default_res_id: this.currentResID,
                         },
            };
        this.do_action(action);

    },
});

return XrefBox;

});
