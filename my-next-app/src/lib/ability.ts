import { AbilityBuilder, MongoAbility, createMongoAbility } from "@casl/ability";

type Action = 'create' | 'read' | 'update' | 'delete';
type Subject = 'User' | 'Pizza' | 'Order' | 'Role';

export type AppAbility = MongoAbility<[Action, Subject]>;

export const givePermissions = (permissions: string[]): AppAbility => {
    const { can, build } = new AbilityBuilder<MongoAbility<[Action, Subject]>>(createMongoAbility);

    permissions.forEach(permission => {
        switch(permission) {
            case "UpdateOrderStatus":
                can('update', 'Order')
                break;
            case "SeeOrders":
                can('read', 'Order');
                break;
            case "AddUsers":
                can('create', 'User');
                break;
            case "SeeCustomers":
                can('read', 'User');
                break;
            case "CreateRoles":
                can("create", 'Role')
                break;
            default:
                break;
        }
    });

    return build();
};

export default givePermissions;