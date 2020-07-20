import { render } from '@testing-library/react';
// import { TableModal } from 'xtep';
import TableModal from '../index';

const TableModalTester = (params) => {
  
}


describe('Radio TableModal', () => {
  const mock = jest.fn();

  const mockData = [
    {
      name: 'jack',
      phone: '12345678901',
      email: '1223@qq.com',
    },
  ];

  mock.mockResolvedValue({
    data: mockData,
    total: mockData.length,
    success: true,
  });

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },
  ];

  test('TableModal should work', () => {
    const { container } = render(<TableModal request={mock} columns={columns} />);
    // console.log('container: ', container);
    expect(mock).toBeCalled();
  });
});
