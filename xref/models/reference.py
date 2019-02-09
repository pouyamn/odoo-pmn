from odoo import models, fields, api, _


class Reference(models.Model):
    _name = 'xref.reference'
    _description = 'eee'

    name = fields.Char(string='Note', required=True)

    res_model = fields.Char(string='Source Model', required=True)
    res_id = fields.Integer(string='Source Record', required=True)

    linked_rec = fields.Reference(string='Linked Record', selection='_get_ref_models', required=True)

    @api.model
    def _get_ref_models(self):
        model = self.env.context.get('default_res_model', False)
        if model:
            return [(ref.referred_id.model, ref.referred_id.name) for ref in
                    self.env['ir.model'].search([('model', '=', model)]).referring_ids]
        else:
            return [(' ', ' ')]

    # linked_rec_name = fields.Char(string='Target', related='linked_rec.display_name')
    # cannot be stored because the display name of the target record changes are untraceable
    linked_rec_name = fields.Char(string='Target', compute='_compute_linked_rec_name')
    target_model = fields.Char(compute='_compute_linked_rec_name')

    @api.multi
    def _compute_linked_rec_name(self):
        # todo: optimize by read_group
        for rec in self:
            if rec.linked_rec:
                rec.linked_rec_name = rec.linked_rec.display_name
                rec.target_model = self.env[rec.linked_rec._name]._description


class Referencable(models.Model):
    _name = 'xref.referencable'
    _description = 'rrr'

    # Referring_id should be set in context in the caller view
    referring_id = fields.Many2one(comodel_name='ir.model', string='Accepting Model', readonly=True)

    referred_id = fields.Many2one(comodel_name='ir.model', string='Linkable Model')
