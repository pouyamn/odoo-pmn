from odoo import models, fields


class ResCountryState(models.Model):
    """Override, Makes Name Translateable"""

    _inherit = 'res.country.state'

    name = fields.Char(translate=True)
