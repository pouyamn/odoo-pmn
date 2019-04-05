# -*- coding: utf-8 -*-
{
    'name': "Cross Reference",

    'summary': """
        Link and attache any model to others""",

    'description': """

Cross Reference
====================
Link any record on any model to another record. E.g. link a related project to a purchase order, link an attendance to a meeting etc. A button is added next to attachments button in chatter for displaying the referenced records.

Administrator can set allowable model links for any model by adding target models to `ir.model` of selected model in the Reference tab.
Please note that without adding allowable references to `ir.model` this module has no effect!.

    """,

    'author': "Pouya Malekinejad",
    # 'website': "http://pouyamn.github.io/",
    'support': 'pouya.malekinejad@gmail.com',

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Extra Tools',
    'version': '12.0.1.0',

    'images':['static/description/xref-chatter_screenshot.png',
              'static/description/add_referensable_screenshot.png',
              'static/description/icon.png'],

    # any module necessary for this one to work correctly
    'depends': ['base', 'mail'],
    'qweb': [
        'static/src/xml/templates.xml',
    ],
    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/xref_views.xml',
        'views/ir_model_views.xml',
        'views/assets.xml',

    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'license':'AGPL-3',

}