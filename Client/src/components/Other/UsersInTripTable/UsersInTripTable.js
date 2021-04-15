import { Table } from 'antd';

function UsersInTripTable({ users }) {
    const columns = [
        { title: 'First Name', dataIndex: 'applicationUserFirstName', key: 'applicationUserFirstName'},
        { title: 'Last Name', dataIndex: 'applicationUserLastName', key: 'applicationUserLastName' },
    ];

    const mappedUsers = users.map(x => {
        x.key = x.id;
        return x;
    });

    return (
        <Table columns={columns} dataSource={mappedUsers} />
    );
}

export default UsersInTripTable;
