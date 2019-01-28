from odoo import models, fields, api, _


class Reference(models.Model):
    _name = 'xref.reference'
    _description = 'eee'

    name = fields.Char(string='Note', required=True)

    res_model = fields.Char(string='Source Model')
    res_id = fields.Integer(string='Source Record')

    linked_rec = fields.Reference(string='Linked Record', selection='_get_ref_models')

    @api.model
    def _get_ref_models(self):
        model = self.env.context.get('default_res_model', False)
        if model:
            return [(ref.referred_id.model, ref.referred_id.name) for ref in self.env['ir.model'].search([('model', '=', model)]).referring_ids]
        else:
            return [(' ', ' ')]
# todo: add computed display name of res_model

class Referencable(models.Model):
    _name = 'xref.referencable'
    _description = 'rrr'

    # Referring_id should be set in context in the caller view
    referring_id = fields.Many2one(comodel_name='ir.model', string='Accepting Model', readonly=True)

    referred_id = fields.Many2one(comodel_name='ir.model', string='Linkable Model')
