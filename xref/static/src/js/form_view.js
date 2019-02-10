odoo.define('xref.FormView', function (require) {
"use strict";

var FormView = require('web.FormView');

/**
 * This file is used to add "xref__count" to fieldsInfo so we can fetch its value for the
 * chatter's xref button without having it explicitly declared in the form view template.
 *
 */

FormView.include({
    /**
     * @override
     */
    init: function () {
        this._super.apply(this, arguments);

            this.fieldsInfo[this.viewType].xref_count = {};
            //fixme: it should be removed after fix in mail_thread.py
            this.fieldsInfo[this.viewType].can_have_xref = {};
    },
});

});
