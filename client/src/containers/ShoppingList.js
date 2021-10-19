import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { getItems, deleteItem } from '../actions/itemActions';
import { APP_ROUTES } from '../routes';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Brush, Tooltip, ReferenceLine } from 'recharts';
import Chart from '../components/Chart';
import List from '../components/List';

const ShoppingList = ({ getItems, deleteItem, item, user }) => {
  const history = useHistory();
  const navigateToLogin = () => history.push(APP_ROUTES.login);
  useEffect(() => {
    if (user && user.id) {
      getItems();
    }
  }, [user, getItems]);

  if (user && user.id) console.log('user.id', user.id);

  const onDeleteClick = (id) => {
    deleteItem(id);
  };

  const navigateToNightShow = (id) => history.push(APP_ROUTES.show.replace(':id', id));

  const transformItemsForChartDisplay = (items) => {
    return items.map((night) => {
      return { ...night, duration: night.duration / 60, date: format(new Date(night.date), 'dd/MM/yy') };
    });
  };

  const renderList = (items) => {
    return <List onDeleteClick={onDeleteClick} onItemClick={navigateToNightShow} items={items} />;
  };

  return (
    <>
      <Chart data={transformItemsForChartDisplay(item.items)} onBarClick={navigateToNightShow} />
      {user && item && renderList(item.items)}
    </>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
