# -*- coding: utf-8 -*-

from odoo import models, fields


class IrModel(models.Model):
    _inherit = 'ir.model'

    referring_ids = fields.One2many(comodel_name='xref.referencable', inverse_name='referring_id',
				      string='Accept links to',
                                      help='The list of models which can be attached to this model')
    referred_ids = fields.One2many(comodel_name='xref.referencable', inverse_name='referred_id',
				      string='Models allow linking to current',
                                      help='The list of models which this model can be attached to.',
                                   readonly=True)
