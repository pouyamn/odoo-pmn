odoo.define('xref.XrefBox', function (require) {
"use strict";

var core = require('web.core');
var Widget = require('web.Widget');


var QWeb = core.qweb;

var XrefBox = Widget.extend({
    template: 'xref.XrefBox',
    events: {
        "click .o_xref_open": "_onXrefOpen",
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
        if (XrefID) {
            var xrefViewer = new DocumentViewer(this, this.attachmentIDs, activeAttachmentID);
            xrefViewer.appendTo($('body'));
        }
    },
});

return XrefBox;

});
