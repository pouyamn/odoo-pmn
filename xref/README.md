[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![codecov](https://codecov.io/gh/muk-it/muk_base/branch/12.0/graph/badge.svg)](https://codecov.io/gh/muk-it/muk_base)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3e0faf892eaa429cb5ae6015a2539ba7)](https://www.codacy.com/app/pouyamn/odoo-pmn?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pouyamn/odoo-pmn&amp;utm_campaign=Badge_Grade)


# Cross Reference 

This module enables the users to link records of any model to another. For example you can link  a specific purchase
order to a project, or a meeting to a manufacturing order or eaven a lead to another lead.

## Usage
The administrator can assign 'referencable' in ir.models table, after that the model is available to accept links. 
To do that, the admin should open settings, and activate the developer mode. Then from the menu, select 
`Technical>>Database Structure>>Models`. Find the host model and open it in form view. On the `Cross Reference` tab 
the *referencable* models can be added. Also a list of models that allow to link to this model is displayed below that.

[![add_referensable](file://description/add_referensable_screenshot.png)]

After this all users can add references to the records of the model by a newly added button next to attachments
 button in the open chatter:


### Installation

To install this module, you need to:

Download the module and add it to your Odoo addons folder. Afterward,
log on to your Odoo server and go to the Apps menu. Trigger the debug
mode and update the list by clicking on the "Update Apps List" link. Now
install the module by clicking on the install button.


### Upgrade

To upgrade this module, you need to:

Download the module and add it to your Odoo addons folder. Restart the
server and log on to your Odoo server. Select the Apps menu and upgrade
the module by clicking on the upgrade button.
