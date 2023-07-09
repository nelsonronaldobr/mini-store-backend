import { request, response } from 'express';
import { Addon } from '../../models/addon.model.js';

/* -------------------------------------------------------------------------- */
/*                             CREATE EXAMPLE DATE                            */
/* -------------------------------------------------------------------------- */
export const startCreateExample = async (
    req = request,
    res = response,
    next
) => {
    const addonData = [
        {
            name: 'Papa Junior',
            price: 0.0
        },
        {
            name: 'Papa Familiar',
            price: 4.0
        },
        {
            name: 'Papa Tumbay Regular',
            price: 1.0
        },
        {
            name: 'Papa Tumbay Familiar',
            price: 5.0
        }
    ];

    try {
        const addons = await Addon.insertMany(addonData);
        res.status(200).json({
            addons
        });
    } catch (error) {
        console.error('Error al guardar los addons:', error);
    }
};
