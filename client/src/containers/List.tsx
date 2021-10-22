import { format } from 'date-fns';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import { APP_ROUTES } from '../routes';
import Chart from '../components/Chart';
import List from '../components/List';
import history from '../routes/history';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface ListContainerReduxProps extends PropsFromRedux {
  item: any;
  user: any;
}
export interface ListContainerProps {
  getItems: any;
  deleteItem: any;
}

class ListContainer extends React.Component<ListContainerProps & ListContainerReduxProps> {
  componentDidMount() {
    if (this.props.user && this.props.user.id) {
      this.props.getItems();
    }
  }

  componentDidUpdate(prevProps: any) {
    //user abgleich muss ggf raus, getItems wird nicht neugeholt wenn item delete
    if (this.props.user && this.props.user.id && prevProps.user !== this.props.user) {
      this.props.getItems();
    }
  }

  onDeleteClick = (id: string) => {
    this.props.deleteItem(id);
  };

  navigateToNightShow = (id: string) => history.push(APP_ROUTES.show.replace(':id', id));

  transformItemsForChartDisplay = (items: any) => {
    return items.map((night: any) => {
      return { ...night, duration: night.duration / 60, date: format(new Date(night.date), 'dd/MM/yy') };
    });
  };

  renderList = (items: any) => {
    return <List onDeleteClick={this.onDeleteClick} onItemClick={this.navigateToNightShow} items={items} />;
  };

  render() {
    console.log(this.props);
    return (
      <>
        <Chart data={this.transformItemsForChartDisplay(this.props.item.items)} onBarClick={this.navigateToNightShow} />
        {this.props.user && this.props.item && this.renderList(this.props.item.items)}
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  item: state.item,
  user: state.auth.user,
});

const connector = connect(mapStateToProps, { getItems, deleteItem });

export default connector(ListContainer);

//WORKS
// import { format } from 'date-fns';
// import React, { useEffect, useRef } from 'react';
// import { connect } from 'react-redux';
// import { useHistory } from 'react-router';
// import { getItems, deleteItem } from '../actions/itemActions';
// import { APP_ROUTES } from '../routes';
// import Chart from '../components/Chart';
// import List from '../components/List';

// export interface ListContainerProps {
//   getItems: any;
//   deleteItem: any;
//   item: any;
//   user: any;
// }

// const ListContainer = ({ getItems, deleteItem, item, user }: ListContainerProps) => {
//   // const [localItem, setLocalItem] = React.useState(item);

//   const history = useHistory();

//   const prevItemRef = useRef();

//   useEffect(() => {
//     prevItemRef.current = item;
//   });

//   const prevItem = prevItemRef.current;

//   useEffect(() => {
//     // if (user && user.id) {
//     getItems();
//     // }
//   }, [user, getItems]);

//   console.log('props.item', item);
//   // console.log('localItem', localItem);
//   useEffect(() => {
//     // if (localItem !== item) {
//     // console.log('item', item);
//     getItems();
//     // console.log('props.item', item); //wenn ich lösche ist props.item schon auf 3, d. h. er ändert sich
//     // console.log('localItem', localItem);
//     // }
//   }, []);
//   //item in arr ist loop

//   if (user && user.id) console.log('user.id', user.id);
//   // if (item) console.log('item', item);

//   const onDeleteClick = (id: string) => {
//     deleteItem(id);
//   };

//   const navigateToNightShow = (id: string) => history.push(APP_ROUTES.show.replace(':id', id));

//   const transformItemsForChartDisplay = (items: any) => {
//     return items.map((night: any) => {
//       return { ...night, duration: night.duration / 60, date: format(new Date(night.date), 'dd/MM/yy') };
//     });
//   };

//   const renderList = (items: any) => {
//     return <List onDeleteClick={onDeleteClick} onItemClick={navigateToNightShow} items={items} />;
//   };

//   return (
//     <>
//       {/* {localItem.items.length} */}
//       <button onClick={(): void => getItems()}>get items</button>
//       <Chart data={transformItemsForChartDisplay(item.items)} onBarClick={navigateToNightShow} />
//       {user && item && renderList(item.items)}
//     </>
//   );
// };

// const mapStateToProps = (state: any) => ({
//   item: state.item,
//   user: state.auth.user,
// });

// export default connect(mapStateToProps, { getItems, deleteItem })(ListContainer);
