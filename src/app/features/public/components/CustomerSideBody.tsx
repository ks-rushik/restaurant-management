import { Collapse } from '@mantine/core';
import React, { FC, useState } from 'react';
import useMenuItem from '../../menu/hook/useMenuItem';
import { IItemdata } from '../../item/components/AddItemModal';

type ICustomerSideBodyProps = {
  categories: any[] | null | undefined;
  id: string;
};

const CustomerSideBody: FC<ICustomerSideBodyProps> = (props) => {
  const { categories, id } = props;
  const data = useMenuItem();
  const matchedItem = data?.find((item) => item.id === id);
  const currency = matchedItem && matchedItem.currency;

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleToggle = (categoryId: string) => {
    setOpenCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className="space-y-6">
      {categories?.map((category) => (
        <div key={category.id} className="bg-white p-4 rounded-lg shadow-lg">
          <p
            className="font-bold text-lg sm:text-2xl text-gray-800 flex justify-between items-center cursor-pointer hover:text-blue-600 transition-all duration-300"
            onClick={() => handleToggle(category.id)}
          >
            {category.category_name}
            <span className="text-gray-500 text-sm">{openCategory === category.id ? '▲' : '▼'}</span>
          </p>

          <ul className="mt-2">
            {category.Items?.map((item: IItemdata) => (
              <Collapse in={openCategory === category.id} key={item.id}>
                <li className="pl-4 py-2">
                  <div className="text-sm sm:text-base font-semibold text-gray-700">{item.name}</div>
                  <div className="pl-4 text-gray-600 text-xs sm:text-sm">
                    <p className="text-blue-600 font-semibold">
                      {currency}
                      {item.price}
                    </p>
                    <p className="italic">{item.description}</p>
                    <p
                      className={`${
                        item.status === 'Available' ? 'text-green-500' : 'text-red-500'
                      } font-semibold`}
                    >
                      {item.status}
                    </p>
                  </div>
                </li>
              </Collapse>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CustomerSideBody;
