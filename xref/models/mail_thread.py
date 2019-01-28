from odoo import api, models, fields


class MailThread(models.AbstractModel):
    _inherit = 'mail.thread'

    xref_count = fields.Integer('Cross Reference Count', compute='_compute_xref_count',store=False)

    @api.multi
    def _compute_xref_count(self):
        read_group = self.env['xref.reference'].read_group(
            [('res_id', 'in', self.ids), ('res_model', '=', self._name)],
            fields=['res_id'],groupby=['res_id'])

        count_dict = dict((grp['res_id'], grp['res_id_count']) for grp in read_group)
        for rec in self:
            rec.xref_count = count_dict.get(rec.id, 0)
            print(rec.id,count_dict.get(rec.id, 0))
