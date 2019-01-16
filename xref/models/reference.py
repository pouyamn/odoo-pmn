from odoo import models, fields, api, _


class Reference(models.Model):
    _name = 'xref.reference'

    name = fields.Char(string='Note')

    res_model = fields.Char(string='Source Model', )
    res_id = fields.Integer(string='Source Record')

    linked_rec = fields.Reference(string='Linked Record', selection='_get_ref_models')

    def _get_ref_models(self):
        if self.res_model:
            return [(ref.model, ref.name) for ref in self.env[self.res_model].referring_ids]


class Referencable(models.Model):
    _name = 'xref.referencable'
    _description = ''

    # Referring_id should be set in context in the caller view
    referring_id = fields.Many2one(comodel_name='ir.model', string='Accepting Model', readonly=True)

    referred_id = fields.Many2one(comodel_name='ir.model', string='Linkable Model')
