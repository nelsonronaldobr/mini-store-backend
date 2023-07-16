import { request, response } from 'express';
import { User } from '../../models/user.model.js';

const startGetUsersPerPage = async (req = request, res = response, next) => {
    const { _page, _search, _limit, _filter } = req.query;

    try {
        const startIndex = Number(_page) * _limit;

        let query = await User.find();
        let totalDocuments;
        if (_search) {
            query = query.where('email', new RegExp(_search, 'i'));
            totalDocuments = await User.countDocuments(query);
        } else {
            totalDocuments = await User.countDocuments({});
        }
    } catch (error) {}
};
