import { Table } from 'antd';

function UsersInTripTable({ users }) {
    const columns = [
        { title: 'First Name', dataIndex: 'ApplicationUserFirstName', key: 'ApplicationUserFirstName'},
        { title: 'Last Name', dataIndex: 'ApplicationUserLastName', key: 'ApplicationUserLastName' },
    ];

    users = users.map(x => {
        x.key = x.Id;
        return x;
    });

    return (
        <Table columns={columns} dataSource={users} />
    );
}

export default UsersInTripTable;
