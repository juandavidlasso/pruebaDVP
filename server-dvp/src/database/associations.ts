import { Debt } from '../modules/debt/debt.model';
import { User } from '../modules/user/user.model';

User.hasMany(Debt, {
    foreignKey: 'user_id',
    as: 'debts',
});

Debt.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});
