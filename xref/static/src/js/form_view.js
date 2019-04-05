odoo.define('xref.FormView', function (require) {
"use strict";

var FormView = require('web.FormView');

/**
 * This file is used to add "xref__count" to fieldsInfo so we can fetch its value for the
 * chatter's xref button without having it explicitly declared in the form view template.
 * this is the same hack used in `mail` module
 *
 */

FormView.include({
    /**
     * @override
     */
    init: function () {
        this._super.apply(this, arguments);

            if ('message_ids' in this.fieldsInfo[this.viewType]) { // if chatter enabled
             this.fieldsInfo[this.viewType].xref_count = {};

            //fixme: it should be removed after fix in mail_thread.py
            this.fieldsInfo[this.viewType].can_have_xref = {};
        }

    },
});

});
