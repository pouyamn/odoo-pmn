# -*- coding: utf-8 -*-
{
    'name': "l10n_ir",

    'summary': """
        Iran Localization
        """,
    'description': """
        Long description of module's purpose
    """,

    'author': "My Company",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Localization',
    'version': '12.0.0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],
    'qweb':[
    ],
    # always loaded
    'data': [
        'data/res_country_state_data.xml'
    ],
    # only loaded in demonstration mode
    'demo': [
    ],
}