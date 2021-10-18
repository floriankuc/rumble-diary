import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { getItems, deleteItem } from '../actions/itemActions';
import { APP_ROUTES } from '../routes';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Brush, Tooltip, ReferenceLine } from 'recharts';

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

  const renderLineChart = () => (
    <BarChart width={400} height={400} data={transformItemsForChartDisplay(item.items)}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="duration" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      <Brush dataKey="date" height={30} stroke="#8884d8" />
      <Bar dataKey="duration" fill="#8884d8" onClick={(n) => navigateToNightShow(n._id)} />
    </BarChart>
  );

  return (
    <>
      <div>{user && item && item.items && renderLineChart()}</div>
      <div>
        <ul>
          {user &&
            item &&
            item.items.map((item) => {
              return (
                <li key={item._id}>
                  {<button onClick={() => onDeleteClick(item._id)}>D</button>}
                  {<p onClick={() => navigateToNightShow(item._id)}>{format(new Date(item.date), 'PPPPpppp')}</p>}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
