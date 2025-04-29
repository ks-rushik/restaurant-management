import React, { FC } from "react";
import { IItemdata } from "../../item/AddItemModal";
type ICustomerSideCard = {
  item: IItemdata;
  currency: string;
};

const CustomerSideCard: FC<ICustomerSideCard> = (props) => {
  const { item, currency } = props;
  return <div></div>;
};

export default CustomerSideCard;
