import { Ability, AbilityBuilder } from '@casl/ability';
// import permissions from '@/constants/permissions.json';

type Action = 'create' | 'read' | 'update' | 'delete';
type Subject = 'User' | 'Order' | 'Customer' | 'Role';

export type AppAbility = Ability<[Action, Subject]>;

export const defineAbilitiesFor = (permissions: Array<{ action: Action; subject: Subject}>): AppAbility => {
    const { can, build } = new AbilityBuilder<AppAbility>(Ability) ;

    permissions.forEach(({ action, subject }) => {
        can(action, subject);
    })

    return build();
};
