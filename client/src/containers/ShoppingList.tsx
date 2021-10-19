import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { getItems, deleteItem } from '../actions/itemActions';
import { APP_ROUTES } from '../routes';
import Chart from '../components/Chart';
import List from '../components/List';

export interface ListContainerProps {
  getItems: any;
  deleteItem: any;
  item: any;
  user: any;
}

const ListContainer = ({ getItems, deleteItem, item, user }: ListContainerProps) => {
  const history = useHistory();
  useEffect(() => {
    if (user && user.id) {
      getItems();
    }
  }, [user, getItems]);

  if (user && user.id) console.log('user.id', user.id);

  const onDeleteClick = (id: string) => {
    deleteItem(id);
  };

  const navigateToNightShow = (id: string) => history.push(APP_ROUTES.show.replace(':id', id));

  const transformItemsForChartDisplay = (items: any) => {
    return items.map((night: any) => {
      return { ...night, duration: night.duration / 60, date: format(new Date(night.date), 'dd/MM/yy') };
    });
  };

  const renderList = (items: any) => {
    return <List onDeleteClick={onDeleteClick} onItemClick={navigateToNightShow} items={items} />;
  };

  return (
    <>
      <Chart data={transformItemsForChartDisplay(item.items)} onBarClick={navigateToNightShow} />
      {user && item && renderList(item.items)}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  item: state.item,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ListContainer);
