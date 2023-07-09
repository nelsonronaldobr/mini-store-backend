import { ExtraItem } from '../../models/extraItem.model.js';

/* -------------------------------------------------------------------------- */
/*                             CREATE EXAMPLE DATE                            */
/* -------------------------------------------------------------------------- */
export const startCreateExample = async (
    req = request,
    res = response,
    next
) => {
    const extraItemData = [
        {
            name: 'Pie de Manzana',
            price: 5.5
        },
        {
            name: 'Nuggets x5',
            price: 5.9
        },
        {
            name: 'King Fusion OREO® Vainilla',
            price: 8.5
        }
    ];

    try {
        const extraItems = await ExtraItem.insertMany(extraItemData);
        res.status(200).json({
            extraItems
        });
    } catch (error) {
        console.error('Error al guardar los extraItems:', error);
    }
};
