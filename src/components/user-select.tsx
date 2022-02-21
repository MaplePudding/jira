import { IdSelect } from "./id-select";
import {useUsers} from "../util/user";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: users } = useUsers();
    return <IdSelect options={users || []} {...props} />;
};