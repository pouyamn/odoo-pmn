# -*- coding: utf-8 -*-

from odoo import models, fields


class ResModel(models.Model):
    _inherit = 'ir.model'

    referring_ids = fields.One2many(comodel_name='xref.referencable', inverse_name='referring_id',
                                      help='The list of models which can be attached to this model')
    referred_ids = fields.One2many(comodel_name='xref.referencable', inverse_name='referred_id',
                                      help='The list of models which can be attached to this model',
                                   readonly=True)
