import { Ability, AbilityBuilder, createMongoAbility } from '@casl/ability';
import permissions from '@/constants/permissions.json';

type Action = 'create' | 'read' | 'update' | 'delete';
type Subject = 'User' | 'Order' | 'Customer' | 'Role';

export type AppAbility = Ability<[Action, Subject]>;

export const defineAbilitiesFor = (permissions: Array<{ action: Action; subject: Subject}>): AppAbility => {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility) ;

    permissions.forEach(({ action, subject }) => {
        can(action, subject);
    })

    return build();
};
